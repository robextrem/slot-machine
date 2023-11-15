export default class GameSocket{
    // private socket: WebSocket

    constructor(){
        /* this.socket = new WebSocket('ws://localhost:3000')

        this.socket.addEventListener('open',() => {
            console.log('Connected')
        })

        this.socket.addEventListener('message',(event) => {
            console.log('Message from server:', event.data)
        })*/
    }

    startPlay = ():void => {
        // this.socket.send('New spin detected '+ Date.now())
    }

}