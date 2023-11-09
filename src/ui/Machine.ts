import * as PIXI from 'pixi.js'
import ReelGroup from './ReelGroup'
import ControlPanel from './ControlPanel'

export default class Machine extends PIXI.Container {
    private reelGroup: ReelGroup
    private panel: ControlPanel
    private container: PIXI.Container

    constructor (width: number, height: number) {
        super()
        this.container = new PIXI.Container()
        this.addChild(this.container)

        this.reelGroup = new ReelGroup(width, height)
        this.container.addChild(this.reelGroup)

        this.panel = new ControlPanel(width, height)
        this.container.addChild(this.panel)
    }
}
