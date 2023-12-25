import { PrismaClient } from "@prisma/client"
import express from "express"
import useApiRoutes from "./handlers/api"

const prisma = new PrismaClient()
const app = express()

async function init() {
    console.log("Initializing the Saraswati server...")

    if (process.env.DATABASE_URL === undefined) {
        throw "The environment variable DATABASE_URL is not defined."
    } else if (process.env.HTTP_PORT === undefined) {
        throw "The environment variable HTTP_PORT is not defined."
    }

    const httpPort: number = Number.parseInt(process.env.HTTP_PORT)
    app.use("/api", useApiRoutes(prisma))
    app.listen(httpPort, () => console.log(`Server is listening on port ${httpPort}.`))
}

init()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (err) => {
        console.error(err)
        await prisma.$disconnect()
        process.exit(1)
    });