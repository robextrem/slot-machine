import * as PIXI from 'pixi.js'
import Item from './Item'

export default class Dropdown extends PIXI.Container {
    constructor (x:number, y:number) {
        super()
        this.visible=false

        this.position.set(x,y)

        const items = [
            {
                text: 'Regular Spin'
            },
            {
                text: '1ply: 3sym'
            },
            {
                text: '1ply: 4sym'       
            },
            {
                text: '1ply: 5sym'       
            },
            {
                text: 'Multi-win'
            },
        ]

        items.forEach((_,i)=>{
            const item = new Item(_.text, i)
            item.position.set(0, 40*i)
            this.addChild(item)
        })
    }

    toggleVisible = ():void =>{
        this.visible = !this.visible
    }
}


