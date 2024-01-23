import repository from "../modules/auth/repository.js"

/**
 * Middleware to verify if the provided email is available for sign-up.
 *
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 * @param {import('express').NextFunction} next - Express next middleware function.
 * @returns {Promise<void>} A Promise that resolves if the email is available, otherwise rejects.
 * @throws {import('express').Error} If an internal server error occurs.
 */
export const verifySignUp = async function(req, res, next) {
    try {
        const { email } = req.body
        const doesExist = await repository.findByEmail(email)
        if (doesExist) return res.status(400).json({ message: 'Email already in use!' })
        next()
    } catch (err) {
        return res.status(500).json({ message: err.message } || "Internal Server Error")
    }
}
