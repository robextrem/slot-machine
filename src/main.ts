import { engine, app } from './game/PixiApp'
import './assets/sass/styles.scss'

// Ajustar el tamaño del lienzo cuando cambia el tamaño de la ventana
window.addEventListener('resize', () => {
  engine.resize()
  app.renderer.resize(engine.getRenderWidth(), engine.getRenderHeight())
})
