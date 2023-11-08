import * as PIXI from 'pixi.js'
import Button from './Button'

export default class ControlPanel extends PIXI.Container {
    private container: PIXI.Container
    private button: Button

    constructor (width: number, height: number) {
        super()
        this.container = new PIXI.Container()
        // this.container.mask = rectMask

        this.addChild(this.container)

        const bottom = new PIXI.Graphics()
        bottom.beginFill(0, 1)
        bottom.drawRect(0, height - 100, width, 100)

        this.button = new Button()
        this.button.x = width - 130
        this.button.y = height - 50
        bottom.addChild(this.button)
        this.container.addChild(bottom)
    }
}
