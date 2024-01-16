import repository from "./repository.js"
import { signInSchema, signUpSchema } from "./schema.js"
import { generateAccesToken, generateRefreshToken } from '../../utils/generateToken.js'
import authEvent from "../../events/auth/emitter.js"

/**
 * Handles user registration.
 *
 * @async
 * @function register
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} A Promise representing the completion of the registration process.
 * 
 *  
 * @throws {Object} - Returns a 500 status with an error message if an error occurs.
 */
export const register = async function (req, res) {
    try {
        const validationResult = signUpSchema.validate(req.body)
        if (validationResult.error) return res.status(400).json({ message: validationResult.error.details[0]?.message })
        const newUser = await repository.createUser(validationResult.value)
        if (!newUser) return res.status(500).json({ message: 'registration failed' })
        // Emit an event to send a verification email
        authEvent.emit('sendVerificationEmail', validationResult.value)
        return res.status(201).json({ message: "Registration succesfull. Check your email!" })
    } catch (err) {
        console.error(err)
        return res.status(500).json({ message: err.message || "Internal Server Error" })
    }
}

/**
 * Logs in a user.
 * @param {import('express').Request} req - The request object.
 * @param {import('express').Response} res - The response object.
 * @returns {Promise<void>} A Promise representing the asynchronous operation.
 * 
 *  
 * @throws {Object} - Returns a 500 status with an error message if an error occurs.
 */
export const login = async function (req, res) {
    try {
        const validationResult = signInSchema.validate(req.body)
        console.log(validationResult.value)
        if (validationResult.error) return res.status(400).json({ message: validationResult.error.details[0]?.message })
        const user = await repository.findByEmail(validationResult.value.email)
        if (!user || !await bcrypt.compare(validationResult.value.password, user.password)) return res.status(400).json({ message: 'Incorrect username and password' })
        const newAccessToken = generateAccesToken(user.id, user.email)
        const newRefreshToken = await generateRefreshToken(user.id)
        res.clearCookie('refreshToken', newRefreshToken, { httpOnly: true, secure: true })
        res.cookie('refreshToken', newRefreshToken, { httpOnly: true, secure: true, maxAge: 2 * 24 * 60 * 60 * 1000 }) //2 days
        return res.status(200).json({ message: "Login successfull", data: { token: newAccessToken, user } })
    } catch (err) {
        return res.status(500).json({ message: err.message || "Internal Server Error" })
    }
}

export const emailVerification = async function (req, res) {
    try {
        const token = req.params.token
        const doeExist = await repository.findToken(token)
        if (!doeExist) return res.status(404).json({ message: 'Token does not exist' })
        const currentTime = new Date().getTime()
        const expirationTime = new Date(doeExist.expiration_time).getTime()
        if (currentTime < expirationTime) return res.status(400).json({ message: 'Expired token' })
        return res.status(200).json({ message: 'Verification succesfull' })
    } catch (err) {
        return res.status(500).json({ message: err.message || "Internal Server Error" })
    }
}

/**
 * Logs out a user.
 * @param {import('express').Request} req - The request object.
 * @param {import('express').Response} res - The response object.
 * @returns {Promise<void>} A Promise representing the asynchronous operation.
 * 
 * 
 * @throws {Object} - Returns a 500 status with an error message if an error occurs.
 */
export const logout = async function (req, res) {
    try {
        const accesToken = req.headers.authorization
        const refreshToken = req.cookies?.refreshToken
        await repository.updateToken(req.user.sub)
        await repository.createBlackList(accesToken)
        res.clearCookie('refreshToken', refreshToken, { httpOnly: true, secure: true })
        return res.status(204).json({})
    } catch (err) {
        return res.status(500).json({ message: err.message || "Internal Server Error" })
    }
}
// push changes from local branch emmanuel to remote branch development
// git push origin emmanuel:development
