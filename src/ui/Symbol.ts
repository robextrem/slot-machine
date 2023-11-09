import * as PIXI from 'pixi.js'

export default class Slot extends PIXI.Container {
    private index: number
    private sprite: PIXI.Sprite

    constructor (size: number, maxWidth: number, index: number) {
        super()
        this.index = index
        this.sprite = new PIXI.Sprite()
        this.sprite.height = this.sprite.width = size > maxWidth ? maxWidth : size

        this.addChild(this.sprite)
        this.swap().catch((e) => {
            console.log(e)
        })
    }

    public async swap (): Promise<void> {
        this.index = Math.floor(Math.random() * 4)
        const sheet = await PIXI.Assets.load('../src/assets/images/spritesheet.json')
        // TODO: NO TOMA EL SPRITE COMO TAL
        this.sprite.texture = PIXI.Texture.from(sheet.data.frames[`${this.index}`].image)
    }
}
