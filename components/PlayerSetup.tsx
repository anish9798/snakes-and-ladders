'use client'

import { useState } from 'react'
import { Player } from '@/types/game'
import { Users, Plus, Trash2 } from 'lucide-react'

interface PlayerSetupProps {
  onStartGame: (players: Player[]) => void
}

const PLAYER_COLORS = [
  '#EF4444', // red
  '#3B82F6', // blue
  '#10B981', // green
  '#F59E0B', // amber
  '#8B5CF6', // purple
  '#EC4899', // pink
]

export default function PlayerSetup({ onStartGame }: PlayerSetupProps) {
  const [players, setPlayers] = useState<Player[]>([
    { id: 1, name: 'Player 1', color: PLAYER_COLORS[0], position: 0 },
    { id: 2, name: 'Player 2', color: PLAYER_COLORS[1], position: 0 },
  ])

  const addPlayer = () => {
    if (players.length < 6) {
      const newPlayer: Player = {
        id: players.length + 1,
        name: `Player ${players.length + 1}`,
        color: PLAYER_COLORS[players.length],
        position: 0,
      }
      setPlayers([...players, newPlayer])
    }
  }

  const removePlayer = (id: number) => {
    if (players.length > 2) {
      setPlayers(players.filter(p => p.id !== id))
    }
  }

  const updatePlayerName = (id: number, name: string) => {
    setPlayers(players.map(p => p.id === id ? { ...p, name } : p))
  }

  const handleStartGame = () => {
    if (players.every(p => p.name.trim())) {
      onStartGame(players)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
        <div className="flex items-center justify-center mb-6">
          <Users className="w-8 h-8 text-purple-600 mr-3" />
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
            Setup Players
          </h2>
        </div>

        <div className="space-y-4 mb-6">
          {players.map((player, index) => (
            <div key={player.id} className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold shadow-lg"
                style={{ backgroundColor: player.color }}
              >
                {index + 1}
              </div>
              <input
                type="text"
                value={player.name}
                onChange={(e) => updatePlayerName(player.id, e.target.value)}
                className="flex-1 px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:border-purple-500 focus:outline-none transition-colors"
                placeholder={`Player ${index + 1} name`}
              />
              {players.length > 2 && (
                <button
                  onClick={() => removePlayer(player.id)}
                  className="p-3 rounded-lg bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              )}
            </div>
          ))}
        </div>

        {players.length < 6 && (
          <button
            onClick={addPlayer}
            className="w-full mb-6 py-3 px-4 rounded-lg bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors flex items-center justify-center gap-2 font-semibold"
          >
            <Plus className="w-5 h-5" />
            Add Player (Max 6)
          </button>
        )}

        <button
          onClick={handleStartGame}
          disabled={!players.every(p => p.name.trim())}
          className="w-full py-4 px-6 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 shadow-lg"
        >
          Start Game
        </button>
      </div>
    </div>
  )
}
