import UserSession from "../interfaces/UserSession"

declare module 'express' {
    export interface Request {
        userSession?: UserSession
    }
}