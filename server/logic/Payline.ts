import { getRandomSymbols } from '../../src/helpers/paylines.ts'

const generatePaylines = ():any => {
    const x = Number(process.env.VITE_APP_NUM_SLOTS)+2 || 5
    const y = Number(process.env.VITE_APP_NUM_REELS) || 5
    const n = Number(process.env.VITE_APP_NUM_SLOT_SYMBOLS) || 5

    return {
        type: 'symbols',
        data:  {
            symbols: getRandomSymbols(x,y,n)
            // symbols : getLines()
        }
    }
}

const getLines = (): number[][] => {
    return [
        [0,0,0,0,0],
        [1,2,1,1,1],
        [2,2,2,2,2],
        [3,2,3,5,3],
        [4,4,4,4,4],
    ]
}

export { generatePaylines, getLines }