import styles from '../styles/Intro.module.scss'
import {useRouter} from 'next/router'

export default function Intro() {
    const router = useRouter();
  
    return (
        <div className={styles.typewriter}>
        <h1>Stewart McKinlay</h1>
      </div>
    )
}