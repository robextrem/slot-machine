import type SlotMachine from '../ui/slot-machine/SlotMachine'

export default class GameSocket {
  private socket: WebSocket
  private slotMachine: SlotMachine

  constructor(slotMachine: SlotMachine) {
    this.socket = new WebSocket(import.meta.env.VITE_APP_BACKEND_URL)
    this.slotMachine = slotMachine
  }

  init = (): void => {
    this.socket.addEventListener('open', () => {
      console.log('Connected')
    })

    this.socket.addEventListener('message', (event) => {
      // console.log('Message from server:', event.data)
      const json = JSON.parse(event.data)
      switch (json.type) {
        case 'balance': {
          this.slotMachine
            .getControlPanel()
            .getPanelData()
            .getBalance()
            .setValue(json.data.balance, true)
          break
        }
        case 'symbols': {
          this.slotMachine.getReelGroup().setSymbols(json.data.symbols)
          this.slotMachine.startSpin()
        }
      }
    })

    this.socket.addEventListener('error', (event) => {
      console.log('WebSocket error: ', event)
    })
  }

  requestSymbols = (request: string = 'symbols'): void => {
    this.socket.send(request)
  }

  isClosed = (): boolean => {
    return this.socket.readyState === 3
  }
}
