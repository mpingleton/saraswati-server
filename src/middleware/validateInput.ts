import Joi, { ObjectSchema } from "joi"
import { Request, Response, NextFunction } from "express"

function validateInput(schema: ObjectSchema) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const result = schema.validate({
            params: req.params,
            body: req.body,
            query: req.query,
        })

        if (result.error) {
            res.status(400).send(result.error)
        } else {
            return next()
        }
    }
}

export default validateInput