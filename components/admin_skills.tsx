import { useState, useEffect, useReducer } from 'react'
import styles from '../styles/Admin.module.scss'
import axios from 'axios'
import Message from '../components/message'

const initialStatus = {
    loading: false,
    success: false,
    error: false,
}
const reducer = (state, action) => {
    switch(action.type) {
        case 'loading': {
            return{...state, loading: true, error: false, success: false}
        }
        case 'success': {
            return {...state, loading: false, success: true}
        }
        case 'error': {
            return {...state, loading: false, error: true}
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({type: 'loading'})
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
            if(res.data.message === 'success'){
                dispatch({type: 'success'})
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
            if(res.data.message === 'success'){
                dispatch({type: "success"})
                setFormData(defaultForm)
                return getData();
            }
        }
    } catch (e) {
        dispatch({type: "error"})
     }
        
    };

    const handleUpdate = (skill) => {
        setFormData(skill);
    }

    const handleDelete = async (id) => {
        dispatch({type: "loading"})
        if (window.confirm("Are you sure you want to delete this skill?") === true) {
            const res = await axios({
                url: `http://localhost:3000/api/skill/${id}`,
                method: 'delete',
            })
            if(res.data.message === 'success'){
                dispatch({type: 'success'})
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