import * as BABYLON from 'babylonjs'
import * as PIXI from 'pixi.js'
import Machine from '../modules/Machine'

const canvas = document.querySelector('#app') as HTMLCanvasElement
const engine = new BABYLON.Engine(canvas, true)

const createScene = (): any => {
  const scene = new BABYLON.Scene(engine)
  // 
  scene.autoClear = false
  scene.createDefaultCamera()
  return scene
}

const scene = createScene()

const app = new PIXI.Application({
    clearBeforeRender: false,
    view: engine.getRenderingCanvas() ?? canvas,
    background: '#fff',
    backgroundAlpha: 0,
    height: 600
})

/* @ts-expect-error */
globalThis.__PIXI_APP__ = app

engine.runRenderLoop(() => {
  scene.render()
  scene.clearColor = new BABYLON.Color4(0, 0, 0, 0)
  app.render()
})

const machine = new Machine(app.screen.width, 600)

app.stage.addChild(machine)

export { engine, app }
