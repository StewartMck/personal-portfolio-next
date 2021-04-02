import Head from 'next/head'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Layout from '../components/layout'
import styles from '../styles/Admin.module.scss'

export default function Admin() {

    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState([]);
    const [formData, setFormData] = useState({
        id:'',
        title: '',
        description: '',
        url: '',
        image: '',
        featured: false,
    })

    useEffect(() => {
        axios({
            url: 'http://localhost:3000/api/projects/all',
            method: "GET",
        }).then((res) => {
            setItems(res.data.projects)
            setLoading(false);
        })
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const method = e.nativeEvent.submitter.name;
        if (method === "Create") {
            const resp = await axios({
                url: 'http://localhost:3000/api/projects/create',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: formData
            })
            return resp
        } else if (method === "Update") {
            const resp = await axios({
                url: `http://localhost:3000/api/project/${formData.id}`,
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: formData
            })
            return resp
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this project?") === true) {
            const res = await axios({
                url: `http://localhost:3000/api/project/${id}`,
                method: 'delete',
            })
            console.log(res)
            return res;
        }
    }

    const handleUpdate = async (project) => {
        console.log('handle update')
        setFormData(project)
    }

    return (
        <>
            <Head>
            <title>Admin</title>
            </Head>
            <Layout>
                <section className={styles.projects}>
                    <h3>Projects</h3>
                    <form onSubmit={handleSubmit}>
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
                        <label>
                            Featured:
                <input
                                type="checkbox"
                                name="featured"
                                value={formData.featured}
                                onChange={(event) => { setFormData((prev) => ({ ...prev, featured: event.target.value })) }}
                            />
                        </label>
                        <input type="submit" name="Create" value="New" />
                        <input type="submit" name="Update" value="Update" />
                    </form>
                    <br />
                    <table className={styles.table}>
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
                        {items.map((project) => {
                            return (
                                <tr className={styles.table}>
                                    <th>{project.id}</th>
                                    <th onClick={() => handleUpdate(project)}>{project.title}</th>
                                    <th >{project.description}</th>
                                    <th className={styles.long}>{project.image}</th>
                                    <th className={styles.long}>{project.url}</th>
                                    <th>{project.featured}</th>
                                    <th>{project.createdAt}</th>
                                    <th>{project.updatedAt}</th>
                                    <th><button onClick={() => handleDelete(project.id)}>Delete</button></th>
                                </tr>
                            )
                        })}
                    </table>
                </section>
                <br />
                <br />
            </Layout>
        </>
    )
}
