import type BalanceResponse from '../../src/types/BalanceResponse'

const generateBalance = (): BalanceResponse => {
  return {
    type: 'balance',
    balance: Number(process.env.VITE_APP_INITIAL_BALANCE) ?? 0,
  }
}

export { generateBalance }
