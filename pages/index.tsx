import Head from 'next/head'
import Image from 'next/image'
import Layout from '../components/layout'
import styles from '../styles/Home.module.scss'
import Projects from '../components/projects'

export default function Home() {
  return (
    <>
    <Head>

    </Head>
   <Layout>
     <section className={styles.title}>
       <h1>Stewart McKinlay</h1>
       <h5>Full Stack Developer | Pilot</h5>
     </section>
     <Image
     alt="Profile Picture"
     src='/profile.png'
     layout="fixed"
     width={300}
     height={300}
     />     
     <Projects/>
   </Layout>
   </>
  )
}
