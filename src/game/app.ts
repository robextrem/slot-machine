import { Engine } from "@babylonjs/core/Engines/engine";
import { Vector3 } from "@babylonjs/core/Maths/math";
import { Color4 } from "@babylonjs/core/Maths/math.color";
import { Scene } from "@babylonjs/core/scene";
import { UniversalCamera } from "@babylonjs/core/Cameras/universalCamera";
import "@babylonjs/core/Loading/loadingScreen";
import "@babylonjs/core/Audio/audioSceneComponent";
import "@babylonjs/core/Materials/standardMaterial";

import * as PIXI from "pixi.js";
import { MainGame } from "./scenes/MainGame.ts";
import { signature } from "./constants/Signature.ts";
import { PixiApp } from "./components/PixiApp.ts";
import { User } from "./game/User.ts";

class App {
	private canvas: HTMLCanvasElement;
	private engine: Engine;
	private scene: Scene;
	private pixiApp: PixiApp;

	private divFps: HTMLElement | null;

	constructor() {
		console.log(signature);

		this.canvas = this.createCanvas();
		this.engine = new Engine(this.canvas, true);
		this.scene = new Scene(this.engine);

		this.pixiApp = new PixiApp();

		const renderingCanvas = this.engine.getRenderingCanvas();
		if (!renderingCanvas) throw new Error("Can't find the rendering canvas");

		this.pixiApp.renderer = new PIXI.Renderer({
			context: this.engine._gl,
			resolution: 1,
			clearBeforeRender: false,
			view: renderingCanvas,
			width: this.engine.getRenderWidth(),
			height: this.engine.getRenderHeight(),
		});
		this.pixiApp.stage = new PIXI.Container();
		this.pixiApp.bindDevTools();

		this.divFps = document.getElementById("fps");

		if (!this.divFps) throw new Error("Can't find the FPS div label");

		window.addEventListener("keydown", event => {
			if (
				event.shiftKey &&
				event.ctrlKey &&
				event.altKey &&
				event.keyCode === 73 // i
			) {
				if (this.scene.debugLayer.isVisible()) {
					this.scene.debugLayer.hide();
				} else {
					this.scene.debugLayer.show().catch(e => {
						console.error(e);
					});
				}
			}
		});

		const user = new User();
		user.balance = 1000;

		void this.main();
	}

	private createCanvas(): HTMLCanvasElement {
		document.documentElement.style.overflow = "hidden";
		document.documentElement.style.width = "100%";
		document.documentElement.style.height = "100%";
		document.documentElement.style.margin = "0";
		document.documentElement.style.padding = "0";
		document.body.style.overflow = "hidden";
		document.body.style.width = "100%";
		document.body.style.height = "100%";
		document.body.style.margin = "0";
		document.body.style.padding = "0";

		// create the canvas html element and attach it to the webpage
		const canvas = document.createElement("canvas");
		canvas.style.width = "100%";
		canvas.style.height = "100%";
		canvas.id = "gameCanvas";
		document.body.appendChild(canvas);

		return canvas;
	}

	private async goToStart() {
		this.engine.displayLoadingUI();

		const scene = new Scene(this.engine);

		// -- SETUP SCENE --
		this.scene.detachControl();
		const camera = new UniversalCamera(
			"MainCamera",
			new Vector3(0, 0, -10),
			scene,
		);
		camera.setTarget(Vector3.Zero());
		scene.clearColor = new Color4(0.529, 0.807, 0.921, 1);

		const mainGameScene = new MainGame(scene);
		await mainGameScene.load();

		await scene.whenReadyAsync();
		this.engine.hideLoadingUI();
		this.scene.dispose();

		this.scene = scene;
	}

	private resize = () => {
		this.engine.resize();
		this.pixiApp.resize();
	};

	private async main() {
		await this.goToStart();

		// Register a render loop to repeatedly render the scene
		this.engine.runRenderLoop(() => {
			if (!this.divFps) throw new Error("Can't find the FPS div label");
			this.divFps.innerHTML = this.engine.getFps().toFixed() + " FPS";

			if (this.engine.webGLVersion === 1) {
				this.pixiApp.renderer.reset();
			}

			this.scene.render();
			this.engine.wipeCaches(true);

			this.pixiApp.render();
		});

		window.addEventListener("resize", this.resize);
		this.resize();
	}
}

new App();