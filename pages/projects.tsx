import Head from 'next/head';
import { InferGetStaticPropsType } from 'next';
import Layout from '../components/layout';
import Projects from '../components/projects';

import styles from '../styles/AllProjects.module.scss';

type Project = {
  id: number
  title: string;
  description: string;
  image: string;
  url: string;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export async function getStaticProps() {
  const resProjects = await fetch('http://localhost:3000/api/projects/all');
  const projects: Project[] = await resProjects.json();

  return {
    props: {
      projects,
    }
  }
}

export default function AllProjects({ projects }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>Projects</title>
      </Head>
      <Layout>
        <section className={styles.Container}>
          <Projects
            data={projects}
            title={"Projects"}
          />
        </section>
      </Layout>
    </>
  )
}