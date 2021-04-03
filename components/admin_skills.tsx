import { useState, useEffect } from 'react'
import styles from '../styles/Admin.module.scss'
import axios from 'axios'

export default function SkillsProjects() {

    const getData = () => {
        axios({
            url: 'http://localhost:3000/api/skills/all',
            method: "GET",
        }).then((res) => {
            setItems(res.data.skills)
        })
    }

    const [items, setItems] = useState([]);
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        image: '',
    })

    useEffect(() => {
        getData();
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const method = e.nativeEvent.submitter.name;
        if (method === "Create") {
            const resp = await axios({
                url: 'http://localhost:3000/api/skills/create',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: formData
            })
            return await getData();
        } else if (method === "Update") {
            const resp = await axios({
                url: `http://localhost:3000/api/skill/${formData.id}`,
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: formData
            })
            return await getData();
        }
    };

    const handleUpdate = (skill) => {
        setFormData(skill);
    }

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this skill?") === true) {
            const res = await axios({
                url: `http://localhost:3000/api/skill/${id}`,
                method: 'delete',
            })
            return await getData();
        }

    }

    return (
        <section className={styles.projects}>
            <h3>Skills</h3>
            <form onSubmit={handleSubmit} className={styles.projectForm}>
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
            <div style={{ overflow: "scroll", maxHeight: 200 }}>
                <table className={styles.table}>
                    <tr className={styles.table}>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Image</th>
                        <th>Created At</th>
                        <th>Updated At</th>
                        <th>Delete</th>
                    </tr>
                    {items.map((skill) => {
                        return (
                            <tr className={styles.table}>
                                <th>{skill.id}</th>
                                <th onClick={() => handleUpdate(skill)}>{skill.name}</th>
                                <th className={styles.long}>{skill.image}</th>
                                <th>{skill.createdAt}</th>
                                <th>{skill.updatedAt}</th>
                                <th><button onClick={() => handleDelete(skill.id)}>Delete</button></th>
                            </tr>
                        )
                    })}
                </table>
            </div>
        </section>
    )
}