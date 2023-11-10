import * as PIXI from 'pixi.js'
import SlotSymbol from './SlotSymbol'

export default class Slot extends PIXI.Container {
    private symbol: SlotSymbol
    private container: PIXI.Container

    constructor () {
        super()
        const blockSize = Math.ceil(parseInt(import.meta.env.VITE_APP_WIDTH) / 5)

        this.container = new PIXI.Container()
        this.addChild(this.container)

        const size = parseInt(import.meta.env.VITE_APP_SLOT_SIZE)
        const margin = Math.floor((blockSize - size) / 2)

        const symbol = new SlotSymbol(size, blockSize)
        const x = margin
        const y = margin
        symbol.position.set(x, y - blockSize / 1.25)
        this.container.addChild(symbol)
        this.symbol = symbol
    }

    public async swap (): Promise<void> {
        await this.symbol.swap()
    }

}
