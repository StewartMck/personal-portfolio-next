// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export default async (req, res) => {
  const data = await prisma.project.findMany()

  res.status(200).json({ name: data })
}
