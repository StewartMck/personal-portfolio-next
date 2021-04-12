import prisma from '../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export async function getData() {
  const data = await prisma.project.findMany();
  return data;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  if (method === "GET") {
    try {
      const allProjects = await prisma.project.findMany();
      res.status(200).json({ projects: allProjects });
    } catch (e) {
      res.status(500).json({ error: e });
    }
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${method} Not Allowed`)
  }
}
