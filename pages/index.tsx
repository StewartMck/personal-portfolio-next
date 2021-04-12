import Head from 'next/head'
import axios from 'axios'

import Image from 'next/image'
import Layout from '../components/layout'
import Projects from '../components/projects'
import TechStack from '../components/techstack'

import { InferGetStaticPropsType } from 'next';

import styles from '../styles/Home.module.scss'

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

type Skills = {
  id: number;
  name: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

export async function getStaticProps() {
  
  const projects = {};
  const skills = {};
  
  // const resProjects = await fetch('http://localhost:3000/api/projects/all');
  // const projects: Project[] = await resProjects.json();

  // const resSkills = await fetch('http://localhost:3000/api/skills/all');
  // const skills: Skills[] = await resSkills.json();

  return {
    props: {
      projects,
      skills,
    }
  }
}

export default function Home({ projects, skills }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>Stewart McKinlay</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Layout>
        <section className={styles.title}>
          <h1>Stewart McKinlay</h1>
          <h5>Full Stack Developer | Pilot</h5>
        </section>
        <div className={styles.imageContainer}>
          <Image
            className={styles.profile}
            alt="Profile Picture"
            src='/profile.jpg'
            width="600"
            height='400'
            layout='intrinsic'
          />
        </div>
        <Projects
          title={"Featured Projects"}
          data={projects}
          filtered={true}
        />
        <br />
        <br />
        <TechStack
          data={skills}
        />
      </Layout>
    </>
  )
}
