import prisma from '../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';

export default withApiAuthRequired(async (req: NextApiRequest, res: NextApiResponse) => {

    const {
        query: { id },
        body: { name, image },
        method,
    } = req

    try {
        switch (method) {
            case 'GET':
                const getSkill = await prisma.skills.findUnique({
                    where: { id: Number(id) }
                });
                res.status(200).json({ skill: getSkill })
                break;
            case 'PUT':
                const updateSkill = await prisma.skills.update({
                    where: {
                        id: Number(id)
                    },
                    data: {
                        name: name,
                        image: image,
                        // updatedAt: new Date(Date.now())
                    }
                })
                res.status(200).json({ skill: updateSkill, message: "success" })
                break;
            case 'DELETE':
                const deleteSkill = await prisma.skills.delete({
                    where: {
                        id: Number(id)
                    }
                })
                res.status(200).json({ project: deleteSkill, message: "success" })
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
    
});