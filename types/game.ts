export interface Player {
  id: number
  name: string
  color: string
  position: number
}

export interface GameState {
  players: Player[]
  currentPlayerIndex: number
  gameStarted: boolean
  winner: Player | null
  diceValue: number | null
  isRolling: boolean
}

export interface SnakeOrLadder {
  start: number
  end: number
  type: 'snake' | 'ladder'
}
