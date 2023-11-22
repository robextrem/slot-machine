import { getRandomSymbols } from '../../src/helpers/paylines.ts'

const generatePaylines = (message: string): any => {
  let response

  switch (message) {
    case 'symbols': {
      const x = Number(process.env.VITE_APP_NUM_SLOTS) + 2 || 5
      const y = Number(process.env.VITE_APP_NUM_REELS) || 5
      const n = Number(process.env.VITE_APP_NUM_SLOT_SYMBOLS) || 5

      response = {
        type: 'symbols',
        data: {
          symbols: getRandomSymbols(x, y, n),
        },
      }
      break
    }
    case '1pl3sym': {
      response = {
        type: 'symbols',
        data: {
          symbols: getLines1(),
        },
      }
      break
    }
    case '1pl4sym': {
      response = {
        type: 'symbols',
        data: {
          symbols: getLines2(),
        },
      }
      break
    }
    case '1pl5sym': {
      response = {
        type: 'symbols',
        data: {
          symbols: getLines4(),
        },
      }
      break
    }
    case '2pl39': {
      response = {
        type: 'symbols',
        data: {
          symbols: getLines3and9(),
        },
      }
      break
    }
    case '2pl58': {
      response = {
        type: 'symbols',
        data: {
          symbols: getLines5and8(),
        },
      }
      break
    }
    case '2pl310': {
      response = {
        type: 'symbols',
        data: {
          symbols: getLines3and10(),
        },
      }
      break
    }
    case '3pl367': {
      response = {
        type: 'symbols',
        data: {
          symbols: getLines3and6and7(),
        },
      }
      break
    }
  }

  return response
}

// Combinacion: 1 3sym
const getLines1 = (): number[][] => {
  return [
    [0, 0, 0, 0, 0],
    [1, 1, 1, 2, 4],
    [2, 0, 2, 2, 2],
    [3, 2, 3, 5, 3],
    [4, 4, 4, 4, 4],
  ]
}

// Combinacion: 2 4sym
const getLines2 = (): number[][] => {
  return [
    [0, 0, 0, 0, 0],
    [1, 4, 1, 1, 1],
    [2, 2, 2, 2, 5],
    [3, 2, 3, 5, 3],
    [4, 4, 4, 4, 4],
  ]
}

// Combinacion: 4 5sym
const getLines4 = (): number[][] => {
  return [
    [0, 0, 0, 0, 0],
    [4, 1, 1, 1, 4],
    [2, 4, 2, 4, 2],
    [3, 2, 4, 5, 3],
    [4, 4, 4, 4, 4],
  ]
}

const getLines3and10 = (): number[][] => {
  return [
    [0, 0, 0, 0, 0],
    [3, 5, 1, 5, 3],
    [5, 2, 5, 4, 1],
    [0, 0, 0, 0, 0],
    [4, 4, 4, 4, 4],
  ]
}

const getLines5and8 = (): number[][] => {
  return [
    [0, 0, 0, 0, 0],
    [3, 5, 0, 5, 3],
    [5, 0, 1, 0, 1],
    [0, 5, 5, 5, 0],
    [4, 4, 4, 4, 4],
  ]
}

const getLines3and9 = (): number[][] => {
  return [
    [0, 0, 0, 0, 0],
    [3, 1, 1, 1, 4],
    [1, 2, 5, 4, 1],
    [5, 5, 0, 5, 5],
    [4, 4, 4, 4, 4],
  ]
}

const getLines3and6and7 = (): number[][] => {
  return [
    [0, 0, 0, 0, 0],
    [3, 3, 1, 6, 5],
    [2, 4, 3, 4, 2],
    [3, 3, 3, 3, 0],
    [4, 4, 4, 4, 4],
  ]
}

export { generatePaylines }
