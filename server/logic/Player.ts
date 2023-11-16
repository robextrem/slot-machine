const generateBalance = ():any => {
    return {
        type: "balance",
        data: {
            balance: 1200
        }
    }
}

export { generateBalance }