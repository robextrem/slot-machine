import * as PIXI from 'pixi.js'
import Reel from './Reel'

export default class ReelGroup extends PIXI.Container {
    private numberOfReels: number
    private reels: Reel[]
    private container: PIXI.Container

    constructor (width: number, height: number) {
        super()
        this.numberOfReels = import.meta.env.VITE_APP_NUM_REELS
        this.reels = []
        const blockSize = parseInt(import.meta.env.VITE_APP_HEIGHT) / (parseInt(import.meta.env.VITE_APP_NUM_SLOTS) + 1)

        this.container = new PIXI.Container()

        this.addChild(this.container)

        for (let i = 0; i < this.numberOfReels; i++) {
            const reel = new Reel(Math.floor(width / 5), height, i)
            reel.position.set(0, blockSize/3 )
            this.container.addChild(reel)
            this.reels.push(reel)
        }
    }

    getReels = (): Reel[] => {
        return this.reels
    }
}
