import Head from 'next/head';
import Layout from '../components/layout';
import Projects from '../components/projects';
import styles from '../styles/AllProjects.module.scss';

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

export default function AllProjects({projects}: InferGetStaticPropsType<typeof getStaticProps>) {
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