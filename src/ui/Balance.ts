import * as PIXI from 'pixi.js'

export default class Balance extends PIXI.Container {
    private container: PIXI.Container
    private label: PIXI.Text
    private balanceText: PIXI.Text

    constructor () {
        super()
        this.container = new PIXI.Container()

        const style = new PIXI.TextStyle({
            fontFamily: ['Roboto Slab', 'Helvetica'],
            fontSize: 20,
            fontStyle: 'normal',
            fontWeight: 'bold',
            fill: ['#D1CFCF', '#D8D1CD'], // gradient
            stroke: '#222222',
            strokeThickness: 2,
            dropShadow: true,
            dropShadowColor: '#111111',
            dropShadowBlur: 1,
            dropShadowAngle: Math.PI / 2,
            dropShadowDistance: 2,
            wordWrap: true
        })
    
        this.label = new PIXI.Text('Balance', style)
        this.label.y+=4
    
        this.container.addChild(this.label)

        const style2 = new PIXI.TextStyle({
            fontFamily: ['Roboto Slab', 'Helvetica'],
            fontSize: 26,
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
        })

        this.balanceText = new PIXI.Text('0', style2)
        this.balanceText.x=90
        this.container.addChild(this.balanceText)

        this.addChild(this.container)
    }

    setBalance = (x:number): void => {
        this.balanceText.text = x
    }

}
