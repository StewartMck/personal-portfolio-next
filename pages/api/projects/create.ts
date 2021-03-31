import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {

    const {
        body: { title, description, image, url },
        method,
    } = req

    if (method === 'POST') {
        try {
            if (!title || !description || !image || !url) {
                throw new Error("Some required fields are missing")
            } else {

            const newProject = await prisma.project.create({
                data: {

                    title: title,
                    description: description,
                    image: image,
                    url: url,
                }
            });
            res.status(200).json({ project: newProject });
        }

        } catch (e) {
            res.status(500).json({ error: e.message });
        }

    } else {
        res.setHeader('Allow', ['POST'])
        res.status(405).end(`Method ${method} Not Allowed`)
    }

}