import { type WebSocket } from 'ws'
import { generatePaylines } from '../logic/Payline.ts'

const messageHandler = (message:string, ws:WebSocket): void=>{
    const response = generatePaylines(message)
    ws.send(JSON.stringify(response))
}

export default messageHandler