import * as PIXI from 'pixi.js'

export default class ControlPanel extends PIXI.Container {
    private container: PIXI.Container
    private idleState: PIXI.Texture
    private hoverState: PIXI.Texture
    private pressedState: PIXI.Texture
    private state: string

    constructor () {
        super()
        this.state = 'idle'
        this.container = new PIXI.Container()
        this.idleState = PIXI.Texture.from('../src/assets/images/button-idle.png')
        this.hoverState = PIXI.Texture.from('../src/assets/images/button-hover.png')
        this.pressedState = PIXI.Texture.from('../src/assets/images/button-pressed.png')

        const button = new PIXI.Sprite(this.idleState)
        button.anchor.set(0.5)
        button.interactive = true

        // this.container.mask = rectMask

        button.on('pointertap', () => {
            button.texture = this.pressedState
        })

        button.on('pointerout', () => {
            button.texture = this.idleState
        })

        button.on('pointerover', () => {
            button.texture = this.hoverState
        })

        this.addChild(this.container)

        this.container.addChild(button)
    }
}
