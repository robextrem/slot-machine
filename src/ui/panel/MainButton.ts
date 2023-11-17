import * as PIXI from 'pixi.js'

export default class MainButton extends PIXI.Container {
    private idleState: PIXI.Texture
    private hoverState: PIXI.Texture
    private pressedState: PIXI.Texture
    private button: PIXI.Sprite
    private state: string

    constructor (cb: any) {
        super()
        this.state = 'idle'
        this.idleState = PIXI.Texture.from('assets/images/button-idle.png')
        this.hoverState = PIXI.Texture.from('assets/images/button-hover.png')
        this.pressedState = PIXI.Texture.from('assets/images/button-pressed.png')

        this.button = new PIXI.Sprite(this.idleState)
        this.button.anchor.set(0.5)
        this.button.interactive = true
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

    // eslint-disable-next-line @typescript-eslint/ban-types
    changeState = (state: string, cb: Function = () => {}): void => {
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
