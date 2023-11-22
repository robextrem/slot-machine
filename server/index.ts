import dotenv from 'dotenv'
import express from 'express'
import { createServer } from 'http'
import { WebSocketServer } from 'ws'
import setGameListener from './ws/SetGameListener.ts'

const result = dotenv.config({'path':'.env', override: true})

if (result.error) {
    console.log(result.error)
}

const port = process.env.VITE_APP_BACKEND_PORT
const app = express()
const server = createServer(app)
const wss = new WebSocketServer({server})

wss.on('connection', setGameListener)

server.listen(port, () => {
    console.log(`Corriendo servidor en http://localhost:${port} 🎰`) 
})

