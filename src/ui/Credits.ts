import * as PIXI from 'pixi.js'

export default class Credits extends PIXI.Container {
    constructor () {
        super()
        const img = PIXI.Sprite.from('../src/assets/images/question.png');
        img.anchor.set(0.5)
        img.position.set(import.meta.env.VITE_APP_WIDTH / 2 , import.meta.env.VITE_APP_HEIGHT / 2)
        this.addChild(img)
    }
}
