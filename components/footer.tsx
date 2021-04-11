import styles from '../styles/Footer.module.scss';

export default function Footer() {

    return (
        <footer className={styles.container}>
            <small>&copy; Copyright {new Date().getFullYear()}, Stewart McKinlay</small>
            <small>Made with: Next.js, React, Sass, Prisma, Auth0</small>
        </footer>
    )
}