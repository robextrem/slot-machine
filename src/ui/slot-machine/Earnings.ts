import * as PIXI from 'pixi.js'

export default class Earnings extends PIXI.Container {
    private container: PIXI.Container

    constructor () {
        super()
        this.container = new PIXI.Container()
    
        const coin = PIXI.Sprite.from('assets/images/coin.png')
        coin.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST
        coin.x=3
        this.container.addChild(coin)

        const style = new PIXI.TextStyle({
            fontFamily: ['Roboto Slab', 'Helvetica'],
            fontSize: 36,
            fontStyle: 'normal',
            fontWeight: 'bold',
            fill: ['#B06830', '#FEDF6C'], // gradient
            stroke: '#FDD16B',
            strokeThickness: 2,
            dropShadow: true,
            dropShadowColor: '#000000',
            dropShadowBlur: 2,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 6,
            wordWrap: true
        })
    
        const playText = new PIXI.Text('5000000', style)
    
        playText.x = coin.position.y+60
        playText.y = 7
        this.container.addChild(playText)
        this.addChild(this.container)
        this.container.position.set((import.meta.env.VITE_APP_WIDTH - this.container.width)/2, 60)
    }

}
