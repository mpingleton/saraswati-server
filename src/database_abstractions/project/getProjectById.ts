import { PrismaClient } from "@prisma/client"

async function getProjectById(prismaClient: PrismaClient, id: number) {
    const data = await prismaClient.project.findUnique({
        where: { id }
    })
    if (data === null) {
        return null
    }

    return {
        id: data.id,
        ownerId: data.ownerId,
        namePrototype: data.namePrototype,
        nameProduct: data.nameProduct
    }
}

export default getProjectById