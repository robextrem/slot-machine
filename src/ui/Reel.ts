import * as PIXI from 'pixi.js'
import * as TWEEN from '@tweenjs/tween.js'
import Slot from './Slot'

export default class Reel extends PIXI.Container {
    private index: number
    private numberOfSlots: number
    private slots: Slot[]
    private container: PIXI.Container
    

    constructor (width: number, height: number, index: number) {
        super()
        this.index = index
        this.numberOfSlots = parseInt(import.meta.env.VITE_APP_NUM_SLOTS)
        this.slots = []

        const rectMask: PIXI.Graphics = new PIXI.Graphics()
        rectMask.beginFill('white')
        rectMask.lineStyle({ color: 0x111111, alpha: 0.87, width: 1 })
        rectMask.drawRect(width * this.index, 0, width, height)
        rectMask.endFill()
        this.addChild(rectMask)

        this.container = new PIXI.Container()
        // this.container.mask = rectMask

        this.addChild(this.container)

        for (let i = 0; i < this.numberOfSlots + 2; i++) {
            const size = parseInt(import.meta.env.VITE_APP_SLOT_SIZE)
            const margin = Math.floor((width - size) / 2)
            const blockSize = parseInt(import.meta.env.VITE_APP_HEIGHT) / (parseInt(import.meta.env.VITE_APP_NUM_SLOTS) + 1)

            const slot = new Slot(size, width, i)
            const x = width * this.index + margin
            const y = width * i + margin
            slot.position.set(x, y - blockSize / 1.25)
            this.container.addChild(slot)
            this.slots.push(slot)
        }

      this.spin(5000, 500, () => {})
    }

    private spin = (duration: number, delay: number, cb: () => void): void => {
        const position = { x: 0, y: 0, rotation: 0 }
        const positionEnd = { x: 0, y: 300, rotation: 0 }
        const appHeight = parseInt(import.meta.env.VITE_APP_HEIGHT)
        const blockSize = parseInt(import.meta.env.VITE_APP_HEIGHT) / (parseInt(import.meta.env.VITE_APP_NUM_SLOTS) + 1)

        const tween = new TWEEN.Tween(position)
            .to(positionEnd, duration)
            .delay(delay)
            .easing((n: number): number =>{
              const s: number = 1.70158
              return n * n * ((s + 1) * n - s)
            })
            .onUpdate(() => {
                this.slots.forEach(slot => {
                  slot.y += 1
                  if (slot.y >= appHeight + blockSize) {
                    slot.y -= blockSize * 5
                  }
                })
        })
        tween.start()
        tween.onComplete(() => {
          cb()
        })

        const animate = (time: number): void => {
          tween.update(time)
          requestAnimationFrame(animate)
        }
        requestAnimationFrame(animate)
    }
}
