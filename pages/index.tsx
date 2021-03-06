import Head from 'next/head'

import Image from 'next/image'
import Layout from '../components/layout'
import Projects from '../components/projects'
import TechStack from '../components/techstack'

import { InferGetStaticPropsType } from 'next';

import styles from '../styles/Home.module.scss'
import { getProjects } from './api/projects/all'
import { getSkills } from './api/skills/all'

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

  const resProjects = await getProjects();
  const projects: Project[] = await JSON.parse(resProjects);

  const resSkills = await getSkills();
  const skills: Skills[] = await JSON.parse(resSkills);

  return {
    props: {
      projects,
      skills
    },
    revalidate: 5,
  }
}

export default function Home({ projects, skills }: InferGetStaticPropsType<typeof getStaticProps>) {

  return (
    <>
      <Head>
        <title>Stewart McKinlay</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property='og:title' content='Stewart McKinlay'/>
        <meta property='og:image' content='/public/ogImage.png'/>
        <meta property='og:description' content='Personal Portfolio'/>
        <meta property='og:url' content='//www.smckinlay.ca'/> 
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
          skills={skills}
        />
      </Layout>
    </>
  )
}
