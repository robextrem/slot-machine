import * as PIXI from 'pixi.js'
import type SlotMachine from '../slot-machine/SlotMachine'
import Dropdown from '../utilities/Dropdown'

export default class CheatPanel extends PIXI.Container {
    private button:PIXI.Sprite
    private dropdown:Dropdown
    private container: PIXI.Container
    constructor (machine: SlotMachine) {
        super()

        this.container = new PIXI.Container()
        this.button = PIXI.Sprite.from('../src/assets/images/question.png')
        this.button.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.LINEAR
        this.button.width = 55
        this.button.height = 46
        this.button.eventMode = 'static'
        this.button.cursor = 'pointer'

        this.dropdown = new Dropdown(import.meta.env.VITE_APP_WIDTH - 200, 60, machine)
        this.addChild(this.dropdown)

        this.button.addEventListener('pointerdown',()=>{
            this.dropdown.toggleVisible()
        })
        this.container.addChild(this.button)
        
        this.container.position.set(import.meta.env.VITE_APP_WIDTH - 80 , 20)
        this.addChild(this.container)

    }
}
