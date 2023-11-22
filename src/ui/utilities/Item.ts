import * as PIXI from 'pixi.js'
import { dropdownTextStyle } from '../../helpers/textStyles'

export default class Item extends PIXI.Container {
  private bg: PIXI.Graphics
  private state: string = 'idle'
  private isActive: boolean

  constructor(t: string, isActive: boolean, cb: () => void) {
    super()

    this.bg = new PIXI.Graphics()
    this.bg.eventMode = 'static'
    this.bg.cursor = 'pointer'

    const text = new PIXI.Text(t, dropdownTextStyle)
    text.anchor.set(0.5)
    text.position.set(95, 20)
    this.bg.addChild(text)
    this.triggerState(this.state)

    this.bg.addEventListener('pointerover', () => {
      this.triggerState('hover')
    })

    this.bg.addEventListener('pointerout', () => {
      this.triggerState('idle')
    })

    this.bg.addEventListener('pointerdown', () => {
      this.triggerState('pressed', cb)
    })

    this.addChild(this.bg)

    this.isActive = isActive
    this.setIsActive(isActive)
  }

  toggleVisible = (): void => {
    this.visible = !this.visible
  }

  setIsActive = (isActive: boolean): void => {
    this.isActive = isActive
    if (this.isActive) {
      this.paintBg(0xb81e0c)
    } else {
      this.paintBg(0x000000)
    }
  }

  triggerState = (state: string, cb: () => void = () => {}): void => {
    if (!this.isActive) {
      switch (state) {
        case 'pressed': {
          cb()
          this.state = 'pressed'
          this.setIsActive(true)
          break
        }
        case 'hover': {
          this.state = 'hover'
          this.paintBg(0xa37f17)
          break
        }
        case 'idle': {
          this.state = 'idle'
          this.paintBg(0x000000)
          break
        }
      }
    }
  }

  paintBg = (color: PIXI.ColorSource): void => {
    this.bg.clear()
    this.bg.beginFill(color, 0.85)
    this.bg.drawRect(0, 0, 190, 40)
    this.bg.endFill()
  }
}
