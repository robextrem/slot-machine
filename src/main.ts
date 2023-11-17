import App from './game/App'
import PixiApp from './game/PixiApp'
import './assets/sass/styles.scss'

const init = ():void => {
    if(import.meta.env.VITE_APP_ENGINE==='pixi'){
        const canvas = document.querySelector('#canvas') as HTMLCanvasElement

        const app = new PixiApp(canvas)
        app.setStage()
        app.bindDevTools()
        app.render()
        window.onresize = app.resize

    }else{
        // eslint-disable-next-line no-new
        new App()
    }
}

init()
