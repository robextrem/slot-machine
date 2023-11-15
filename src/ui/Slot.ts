import * as PIXI from 'pixi.js'
import SlotSymbol from './SlotSymbol'

export default class Slot extends PIXI.Container {
    private symbol: SlotSymbol
    private container: PIXI.Container

    constructor (blockSize:number) {
        super()

        this.container = new PIXI.Container()
        this.container.width=blockSize
        this.container.height=blockSize
        this.addChild(this.container)

        const size = parseInt(import.meta.env.VITE_APP_SLOT_SIZE)
        const margin = Math.floor((blockSize - size) / 2)

        const symbol = new SlotSymbol(size, blockSize)
        const x = margin
        const y = margin + 8
        symbol.position.set(x, y - blockSize)
        this.container.addChild(symbol)
        this.symbol = symbol
    }

    public async swap (): Promise<void> {
        await this.symbol.swap()
    }

}
