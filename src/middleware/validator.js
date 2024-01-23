import { validator } from '../utils/validator.js'

/**
 * Middleware for validating request data against a JSON schema.
 *
 * @param {object} schema - JSON schema to validate against.
 * @returns {function} Express middleware function.
 * @throws {Error} Throws an error if the schema validation fails.
 */
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
