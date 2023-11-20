import * as PIXI from 'pixi.js'
import ReelGroup from './ReelGroup'
import ControlPanel from '../control-panel/ControlPanel'
import CheatPanel from '../layout/CheatPanel'
import Close from '../layout/Close'
import Earnings from './Earnings'
import FpsCounter from '../../game/FpsCounter'
import GameSocket from '../../ws/GameSocket'

export default class SlotMachine extends PIXI.Container {
    private reelGroup: ReelGroup
    private panel: ControlPanel
    private cheatPanel: CheatPanel
    private close: Close
    private earnings: Earnings
    private container: PIXI.Container
    private gameSocket: GameSocket

    constructor (width: number, height: number) {
        super()

        const img = PIXI.Sprite.from('assets/images/bg.png')
        img.width = import.meta.env.VITE_APP_WIDTH
        img.height = import.meta.env.VITE_APP_HEIGHT
        img.anchor.set(0.5)
        img.position.set(import.meta.env.VITE_APP_WIDTH / 2 , import.meta.env.VITE_APP_HEIGHT / 2)

        this.addChild(img)

        this.container = new PIXI.Container()
        this.addChild(this.container)

        this.reelGroup = new ReelGroup(width, height)
        this.container.addChild(this.reelGroup)

        this.earnings = new Earnings()
        this.container.addChild(this.earnings)

        this.panel = new ControlPanel(this)
        this.container.addChild(this.panel)

        this.cheatPanel = new CheatPanel(this)
        this.container.addChild(this.cheatPanel)


        this.close = new Close(this)
        this.container.addChild(this.close)

        this.gameSocket = new GameSocket(this)

        if(import.meta.env.VITE_APP_FPS === 'on'){
            this.addFPS()
        }

        if(import.meta.env.VITE_APP_USE_WEB_SOCKET === 'on' && !this.gameSocket.isClosed()){
            this.gameSocket.init()
        }

    }

    startPlay = (): void => {
        if(import.meta.env.VITE_APP_USE_WEB_SOCKET === 'on' && !this.gameSocket.isClosed()){
            this.gameSocket.requestSymbols()
        }else{
            this.startSpin()
        }
    }

    startSpin = (): void => {
        const duration = import.meta.env.VITE_APP_SPIN_DURATION
        const delay = import.meta.env.VITE_APP_SPIN_DELAY
        const reels = this.reelGroup.getReels()
        reels.forEach((reel, i) => {
            reel.spin(duration, delay, () => {
                if(i === import.meta.env.VITE_APP_NUM_REELS - 1){
                    this.panel.getButton().changeState('idle')
                }
            })
        })
    }

    addFPS = ():void => {
        const counter = new FpsCounter()
        this.addChild(counter)
    }

    getControlPanel = (): ControlPanel => {
        return this.panel
    }

    getReelGroup = (): ReelGroup => {
        return this.reelGroup
    }
}
