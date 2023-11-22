import * as PIXI from 'pixi.js'
import Reel from './Reel'

export default class ReelGroup extends PIXI.Container {
  private numberOfReels: number
  private reels: Reel[]
  private container: PIXI.Container
  private symbols = [] as number[][]

  constructor(width: number, height: number) {
    super()
    this.numberOfReels = import.meta.env.VITE_APP_NUM_REELS
    this.reels = []

    const appWidth = import.meta.env.VITE_APP_WIDTH

    const img = PIXI.Sprite.from('assets/images/board.png')
    img.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST

    img.width = 767
    img.height = 447
    img.anchor.set(0.5)
    img.position.set(
      import.meta.env.VITE_APP_WIDTH / 2,
      import.meta.env.VITE_APP_HEIGHT / 2,
    )
    this.addChild(img)

    this.container = new PIXI.Container()
    this.container.height = height
    this.container.width = width
    this.container.position.set(
      (appWidth - width) / 2,
      import.meta.env.VITE_APP_HEIGHT / 2 - 90,
    )

    this.addChild(this.container)

    for (let i = 0; i < this.numberOfReels; i++) {
      const reel = new Reel(Math.floor(width / 5), height, i)
      this.container.addChild(reel)
      this.reels.push(reel)
    }
  }

  getReels = (): Reel[] => {
    return this.reels
  }

  getSymbols = (): number[][] => {
    return this.symbols
  }

  setSymbols = (symbols: number[][]): void => {
    this.symbols = symbols

    /** Se voltean los simbolos */
    this.getReels().forEach((reel, i) => {
      const horizontal = symbols[0].map((_, j) => symbols.map((row) => row[j]))
      reel.setSymbols(horizontal[i])
    })
  }
}
