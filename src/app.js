import express from 'express'
import { dbConnection } from './utils/database.js'
import { config } from './utils/config.js'
import auth from './modules/auth/route.js'
import account from './modules/account/route.js'
import transaction from './modules/transaction/route.js'

dbConnection(config.dbUrl)

const app = express()
app.use(express.json())

app.use('/api', auth, account, transaction)

app.get('/', (req, res)=>{
    res.status(200).json({ message: 'Api is running..'})
})

app.use('*', (req, res)=>{
    res.status(404).json({ message: 'Endpoint does not exist'})
})


export default app
