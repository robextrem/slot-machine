import * as PIXI from 'pixi.js'

export default class SlotSymbol extends PIXI.Container {
    public index: number
    private sprite: PIXI.Sprite
    // private sheet: any

    constructor (size: number, maxWidth: number) {
        super()
        this.index = 0
        this.sprite = new PIXI.Sprite()
        this.sprite.height = this.sprite.width = size > maxWidth ? maxWidth : size
        this.addChild(this.sprite)
        this.swap()
        /*
        this.loadSheet().then(()=>{
            this.swap()
        }).catch((e) => {
            console.log(e)
        })*/
    }

    /*
    private async loadSheet():  Promise<void> {
        this.sheet = await PIXI.Assets.load('assets/images/spritesheet.json')
    } */

    public swap (index: number|null = null): void {
        const n = import.meta.env.VITE_APP_NUM_SLOT_SYMBOLS
        this.index = index ?? Math.floor(Math.random() * (n > 7 ? 7 : n))
        // this.sprite.texture = PIXI.Texture.from(this.sheet.data.frames[`${this.index}`].image)
        this.sprite.texture = PIXI.Texture.from(`assets/images/slot-symbol${this.index}.png`)
        this.sprite.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.LINEAR
       
    }

}
