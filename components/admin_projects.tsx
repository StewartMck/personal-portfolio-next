import { useState, useEffect, useReducer } from 'react'
import axios from 'axios'
import Message from '../components/message';

import styles from '../styles/Admin.module.scss'

const initialStatus = {
    loading: false,
    success: false,
    error: false,
}

type ACTIONTYPE =
    | { type: "loading" }
    | { type: "success" }
    | { type: "error" };

const reducer = (state: typeof initialStatus, action: ACTIONTYPE) => {
    switch (action.type) {
        case 'loading': {
            return { ...state, loading: true, error: false, success: false }
        }
        case 'success': {
            return { ...state, loading: false, success: true }
        }
        case 'error': {
            return { ...state, loading: false, error: true }
        }
        default: {
            return state;
        }
    }
}

export default function AdminProjects() {

    const [{ loading, success, error }, dispatch] = useReducer(reducer, initialStatus);

    const defaultForm = {
        id: '',
        title: '',
        description: '',
        url: '',
        image: '',
        featured: false,
        createdAt: null,
        updatedAt: null,
    }

    const [items, setItems] = useState([]);
    const [formData, setFormData] = useState(defaultForm);

    const getData = () => {
        axios({
            url: '/api/projects/all',
            method: "GET",
        }).then((res) => {
            setItems(res.data.projects)
        })
    }

    useEffect(() => {
        getData();
    }, [])

    const handleSubmit = async (e: any) => {
        dispatch({ type: 'loading' })
        e.preventDefault();
        const method = e.nativeEvent.submitter.name;
        try {
            if (method === "Create") {
                const res = await axios({
                    url: '/api/projects/create',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: formData
                })
                if (res.data.message === 'success') {
                    dispatch({ type: 'success' })
                    setFormData(defaultForm)
                    return getData();
                }
            } else if (method === "Update") {
                const res = await axios({
                    url: `/api/project/${formData.id}`,
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: formData
                })

                if (res.data.message === 'success') {
                    dispatch({ type: "success" })
                    setFormData(defaultForm)
                    return getData();
                }
            }
        } catch (e) {
            dispatch({ type: "error" })
        }
    };

    const handleDelete = async (id: number) => {
        dispatch({ type: "loading" })
        if (window.confirm("Are you sure you want to delete this project?") === true) {
            const res = await axios({
                url: `/api/project/${id}`,
                method: 'delete',
            })
            if (res.data.message === 'success') {
                dispatch({ type: 'success' })
                setFormData(defaultForm)
                return await getData();
            }
        }
    }

    const handleUpdate = (project: typeof defaultForm) => {
        setFormData(project);
    }

    return (
        <section className={styles.projects}>
            <h3>Projects</h3>
            <form onSubmit={handleSubmit} className={styles.projectForm}>
                {success && (
                    <Message
                        color={"green"}
                        message={"success"}
                    />
                )}
                {loading && (
                    <Message
                        color={"yellow"}
                        message={"loading..."}
                    />
                )}
                {error && (
                    <Message
                        color={"red"}
                        message={"error"}
                    />
                )}
                <label>
                    Title:
    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={(event) => { setFormData((prev) => ({ ...prev, title: event.target.value })) }}
                    />
                </label>
                <label>
                    Description:
    <input
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={(event) => { setFormData((prev) => ({ ...prev, description: event.target.value })) }}
                    />
                </label>
                <label>
                    URL:
    <input
                        type="text"
                        name="url"
                        value={formData.url}
                        onChange={(event) => { setFormData((prev) => ({ ...prev, url: event.target.value })) }}
                    />
                </label>
                <label>
                    Image:
    <input
                        type="text"
                        name="image"
                        value={formData.image}
                        onChange={(event) => { setFormData((prev) => ({ ...prev, image: event.target.value })) }}
                    />
                </label>
                <label className={styles.featured}>
                    Featured:
    <input
                        type="checkbox"
                        name="featured"
                        checked={formData.featured}
                        onChange={(event) => { setFormData((prev) => ({ ...prev, featured: event.target.checked })) }}
                    />
                </label>
                <div className={styles.buttons}>
                    <input type="submit" name="Create" value="New" />
                    <input type="submit" name="Update" value="Update" />
                </div>
            </form>
            <br />
            <div className={styles.tableContainer} style={{ overflow: "scroll", maxHeight: 200 }}>
                <table className={styles.table}>
                    <thead>
                        <tr className={styles.table}>
                            <th>Id</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Image</th>
                            <th>Url</th>
                            <th>Featured</th>
                            <th>Created At</th>
                            <th>Updated At</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((project: typeof defaultForm, i) => {
                            return (
                                <tr key={i} className={styles.table}>
                                    <th>{project.id}</th>
                                    <th onClick={() => handleUpdate(project)}>{project.title}</th>
                                    <th >{project.description}</th>
                                    <th className={styles.long}>{project.image}</th>
                                    <th className={styles.long}>{project.url}</th>
                                    <th>{project.featured ? 'T' : 'F'}</th>
                                    <th>{project.createdAt}</th>
                                    <th>{project.updatedAt}</th>
                                    <th><button className={styles.deleteButton} onClick={() => handleDelete(Number(project.id))}>Delete</button></th>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </section>
    )
}