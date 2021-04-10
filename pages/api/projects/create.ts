import prisma from '../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';

export default withApiAuthRequired(async (req: NextApiRequest, res: NextApiResponse) => {

    const {
        body: { title, description, image, url, featured },
        method,
    } = req

    if (method === 'POST') {
        console.log(title, description, image, url, featured)
        try {
            if (!title || !description || !image || !url ) {
                console.log('missing values error triggered')
                throw new Error("Some required fields are missing")
            } else {

            const newProject = await prisma.project.create({
                data: {

                    title: title,
                    description: description,
                    image: image,
                    url: url,
                    featured: featured,
                }
            });
    
            res.status(200).json({ project: newProject, message: "success" });
        
        }

        } catch (e) {
            console.log(e.message)
            res.status(500).json({ error: e.message });
        }

    } else {
        res.setHeader('Allow', ['POST'])
        res.status(405).end(`Method ${method} Not Allowed`)
    }

});
