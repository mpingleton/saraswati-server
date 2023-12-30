import { PrismaClient } from "@prisma/client"
import express, { Request, Response } from "express"
import Joi from "joi"

import insertProject from "../database_abstractions/project/insertProject"
import insertProjectDeveloperAssignment from "../database_abstractions/project/insertProjectDeveloperAssignment";
import getProjectById from "../database_abstractions/project/getProjectById";
import getProjectsOwnedByUserById from "../database_abstractions/project/getProjectsOwnedByUserById"
import validateSession from "../middleware/validateSession"
import validateInput from "../middleware/validateInput"

function putProjectDeveloperAssignment(prismaClient: PrismaClient) {
    const schema = Joi.object({
        params: Joi.object({
            projectId: Joi.number().integer().positive().required(),
            userId: Joi.number().integer().positive().required(),
        }),
        query: Joi.object({}),
        body: Joi.object({})
    })

    const handler = async (req: Request, res: Response) => {
        const projectData = await getProjectById(prismaClient, Number.parseInt(req.params.projectId))
        if (projectData === null) {
            return res.status(404).send()
        } else if (req.userSession!.userId != projectData.ownerId) {
            return res.status(403).send()
        }

        await insertProjectDeveloperAssignment(prismaClient, Number.parseInt(req.params.projectId), Number.parseInt(req.params.userId))
        return res.status(201).send()
    }

    const router = express.Router()
    router.put("/:userId", validateSession, validateInput(schema), handler)
    return router
}

function getMyProjects(prismaClient: PrismaClient) {
    const schema = Joi.object({
        params: Joi.object({}),
        query: Joi.object({}),
        body: Joi.object({})
    })

    const handler = async (req: Request, res: Response) => {
        const projectData = await getProjectsOwnedByUserById(prismaClient, req.userSession!.userId)
        return res.status(200).send(projectData)
    }

    const router = express.Router()
    router.get('/', validateSession, validateInput(schema), handler)
    return router
}

function putProject(prismaClient: PrismaClient) {
    const schema = Joi.object({
        params: Joi.object({}),
        query: Joi.object({}),
        body: Joi.object({
            namePrototype: Joi.string().max(100).required(),
            nameProduct: Joi.string().max(100)
        })
    })

    const handler = async (req: Request, res: Response) => {
        await insertProject(prismaClient, req.userSession!.userId, req.body.namePrototype, req.body.nameProduct)
        return res.status(201).send()
    }

    const router = express.Router()
    router.put('/', validateSession, validateInput(schema), handler)
    return router
}

function useProjectRoutes(prismaClient: PrismaClient) {
    const router = express.Router()

    router.use("/id/:projectId/developers", putProjectDeveloperAssignment(prismaClient))
    router.use("/", getMyProjects(prismaClient))
    router.use("/", putProject(prismaClient))

    return router
}

export default useProjectRoutes