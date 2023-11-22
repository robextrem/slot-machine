import * as PIXI from 'pixi.js'
import { goldenBigTextStyle } from '../../helpers/textStyles'

export default class Earnings extends PIXI.Container {
  private container: PIXI.Container
  private valueText: PIXI.Text

  constructor() {
    super()
    this.container = new PIXI.Container()

    const coin = PIXI.Sprite.from('assets/images/coin.png')
    coin.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.LINEAR
    coin.position.y += 5
    this.container.addChild(coin)

    const style = new PIXI.TextStyle(goldenBigTextStyle)
    this.valueText = new PIXI.Text('50000', style)

    this.valueText.x = 105
    this.valueText.anchor.set(0.5, 0)
    this.container.addChild(this.valueText)
    this.addChild(this.container)
    this.container.position.set(
      (import.meta.env.VITE_APP_WIDTH - this.container.width) / 2,
      import.meta.env.VITE_APP_HEIGHT / 2 - 210,
    )
    this.visible = false
  }

  setValue = (x: number): void => {
    this.valueText.text = x
  }

  setVisible = (visible: boolean): void => {
    this.visible = visible
  }
}
