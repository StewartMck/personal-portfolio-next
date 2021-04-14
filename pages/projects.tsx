import Head from 'next/head';
import { InferGetStaticPropsType } from 'next';
import Layout from '../components/layout';
import Projects from '../components/projects';
import { getProjects } from '../pages/api/projects/all'

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

  const resProjects = await getProjects();
  const projects: Project[] = await JSON.parse(resProjects);

  return {
    props: {
      projects,
    },
    revalidate: 5,
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
            filtered={false}
            data={projects}
            title={"Projects"}
          />
        </section>
      </Layout>
    </>
  )
}