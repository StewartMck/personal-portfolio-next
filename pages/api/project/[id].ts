import prisma from '../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const {
        query: { id },
        body: { title, description, image, url },
        method,
    } = req

    try {
        switch (method) {
            case 'GET':
                const getProject = await prisma.project.findUnique({
                    where: { id: Number(id) }
                });
                res.status(200).json({ project: getProject })
                break;
            case 'PUT':
                const updateProject = await prisma.project.update({
                    where: {
                        id: Number(id)
                    },
                    data: {
                        title: title,
                        description: description,
                        image: image,
                        url: url,
                        updatedAt: new Date(Date.now())
                    }
                })
                res.status(200).json({ project: updateProject })
                break;
            case 'DELETE':
                const deleteProject = await prisma.project.delete({
                    where: {
                        id: Number(id)
                    }
                })
                res.status(200).json({ project: deleteProject })
                break;
            default:
                res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
                res.status(405).end(`Method ${method} Not Allowed`)
        }

    } catch (e) {
        res.status(500).json({ error: e.meta.cause })
    } finally {
        await prisma.$disconnect()
    }
    
}