import * as PIXI from 'pixi.js'

export default class Balance extends PIXI.Container {
    private container: PIXI.Container
    private label: string = 'Balance'

    constructor () {
        super()
        this.container = new PIXI.Container()

        // Add play text
        const style = new PIXI.TextStyle({
            fontFamily: ['Roboto Slab', 'Helvetica'],
            fontSize: 20,
            fontStyle: 'normal',
            fontWeight: 'bold',
            fill: ['#D1CFCF', '#D8D1CD'], // gradient
            stroke: '#7F7870',
            strokeThickness: 2,
            dropShadow: true,
            dropShadowColor: '#111111',
            dropShadowBlur: 1,
            dropShadowAngle: Math.PI / 2,
            dropShadowDistance: 2,
            wordWrap: true
        });
    
        const playText = new PIXI.Text(this.label, style);
        playText.y+=4
    
        this.container.addChild(playText)


        const style2 = new PIXI.TextStyle({
            fontFamily: ['Roboto Slab', 'Helvetica'],
            fontSize: 28,
            fontStyle: 'normal',
            fontWeight: 'bold',
            fill: ['#B06830', '#FEDF6C'], // gradient
            stroke: '#FDD16B',
            strokeThickness: 2,
            dropShadow: true,
            dropShadowColor: '#111111',
            dropShadowBlur: 1,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 4,
            wordWrap: true
        });

        const playText2 = new PIXI.Text('50000', style2);
        playText2.x=90
        this.container.addChild(playText2)

        this.addChild(this.container)
    }

}
