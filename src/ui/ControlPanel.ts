import * as PIXI from 'pixi.js'
import Button from './Button'
import type SlotMachine from './SlotMachine'

export default class ControlPanel extends PIXI.Container {
    private container: PIXI.Container
    private button: Button

    constructor (machine: SlotMachine) {
        super()
        const width = import.meta.env.VITE_APP_WIDTH
        const height = import.meta.env.VITE_APP_HEIGHT
        // TODO: Identificar formula
        const size = (height / 4) / 2

        this.container = new PIXI.Container()
        this.addChild(this.container)

        const bottom = new PIXI.Graphics()
        bottom.beginFill(0, 0)
        bottom.drawRect(0, height - size, width, size)

        this.button = new Button(machine.startPlay)
        this.button.x = width - 100
        this.button.y = height - 70

        bottom.addChild(this.button)
        this.container.addChild(bottom)
    }

    getButton = (): Button => {
        return this.button
    }
}
