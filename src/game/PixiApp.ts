import * as PIXI from 'pixi.js'
import SlotMachine from '../ui/SlotMachine'
import FpsCounter from '../ui/FpsCounter'

export default class PixiApp extends PIXI.Application{
  public counter: FpsCounter

  constructor (canvas:HTMLCanvasElement) {
    const appHeight = import.meta.env.VITE_APP_HEIGHT
    const appWidth = import.meta.env.VITE_APP_WIDTH
    
    super({
      view: canvas,
      background: '#222222',
      height: appHeight,
      width: appWidth
    })

    this.counter = new FpsCounter()


  }

  setStage = ():void => {
    const machine = new SlotMachine(540, 275)
    this.stage.addChild(machine)

    if(import.meta.env.VITE_APP_FPS === "on" && import.meta.env.VITE_APP_ENGINE==="pixi"){
      this.stage.addChild(this.counter)

      this.ticker.add(() => {
          if(this.counter){
            this?.counter.setFPS(this.ticker.FPS)
          }
      })
    }
  }

  bindDevTools = ():void => {
      /* @ts-expect-error */
      globalThis.__PIXI_APP__ = this
  }

}