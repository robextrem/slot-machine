import './assets/sass/styles.scss'
import { Manager } from './game/Manager'
import { MainScreenScene } from './scenes/MainScreenScene'

const canvas = document.querySelector('#canvas') as HTMLCanvasElement
Manager.initialize(canvas)
const main: MainScreenScene = new MainScreenScene()
Manager.changeScene(main)
