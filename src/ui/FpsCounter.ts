import * as PIXI from 'pixi.js'

export default class FpsCounter extends PIXI.Container {
    private playText: PIXI.Text

    constructor () {
        super()
        const style = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 16,
            fontStyle: 'normal',
            fontWeight: 'bold',
            fill: '#ffffff'
        });
    
        this.playText = new PIXI.Text('FPS: 100', style)
        this.playText.position.set(10,10)
        this.addChild(this.playText)
    }

    setFPS=(fps:number):void=>{
        this.playText.text = `FPS: ${fps.toFixed()}`
    }

}
