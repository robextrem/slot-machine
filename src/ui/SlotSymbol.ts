import * as PIXI from 'pixi.js'

export default class SlotSymbol extends PIXI.Container {
    private index: number
    private sprite: PIXI.Sprite
    private sheet: PIXI.Assets

    constructor (size: number, maxWidth: number) {
        super()
        this.index = 0
        this.sprite = new PIXI.Sprite()
        this.sprite.height = this.sprite.width = size > maxWidth ? maxWidth : size
        this.addChild(this.sprite)
        this.loadSheet().then(()=>{
            this.swap()
        }).catch((e) => {
            console.log(e)
        })
    }

    private async loadSheet():  Promise<void> {
        this.sheet = await PIXI.Assets.load('../src/assets/images/spritesheet.json')
    }

    public swap (): void {
        const n = parseInt(import.meta.env.VITE_APP_NUM_SLOT_SYMBOLS)
        this.index = Math.floor(Math.random() * (n > 7 ? 7 : n))
        this.sprite.texture = PIXI.Texture.from(this.sheet.data.frames[`${this.index}`].image)
        this.sprite.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.LINEAR

    }

}
