import Head from 'next/head';
import { InferGetStaticPropsType } from 'next';
import { promises as fs } from 'fs';
import path from 'path'
import ReactMarkdown from "react-markdown";

import Layout from "../components/layout";

import styles from '../styles/About.module.scss'

export async function getStaticProps() {
    const filePath = path.join(process.cwd(), 'data/about.md')
    const contents: string = await fs.readFile(filePath, 'utf-8');

    return {
        props: {
            contents
        }
    }
}

export default function About({ contents }: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <>
            <Head>
                <title>About</title>
            </Head>
            <Layout >
                <div className={styles.Container}>
                    <ReactMarkdown source={contents} />
                </div>
            </Layout>
        </>
    )
}