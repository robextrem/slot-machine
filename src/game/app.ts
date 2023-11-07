import * as BABYLON from 'babylonjs'
import { Application, Graphics, Container, Texture, Text, TextStyle, Sprite, Assets, BlurFilter } from 'pixi.js'

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

const app = new Application({
    clearBeforeRender: false,
    view: engine.getRenderingCanvas() ?? canvas,
    background: '#fff'
})

const REEL_WIDTH = app.screen.width / 5
const SYMBOL_SIZE = 150

// onAssetsLoaded handler builds the example.
const onAssetsLoaded = (): void => {
    // Create different slot symbols.
    const slotTextures = [
        Texture.from('./src/assets/images/slot-machine/slot-symbol1.png'),
        Texture.from('./src/assets/images/slot-machine/slot-symbol2.png'),
        Texture.from('./src/assets/images/slot-machine/slot-symbol3.png'),
        Texture.from('./src/assets/images/slot-machine/slot-symbol4.png')
    ]

    // Build the reels
    const reels = [] as any[]
    const reelContainer = new Container()

    for (let i = 0; i < 5; i++) {
        const rc = new Container()

        rc.x = i * REEL_WIDTH
        reelContainer.addChild(rc)

        const reel = {
            container: rc,
            symbols: [],
            position: 0,
            previousPosition: 0,
            blur: new BlurFilter()
        }

        reel.blur.blurX = 0
        reel.blur.blurY = 0
        rc.filters = [reel.blur]

        // Build the symbols
        for (let j = 0; j < 4; j++) {
            const symbol = new Sprite(slotTextures[Math.floor(Math.random() * slotTextures.length)])
            // Scale the symbol to fit symbol area.
            symbol.y = j * SYMBOL_SIZE
            symbol.scale.x = symbol.scale.y = Math.min(SYMBOL_SIZE / symbol.width, SYMBOL_SIZE / symbol.height)
            symbol.x = Math.round((SYMBOL_SIZE - symbol.width) / 2)
            reel.symbols.push(symbol)
            rc.addChild(symbol)
        }
        reels.push(reel)
    }
    app.stage.addChild(reelContainer)

    // Build top & bottom covers and position reelContainer
    const margin = (app.screen.height - SYMBOL_SIZE * 3) / 2

    reelContainer.y = margin
    reelContainer.x = Math.round(app.screen.width - REEL_WIDTH * 5)

    const bottom = new Graphics()
    bottom.beginFill(0, 1)
    bottom.drawRect(0, SYMBOL_SIZE * 3 + margin, app.screen.width, margin)

    const button = new Graphics()
    button.beginFill('#2ECC71')
    button.drawRect(app.screen.width - 220, app.screen.height - 65, 180, 50)

    // Add play text
    const style = new TextStyle({
        fontFamily: 'Arial',
        fontSize: 16,
        fontWeight: 'bold',
        fill: ['#ffffff'],
        wordWrap: false
    })

    const playText = new Text('Ready to play!', style)
    playText.x = app.screen.width - 220
    playText.y = app.screen.height - 65
    button.addChild(playText)
    bottom.addChild(button)

    app.stage.addChild(bottom)

    // Set the interactivity.
    button.eventMode = 'static'
    button.cursor = 'pointer'
    button.addListener('pointerdown', () => {
        startPlay()
    })

    let running = false

    // Function to start playing.
    const startPlay = (): boolean => {
        if (running) {
            return false
        }

        running = true
        playText.text = 'Spinning...'
        button.beginFill('#f00')
        button.drawRect(app.screen.width - 220, app.screen.height - 65, 180, 40)

        for (let i = 0; i < reels.length; i++) {
            const r = reels[i]
            const extra = Math.floor(Math.random() * 3)
            const target = r.position + 10 + i * 5 + extra
            const time = 2500 + i * 600 + extra * 600

            tweenTo(r, 'position', target, time, backout(0.5), null, i === reels.length - 1 ? reelsComplete : null)
        }

        return true
    }

    // Reels done handler.
    const reelsComplete = (): void => {
        running = false
        playText.text = 'Click now!'
        button.beginFill('#F4CF3F')
        button.drawRect(app.screen.width - 220, app.screen.height - 65, 180, 10)
    }

    // Listen for animate update.
    app.ticker.add((delta) => {
    // Update the slots.
        for (let i = 0; i < reels.length; i++) {
            const r = reels[i]
            // Update blur filter y amount based on speed.
            // This would be better if calculated with time in mind also. Now blur depends on frame rate.

            r.blur.blurY = (r.position - r.previousPosition) * 8
            r.previousPosition = r.position

            // Update symbol positions on reel.
            for (let j = 0; j < r.symbols.length; j++) {
                const s = r.symbols[j]
                const prevy = s.y

                s.y = ((r.position + j) % r.symbols.length) * SYMBOL_SIZE - SYMBOL_SIZE
                if (s.y < 0 && prevy > SYMBOL_SIZE) {
                    // Detect going over and swap a texture.
                    // This should in proper product be determined from some logical reel.
                    s.texture = slotTextures[Math.floor(Math.random() * slotTextures.length)]
                    s.scale.x = s.scale.y = Math.min(SYMBOL_SIZE / s.texture.width, SYMBOL_SIZE / s.texture.height)
                    s.x = Math.round((SYMBOL_SIZE - s.width) / 2)
                }
            }
        }
    })
}

await Assets.load([
    './src/assets/images/slot-machine/slot-symbol1.png',
    './src/assets/images/slot-machine/slot-symbol2.png',
    './src/assets/images/slot-machine/slot-symbol3.png',
    './src/assets/images/slot-machine/slot-symbol4.png'
]).then(onAssetsLoaded)

// Very simple tweening utility function. This should be replaced with a proper tweening library in a real product.
const tweening = [] as any[]

function tweenTo(object, property, target, time, easing, onchange, oncomplete) {
    const tween = {
        object,
        property,
        propertyBeginValue: object[property],
        target,
        easing,
        time,
        change: onchange,
        complete: oncomplete,
        start: Date.now()
    }

    tweening.push(tween)

    return tween
}

// Listen for animate update.
app.ticker.add((delta) => {
    const now = Date.now()
    const remove = []

    for (let i = 0; i < tweening.length; i++) {
        const t = tweening[i]
        const phase = Math.min(1, (now - t.start) / t.time)

        t.object[t.property] = lerp(t.propertyBeginValue, t.target, t.easing(phase))
        if (t.change) t.change(t)
        if (phase === 1) {
            t.object[t.property] = t.target
            if (t.complete) t.complete(t)
            remove.push(t)
        }
    }

    for (let i = 0; i < remove.length; i++) {
        tweening.splice(tweening.indexOf(remove[i]), 1)
    }
})

// Basic lerp funtion.
const lerp = (a1, a2, t) => {
    return a1 * (1 - t) + a2 * t
}

// Backout function from tweenjs.
// https://github.com/CreateJS/TweenJS/blob/master/src/tweenjs/Ease.js
const backout = (amount) => {
    return (t) => (--t * t * ((amount + 1) * t + amount) + 1)
}

export { engine, app }
