import styles from "../styles/TechStack.module.scss"
import Image from 'next/image';

interface Props {
    skills: Skill[];
}

type Skill = {
    id: number;
    name: string;
    image: string;
    createdAt: Date;
    updatedAt: Date;
}

export default function TechStack({ skills }: Props) {

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
                    {skills.map((skill: Skill, i: number) => {
                        return (
                            <img key={i} className={styles.img} src={skill.image} alt={skill.name} />
                        )
                    })}
                </div>
            </section>
        )
    }

}