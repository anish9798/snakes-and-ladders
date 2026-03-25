'use client'

import { Dispatch, SetStateAction } from 'react'
import { GameState } from '@/types/game'
import { getBoardPosition, snakesAndLadders } from '@/utils/gameLogic'
import { motion } from 'framer-motion'

interface GameBoardProps {
  gameState: GameState
  setGameState: Dispatch<SetStateAction<GameState>>
}

export default function GameBoard({ gameState }: GameBoardProps) {
  const renderCell = (cellNumber: number) => {
    const snakeOrLadder = snakesAndLadders.find(item => item.start === cellNumber)
    const playersOnCell = gameState.players.filter(p => p.position === cellNumber)
    
    const isSpecialCell = snakeOrLadder !== undefined
    const cellColor = isSpecialCell
      ? snakeOrLadder.type === 'snake'
        ? 'bg-red-50 dark:bg-red-900/20'
        : 'bg-green-50 dark:bg-green-900/20'
      : cellNumber % 2 === 0
      ? 'bg-purple-50 dark:bg-purple-900/20'
      : 'bg-pink-50 dark:bg-pink-900/20'

    return (
      <div
        key={cellNumber}
        className={`relative aspect-square ${cellColor} border border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center transition-colors`}
      >
        <span className="absolute top-1 left-1 text-xs font-bold text-gray-600 dark:text-gray-400">
          {cellNumber}
        </span>
        
        {snakeOrLadder && (
          <div className="text-2xl">
            {snakeOrLadder.type === 'snake' ? '🐍' : '🪜'}
          </div>
        )}
        
        {playersOnCell.length > 0 && (
          <div className="absolute bottom-1 right-1 flex gap-0.5">
            {playersOnCell.map(player => (
              <motion.div
                key={player.id}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-6 h-6 rounded-full border-2 border-white shadow-lg"
                style={{ backgroundColor: player.color }}
              />
            ))}
          </div>
        )}
        
        {snakeOrLadder && (
          <div className="absolute bottom-0 right-0 text-[8px] bg-white dark:bg-gray-800 px-1 rounded-tl text-gray-600 dark:text-gray-400">
            →{snakeOrLadder.end}
          </div>
        )}
      </div>
    )
  }

  const renderBoard = () => {
    const rows = []
    for (let row = 9; row >= 0; row--) {
      const cells = []
      for (let col = 0; col < 10; col++) {
        const isEvenRow = (9 - row) % 2 === 0
        const actualCol = isEvenRow ? col : 9 - col
        const cellNumber = row * 10 + actualCol + 1
        cells.push(renderCell(cellNumber))
      }
      rows.push(
        <div key={row} className="grid grid-cols-10 gap-1">
          {cells}
        </div>
      )
    }
    return rows
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-4 md:p-6">
      <div className="space-y-1">
        {renderBoard()}
      </div>
      
      <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
        <div className="flex items-center gap-2 bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
          <span className="text-2xl">🪜</span>
          <span className="text-gray-700 dark:text-gray-300 font-semibold">Ladders: Move Up!</span>
        </div>
        <div className="flex items-center gap-2 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
          <span className="text-2xl">🐍</span>
          <span className="text-gray-700 dark:text-gray-300 font-semibold">Snakes: Move Down!</span>
        </div>
      </div>
    </div>
  )
}
