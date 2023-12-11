if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const initApiRouters = require('./routers');

async function init() {
    var mayContinue = true;
    if (process.env.HTTP_PORT === null || process.env.HTTP_PORT === undefined) {
        mayContinue = false;
        console.log("Fatal Error: HTTP_PORT environment variable is not initialized.");
    }
    
    if (process.env.DATABASE_URL === null || process.env.DATABASE_URL === undefined) {
        mayContinue = false;
        console.log("Fatal Error: DATABASE_URL environment variable is not initialized.");
    }

    if (!mayContinue) {
        throw "Missing environment variables; cannot continue.";
    }

    const port = process.env.HTTP_PORT;
    app.use(bodyParser.json());
    app.use(cors());
    app.use('/api', initApiRouters(prisma));
    app.listen(port);
}

init()
    .then(() => console.log("Saraswati server started."))
    .catch((err) => console.log("Execution ended because of an error: " + err));