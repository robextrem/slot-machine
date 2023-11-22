import { type WebSocket } from 'ws'
import { generateBalance } from '../logic/Player.ts'
import messageHandler from './MessageHandler.ts'

const setGameListener = (ws: WebSocket): void => {
  console.log('New client connected')

  const initalBalance = JSON.stringify(generateBalance())
  ws.send(initalBalance)

  ws.on('message', (data: any, isBinary) => {
    const message = isBinary ? data : data.toString()
    messageHandler(message, ws)
  })
}

export default setGameListener
