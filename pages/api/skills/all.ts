import prisma from '../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export async function getSkills() {
  const data = await prisma.skill.findMany();
  return JSON.stringify(data);
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  if (method === "GET") {
    try {
      const allSkills = await prisma.skill.findMany();
      res.status(200).json({ skills: allSkills });
    } catch (e) {
      res.status(500).json({ error: e });
    }
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${method} Not Allowed`)
  }
}
