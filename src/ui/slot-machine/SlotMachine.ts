import * as PIXI from 'pixi.js'
import ReelGroup from './ReelGroup'
import ControlPanel from '../panel/ControlPanel'
import Earnings from './Earnings'
import GameSocket from '../../ws/GameSocket'

export default class SlotMachine extends PIXI.Container {
    private reelGroup: ReelGroup
    private panel: ControlPanel
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

        this.gameSocket = new GameSocket(this)
    }

    startPlay = (): void => {
        if(import.meta.env.VITE_APP_USE_WEB_SOCKET === 'on'){
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

    getControlPanel = (): ControlPanel => {
        return this.panel
    }

    getReelGroup = (): ReelGroup => {
        return this.reelGroup
    }
}
