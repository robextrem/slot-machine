/* import 'dotenv/config' */
import express from 'express'
import { createServer } from 'http'
import { WebSocketServer } from 'ws'
import setGameListener from './ws/SetGameListener.ts'

// const port = process.env.APP_PORT
const port = 3000
const app = express()
const server = createServer(app);
const wss = new WebSocketServer({server})

wss.on('connection', setGameListener)

server.listen(port, () => {
    console.log(`Corriendo mi servidor en http://localhost:${port} `) 
});

