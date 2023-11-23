import './assets/sass/styles.scss'
import { Manager } from './game/Manager'
import { LoaderScene } from './scenes/LoaderScene'

const canvas = document.querySelector('#canvas') as HTMLCanvasElement
Manager.initialize(canvas)
const loader: LoaderScene = new LoaderScene()
Manager.changeScene(loader)
