import * as PIXI from 'pixi.js'

export class Slot extends PIXI.Container {
    private index: number
    private sWidth: number
    private sHeight: number
    private sprite: PIXI.Sprite

    constructor (width: number, height: number) {
        super()
        this.index = 1
        this.sWidth = width
        this.sHeight = height
        this.sprite = new PIXI.Sprite()
        // this.sprite.position.set((this.x = 700), (this.y = 200));
        this.sprite.position.set(0, height * 0)
        this.addChild(this.sprite)
        this.swap()
    }

    public async swap (): void {
        this.index = Math.floor(Math.random() * 4)
        const sheet = await PIXI.Assets.load('../src/assets/images/spritesheet.json')
        // TODO: NO TOMA EL SPRITE COMO TAL
        this.sprite.texture = PIXI.Texture.from(sheet.data.frames[`${this.index}`].image)
    }
}
