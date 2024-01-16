import express from 'express'
import { auth, emailVerification, logout } from './controller.js'
import { schemaValidatorMiddleware } from '../../middleware/validator.js'
import { signInSchema, signUpSchema } from './schema.js'
import { verify } from '../../middleware/verifySignUp.js'

const authModule = express.Router()

authModule.post('/register', schemaValidatorMiddleware(signUpSchema), verify.signUp, auth.register)

authModule.post('/login', schemaValidatorMiddleware(signInSchema), auth.login)

authModule.post('/logout', logout)

authModule.get('/verify/:token', emailVerification)

export default authModule