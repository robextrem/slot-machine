import type * as PIXI from 'pixi.js'

const labelTextStyle: Partial<PIXI.ITextStyle> = {
    fontFamily: ['Roboto Slab', 'Helvetica'],
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fill: ['#D1CFCF', '#D8D1CD'], // gradient
    stroke: '#222222',
    strokeThickness: 2,
    dropShadow: true,
    dropShadowColor: '#111111',
    dropShadowBlur: 1,
    dropShadowAngle: Math.PI / 2,
    dropShadowDistance: 2,
    wordWrap: true
}

const goldenTextStyle: Partial<PIXI.ITextStyle> = {
    fontFamily: ['Roboto Slab', 'Helvetica'],
    fontSize: 26,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fill: ['#B06830', '#FEDF6C'], // gradient
    stroke: '#FDD16B',
    strokeThickness: 2,
    dropShadow: true,
    dropShadowColor: '#111111',
    dropShadowBlur: 1,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 4,
    wordWrap: true
}

const lightTextStyle: Partial<PIXI.ITextStyle> = {
    fontFamily: ['Roboto Slab', 'Helvetica'],
    fontSize: 24,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fill: ['#c1c6d3', '#aecae9'], // gradient
    stroke: '#222222',
    strokeThickness: 2,
    dropShadow: true,
    dropShadowColor: '#111111',
    dropShadowBlur: 1,
    dropShadowAngle: Math.PI / 2,
    dropShadowDistance: 2,
    wordWrap: true
}

export { labelTextStyle, goldenTextStyle, lightTextStyle }