import * as PIXI from 'pixi.js'
import Slot from './Slot'

export default class Reel extends PIXI.Container {
    private index: number
    private numberOfSlots: number
    private slots: Slot[]
    private container: PIXI.Container

    constructor (width: number, height: number, index: number) {
        super()
        this.index = index
        this.numberOfSlots = import.meta.env.VITE_APP_NUM_SLOTS
        this.slots = []

        const rectMask: PIXI.Graphics = new PIXI.Graphics()
        rectMask.beginFill('white')
        rectMask.lineStyle({ color: 0x111111, alpha: 0.87, width: 1 })
        rectMask.drawRect(width * this.index, 0, width, height)
        rectMask.endFill()
        this.addChild(rectMask)

        this.container = new PIXI.Container()
        // this.container.mask = rectMask

        this.addChild(this.container)

        for (let i = 0; i < this.numberOfSlots; i++) {
            const size = parseInt(import.meta.env.VITE_APP_SLOT_SIZE)
            const margin = (width - size) / 2

            const slot = new Slot(size, width, i)
            slot.position.set(width * this.index + margin, width * i + margin)
            this.container.addChild(slot)
            this.slots.push(slot)
        }
        console.log(this.slots)
    }
}
