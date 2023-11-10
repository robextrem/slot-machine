import * as PIXI from 'pixi.js'
import * as TWEEN from '@tweenjs/tween.js'
import Slot from './Slot'

export default class Reel extends PIXI.Container {
    private index: number
    private numberOfSlots: number
    private slots: Slot[]
    private speed: number
    private isSpeening: boolean
    private reelWidth: number
    private container: PIXI.Container
    private blur:PIXI.BlurFilter

    constructor (width: number, height: number, index: number) {
        super()
        this.index = index
        this.reelWidth = width
        this.numberOfSlots = parseInt(import.meta.env.VITE_APP_NUM_SLOTS)
        this.speed = parseInt(import.meta.env.VITE_APP_REEL_SPEED)
        this.slots = []
        this.isSpeening = false
        this.blur = new PIXI.BlurFilter(1, 1)

        const blockSize = parseInt(import.meta.env.VITE_APP_HEIGHT) / (parseInt(import.meta.env.VITE_APP_NUM_SLOTS) + 1)
        const rectMask: PIXI.Graphics = new PIXI.Graphics()
        rectMask.beginFill('white')
        rectMask.lineStyle({ color: 0x111111, alpha: 0.87, width: 1 })
        rectMask.drawRect(width * this.index, -(blockSize/2), width, height)
        rectMask.endFill()

        this.addChild(rectMask)
        this.container = new PIXI.Container()
        this.addChild(this.container)

        for (let i = 0; i < this.numberOfSlots + 2; i++) {
            const slot = new Slot()
            this.container.addChild(slot)
            this.slots.push(slot)
        }

        this.initialPosition()
    }

    public spin = (duration: number, delay: number, cb: () => void): void => {
        const position = { x: 0, y: 1000, rotation: 0 }
        const positionEnd = { x: 0, y: -100, rotation: 0 }
        const appHeight = parseInt(import.meta.env.VITE_APP_HEIGHT)
        const blockSize = parseInt(import.meta.env.VITE_APP_HEIGHT) / (parseInt(import.meta.env.VITE_APP_NUM_SLOTS) + 1)

        const tween = new TWEEN.Tween(position)
            .to(positionEnd, duration)
            .delay(delay * this.index)
           // .easing(TWEEN.Easing.Quadratic.InOut)

        tween.onUpdate((t: TWEEN) => {
            // if(this.index === 0)
            // console.log(t.y)
            this.slots.forEach((slot) => {
              slot.y += t.y> 0 ? 1 * this.speed : 1 * this.speed * -1
              // slot.y += 1 * this.speed
              if (slot.y >= appHeight + blockSize / 2) {
                slot.y = -blockSize/2
                slot.swap().catch(() => {})
                this.slots.unshift(slot)
                this.slots.pop()
              }
              if(!this.isSpeening){
                this.setBlur(true)
              }
            })
            this.isSpeening = true
        })

        tween.onComplete((t) => {
          cb()
          this.initialPosition()
          this.setBlur(false)
        })
        
        tween.start()

        const animate = (time: number): void => {
          tween.update(time)
          requestAnimationFrame(animate)
        }
        requestAnimationFrame(animate)
    }

    private initialPosition():void {
      const blockSize = parseInt(import.meta.env.VITE_APP_HEIGHT) / (parseInt(import.meta.env.VITE_APP_NUM_SLOTS) + 1)
      this.slots.forEach((slot, i) => {
        slot.position.x = this.reelWidth * this.index
        slot.position.y = i * blockSize
      })
      this.isSpeening = false
    }

    private setBlur(value:boolean):void{
      this.container.filters = value ? [this.blur] : null
    }

}
