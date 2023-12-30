import { Request, Response, NextFunction } from "express"
import UserSession from "../interfaces/UserSession"

async function validateSession(req: Request, res: Response, next: NextFunction) {
    // TODO: Upon implementing the CASM service, add code here to validate session tokens with the CASM server.
    console.log("Hello from the validateSession middleware function!  This function still needs to be worked on.")

    // This is a user data object which gets attached to the request for future middleware and handlers.
    req.userSession = {
        userId: 1,
        userName: "john.doe",
        displayName: "Mr. John Doe",
        token: "324235uiweoadfjhikolsatu904325"
    }

    return next()
}

export default validateSession