const generatePaylines = ():any => {
    return {
        type: 'symbols',
        data:  {
            symbols:getRandomSymbols(3,5,6)
        }
    }
}

const getRandomSymbols = (x:number, y:number, n:number): number[][] => {
    return Array(x).fill(null).map(() =>
        Array(y).fill(null).map(() =>
        Math.floor(Math.random() * (n + 1))
        )
    );
}

export { generatePaylines }