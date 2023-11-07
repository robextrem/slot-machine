import * as BABYLON from 'babylonjs'
import * as PIXI from 'pixi.js'
import Reel from './Reel'

const canvas = document.querySelector('#app') as HTMLCanvasElement
const engine = new BABYLON.Engine(canvas, true)

const createScene = (): any => {
  const scene = new BABYLON.Scene(engine)
  scene.createDefaultCamera()
  return scene
}

const scene = createScene()

engine.runRenderLoop(() => {
  scene.render()
  app.render()
})

const app = new PIXI.Application({
    clearBeforeRender: false,
    view: engine.getRenderingCanvas() ?? canvas,
    background: '#fff'
})

const reel = new Reel(96, 96, 0)
const reel2 = new Reel(96, 96, 1)
const reel3 = new Reel(96, 96, 2)

app.stage.addChild(reel)
app.stage.addChild(reel2)
app.stage.addChild(reel3)

export { engine, app }
