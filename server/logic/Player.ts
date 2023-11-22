const generateBalance = (): any => {
  return {
    type: 'balance',
    data: {
      balance: process.env.VITE_APP_INITIAL_BALANCE ?? 0,
    },
  }
}

export { generateBalance }
