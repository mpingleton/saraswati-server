import { PrismaClient } from "@prisma/client"
import express from "express"

function initApiRouters(prismaClient: PrismaClient) {
    const router = express.Router()

    

    return router
};

export default initApiRouters