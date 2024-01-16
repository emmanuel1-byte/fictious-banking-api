import express from 'express'
import { emailVerification, login, logout, register } from './controller.js'
import { schemaValidatorMiddleware } from '../../middleware/validator.js'
import { signInSchema, signUpSchema } from './schema.js'
import { verifySignUp } from '../../middleware/verifySignUp.js'

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
 * @name transfer
 * @memberof account.post('/transfer')
 */
authModule.get('/verify/:token', emailVerification)

export default authModule