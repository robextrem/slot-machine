/* import 'dotenv/config' */
import express from 'express'
import { createServer } from 'http'
import { WebSocket, WebSocketServer } from 'ws'

// const port = process.env.APP_PORT
const port = 3000
const app = express()
const server = createServer(app);
const wss = new WebSocketServer({server:server})

const initalBalance = {
    balance: 1000
}

wss.on('connection',(ws:WebSocket)=>{
    console.log("New client connected")
    ws.on('message', (message:string)=>{
        console.log("Received message: %s", message)
        wss.clients.forEach((client)=>{
            if(client !== ws && client.readyState === WebSocket.OPEN){
                client.send(message)
            }
        })
    })
    ws.send(JSON.stringify(initalBalance))
})
 
server.listen(port, () => {
    console.log(`Corriendo mi servidor en http://localhost:${port} `) 
 });

