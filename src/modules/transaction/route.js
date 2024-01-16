import express from 'express'
import { listTransaction } from './controller.js'
import { checkBlackList } from '../../middleware/validateToken.js'
import { validateJwt } from '../../middleware/auth.jwt.js'
const transaction = express.Router()

transaction.get('/transactions', checkBlackList, validateJwt, listTransaction)

export default transaction