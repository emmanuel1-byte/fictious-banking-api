import express from 'express'
import { accountBalance, deposit, transfer, withdraw } from './controller.js'
import { validateAccessToken } from '../../middleware/validateJwt.js'
import { checkBlackList } from '../../middleware/blackList.js'
import { schemaValidatorMiddleware } from '../../middleware/validator.js'
import { depositSchema, transferSchema, withdrawalSchema } from './schema.js'
const account = express.Router()

/**
 * Handles transfer request.
 *
 * @function
 * @name transfer
 * @memberof account.post('/transfer')
 */
account.post('/transfer', schemaValidatorMiddleware(transferSchema) , checkBlackList, validateAccessToken, transfer)

/**
 * Handles deposit request.
 *
 * @function
 * @name deposit
 * @memberof account.post('/deposit')
 */
account.post('/deposit',schemaValidatorMiddleware(depositSchema) ,checkBlackList,  validateAccessToken, deposit)

/**
 * Handles withdrawal request.
 *
 * @function
 * @name withdraw
 * @memberof account.post('/withdraw')
 */
account.post('/withdraw',schemaValidatorMiddleware(withdrawalSchema) , checkBlackList, validateAccessToken, withdraw)

/**
 * Retrieves account balance.
 *
 * @function
 * @name accountBalance
 * @memberof account.get('/balance')
 */
account.get('/balance', checkBlackList,  validateAccessToken, accountBalance)

export default account