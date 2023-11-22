import * as PIXI from 'pixi.js'
import MainButton from './MainButton'
import type SlotMachine from '../slot-machine/SlotMachine'
import PanelData from './PanelData'

export default class ControlPanel extends PIXI.Container {
    private container: PIXI.Container
    private button: MainButton
    private panelData: PanelData
    private panelHeight=38 as number

    constructor (machine: SlotMachine) {
        super()
        const appHeight = import.meta.env.VITE_APP_HEIGHT
        const appWidth = import.meta.env.VITE_APP_WIDTH

        this.container = new PIXI.Container()
        this.container.position.set(0, appHeight - this.panelHeight)
        this.addChild(this.container)

        const bottom: PIXI.Graphics = new PIXI.Graphics()
        bottom.beginFill(0x000000, 0.45)
        bottom.drawRect(0, 0, appWidth, this.panelHeight)
        bottom.endFill()

        this.container.addChild(bottom)

        this.panelData = new PanelData()
        this.container.addChild(this.panelData)

        this.button = new MainButton(machine.startPlay)
        this.button.x = appWidth - 100
        this.button.y = appHeight - 70

        this.addChild(this.button)

    }

    getButton = (): MainButton => {
        return this.button
    }

    getPanelData = (): PanelData => {
        return this.panelData
    }

}
