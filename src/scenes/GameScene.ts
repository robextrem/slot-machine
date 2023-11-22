import { Container } from 'pixi.js'
import { type IScene } from '../game/Manager'
import SlotMachine from '../ui/slot-machine/SlotMachine'

export default class GameScene extends Container implements IScene {
  constructor() {
    super()
    const machine = new SlotMachine(540, 275)
    this.addChild(machine)
  }

  public update(_framesPassed: number): void {}
}
