import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'
import repository from "./repository.js"
import { signInSchema, signUpSchema } from "./schema.js"
import { generateAccesToken, generateRefreshToken } from '../../utils/generateToken.js'
import { sendVerificationEmail } from '../../utils/mailer.js'

/**
 * Registers a new user.
 * @param {import('express').Request} req - The request object.
 * @param {import('express').Response} res - The response object.
 * @returns {Promise<void>} A Promise representing the asynchronous operation.
 */
async function register(req, res) {
    try {
        const validationResult = signUpSchema.validate(req.body)
        if (validationResult.error) return res.status(400).json({ message: validationResult.error.details[0]?.message })
        const token = uuidv4()
        await repository.create(req.body)
        await repository.createToken(validationResult.value.email, token)
        await sendVerificationEmail(validationResult.value.email, token)
        return res.status(201).json({ message: "Registration succesfull"})
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
 */
async function login(req, res) {
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

export async function emailVerification(req, res) {
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
 */
export async function logout(req, res) {
    try {
        const accesToken = req.headers.authorization
        const refreshToken = req.cookies?.refreshToken
        await repository.UpdateUser(req.id)
        await repository.createBlackList(accesToken)
        res.clearCookie('refreshToken', refreshToken, { httpOnly: true, secure: true })
        return res.status(204).json({})
    } catch (err) {
       return res.status(500).json({ message: err.message || "Internal Server Error" })
    }
}
// push changes from local branch emmanuel to remote branch development
 // git push origin emmanuel:development
export const auth = { register, login, logout }
