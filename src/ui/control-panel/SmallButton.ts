import * as PIXI from 'pixi.js'
import { lightTextStyle } from '../../helpers/textStyles'

export default class SmallButton extends PIXI.Container {
    private container: PIXI.Container
    private text: PIXI.Text
    private bg: PIXI.Graphics 
    private value: string
    private state: string = 'idle'

    constructor (value:string, cb:() => void) {
        super()
        this.value=value
        const lightStyle = new PIXI.TextStyle(lightTextStyle)

        this.container = new PIXI.Container()
        this.container.height=38

        this.bg = new PIXI.Graphics()
        this.bg.eventMode = 'static'
        this.bg.cursor = 'pointer'

        this.triggerState(this.state)

        this.bg.addEventListener('pointerover', ()=>{
            this.triggerState('hover')
        })

        this.bg.addEventListener('pointerout', ()=>{
            this.triggerState('idle')
        })

        this.bg.addEventListener('pointerdown', ()=>{
            this.triggerState('pressed', cb)
        })

        this.container.addChild(this.bg)
        this.text = new PIXI.Text(this.value, lightStyle)
        this.text.anchor.set(0.5, 0)
        this.text.y+=1

        this.container.addChild(this.text)
        this.addChild(this.container)
    }

    triggerState = (state: string, cb: () => void = () => {}): void => {
        switch (state) {
            case 'pressed':{
                this.state = 'pressed'
                break
            }
            case 'hover':{
                this.state = 'hover'
                this.bg.clear()
                this.bg.lineStyle(2, 0xc1c6d3, 0.5)
                this.bg.beginFill(0x191D23, 1)
                this.bg.drawCircle(0, 18, 14)
                this.bg.endFill()
                break
            }
            case 'idle':{
                this.state = 'idle'
                this.bg.clear()
                this.bg.lineStyle(2, 0xc1c6d3, 0.25)
                this.bg.beginFill(0x191D23, 0.65)
                this.bg.drawCircle(0, 18, 14)
                this.bg.endFill()
                break
            }
        }
        cb()
    }

}
