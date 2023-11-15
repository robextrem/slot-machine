export default class User{
    private balance = 0 as number
    private lastRoundStake = 0 as number
    private lastRoundWinning = 0 as number

    constructor(balance:number, lastRoundStake:number, lastRoundWinning:number){
        this.balance = balance
        this.lastRoundStake = lastRoundStake
        this.lastRoundWinning = lastRoundWinning
    }

    setBalance=(balance:number):void => {
        this.balance = balance
    }

    setLastRoundStake=(lastRoundStake:number):void => {
        this.lastRoundStake = lastRoundStake
    }

    setLastRoundWinning=(lastRoundWinning:number):void => {
        this.lastRoundWinning = lastRoundWinning
    }
}