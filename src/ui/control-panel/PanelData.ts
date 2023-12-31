import * as PIXI from 'pixi.js'
import InfoBlock from './InfoBlock'
import Bet from './Bet'

export default class PanelData extends PIXI.Container {
  private container: PIXI.Container
  private bet: Bet
  private balance: InfoBlock
  private lastWin: InfoBlock
  private lastBet: InfoBlock

  constructor() {
    super()
    const appWidth = Number(import.meta.env.VITE_APP_WIDTH)
    const margin = Number(import.meta.env.VITE_APP_INFO_BLOCK_MARGIN)
    const width = (appWidth * 0.8) / 4 // 80% de la pantalla

    this.container = new PIXI.Container()
    this.addChild(this.container)

    this.balance = new InfoBlock('Balance', '0')
    this.balance.position.set(width * 0 + margin, 0)
    this.container.addChild(this.balance)

    this.lastWin = new InfoBlock('Last Win', '0')
    this.lastWin.position.set(width + margin, 0)
    this.container.addChild(this.lastWin)

    this.lastBet = new InfoBlock('Last Bet', '0')
    this.lastBet.position.set(width * 2 + margin, 0)
    this.container.addChild(this.lastBet)

    this.bet = new Bet()
    this.bet.position.set(width * 3 + margin, 0)
    this.container.addChild(this.bet)
  }

  getBalance = (): InfoBlock => {
    return this.balance
  }

  getLastWin = (): InfoBlock => {
    return this.lastWin
  }

  getLastBet = (): InfoBlock => {
    return this.lastBet
  }

  getBet = (): Bet => {
    return this.bet
  }
}
