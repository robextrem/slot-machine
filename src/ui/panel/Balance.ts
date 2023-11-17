import * as PIXI from 'pixi.js'
import { labelTextStyle, goldenTextStyle } from '../../helpers/textStyles'

export default class Balance extends PIXI.Container {
    private container: PIXI.Container
    private label: PIXI.Text
    private balanceText: PIXI.Text

    constructor () {
        super()
        const labelStyle = new PIXI.TextStyle(labelTextStyle)
        const goldenStyle = new PIXI.TextStyle(goldenTextStyle)

        this.container = new PIXI.Container()

        this.label = new PIXI.Text('Balance', labelStyle)
        this.label.y+=4
    
        this.container.addChild(this.label)

        this.balanceText = new PIXI.Text('0', goldenStyle)
        this.balanceText.x=90
        this.container.addChild(this.balanceText)

        this.addChild(this.container)
    }

    setBalance = (x:number): void => {
        this.balanceText.text = x
    }

}
