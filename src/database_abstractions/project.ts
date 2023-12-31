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
        ownerId: data.ownerId,
        namePrototype: data.namePrototype,
        nameProduct: data.nameProduct
    }
}

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

export default {
    getProjectById,
    getProjectsOwnedByUserById,
    insertProject,
    developers: {
        getProjectDeveloperAssignmentsByUserId,
        getProjectDeveloperAssignmentsByProjectId,
        insertProjectDeveloperAssignment,
    }
}