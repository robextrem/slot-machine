import * as PIXI from 'pixi.js'

export default class SlotSymbol extends PIXI.Container {
    private index: number
    private sprite: PIXI.Sprite

    constructor (size: number, maxWidth: number) {
        super()
        this.index = 0
        this.sprite = new PIXI.Sprite()
        this.sprite.height = this.sprite.width = size > maxWidth ? maxWidth : size
        
        this.addChild(this.sprite)
        this.swap().catch((e) => {
            console.log(e)
        })
    }

    public async swap (): Promise<void> {

        const n = parseInt(import.meta.env.VITE_APP_NUM_SLOT_SYMBOLS)

        this.index = Math.floor(Math.random() * (n > 7 ? 7 : n))
        const sheet = await PIXI.Assets.load('../src/assets/images/spritesheet.json')
        // TODO: NO TOMA EL SPRITE COMO TAL
        this.sprite.texture = PIXI.Texture.from(sheet.data.frames[`${this.index}`].image)
        this.sprite.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.LINEAR

    }

}
