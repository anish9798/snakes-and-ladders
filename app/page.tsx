'use client'

import { useState } from 'react'
import GameBoard from '@/components/GameBoard'
import GameControls from '@/components/GameControls'
import PlayerSetup from '@/components/PlayerSetup'
import { Player, GameState } from '@/types/game'

export default function Home() {
  const [gameState, setGameState] = useState<GameState>({
    players: [],
    currentPlayerIndex: 0,
    gameStarted: false,
    winner: null,
    diceValue: null,
    isRolling: false,
  })

  const startGame = (players: Player[]) => {
    setGameState({
      ...gameState,
      players,
      gameStarted: true,
      currentPlayerIndex: 0,
    })
  }

  const resetGame = () => {
    setGameState({
      players: [],
      currentPlayerIndex: 0,
      gameStarted: false,
      winner: null,
      diceValue: null,
      isRolling: false,
    })
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 dark:from-purple-900 dark:via-pink-900 dark:to-blue-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400">
          🐍 Snakes and Ladders 🪜
        </h1>
        
        {!gameState.gameStarted ? (
          <PlayerSetup onStartGame={startGame} />
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <GameBoard 
                gameState={gameState} 
                setGameState={setGameState}
              />
            </div>
            <div>
              <GameControls 
                gameState={gameState} 
                setGameState={setGameState}
                onResetGame={resetGame}
              />
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
