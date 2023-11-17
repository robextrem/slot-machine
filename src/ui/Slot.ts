import * as PIXI from 'pixi.js'
import SlotSymbol from './SlotSymbol'

export default class Slot extends PIXI.Container {
    private symbol: SlotSymbol
    private container: PIXI.Container
    public index:number

    constructor (blockSize:number, index:number) {
        super()
        this.index=index
        this.container = new PIXI.Container()
        this.container.width=blockSize
        this.container.height=blockSize
        this.height=blockSize

        const size = import.meta.env.VITE_APP_SLOT_SIZE > blockSize ? blockSize : import.meta.env.VITE_APP_SLOT_SIZE
        const margin = Math.floor((blockSize - size) / 2)

        const symbol = new SlotSymbol(size, blockSize)
        const x = margin
        const y = margin + 8
        symbol.position.set(x, y - blockSize)
        this.container.addChild(symbol)
        this.symbol = symbol

        this.addChild(this.container)

    }

    public swap (n:number|null = null): void {
        this.symbol.swap(n)
    }

}
