import type Coord from './Coord'

interface Payline {
  win: boolean
  index: number
  payline: Coord[]
  frequency: number
  symbol: number
}

export default Payline
