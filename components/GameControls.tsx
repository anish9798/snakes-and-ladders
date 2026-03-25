'use client'

import { useState, Dispatch, SetStateAction } from 'react'
import { GameState } from '@/types/game'
import { rollDice, calculateNewPosition, getSnakeOrLadder } from '@/utils/gameLogic'
import { Dices, RotateCcw, Trophy, Users } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface GameControlsProps {
  gameState: GameState
  setGameState: Dispatch<SetStateAction<GameState>>
  onResetGame: () => void
}

export default function GameControls({ gameState, setGameState, onResetGame }: GameControlsProps) {
  const [message, setMessage] = useState<string>('')

  const currentPlayer = gameState.players[gameState.currentPlayerIndex]

  const handleRollDice = () => {
    if (gameState.isRolling || gameState.winner) return

    setGameState({ ...gameState, isRolling: true })
    
    let rollCount = 0
    const rollInterval = setInterval(() => {
      const tempDice = rollDice()
      setGameState((prev: GameState) => ({ ...prev, diceValue: tempDice }))
      rollCount++
      
      if (rollCount >= 10) {
        clearInterval(rollInterval)
        const finalDice = rollDice()
        
        const newPosition = calculateNewPosition(currentPlayer.position, finalDice)
        const snakeOrLadder = getSnakeOrLadder(currentPlayer.position + finalDice)
        
        let msg = `${currentPlayer.name} rolled ${finalDice}!`
        
        if (snakeOrLadder) {
          if (snakeOrLadder.type === 'ladder') {
            msg += ` 🪜 Climbed a ladder to ${newPosition}!`
          } else {
            msg += ` 🐍 Hit a snake, down to ${newPosition}!`
          }
        } else if (newPosition === currentPlayer.position) {
          msg += ` Too high! Stay at ${currentPlayer.position}.`
        }
        
        setMessage(msg)
        
        const updatedPlayers = gameState.players.map(p =>
          p.id === currentPlayer.id ? { ...p, position: newPosition } : p
        )
        
        const hasWinner = newPosition === 100
        const nextPlayerIndex = hasWinner ? gameState.currentPlayerIndex : (gameState.currentPlayerIndex + 1) % gameState.players.length
        
        setTimeout(() => {
          setGameState({
            ...gameState,
            players: updatedPlayers,
            currentPlayerIndex: nextPlayerIndex,
            diceValue: finalDice,
            isRolling: false,
            winner: hasWinner ? currentPlayer : null,
          })
        }, 500)
      }
    }, 100)
  }

  return (
    <div className="space-y-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6">
        <div className="flex items-center justify-center mb-4">
          <Users className="w-6 h-6 text-purple-600 mr-2" />
          <h3 className="text-xl font-bold text-gray-800 dark:text-white">Players</h3>
        </div>
        
        <div className="space-y-3">
          {gameState.players.map((player, index) => (
            <div
              key={player.id}
              className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                index === gameState.currentPlayerIndex && !gameState.winner
                  ? 'bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/50 dark:to-pink-900/50 ring-2 ring-purple-500'
                  : 'bg-gray-50 dark:bg-gray-700'
              }`}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow-lg"
                style={{ backgroundColor: player.color }}
              >
                {player.position}
              </div>
              <div className="flex-1">
                <div className="font-semibold text-gray-800 dark:text-white">{player.name}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  Position: {player.position}/100
                </div>
              </div>
              {index === gameState.currentPlayerIndex && !gameState.winner && (
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                  className="text-xl"
                >
                  👉
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6">
        <AnimatePresence mode="wait">
          {gameState.winner ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-center"
            >
              <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                🎉 Winner! 🎉
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
                {gameState.winner.name} wins!
              </p>
              <button
                onClick={onResetGame}
                className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold hover:from-purple-700 hover:to-pink-700 transition-all flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-5 h-5" />
                New Game
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="game-active"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="text-center mb-6">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Current Turn</div>
                <div
                  className="inline-block px-6 py-3 rounded-full text-white font-bold text-lg shadow-lg"
                  style={{ backgroundColor: currentPlayer.color }}
                >
                  {currentPlayer.name}
                </div>
              </div>

              {gameState.diceValue && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  className="mb-6 text-center"
                >
                  <div className="inline-block bg-gradient-to-br from-white to-gray-100 dark:from-gray-700 dark:to-gray-800 p-8 rounded-2xl shadow-2xl border-4 border-purple-500">
                    <div className="text-6xl font-bold text-purple-600 dark:text-purple-400">
                      {gameState.diceValue}
                    </div>
                  </div>
                </motion.div>
              )}

              {message && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center text-gray-700 dark:text-gray-300 font-semibold"
                >
                  {message}
                </motion.div>
              )}

              <button
                onClick={handleRollDice}
                disabled={gameState.isRolling}
                className="w-full py-4 px-6 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
              >
                <Dices className="w-6 h-6" />
                {gameState.isRolling ? 'Rolling...' : 'Roll Dice'}
              </button>

              <button
                onClick={onResetGame}
                className="w-full mt-3 py-3 px-4 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-5 h-5" />
                Reset Game
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
