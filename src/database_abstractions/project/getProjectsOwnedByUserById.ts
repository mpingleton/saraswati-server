import { PrismaClient } from "@prisma/client"

async function getProjectsOwnedByUserById(prismaClient: PrismaClient, ownerId: number) {
    const data = await prismaClient.project.findMany({
        where: {
            ownerId,
        },
    })
    if (data === null) {
        return null
    }

    return data.map((d) => ({
        id: d.id,
        ownerId: d.ownerId,
        namePrototype: d.namePrototype,
        nameProduct: d.nameProduct
    }))
}

export default getProjectsOwnedByUserById