import * as PIXI from 'pixi.js'
import { fpsTextStyle } from '../helpers/textStyles'

export default class FpsCounter extends PIXI.Container {
    private playText: PIXI.Text

    constructor () {
        super()
        const style = new PIXI.TextStyle(fpsTextStyle)
        this.playText = new PIXI.Text('FPS: 0', style)
        this.playText.position.set(10, 10)
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
