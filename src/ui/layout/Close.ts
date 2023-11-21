import * as PIXI from 'pixi.js'
import type SlotMachine from '../slot-machine/SlotMachine'
import { Manager } from '../../game/Manager'
import { MainScreenScene } from '../../scenes/MainScreenScene'

export default class Close extends PIXI.Container {
    private button:PIXI.Sprite
    private container: PIXI.Container
    constructor (_machine: SlotMachine) {
        super()

        this.container = new PIXI.Container()
        this.button = PIXI.Sprite.from('../src/assets/images/close.png')
        this.button.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.LINEAR
        this.button.width = 55
        this.button.height = 46
        this.button.eventMode = 'static'
        this.button.cursor = 'pointer'

        this.button.addEventListener('pointerdown',()=>{
            if(confirm('Are you sure you want to leave the game?')){
                Manager.changeScene(new MainScreenScene())
            }
        })
        this.container.addChild(this.button)
        
        this.container.position.set(20 , 20)
        this.addChild(this.container)

    }
}
