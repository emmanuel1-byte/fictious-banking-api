import express from 'express'
import { listTransaction } from './controller.js'
import { checkBlackList } from '../../middleware/blackList.js'
import { validateAccessToken } from '../../middleware/validateJwt.js'
const transaction = express.Router()

/**
 * Handles transaction request.
 *
 * @function
 * @name transaction
 * @memberof account.get('/transaction')
 */
transaction.get('/transactions', checkBlackList, validateAccessToken, listTransaction)

export default transaction