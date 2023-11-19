import { Container, Text } from 'pixi.js'
import { type IScene, Manager } from '../game/Manager'
import GameScene from './GameScene'

export class MainScreenScene extends Container implements IScene {

    constructor() {
        super()
        const appHeight = import.meta.env.VITE_APP_HEIGHT
        const appWidth = import.meta.env.VITE_APP_WIDTH

        const playText = new Text('Start the Game')
        playText.eventMode = 'static'
        playText.cursor = 'pointer'
        playText.on('pointertap',this.gameLoaded)
        playText.position.set(appWidth/2, appHeight/2)
        playText.anchor.set(0.5)
        this.addChild(playText)
    }

    private gameLoaded(): void {
        Manager.changeScene(new GameScene())
    }

    public update(_framesPassed: number): void {
    }
}