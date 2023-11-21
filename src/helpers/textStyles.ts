import type * as PIXI from 'pixi.js'

const labelTextStyle: Partial<PIXI.ITextStyle> = {
    fontFamily: ['Roboto Slab', 'Helvetica'],
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fill: ['#D1CFCF', '#D8D1CD'],
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
    fontSize: 25,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fill: ['#B06830', '#FEDF6C'],
    stroke: '#FDD16B',
    strokeThickness: 1.8,
    dropShadow: true,
    dropShadowColor: '#000000',
    letterSpacing:1,
    dropShadowBlur: 1,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 4,
    wordWrap: true
}

const winnerTextStyle: Partial<PIXI.ITextStyle> = {
    fontFamily: ['Roboto Slab', 'Helvetica'],
    fontSize: 48,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fill: ['#198502', '#03FF9A'],
    stroke: '#038F4F',
    strokeThickness: 1.8,
    dropShadow: true,
    dropShadowColor: '#000000',
    letterSpacing:1,
    dropShadowBlur: 1,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 4,
    wordWrap: true
}

const goldenBigTextStyle: Partial<PIXI.ITextStyle> = {
    fontFamily: ['Roboto Slab', 'Helvetica'],
    fontSize: 40,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fill: ['#B06830', '#FEDF6C'],
    stroke: '#FDD16B',
    strokeThickness: 3,
    dropShadow: true,
    dropShadowColor: '#000000',
    letterSpacing:1,
    dropShadowBlur: 2,
    dropShadowAngle: Math.PI / 4,
    dropShadowDistance: 6,
    wordWrap: true
}

const lightTextStyle: Partial<PIXI.ITextStyle> = {
    fontFamily: ['Verdana', 'serif'],
    fontSize: 22,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fill: ['#c1c6d3', '#aecae9'],
    stroke: '#000',
    strokeThickness: 1,
    wordWrap: false
}

const dropdownTextStyle: Partial<PIXI.ITextStyle> = {
    fontFamily: ['Roboto Slab', 'Helvetica'],
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fill: ['#D1CFCF', '#D8D1CD'],
    stroke: '#000',
    strokeThickness: 1,
    dropShadow: false,
    wordWrap: true
}

const fpsTextStyle: Partial<PIXI.ITextStyle> = {
    fontFamily: ['Helvetica', 'serif'],
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fill: '#ffffff'
}

const buttonTextStyle: Partial<PIXI.ITextStyle> = {
    fontFamily: ['Roboto Slab','Helvetica Neue','Helvetica', 'serif'],
    fontSize: 22,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fill: ['#7D6001', '#A37F17'],
}

export { labelTextStyle, buttonTextStyle, winnerTextStyle, goldenTextStyle, goldenBigTextStyle, lightTextStyle, dropdownTextStyle, fpsTextStyle }