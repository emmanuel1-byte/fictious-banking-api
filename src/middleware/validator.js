import { validator } from '../utils/validator.js'

export const schemaValidatorMiddleware = (schema) => {
    return async function (req, res, next) {
        try {
            const data = await validator(req.body, schema)
            if (!data.isValid) return res.status(400).json({ message: data.error })
            next()
        } catch (err) {
            console.error(err)
            return res.status(500).json({ message: err.message || "Schema Validation Failed" })
        }
    }
}
