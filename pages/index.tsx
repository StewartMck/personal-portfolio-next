import Head from 'next/head'
import Image from 'next/image'
import Layout from '../components/layout'
import styles from '../styles/Home.module.scss'
import Projects from '../components/projects'
import TechStack from '../components/techstack'


import {InferGetStaticPropsType} from 'next';


type Projects = {
  title: String
  description: String
  image: String
  url: String
}

type Skills = {
  name: String
  image: String
}

export async function getStaticProps() {
  const resProjects = await fetch('http://localhost:3000/api/projects/all');
  const projects: Projects[] = await resProjects.json();

  const resSkills = await fetch('http://localhost:3000/api/skills/all');
  const skills: Skills[] = await resSkills.json();

  return {
    props: {
      projects,
      skills,
    }
  }
}

export default function Home({projects, skills}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
    <Head>
    <title>Stewart McKinlay</title>
    </Head>
   <Layout>
     <section className={styles.title}>
       <h1>Stewart McKinlay</h1>
       <h5>Full Stack Developer | Pilot</h5>
     </section>
     <Image
     className={styles.profile}
     alt="Profile Picture"
     src='/profile.png'
     layout="fixed"
     width={300}
     height={300}
     />
     <br/>     
     <Projects
     title={"Featured Projects"}
     data={projects}
     filtered={true}
     />
     <br/> 
     <TechStack
     data={skills}
     />
   </Layout>
   </>
  )
}
