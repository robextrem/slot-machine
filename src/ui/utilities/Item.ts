import * as PIXI from 'pixi.js'
import { dropdownTextStyle } from '../../helpers/textStyles'

export default class Item extends PIXI.Container {
    constructor (t:string, index:number) {
        super()
        const bottom: PIXI.Graphics = new PIXI.Graphics()
        bottom.beginFill(0x000000, 0.85)
        bottom.drawRect(0, 0, 190, 40)
        bottom.endFill()

        const text = new PIXI.Text(t, dropdownTextStyle)
        text.anchor.set(0.5)
        text.position.set(95, 20)
        bottom.addChild(text)
        this.addChild(bottom)

    }

    toggleVisible = ():void =>{
        this.visible = !this.visible
    }
}


