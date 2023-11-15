import PixiApp from './game/PixiApp'
import './assets/sass/styles.scss'

const canvas = document.querySelector('#canvas') as HTMLCanvasElement

const app = new PixiApp(canvas)
app.setStage()
app.bindDevTools()
app.render()





