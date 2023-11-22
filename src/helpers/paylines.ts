import type Payline from '../types/Payline'

const paylines =[
    [{x:0,y:0},{x:1,y:0},{x:2,y:0},{x:3,y:0},{x:4,y:0}],
    [{x:0,y:1},{x:1,y:1},{x:2,y:1},{x:3,y:1},{x:4,y:1}],
    [{x:0,y:2},{x:1,y:2},{x:2,y:2},{x:3,y:2},{x:4,y:2}],
    [{x:0,y:0},{x:1,y:1},{x:2,y:2},{x:3,y:1},{x:4,y:0}],
    [{x:0,y:2},{x:1,y:1},{x:2,y:0},{x:3,y:1},{x:4,y:2}],
    [{x:0,y:0},{x:1,y:0},{x:2,y:1},{x:3,y:0},{x:4,y:0}],
    [{x:0,y:2},{x:1,y:2},{x:2,y:1},{x:3,y:2},{x:4,y:2}],
    [{x:0,y:1},{x:1,y:2},{x:2,y:2},{x:3,y:2},{x:4,y:1}],
    [{x:0,y:1},{x:1,y:0},{x:2,y:0},{x:3,y:0},{x:4,y:1}],
    [{x:0,y:1},{x:1,y:0},{x:2,y:1},{x:3,y:0},{x:4,y:1}],
]

const getRandomSymbols = (x:number,y:number,n:number): number[][] => {
    return Array(x).fill(null).map(() =>
        Array(y).fill(null).map(() =>
        Math.floor(Math.random() * n)
        )
    )
}

const getVisibleLines = (lines:number[][]): number[][] => {
    return lines.slice((lines.length - 1) / 2 - 1, (lines.length - 1) / 2 + 2)
}

const getPaylines = (lines:number[][]):Payline[] => {
    const winningLines: Payline[] = []
    // lines = getVisibleLines(lines)
    paylines.forEach((payline, i) => {
        const line = [] as number[]
        payline.forEach(p => {
            line.push(lines[p.y][p.x])
        })

        const symbol = line[0]
        let frequency = 0
    
        for(const l of line){
            if(symbol === l){
                frequency++
            }else{
                break
            }
        }
    
        if(frequency >= 3){
            winningLines.push({
                win:true,
                symbol,
                frequency,
                payline,
                index: i+1
            })
        }
    
    })

    return winningLines
}

export {getRandomSymbols, getVisibleLines, getPaylines}