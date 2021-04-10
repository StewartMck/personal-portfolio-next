import Layout from "../components/layout";
import styles from '../styles/About.module.scss'
import Head from 'next/head';
import { promises as fs } from 'fs';
import path from 'path'
import ReactMarkdown from "react-markdown";

export async function getStaticProps() {
    const filePath = path.join(process.cwd(), 'data/about.md')
    const contents = await fs.readFile(filePath, 'utf-8');
    return {
        props: {
            about: contents,
        }
    }
}

export default function About({ about }) {
    return (
        <>
            <Head>
                <title>About</title>
            </Head>
            <Layout >
                <div className={styles.Container}>

                    <ReactMarkdown source={about} />

                </div>
            </Layout>
        </>
    )
}