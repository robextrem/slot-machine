import * as PIXI from 'pixi.js'
import SmallButton from './SmallButton'
import { goldenTextStyle } from '../../helpers/textStyles'

export default class NumberSelector extends PIXI.Container {
    private container: PIXI.Container
    private betText: PIXI.Text
    private minusButton: SmallButton
    private plusButton: SmallButton

    constructor () {
        super()
        const goldenStyle = new PIXI.TextStyle(goldenTextStyle)

        this.container = new PIXI.Container()
        
        this.minusButton = new SmallButton('-',()=>{
            const n = parseFloat(this.betText.text) - 100
            if(n>0){
                this.setBet(n)
            }
        })
        this.container.addChild(this.minusButton)

        const bet = new PIXI.Graphics()

        bet.beginFill(0xB81E0C,0.5)
        bet.drawRect(0, 0, 110, 40)
        bet.endFill()

        this.betText = new PIXI.Text('100', goldenStyle)
        bet.x = this.minusButton.position.x + this.minusButton.width / 2 + 5
        bet.addChild(this.betText)

        this.betText.anchor.set(0.5, 0)
        this.betText.position.set(55,0)

        this.container.addChild(bet)

        this.plusButton = new SmallButton('+',()=>{
            this.setBet(parseInt(this.betText.text) + 100)
        })
        this.plusButton.x+=bet.width+ this.minusButton.width + 5 * 2
        this.container.addChild(this.plusButton)

        this.addChild(this.container)
    }

    setBet = (x:number): void => {
        this.betText.text = x
    }

    getBet = (): number => {
        return Number(this.betText.text)
    }

}
