import repository from "./repository.js"
import { signInSchema, signUpSchema } from "./schema.js"
import { generateAccesToken, generateRefreshToken } from '../../utils/generateToken.js'
import authEvent from "../../events/auth/emitter.js"
import bcrypt from 'bcrypt'
/**
 * Handles user registration.
 * 
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} A Promise representing the completion of the registration process.
 * 
 *  
 * @throws {Object} - Returns a 500 status with an error message if an error occurs.
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     Registration:
 *       type: object
 *       properties:
 *         full_name:
 *           type: string
 *         email:
 *           type: string
 *         phone_number:
 *           type: string
 *         password:
 *           type: string
 *       required:
 *         - full_name
 *         - email
 *         - phone_number
 *         - password

 * /api/register:
 *   post:
 *     summary: Register a new user
 *     description: Endpoint to register a new user.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Registration'
 *     responses:
 *       201:
 *         description: Registration successful. Check your email!
 *         content:
 *           application/json:
 *             example:
 *               message: "Registration successful. Check your email!"
 *       400:
 *         description: Bad Request. Invalid input.
 *         content:
 *           application/json:
 *             example:
 *               message: "Email already in use!."
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             example:
 *               message: "Internal Server Error"
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
 * 
 * @param {import('express').Request} req - The request object.
 * @param {import('express').Response} res - The response object.
 * @returns {Promise<void>} A Promise representing the asynchronous operation.
 * 
 *  
 * @throws {Object} - Returns a 500 status with an error message if an error occurs.
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     Login:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *         password:
 *           type: string
 *       required:
 *         - email
 *         - password
 */

/**
 * @openapi
 * /api/login:
 *   post:
 *     summary: User login
 *     description: Endpoint to authenticate a user.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             example:
 *               message: "Login successful"
 *               data:
 *                 token: "your_access_token"
 *                 user: {
 *                     "_id":"65af0f89aebcb8f98065de3a",
 *                      "full_name":"snr man",
 *                      "email": "hilayemmanuel841@gmail.com",
 *                      "phone_number": 70132592345,
 *                      "password": "$2b$10$oJuHv0cMrRdXikOcIk7wM.7/B0K55LMMBhZttUysdG8NxXsa2O6s2",
 *                      "createdAt": "2024-01-23T00:59:53.165Z",
 *                      "updatedAt": "2024-01-23T00:59:53.165Z",
 *                      "__v": 0
 *                 }
 *       400:
 *         description: Bad Request.
 *         content:
 *           application/json:
 *             example:
 *               message: "Incorrect username and password"
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             example:
 *               message: "Internal Server Error"
 */
export const login = async function (req, res) {
    try {
        const validationResult = signInSchema.validate(req.body)
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

/**
 * verify email token.
 * 
 * @param {import('express').Request} req - The request object.
 * @param {import('express').Response} res - The response object.
 * @returns {Promise<void>} A Promise representing the asynchronous operation.
 * 
 *  
 * @throws {Object} - Returns a 500 status with an error message if an error occurs.
 */

/**
 * @openapi
 * /verify/{token}:
 *   get:
 *     summary: Verify email using a token
*     tags:
 *       - Authentication
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         description: The verification token received via email
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful verification
 *       400:
 *         description: Expired token
 *       404:
 *         description: Token does not exist
 *       500:
 *         description: Internal Server Error
 */

export const emailVerification = async function (req, res) {
    try {
        const token = req.params.token
        const doesExist = await repository.findToken(token)
        if (!doesExist) return res.status(404).json({ message: 'Token does not exist' })
        const currentTime = new Date().getTime()
        const expirationTime = new Date(doesExist.expiration_time).getTime()
        if (currentTime < expirationTime) return res.status(400).json({ message: 'Expired token' })
        return res.status(200).json({ message: 'Verification succesfull' })
    } catch (err) {
        return res.status(500).json({ message: err.message || "Internal Server Error" })
    }
}

/**
 * verify email token.
 * 
 * @param {import('express').Request} req - The request object.
 * @param {import('express').Response} res - The response object.
 * @returns {Promise<void>} A Promise representing the asynchronous operation.
 * 
 *  
 * @throws {Object} - Returns a 500 status with an error message if an error occurs.
 */

/**
 * @openapi
 * /api/refreshToken:
 *   post:
 *     summary: Refresh Access Token
 *     description: Refreshes the access token using a valid refresh token.
 *     tags:
 *       - Token
 *     parameters:
 *       - in: cookie
 *         name: refreshToken
 *         required: true
 *         schema:
 *           type: string
 *         description: The refresh token stored in a cookie.
 *     responses:
 *       '200':
 *         description: Successfully refreshed access token.
 *       '400':
 *         description: Bad request, refresh token does not exist.
 *       '500':
 *         description: Internal Server Error.
 */
export const refreshAccessToken = async function (req, res) {
    try {
        const refreshToken =  req.cookies?.refreshToken
        console.log(refreshToken)
        await repository.findRefreshToken(refreshToken)
        const newRefreshToken = await generateRefreshToken(req.id)
        if (!newRefreshToken) return res.status(400).json({ message: 'refresh Token does not exist' })
        res.cookie('refreshToken', newRefreshToken, { httpOnly: true, secure: true, maxAge: 2 * 24 * 60 * 60 * 1000 }) //2 days
        return res.status(201).json({ message: 'Access token refreshed successfully'})
    } catch (err) {
        return res.status(500).json({ message: err.message || "Interanl Server Error" })
    }
}

/**
 * Logs out a user.
 * 
 * @param {import('express').Request} req - The request object.
 * @param {import('express').Response} res - The response object.
 * @returns {Promise<void>} A Promise representing the asynchronous operation.
 * 
 * 
 * @throws {Object} - Returns a 500 status with an error message if an error occurs.
 */

/**
 * @openapi
 * /api/logout:
 *   post:
 *     summary: Logout a user
 *     description: Endpoint to logout a user.
 *     tags:
 *       - Authentication
 *     responses:
 *       204:
 *         description: Logout successful.
 *       400:
 *         description: Bad Request. Invalid input.
 *         content:
 *           application/json:
 *             example:
 *               message: "Invalid input. Please check your request."
 *       401:
 *         description: Unauthorized. User not authenticated.
 *         content:
 *           application/json:
 *             example:
 *               message: "Unauthorized. Please log in."
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             example:
 *               message: "Internal Server Error"
 */
export const logout = async function (req, res) {
    try {
        const accesToken = req.headers.authorization
        const refreshToken = req.cookies?.refreshToken
        if (!accesToken || refreshToken) return res.status(401).json({ message: 'Unauthorized. Please log in.' })
        await repository.updateToken(req.user.sub)
        await repository.createBlackList(accesToken)
        res.clearCookie('refreshToken', refreshToken, { httpOnly: true, secure: true })
        return res.status(204).json({})
    } catch (err) {
        return res.status(500).json({ message: err.message || "Internal Server Error" })
    }
}

