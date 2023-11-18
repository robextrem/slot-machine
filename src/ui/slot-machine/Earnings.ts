import * as PIXI from 'pixi.js'
import { goldenBigTextStyle } from '../../helpers/textStyles'

export default class Earnings extends PIXI.Container {
    private container: PIXI.Container

    constructor () {
        super()
        this.container = new PIXI.Container()
    
        const coin = PIXI.Sprite.from('assets/images/coin.png')
        coin.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.LINEAR
        coin.position.y+=5
        this.container.addChild(coin)

        const style = new PIXI.TextStyle(goldenBigTextStyle)
        const playText = new PIXI.Text('50000', style)
    
        playText.x = coin.width + 50
        this.container.addChild(playText)
        this.addChild(this.container)
        this.container.position.set((import.meta.env.VITE_APP_WIDTH - this.container.width)/2, (import.meta.env.VITE_APP_HEIGHT / 2) - 210)

    }

}
