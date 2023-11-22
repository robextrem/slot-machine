import * as PIXI from 'pixi.js'
import NumberSelector from './NumberSelector'
import { labelTextStyle } from '../../helpers/textStyles'

export default class Bet extends PIXI.Container {
  private container: PIXI.Container
  private label: PIXI.Text
  private betSelector: NumberSelector

  constructor() {
    super()
    const labelStyle = new PIXI.TextStyle(labelTextStyle)
    const margin = Number(import.meta.env.VITE_APP_INFO_BLOCK_MARGIN)

    this.container = new PIXI.Container()

    this.label = new PIXI.Text('BET', labelStyle)
    this.label.y += 5
    this.container.addChild(this.label)

    this.betSelector = new NumberSelector()
    this.betSelector.position.x += this.label.width + margin * 4
    this.container.addChild(this.betSelector)

    this.addChild(this.container)
  }

  getValue = (): number => {
    return this.betSelector.getBet()
  }
}
