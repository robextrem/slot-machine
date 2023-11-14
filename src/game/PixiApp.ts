import * as BABYLON from 'babylonjs'
import * as PIXI from 'pixi.js'
import { PixiFpsCounter } from 'pixi-fps-counter'
import SlotMachine from '../ui/SlotMachine'

const canvas = document.querySelector('#canvas') as HTMLCanvasElement
const engine = new BABYLON.Engine(canvas, true)
const appHeight = import.meta.env.VITE_APP_HEIGHT
const appWidth = import.meta.env.VITE_APP_WIDTH

const createScene = (): any => {
  const scene = new BABYLON.Scene(engine)
  scene.clearColor = new BABYLON.Color4(0, 0, 0, 0)
  scene.autoClear = false
  scene.createDefaultCamera()
  return scene
}

const scene = createScene()

const app = new PIXI.Application({
    view: engine.getRenderingCanvas() ?? canvas,
    background: '#1099bb',
    height: appHeight,
    width: appWidth
})

/* @ts-expect-error */
globalThis.__PIXI_APP__ = app

const counter = new PixiFpsCounter(app.ticker, {
  backgroundPadding: 0,
  backgroundColor: 0x1099bb,
  dragParent: app.stage,
  textStyle: new PIXI.TextStyle({
    fill: '#fff',
    fontSize: 18,
    fontWeight: 'bolder',
    strokeThickness: 1
  }),
  updateCoefficient: 10
})

counter.position.set(0, 0)

engine.runRenderLoop(() => {
  // scene.render()
  app.render()
})

const machine = new SlotMachine(540, 275)

app.stage.addChild(machine)
app.stage.addChild(counter)

export { engine, app }
