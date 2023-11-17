const generatePaylines = ():any => {
    const x = Number(process.env.VITE_APP_NUM_SLOTS) || 3
    const y = Number(process.env.VITE_APP_NUM_REELS) || 5
    const n = Number(process.env.VITE_APP_NUM_SLOT_SYMBOLS) || 5
  
    return {
        type: 'symbols',
        data:  {
            symbols: getRandomSymbols(x + 2, y, n)
            // symbols : getLines()
        }
    }
}

const getRandomSymbols = (x:number = 5, y:number = 5, n:number = 4): number[][] => {
    return Array(x).fill(null).map(() =>
        Array(y).fill(null).map(() =>
        Math.floor(Math.random() * n)
        )
    )
}

const getLines = (): number[][] => {
    return [
        [0,0,0,0,0],
        [1,2,1,1,1],
        [2,2,2,2,2],
        [3,3,3,5,3],
        [4,4,4,4,4],
    ]
}

export { generatePaylines, getRandomSymbols, getLines }