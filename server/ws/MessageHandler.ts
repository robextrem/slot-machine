import { type WebSocket } from 'ws'
import { generatePaylines } from '../logic/Payline.ts'

const messageHandler = (message:string, ws:WebSocket): void=>{
    let response
    
    switch(message){
        case 'symbols': {
            response = generatePaylines()
            break
        }
    }

    ws.send(JSON.stringify(response))
}

export default messageHandler