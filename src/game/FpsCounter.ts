import * as PIXI from 'pixi.js'
import { fpsTextStyle } from '../helpers/textStyles'

export default class FpsCounter extends PIXI.Container {
    private playText: PIXI.Text

    constructor () {
        super()
        const style = new PIXI.TextStyle(fpsTextStyle)
        this.playText = new PIXI.Text('FPS: 0', style)
        this.playText.position.set(14, 80)
        // this.playText.position.set(import.meta.env.VITE_APP_WIDTH/2, 15)
        // this.playText.anchor.set(0.5,0)
        this.addChild(this.playText)

        const ticker = PIXI.Ticker.shared
        ticker.add(() => {
            this.setFPS(ticker.FPS)
        })
    }

    setFPS = (fps:number):void=>{
        this.playText.text = `FPS: ${fps.toFixed()}`
    }

}
