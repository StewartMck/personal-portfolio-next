import { useState, useEffect, useReducer } from 'react'
import axios from 'axios'
import Message from '../components/message'

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

export default function SkillsProjects() {

    const [{ loading, success, error }, dispatch] = useReducer(reducer, initialStatus);

    const defaultForm = {
        id: '',
        name: '',
        image: '',
        createdAt: null,
        updatedAt: null,
    }

    const getData = () => {
        axios({
            url: 'http://localhost:3000/api/skills/all',
            method: "GET",
        }).then((res) => {
            setItems(res.data.skills)
        })
    }

    const [items, setItems] = useState([]);
    const [formData, setFormData] = useState(defaultForm)

    useEffect(() => {
        getData();
    }, [])

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        dispatch({ type: 'loading' })
        const method = e.nativeEvent.submitter.name;
        try {
            if (method === "Create") {
                const res = await axios({
                    url: 'http://localhost:3000/api/skills/create',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: formData
                })
                if (res.data.message === 'success') {
                    dispatch({ type: 'success' })
                    setFormData(defaultForm)
                    return await getData();
                }
            } else if (method === "Update") {
                const res = await axios({
                    url: `http://localhost:3000/api/skill/${formData.id}`,
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

    const handleUpdate = (skill: typeof defaultForm) => {
        setFormData(skill);
    }

    const handleDelete = async (id: number) => {
        dispatch({ type: "loading" })
        if (window.confirm("Are you sure you want to delete this skill?") === true) {
            const res = await axios({
                url: `http://localhost:3000/api/skill/${id}`,
                method: 'delete',
            })
            if (res.data.message === 'success') {
                dispatch({ type: 'success' })
                setFormData(defaultForm)
                return await getData();
            }
        }
    }

    return (
        <section className={styles.projects}>
            <h3>Skills</h3>
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
                    Name:
    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={(event) => { setFormData((prev) => ({ ...prev, name: event.target.value })) }}
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
                <div className={styles.buttons}>
                    <input type="submit" name="Create" value="New" />
                    <input type="submit" name="Update" value="Update" />
                </div>
            </form>
            <br />
            <div style={{ overflow: "scroll", maxHeight: 200, width: "100%" }}>
                <table className={styles.table}>
                    <tr className={styles.table}>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Image</th>
                        <th>Created At</th>
                        <th>Updated At</th>
                        <th>Delete</th>
                    </tr>
                    {items.map((skill: typeof defaultForm, i) => {
                        return (
                            <tr key={i} className={styles.table}>
                                <th>{skill.id}</th>
                                <th onClick={() => handleUpdate(skill)}>{skill.name}</th>
                                <th className={styles.long}>{skill.image}</th>
                                <th>{skill.createdAt}</th>
                                <th>{skill.updatedAt}</th>
                                <th><button className={styles.deleteButton} onClick={() => handleDelete(Number(skill.id))}>Delete</button></th>
                            </tr>
                        )
                    })}
                </table>
            </div>
        </section>
    )
}