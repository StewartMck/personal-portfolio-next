import prisma from '../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {

    const {
        body: { name, image },
        method,
    } = req

    if (method === 'POST') {
        try {
            if (!name || !image) {
                throw new Error("Some required fields are missing")
            } else {

            const newSkill = await prisma.skills.create({
                data: {

                    name: name,
                    image: image,
                }
            });
            res.status(200).json({ skill: newSkill });
        }

        } catch (e) {
            res.status(500).json({ error: e.message });
        }

    } else {
        res.setHeader('Allow', ['POST'])
        res.status(405).end(`Method ${method} Not Allowed`)
    }

}
