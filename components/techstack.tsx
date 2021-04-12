import styles from "../styles/TechStack.module.scss"
import Image from 'next/image';

export default function TechStack(props) {

    const skills = props.data.skills;

    if (skills.length < 1) {
        return (
            <section className={styles.container}>
                <h3>Skills</h3>
                <div className={styles.skills}>
                    <Image
                        src="/learning.png"
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
                    {skills.map((skill, i) => {
                        return (
                            <img key={i} className={styles.img} src={skill.image} alt={skill.name} />
                        )
                    })}
                </div>
            </section>
        )
    }

}