import { PrismaClient } from "@prisma/client"

async function getProjectDeveloperAssignmentsByUserId(prismaClient: PrismaClient, userId: number) {
    const data = await prismaClient.projectDeveloper.findMany({
        where: { userId },
    })
    if (data === null) {
        return null
    }

    return data.map((d) => ({
        id: d.id,
        projectId: d.projectId,
        userId: d.userId
    }))
}

export default getProjectDeveloperAssignmentsByUserId