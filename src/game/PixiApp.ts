import * as PIXI from 'pixi.js'

export default class PixiApp extends PIXI.Application {
  constructor(canvas: HTMLCanvasElement) {
    const appHeight = import.meta.env.VITE_APP_HEIGHT
    const appWidth = import.meta.env.VITE_APP_WIDTH

    super({
      view: canvas,
      background: '#000000',
      height: appHeight,
      width: appWidth,
      resolution: window.devicePixelRatio || 1,
      autoDensity: true,
    })

    this.bindDevTools()
  }

  bindDevTools = (): void => {
    /* @ts-expect-error */
    globalThis.__PIXI_APP__ = this
  }
}
