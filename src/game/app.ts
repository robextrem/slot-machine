import * as PIXI from 'pixi.js'
import PixiApp from './PixiApp.ts'
import { Engine } from '@babylonjs/core/Engines/engine'
import { Vector3 } from '@babylonjs/core/Maths/math'
import { Color4 } from '@babylonjs/core/Maths/math.color'
import { Scene } from '@babylonjs/core/scene'
import { UniversalCamera } from '@babylonjs/core/Cameras/universalCamera'
import '@babylonjs/core/Loading/loadingScreen'
import '@babylonjs/core/Audio/audioSceneComponent'
import '@babylonjs/core/Materials/standardMaterial'

export default class App {
	private canvas: HTMLCanvasElement
	private engine: Engine
	private scene: Scene
	private pixiApp: PixiApp

	constructor() {

		this.canvas = this.createCanvas()
		this.engine = new Engine(this.canvas, true)
		this.scene = new Scene(this.engine)
		this.pixiApp = new PixiApp(this.canvas)

		const renderingCanvas = this.engine.getRenderingCanvas()
		
		if (!renderingCanvas) 
			throw new Error('No rendering canvas found')

		this.pixiApp.renderer = new PIXI.Renderer({
			context: this.engine._gl,
			resolution: 1,
			clearBeforeRender: true,
			view: renderingCanvas,
			width: this.engine.getRenderWidth(),
			height: this.engine.getRenderHeight()
		})

		this.pixiApp.setStage()
		this.pixiApp.bindDevTools()

		void this.main()
	}

	private createCanvas(): HTMLCanvasElement {
		const canvas = document.querySelector('#canvas') as HTMLCanvasElement
		return canvas
	}

	private async goToStart():Promise<void> {
		this.engine.displayLoadingUI()

		const scene = new Scene(this.engine)
		scene.autoClear = false

		this.scene.detachControl()
		const camera = new UniversalCamera(
			'MainCamera',
			new Vector3(0, 0, -10),
			scene,
		)
		camera.setTarget(Vector3.Zero())
		scene.clearColor = new Color4(0,0,0,0.0000000000000001)

		/*
		const mainGameScene = new MainGame(scene);
		await mainGameScene.load(); */

		await scene.whenReadyAsync()
		this.engine.hideLoadingUI()
		this.scene.dispose()

		this.scene = scene
	}

	private resize = ():void => {
		this.engine.resize()
		this.pixiApp.resize()
	}

	private async main():Promise<void> {
		await this.goToStart()

		this.engine.runRenderLoop(() => {

			if(import.meta.env.VITE_APP_FPS === 'on'){
				this.pixiApp.counter.setFPS(this.engine.getFps())
			}

			if (this.engine.webGLVersion === 2) {
				this.pixiApp.renderer.reset()
			}

			this.scene.render()
			// this.engine.wipeCaches(true);
			this.pixiApp.render()

		})

		window.addEventListener('resize', this.resize)
		this.resize()
	}
}