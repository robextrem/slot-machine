import * as PIXI from 'pixi.js'
import Item from './Item'
import type SlotMachine from '../slot-machine/SlotMachine'

export default class Dropdown extends PIXI.Container {
    private items: Item[] = []
    constructor (x:number, y:number, machine:SlotMachine) {
        super()
        this.visible=false

        this.position.set(x,y)

        const cheatItems = [
            {
                text: 'Regular Spin',
                request: 'symbols',
                selected: true
            },
            {
                text: '1pl: 3sym',
                request: '1pl3sym',
                selected: false
            },
            {
                text: '1pl: 4sym',
                request: '1pl4sym',
                selected: false       
            },
            {
                text: '1ply: 5sym',
                request: '1pl5sym',
                selected: false     
            },
            {
                text: '2ply: 3 & 9',
                request: '2pl39',
                selected: false
            },
            {
                text: '2ply: 5 & 8',
                request: '2pl58',
                selected: false
            },
            {
                text: '2ply: 3 & 10',
                request: '2pl310',
                selected: false
            },
            {
                text: '3ply: 3 & 6 & 7',
                request: '3pl367',
                selected: false     
            },
        ]

        cheatItems.forEach((_,i)=>{
            const item = new Item(_.text, _.selected,()=>{
                this.items.forEach((i)=>{
                    i.setIsActive(false)
                })
                machine.setRequestType(_.request)
            })
            item.position.set(0, 40*i)
            this.items.push(item)
            this.addChild(item)
        })
    }

    toggleVisible = ():void =>{
        this.visible = !this.visible
    }

    
}


