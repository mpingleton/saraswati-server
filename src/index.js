if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


async function init() {
    var mayContinue = true;
    if (process.env.DATABASE_URL === null || process.env.DATABASE_URL === undefined) {
        mayContinue = false;
        console.log("Fatal Error: DATABASE_URL environment variable is not initialized.");
    }

    if (!mayContinue) {
        throw "Missing environment variables; cannot continue.";
    }


}

init()
    .then(() => console.log("Saraswati server started."))
    .catch((err) => console.log("Execution ended because of an error: " + err));