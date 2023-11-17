import * as PIXI from 'pixi.js'
import MainButton from './MainButton'
import Balance from './Balance'
import Bet from './Bet'
import type SlotMachine from '../slot-machine/SlotMachine'

export default class ControlPanel extends PIXI.Container {
    private container: PIXI.Container
    private button: MainButton
    private bet: Bet
    private balance: Balance

    constructor (machine: SlotMachine) {
        super()
        const appHeight = import.meta.env.VITE_APP_HEIGHT
        const appWidth = import.meta.env.VITE_APP_WIDTH

        this.container = new PIXI.Container()
        this.addChild(this.container)

        const marginX = 0
        const marginY = 38

        const bottom: PIXI.Graphics = new PIXI.Graphics()
        bottom.beginFill(0x000000)
        bottom.drawRect(marginX, appHeight - marginY, appWidth - marginX*2, 38)
        bottom.endFill()
        bottom.alpha = 0.5

        this.container.addChild(bottom)
        this.balance = new Balance()
        this.balance.position.set(marginX + 10, appHeight - marginY)
        this.container.addChild(this.balance)

        this.bet = new Bet()
        this.bet.position.set(marginX + 200, appHeight - marginY)
        this.container.addChild(this.bet)

        this.button = new MainButton(machine.startPlay)
        this.button.x = appWidth - 100
        this.button.y = appHeight - 70

        this.addChild(this.button)

    }

    getButton = (): MainButton => {
        return this.button
    }

    setBalance = (x:number): void => {
        this.balance.setBalance(x)
    }
}
