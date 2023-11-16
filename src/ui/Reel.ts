import * as PIXI from 'pixi.js'
import { gsap } from "gsap"
import { PixiPlugin } from "gsap/PixiPlugin"
import Slot from './Slot'
gsap.registerPlugin(PixiPlugin);
PixiPlugin.registerPIXI(PIXI);

export default class Reel extends PIXI.Container {
    private index: number
    private numberOfSlots: number
    private slots: Slot[]
    private speed: number
    public isSpeening: boolean
    private reelWidth: number
    private reelHeight: number
    private container: PIXI.Container

    constructor (width: number, height: number, index: number) {
        super()
        this.index = index
        this.reelWidth = width
        this.reelHeight = height
        this.numberOfSlots = parseInt(import.meta.env.VITE_APP_NUM_SLOTS)
        this.speed = parseInt(import.meta.env.VITE_APP_REEL_SPEED)
        this.slots = []
        this.isSpeening = false

        const rectMask: PIXI.Graphics = new PIXI.Graphics()
        rectMask.beginFill('blue')
        rectMask.lineStyle({ color: 0x111111, alpha: 0.87, width: 1 })
        rectMask.drawRect(width * this.index, 0, width, height)
        rectMask.endFill()
        console.log("Reel container h: ", height)

        this.addChild(rectMask)
        this.container = new PIXI.Container()
        
        this.container.mask = rectMask
        this.addChild(this.container)

        for (let i = 0; i < this.numberOfSlots + 2; i++) {
            const slot = new Slot(this.reelWidth)
            this.container.addChild(slot)
            this.slots.push(slot)
        }

        this.initialPosition()
    }

    public spin = (duration: number, delay: number, cb: () => void): void => {

        if(this.isSpeening)
          return 

        const blockSize = parseInt(import.meta.env.VITE_APP_HEIGHT) / (parseInt(import.meta.env.VITE_APP_NUM_SLOTS) + 1)
        this.slots.forEach((slot) => {
          const lastY = slot.y
          const tween = gsap.timeline({ repeat: 0 });

          tween.to(this, {
            pixi: {blurY: 1},
            duration,
            delay: this.index * delay,
            onUpdate: () => {
              slot.y += 1 * this.speed
                if (slot.y >= this.reelHeight + blockSize) {
                  slot.y = - blockSize
                  slot.swap()
                  this.slots.unshift(slot)
                  this.slots.pop()
                }
            }
          })
          .to(slot, {
            pixi: {positionY: lastY}, 
            duration:0.3,
            ease: "elastic.out",
            onComplete: () => {
              cb()
              this.isSpeening=false
            }
          }).to(this, {
            pixi: {blurY: 0, duration: 0}
          })
      })
    }

    private initialPosition():void {
      const blockSize = Math.ceil(this.reelHeight / (parseInt(import.meta.env.VITE_APP_NUM_SLOTS)))
      this.slots.forEach((slot, i) => {
        slot.position.x = this.reelWidth * this.index
        slot.position.y = i * blockSize
      })
    }
}
