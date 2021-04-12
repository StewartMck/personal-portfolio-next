import prisma from '../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';

export default withApiAuthRequired(async (req: NextApiRequest, res: NextApiResponse) => {
    const {
        query: { id },
        body: { title, description, image, url, featured },
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
                        featured: featured,
                        updatedAt: new Date(Date.now())
                    }
                })
                res.status(200).json({ project: updateProject, message: "success" })
                break;
            case 'DELETE':
                const deleteProject = await prisma.project.delete({
                    where: {
                        id: Number(id)
                    }
                })
                res.status(200).json({ project: deleteProject, message: "success" })
                break;
            default:
                res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
                res.status(405).end(`Method ${method} Not Allowed`)
        }

    } catch (e) {
        res.status(500).json({ error: e.meta.cause })
    }
  });