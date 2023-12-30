import { PrismaClient } from "@prisma/client"

async function insertProjectDeveloperAssignment(prismaClient: PrismaClient, projectId: number, userId: number) {
    const data = await prismaClient.projectDeveloper.create({
        data: {
            projectId,
            userId,
        }
    })
    if (data === null) {
        return null
    }

    return {
        id: data.id,
        projectId: data.projectId,
        userId: data.userId,
    }
}

export default insertProjectDeveloperAssignment