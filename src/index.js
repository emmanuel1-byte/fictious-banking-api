import http from 'http'
import app from './app.js'
import { config } from './config/config.js'


const server = http.createServer(app)
const port = config.port || 4000

server.listen(port, ()=>{
    console.clear()
    console.log(`Backend server is listening on port ${port}`)
})
