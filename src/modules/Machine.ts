import * as PIXI from 'pixi.js'
import Reel from './Reel'
import ControlPanel from './ControlPanel'

export default class Machine extends PIXI.Container {
    private numberOfReels: number
    private reels: Reel[]
    private panel: ControlPanel
    private container: PIXI.Container

    constructor (width: number, height: number) {
        super()
        this.numberOfReels = import.meta.env.VITE_APP_NUM_REELS
        this.reels = []

        this.container = new PIXI.Container()

        this.addChild(this.container)

        for (let i = 0; i < this.numberOfReels; i++) {
            const reel = new Reel(Math.floor(width / 5), height, i)
            this.container.addChild(reel)
            this.reels.push(reel)
        }

        this.panel = new ControlPanel(this.width, this.height)
        this.container.addChild(this.panel)
    }
}
