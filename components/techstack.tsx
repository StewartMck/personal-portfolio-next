import styles from "../styles/TechStack.module.scss"
import Image from 'next/image';

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
    
    if (skills.length < 1) {
        return (
            <section className={styles.container}>
                <h3>Skills</h3>
                <div className={styles.skills}>
                    <Image
                        src="/learning.jpg"
                        alt="Learning skills"
                        width={100}
                        height={100}
                    />
                </div>
            </section>
        )
    } else {
        return (
            <section className={styles.container}>
                <h3 className={styles.title}>Skills</h3>
                <div className={styles.skills}>
                    {skills.map(skill => {
                        return (
                            <img className={styles.img} src={skill.image} alt={skill.name} />
                        )
                    })}
                </div>
            </section>
        )
    }

}