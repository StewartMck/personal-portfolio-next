import Head from 'next/head'
import Layout from '../components/layout'
import AdminProjects from '../components/admin_projects'
import AdminSkills from '../components/admin_skills'
import { withPageAuthRequired } from '@auth0/nextjs-auth0'

export default withPageAuthRequired(function Admin() {
    return (
        <>
            <Head>
                <title>Admin</title>
            </Head>
            <Layout>
                <AdminProjects />
                <AdminSkills />
                <br />
            </Layout>
        </>
    )
})
