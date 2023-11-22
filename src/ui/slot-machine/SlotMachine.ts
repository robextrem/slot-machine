import * as PIXI from 'pixi.js'
import ReelGroup from './ReelGroup'
import ControlPanel from '../control-panel/ControlPanel'
import CheatPanel from '../layout/CheatPanel'
import Close from '../layout/Close'
import Earnings from './Earnings'
import FpsCounter from '../../game/FpsCounter'
import GameSocket from '../../ws/GameSocket'
import { winnerTextStyle } from '../../helpers/textStyles'
import { getRandomSymbols, getVisibleLines, getPaylines } from '../../helpers/paylines'

export default class SlotMachine extends PIXI.Container {
    private reelGroup: ReelGroup
    private panel: ControlPanel
    private cheatPanel: CheatPanel
    private close: Close
    private earnings: Earnings
    private container: PIXI.Container
    private gameSocket: GameSocket
    private winningSign: PIXI.Text
    private requestType: string
    private lastBet: number

    constructor (width: number, height: number) {
        super()
        const appHeight = import.meta.env.VITE_APP_HEIGHT
        const appWidth = import.meta.env.VITE_APP_WIDTH

        this.lastBet=0

        const img = PIXI.Sprite.from('assets/images/bg.png')
        img.width = appWidth
        img.height = appHeight
        img.anchor.set(0.5)
        img.position.set(appWidth/ 2 , appHeight / 2)

        this.addChild(img)

        this.container = new PIXI.Container()
        this.addChild(this.container)

        this.reelGroup = new ReelGroup(width, height)
        this.container.addChild(this.reelGroup)

        this.earnings = new Earnings()
        this.container.addChild(this.earnings)

        this.panel = new ControlPanel(this)
        this.container.addChild(this.panel)

        this.close = new Close(this)
        this.container.addChild(this.close)

        this.gameSocket = new GameSocket(this)

        this.requestType='symbols'

        if(import.meta.env.VITE_APP_FPS === 'on'){
            this.addFPS()
        }

        if(import.meta.env.VITE_APP_USE_WEB_SOCKET === 'on' && !this.gameSocket.isClosed()){
            this.gameSocket.init()
        }
        
        this.cheatPanel = new CheatPanel(this)
        this.container.addChild(this.cheatPanel)

        const style = new PIXI.TextStyle(winnerTextStyle)
        this.winningSign = new PIXI.Text('WIN!', style)
        this.winningSign.visible=false
        this.winningSign.position.set(appWidth/2, 45)
        this.winningSign.anchor.set(0.5)
        this.addChild(this.winningSign)

    }

    startPlay = (): void => {
        this.setBet()
        if(import.meta.env.VITE_APP_USE_WEB_SOCKET === 'on' && !this.gameSocket.isClosed()){
            this.gameSocket.requestSymbols(this.requestType)
        }else{
            const x = Number(import.meta.env.VITE_APP_NUM_SLOTS) + 2
            const y = Number(import.meta.env.VITE_APP_NUM_REELS)
            const n = Number(import.meta.env.VITE_APP_NUM_SLOT_SYMBOLS)

            this.reelGroup.setSymbols(getRandomSymbols(x,y,n))
            this.startSpin()
        }
    }

    setBet = (): void =>{
        const currentBalance:number = this.panel.getPanelData().getBalance().getValue()
        this.lastBet = this.panel.getPanelData().getBet().getValue()
        this.panel.getPanelData().getBalance().setValue(currentBalance - this.lastBet)
    }

    startSpin = (): void => {
        const duration = import.meta.env.VITE_APP_SPIN_DURATION
        const delay = import.meta.env.VITE_APP_SPIN_DELAY
        const reels = this.reelGroup.getReels()
        this.earnings.setVisible(false)
        this.winningSign.visible=false

        reels.forEach((reel, i) => {
            reel.resetSlots()
            reel.spin(duration, delay, () => {
                if(i === import.meta.env.VITE_APP_NUM_REELS - 1){
                    this.panel.getButton().changeState('idle')
                    this.checkPaylines()
                }
            })
        })
    }

    checkPaylines = ():void =>{
        const lines = getVisibleLines(this.reelGroup.getSymbols())
        const paylines = getPaylines(lines)
        const panelData = this.panel.getPanelData()

        const currentBalance:number = panelData.getBalance().getValue()

        /** Esta es la condición de victoria */
        if(paylines.length>0){
            let stake = this.lastBet

            paylines.forEach((payline)=>{
                const multiplier = (payline.frequency / 2.5) - 1
                stake += this.lastBet * multiplier
            })

            panelData.getBalance().setValue(Math.ceil(currentBalance + stake))
            panelData.getLastWin().setValue(stake)

            this.earnings.setValue(stake)
            this.earnings.setVisible(true)
            this.winningSign.visible=true
            this.winningAnimation(paylines)
        }
        
        panelData.getLastBet().setValue(this.lastBet)
    }

    addFPS = ():void => {
        const counter = new FpsCounter()
        this.addChild(counter)
    }

    getGameSocket = (): GameSocket => {
        return this.gameSocket
    } 

    getControlPanel = (): ControlPanel => {
        return this.panel
    }

    getReelGroup = (): ReelGroup => {
        return this.reelGroup
    }

    setRequestType = (requestType:string):void =>{
        this.requestType=requestType
    }

    winningAnimation = (paylines:any):void =>{
        const reels = this.reelGroup.getReels()
        const colors = ['#6CD1FC', '#FF49BE', '#A44FE4', '#E2D3DB', '#63A6F5', '#FD442C', '#CC79C4']

        for(const p of paylines){
            const color = colors[p.symbol]
            for(const result of p.payline){               
                for(let i = 0; i<p.frequency; i++){
                    if(result.x === reels[i].index){
                        const slots = reels[i].getSlots()
                        slots.forEach((slot)=>{
                            if(slot.index===(result.y)){
                                slot.setWinning(true, color)
                             }  
                        })
                    }
                }
            }
        }
    }
}
