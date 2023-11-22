import * as PIXI from 'pixi.js'
import SlotSymbol from './SlotSymbol'

export default class Slot extends PIXI.Container {
  private symbol: SlotSymbol
  private container: PIXI.Container
  private winningSlot: PIXI.Graphics
  private slotHeight: number
  private slotWidth: number

  public index: number

  constructor(blockSize: number, height: number, index: number) {
    super()
    this.index = index
    this.container = new PIXI.Container()
    this.container.width = blockSize
    this.container.height = blockSize
    this.slotHeight = height
    this.slotWidth = blockSize

    const size =
      import.meta.env.VITE_APP_SLOT_SIZE > blockSize
        ? blockSize
        : import.meta.env.VITE_APP_SLOT_SIZE
    const margin = Math.floor((blockSize - size) / 2)

    const symbol = new SlotSymbol(size, blockSize)
    const x = margin
    const y = margin + 8
    symbol.position.set(x, y - blockSize)
    this.container.addChild(symbol)
    this.symbol = symbol

    this.addChild(this.container)

    this.winningSlot = new PIXI.Graphics()

    this.winningSlot.visible = false
    this.addChild(this.winningSlot)
  }

  public setWinning(visible: boolean, color: string = '#333333'): void {
    this.winningSlot.clear()
    this.winningSlot.lineStyle(2, 0x333333, 4)
    this.winningSlot.beginFill(color)
    this.winningSlot.drawRoundedRect(
      0,
      0,
      this.slotWidth - 2,
      this.slotHeight - 2,
      10,
    )
    this.winningSlot.alpha = 0.5
    this.winningSlot.endFill()
    this.winningSlot.visible = visible
  }

  public swap(n: number | null = null): void {
    this.symbol.swap(n)
  }
}
