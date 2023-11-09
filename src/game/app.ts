import * as BABYLON from 'babylonjs'
import * as PIXI from 'pixi.js'
import { PixiFpsCounter } from 'pixi-fps-counter'
import Machine from '../ui/Machine'

const canvas = document.querySelector('#canvas') as HTMLCanvasElement
const engine = new BABYLON.Engine(canvas, true)
const appHeight = import.meta.env.VITE_APP_HEIGHT

const createScene = (): any => {
  const scene = new BABYLON.Scene(engine)
  scene.clearColor = new BABYLON.Color4(0, 0, 0, 0)
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
    height: appHeight
})

/* @ts-expect-error */
globalThis.__PIXI_APP__ = app

const counter = new PixiFpsCounter(app.ticker, {
  backgroundPadding: 0,
  dragParent: app.stage,
  textStyle: new PIXI.TextStyle({
    fill: '#000000',
    fontSize: 22,
    fontWeight: 'bolder',
    strokeThickness: 1
  }),
  updateCoefficient: 10
})

counter.position.set(0, appHeight - 30)

engine.runRenderLoop(() => {
  scene.render()
  app.render()
})

const machine = new Machine(app.screen.width, appHeight)

app.stage.addChild(machine)
app.stage.addChild(counter)

export { engine, app }
