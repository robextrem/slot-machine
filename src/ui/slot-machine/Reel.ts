import * as PIXI from 'pixi.js'
import Slot from './Slot'
import { PixiPlugin } from 'gsap/PixiPlugin'
import { gsap } from 'gsap'
gsap.registerPlugin(PixiPlugin)
PixiPlugin.registerPIXI(PIXI)

export default class Reel extends PIXI.Container {
    private index: number
    private numberOfSlots: number
    private slots: Slot[]
    private symbols: number[]
    private speed: number
    public isSpinning: boolean
    private reelWidth: number
    private reelHeight: number
    private container: PIXI.Container

    constructor (width: number, height: number, index: number) {
        super()
        this.index = index
        this.reelWidth = width
        this.reelHeight = height
        this.numberOfSlots = Number(import.meta.env.VITE_APP_NUM_SLOTS)
        this.speed = Number(import.meta.env.VITE_APP_REEL_SPEED) || 1
        this.slots = []
        this.symbols = []
        this.isSpinning = false

        const rectMask: PIXI.Graphics = new PIXI.Graphics()
        rectMask.beginFill('blue')
        rectMask.drawRect(width * this.index, 0, width, height)
        rectMask.endFill()

        this.addChild(rectMask)
        this.container = new PIXI.Container()
        
        this.container.mask = rectMask
        this.addChild(this.container)

        for (let i = 0; i < this.numberOfSlots + 2; i++) {
            const slot = new Slot(this.reelWidth, i)
            this.container.addChild(slot)
            this.slots.push(slot)
        }

        this.initialPosition()
    }

    public spin = (duration: number, delay: number, cb: () => void): void => {

        if(this.isSpinning)
          return 

        const blockSize = import.meta.env.VITE_APP_HEIGHT / (import.meta.env.VITE_APP_NUM_SLOTS + 1)
        this.slots.forEach((slot:Slot, n) => {
          const pixel = 1
          const lastY = slot.y
          const tween = gsap.timeline({ repeat: 0 })

          tween.to(this, {
            pixi: {blurY: 1},
            duration,
            delay: this.index * delay,
            onUpdate: () => {
              slot.y += pixel * this.speed
              if (slot.y >= this.container.height) {
                slot.y = this.container.y - blockSize
                slot.swap(tween.totalTime() >= duration - 1 ? this.symbols[slot.index] : null)
                this.slots.unshift(slot)
                this.slots.pop()
              }
            }
          })
          .to(slot, {
            pixi: {positionY: lastY}, 
            duration:0.3,
            ease: 'elastic.out',
            onComplete: () => {
              if(n === this.slots.length-1){
                cb()
              }
              this.isSpinning=false
            }
          }).to(this, {
            pixi: {blurY: 0, duration: 0}
          })
      })
    }

    private initialPosition(): void {
      const blockSize = Math.ceil(this.reelHeight / import.meta.env.VITE_APP_NUM_SLOTS)
      this.slots.forEach((slot:Slot, i:number) => {
        slot.position.x = this.reelWidth * this.index
        slot.position.y = i * blockSize
      })
    }

  setSymbols = (symbols: number[]): void =>{
    this.symbols = symbols
  }
}
