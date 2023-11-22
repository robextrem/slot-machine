import * as PIXI from 'pixi.js'

export default class MainButton extends PIXI.Container {
    private idleState: PIXI.Texture
    private hoverState: PIXI.Texture
    private pressedState: PIXI.Texture
    private button: PIXI.Sprite
    private state: string

    constructor (cb: ()=>void) {
        super()
        this.state = 'idle'
        this.idleState = PIXI.Texture.from('assets/images/button-idle.png')
        this.idleState.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST
        this.hoverState = PIXI.Texture.from('assets/images/button-hover.png')
        this.hoverState.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST
        this.pressedState = PIXI.Texture.from('assets/images/button-pressed.png')
        this.pressedState.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST


        this.button = new PIXI.Sprite(this.idleState)
        this.button.anchor.set(0.5)
        this.button.eventMode = 'static'
        this.button.cursor = 'pointer'
        this.button.height=120
        this.button.width=120

        this.button.on('pointertap', () => {
            if (this.state !== 'pressed') {
                this.changeState('pressed', cb)
            }
        })

        this.button.on('pointerout', () => {
            if (this.state !== 'pressed') {
                this.changeState('idle')
            }
        })

        this.button.on('pointerover', () => {
            if (this.state !== 'pressed') {
                this.changeState('hover')
            }
        })

        this.addChild(this.button)
    }

    changeState = (state: string, cb: () => void = () => {}): void => {
        switch (state) {
            case 'pressed':{
                this.button.texture = this.pressedState
                this.state = 'pressed'
                break
            }
            case 'hover':{
                this.button.texture = this.hoverState
                this.state = 'hover'
                break
            }
            case 'idle':{
                this.button.texture = this.idleState
                this.state = 'idle'
                break
            }
        }
        cb()
    }
}
