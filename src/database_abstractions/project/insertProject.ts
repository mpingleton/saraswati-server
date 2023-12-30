import { PrismaClient } from "@prisma/client"

async function insertProject(prismaClient: PrismaClient, ownerId: number, namePrototype: string, nameProduct: string) {
    const data = await prismaClient.project.create({
        data: {
            ownerId,
            namePrototype,
            nameProduct
        },
    })
    if (data === null) {
        return null
    }

    return {
        id: data.id,
        namePrototype: data.namePrototype,
        nameProduct: data.nameProduct
    }
}

export default insertProject