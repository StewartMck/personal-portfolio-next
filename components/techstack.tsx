import styles from "../styles/TechStack.module.scss"

export default function TechStack(props) {

    const data = [
        {
            name: "Nextjs",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Nextjs-logo.svg/800px-Nextjs-logo.svg.png"
        },
        {
            name: "JS",
            image: "https://cdn4.iconfinder.com/data/icons/scripting-and-programming-languages/512/js-512.png"
        },
    ]

    const skills = props.data.skills;

    return (
        <section className={styles.container}>
            <h3>Skills</h3>
            <section>
                {skills.map(skill => {
                    return (
                        <img className={styles.img} src={skill.image} alt={skill.name} />
                    )
                })}
            </section>
        </section>
    )
}