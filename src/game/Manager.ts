import type * as PIXI from 'pixi.js'
import PixiApp from './PixiApp'

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class Manager {
    private constructor() {

    }

    private static app: PIXI.Application
    private static currentScene: IScene

    private static _width: number
    private static _height: number


    public static get width(): number {
        return Manager._width
    }

    public static get height(): number {
        return Manager._height
    }

    public static initialize(canvas:HTMLCanvasElement): void {
        const appHeight = import.meta.env.VITE_APP_HEIGHT
        const appWidth = import.meta.env.VITE_APP_WIDTH

        Manager._width = appHeight
        Manager._height = appWidth

        const app = new PixiApp(canvas)

        Manager.app = app
        Manager.app.ticker.add(function(time){
            Manager.update(time)
        })

    }

    public static changeScene(newScene: IScene): void {
        if (Manager.currentScene) {
            Manager.app.stage.removeChild(Manager.currentScene)
            Manager.currentScene.destroy()
        }

        Manager.currentScene = newScene
        Manager.app.stage.addChild(Manager.currentScene)
    }

    private static update(framesPassed: number): void {
        if (Manager.currentScene) {
            Manager.currentScene.update(framesPassed)
        }
    }

}

export interface IScene extends PIXI.DisplayObject {
    update: (framesPassed: number) => void
}