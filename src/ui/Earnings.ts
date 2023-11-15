import * as PIXI from 'pixi.js'
import type SlotMachine from './SlotMachine'

export default class Earnings extends PIXI.Container {
    private container: PIXI.Container

    constructor (machine: SlotMachine) {
        super()

        this.container = new PIXI.Container()
    
        const img = PIXI.Sprite.from('../src/assets/images/coin.png');
        img.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;

        img.width = 50
        img.height = 61
        img.x=5
        this.container.addChild(img)

        // Add play text
        const style = new PIXI.TextStyle({
            fontFamily: 'Arial',
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
        });
    
        const playText = new PIXI.Text('5000000', style);
    
        playText.x = 68
        playText.y = 9
        this.container.addChild(playText)
        this.addChild(this.container)
        this.container.position.set((import.meta.env.VITE_APP_WIDTH - this.container.width)/2, 60)
    }

}
