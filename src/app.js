import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { config } from './utils/config.js'
import { dbConnection } from './utils/database.js'
import auth from './modules/auth/route.js'
import account from './modules/account/route.js'
import transaction from './modules/transaction/route.js'
import swaggerUi from 'swagger-ui-express'
import { swaggerSpec } from '../doc/swagger.js'
import helmet from 'helmet'

dbConnection(config.dbUrl)

const app = express()
app.use(express.json())
app.use(cookieParser())
const options = { 
    origin: '*',
    methods:['POST','GET'], 
    allowheaders:['Content-Type', 'Authorization']
}
app.use(cors(options))
app.use(helmet())
app.use('/api', auth, account, transaction)

app.get('/', (req, res)=>{
    res.status(200).json({ message: 'Api is running..'})
})

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use('*', (req, res)=>{
    res.status(404).json({ message: 'Endpoint does not exist'})
})


export default app
