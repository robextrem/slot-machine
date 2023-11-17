import * as PIXI from 'pixi.js'
import { labelTextStyle, goldenTextStyle, lightTextStyle } from '../../helpers/textStyles'

export default class Bet extends PIXI.Container {
    private container: PIXI.Container
    private label: PIXI.Text
    private betText: PIXI.Text
    private minusButton: PIXI.Text
    private plusButton: PIXI.Text

    constructor () {
        super()
        const labelStyle = new PIXI.TextStyle(labelTextStyle)
        const goldenStyle = new PIXI.TextStyle(goldenTextStyle)
        const lightStyle = new PIXI.TextStyle(lightTextStyle)

        this.container = new PIXI.Container()
    
        this.label = new PIXI.Text('BET', labelStyle)
        this.label.y+=4
        this.container.addChild(this.label)
        
        this.minusButton = new PIXI.Text('-', lightStyle)
        this.minusButton.position.x+=this.label.width+20
        this.container.addChild(this.minusButton)

        this.betText = new PIXI.Text('100', goldenStyle)
        this.betText.position.x+=this.label.width+this.minusButton.width+20
        this.container.addChild(this.betText)

        this.plusButton = new PIXI.Text('+', lightStyle)
        this.plusButton.position.x+=this.betText.width+70
        this.container.addChild(this.plusButton)

        this.addChild(this.container)
    }

    setBet = (x:number): void => {
        this.betText.text = x
    }

}
