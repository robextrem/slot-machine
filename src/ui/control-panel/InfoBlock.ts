import * as PIXI from 'pixi.js'
import { labelTextStyle, goldenTextStyle } from '../../helpers/textStyles'
import { PixiPlugin } from 'gsap/PixiPlugin'
import { gsap } from 'gsap'
gsap.registerPlugin(PixiPlugin)
PixiPlugin.registerPIXI(PIXI)

export default class InfoBlock extends PIXI.Container {
  private container: PIXI.Container
  private labelText: PIXI.Text
  private valueText: PIXI.Text
  private label: string
  private value: string

  constructor(label: string, value: string) {
    super()
    const labelStyle = new PIXI.TextStyle(labelTextStyle)
    const goldenStyle = new PIXI.TextStyle(goldenTextStyle)
    const margin = Number(import.meta.env.VITE_APP_INFO_BLOCK_MARGIN)

    this.label = label
    this.value = value

    this.container = new PIXI.Container()

    this.labelText = new PIXI.Text(this.label + ':', labelStyle)
    this.labelText.y += 5

    this.container.addChild(this.labelText)

    this.valueText = new PIXI.Text(this.value, goldenStyle)
    this.valueText.x = this.labelText.width + margin
    this.container.addChild(this.valueText)

    this.addChild(this.container)
  }

  setValue = (x: number, animated: boolean = false): void => {
    if (animated) {
      const tween = gsap.to(this, {
        roundProps: 'end',
        duration: 0.5,
        end: x,
        onUpdate: () => {
          /* @ts-expect-error */
          this.valueText.text = Math.ceil(tween.targets()[0].end)
        },
      })
    } else {
      this.valueText.text = x
    }
  }

  getValue = (): number => {
    return parseInt(this.valueText.text)
  }
}
