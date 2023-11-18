import type SlotMachine from '../ui/slot-machine/SlotMachine'

export default class GameSocket{
    private socket: WebSocket

    constructor(slotMachine: SlotMachine){
        this.socket = new WebSocket(import.meta.env.VITE_APP_BACKEND_URL)

        this.socket.addEventListener('open',() => {
            console.log('Connected')
        })

        this.socket.addEventListener('message',(event) => {
            console.log('Message from server:', event.data)
            const json = JSON.parse(event.data)
            switch(json.type){
                case 'balance':{
                    slotMachine.getControlPanel().getPanelData().getBalance().setValue(json.data.balance, true)
                    break
                }
                case 'symbols':{
                    slotMachine.getReelGroup().setSymbols(json.data.symbols)
                    slotMachine.startSpin()
                }
            }
        })

        this.socket.addEventListener('error', (event) => {
            console.log('WebSocket error: ', event)
        })
    }

    requestSymbols = ():void => {
        this.socket.send('symbols')
    }

}