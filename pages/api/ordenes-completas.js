import { PrismaClient } from "@prisma/client"

export default async function handler(req, res) {
    const prisma = new PrismaClient()

    // Obtener ordenes pendientes
    const ordenesCompletas = await prisma.orden.findMany({
        where: {
            estado: true
        }
    })
    res.status(200).json(ordenesCompletas)
}