import { PrismaClient } from "@prisma/client"
import express, { Request, Response } from "express"
import Joi from "joi"

import insertProject from "../database_abstractions/project/insertProject"
import getProjectsOwnedByUserById from "../database_abstractions/project/getProjectsOwnedByUserById"
import validateSession from "../middleware/validateSession"
import validateInput from "../middleware/validateInput"

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

    router.use("/", getMyProjects(prismaClient))
    router.use("/", putProject(prismaClient))

    return router
}

export default useProjectRoutes