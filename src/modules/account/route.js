import express from 'express'
import { deposit, transfer, withdraw } from './controller.js'
import { validateJwt } from '../../middleware/auth.jwt.js'
import { checkBlackList } from '../../middleware/validateToken.js'
import { schemaValidatorMiddleware } from '../../middleware/validator.js'
import { depositSchema, transferSchema, withdrawalSchema } from './schema.js'
const account = express.Router()


account.post('/transfer', schemaValidatorMiddleware(transferSchema) ,checkBlackList, validateJwt, transfer)

account.post('/deposit',schemaValidatorMiddleware(depositSchema) ,checkBlackList, validateJwt, deposit)

account.post('/withdraw',schemaValidatorMiddleware(withdrawalSchema) ,checkBlackList, validateJwt, withdraw)

export default account