import * as PIXI from 'pixi.js'
import { Slot } from './Slot'

export default class Reel extends PIXI.Container {
    private index: number
    private numberOfSlots: number
    private slots: Slot[]
    private container: PIXI.Container

    constructor (width: number, height: number, index: number) {
        super()
        this.index = index
        this.numberOfSlots = 5
        this.slots = []

        const rectMask: PIXI.Graphics = new PIXI.Graphics()
        rectMask.beginFill(0)

        rectMask.drawRect(width * this.index, 0, width, height * this.numberOfSlots)
        rectMask.endFill()
        this.addChild(rectMask)

        this.container = new PIXI.Container()
        this.container.mask = rectMask

        this.addChild(this.container)

        for (let i = 0; i <= this.numberOfSlots; i++) {
            const slot = new Slot(width, height)
            slot.position.set(width * this.index, height * i - height)
            this.container.addChild(slot)
            this.slots.push(slot)
        }
        console.log(this.slots)
    }
}
