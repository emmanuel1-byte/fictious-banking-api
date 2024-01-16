import repository from "../modules/auth/repository.js"

/**
 * Middleware to check if the provided token is blacklisted.
 *
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 * @param {import('express').NextFunction} next - Express next middleware function.
 * @returns {Promise<void>} - Promise representing the asynchronous operation.
 * @throws {import('http-errors').HttpError} - Throws a 403 Forbidden error if the token is blacklisted.
 */
export const checkBlackList = async function (req, res, next){
    try{
        const token = req.headers?.authorization
        const doesExist = await repository.findBlackListedToken(token)
        if(doesExist) return res.status(403).json({ message: 'Invalid token'})
        next()
    }catch(err){
        return res.status(500).json({ message: err.message || 'Internal Server Error'})
    }
}