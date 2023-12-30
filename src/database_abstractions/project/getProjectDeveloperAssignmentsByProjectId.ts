import { PrismaClient } from "@prisma/client"

async function getProjectDeveloperAssignmentsByProjectId(prismaClient: PrismaClient, projectId: number) {
    const data = await prismaClient.projectDeveloper.findMany({
        where: { projectId },
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

export default getProjectDeveloperAssignmentsByProjectId