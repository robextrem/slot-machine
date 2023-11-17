import * as PIXI from 'pixi.js'

export default class Dropdown extends PIXI.Container {
    constructor (x:number, y:number) {
        super()
        this.visible=false
        const bottom: PIXI.Graphics = new PIXI.Graphics()
        bottom.beginFill(0xFFF000, 0.5)
        bottom.drawRect(x, y, 190, 300)
        bottom.endFill()
        this.addChild(bottom)
    }

    toggleVisible = ():void =>{
        this.visible = !this.visible
    }
}


