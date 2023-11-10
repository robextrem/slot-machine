import * as PIXI from 'pixi.js'
import Button from './Button'
import type Machine from './Machine'

export default class ControlPanel extends PIXI.Container {
    private container: PIXI.Container
    private button: Button

    constructor (width: number, height: number, machine: Machine) {
        super()
        this.container = new PIXI.Container()
        // TODO: Identificar formula
        const size = (height / 4) / 2

        this.addChild(this.container)

        const bottom = new PIXI.Graphics()
        bottom.beginFill(0, 1)
        bottom.drawRect(0, height - size, width, size)

        this.button = new Button(machine.startPlay)
        this.button.x = width - 80
        this.button.y = height - 36

        bottom.addChild(this.button)
        this.container.addChild(bottom)
    }

    getButton = (): Button => {
        return this.button
    }
}
