import { PrismaClient } from "@prisma/client"
import express from "express"

import useProjectRoutes from "./project";

function useApiRoutes(prismaClient: PrismaClient) {
    const router = express.Router()

    router.use("/projects", useProjectRoutes(prismaClient))

    return router
}

export default useApiRoutes