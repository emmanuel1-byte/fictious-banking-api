import express from 'express'
import { emailVerification, login, logout, refreshAccessToken, register } from './controller.js'
import { schemaValidatorMiddleware } from '../../middleware/validator.js'
import { signInSchema, signUpSchema } from './schema.js'
import { verifySignUp } from '../../middleware/verifySignUp.js'
import { validateRefreshToken } from '../../middleware/validateJwt.js'

const authModule = express.Router()

/**
 * Handles register request.
 *
 * @function
 * @name register
 * @memberof account.post('/register')
 */
authModule.post('/register', schemaValidatorMiddleware(signUpSchema), verifySignUp, register)

/**
 * Handles login request.
 *
 * @function
 * @name login
 * @memberof account.post('/login')
 */
authModule.post('/login', schemaValidatorMiddleware(signInSchema), login)

/**
 * Handles logout request.
 *
 * @function
 * @name logout
 * @memberof account.post('/logout')
 */
authModule.post('/logout', logout)

/**
 * Handles verify request.
 *
 * @function
 * @name emailVerification
 * @memberof authModule.get('/verify/:token')
 */
authModule.get('/verify/:token', emailVerification)

/**
 * Handles refreshToken request.
 *
 * @function
 * @name refreshAccessToken
 * @memberof authModule.post('/refreshToken')
 */
authModule.post('/refreshToken', validateRefreshToken,  refreshAccessToken)


export default authModule