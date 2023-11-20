import { Container, Text, Sprite } from 'pixi.js'
import { type IScene, Manager } from '../game/Manager'
import { buttonTextStyle } from '../helpers/textStyles'
import GameScene from './GameScene'

export class MainScreenScene extends Container implements IScene {
    private button: Sprite

    constructor() {
        super()
        const appHeight = import.meta.env.VITE_APP_HEIGHT
        const appWidth = import.meta.env.VITE_APP_WIDTH

        const img =     Sprite.from('assets/images/main.png')
        img.width = import.meta.env.VITE_APP_WIDTH
        img.height = import.meta.env.VITE_APP_HEIGHT
        img.anchor.set(0.5)
        img.position.set(import.meta.env.VITE_APP_WIDTH / 2 , import.meta.env.VITE_APP_HEIGHT / 2)

        this.addChild(img)

        this.button = Sprite.from('../src/assets/images/button.png')
        this.button.eventMode = 'static'
        this.button.cursor = 'pointer'
        this.button.width=220
        this.button.height=91
        this.button.position.set(appWidth/2 - 110, appHeight/2 - 45)

        const playText = new Text('Start the Game', buttonTextStyle)
        playText.eventMode = 'static'
        playText.cursor = 'pointer'
        playText.position.set(110, 45)
        playText.anchor.set(0.5)

        this.button.on('pointertap',this.gameLoaded)
        this.button.addChild(playText)
        this.addChild(this.button)
    }

    private gameLoaded(): void {
        Manager.changeScene(new GameScene())
    }

    public update(_framesPassed: number): void {
    }
}