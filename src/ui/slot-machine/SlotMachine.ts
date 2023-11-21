import * as PIXI from 'pixi.js'
import ReelGroup from './ReelGroup'
import ControlPanel from '../control-panel/ControlPanel'
import CheatPanel from '../layout/CheatPanel'
import Close from '../layout/Close'
import Earnings from './Earnings'
import FpsCounter from '../../game/FpsCounter'
import GameSocket from '../../ws/GameSocket'
import { getRandomSymbols, getVisibleLines, getPaylines } from '../../helpers/paylines'

export default class SlotMachine extends PIXI.Container {
    private reelGroup: ReelGroup
    private panel: ControlPanel
    private cheatPanel: CheatPanel
    private close: Close
    private earnings: Earnings
    private container: PIXI.Container
    private gameSocket: GameSocket
    private requestType: string
    private lastBet: number

    constructor (width: number, height: number) {
        super()

        const img = PIXI.Sprite.from('assets/images/bg.png')
        img.width = import.meta.env.VITE_APP_WIDTH
        img.height = import.meta.env.VITE_APP_HEIGHT
        img.anchor.set(0.5)
        img.position.set(import.meta.env.VITE_APP_WIDTH / 2 , import.meta.env.VITE_APP_HEIGHT / 2)

        this.addChild(img)

        this.container = new PIXI.Container()
        this.addChild(this.container)

        this.reelGroup = new ReelGroup(width, height)
        this.container.addChild(this.reelGroup)

        this.earnings = new Earnings()
        this.container.addChild(this.earnings)

        this.panel = new ControlPanel(this)
        this.container.addChild(this.panel)

        this.cheatPanel = new CheatPanel(this)
        this.container.addChild(this.cheatPanel)
        this.lastBet=0

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

        reels.forEach((reel, i) => {
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
        console.log(paylines)
        const currentBalance:number = panelData.getBalance().getValue()
        // Si p viene vacio, restarle al balance
        if(paylines.length>0){
            let stake = this.lastBet

            paylines.forEach((payline)=>{
                const multiplier = (payline.frequency / 2.5) - 1
                stake += this.lastBet * multiplier
            })

            panelData.getBalance().setValue(Math.ceil(currentBalance + stake))
            panelData.getLastWin().setValue(stake)
            panelData.getLastBet().setValue(this.lastBet)

            this.earnings.setValue(stake)
            this.earnings.setVisible(true)

        }else{
            panelData.getLastWin().setValue(0)
        }
    }

    addFPS = ():void => {
        const counter = new FpsCounter()
        this.addChild(counter)
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
}
