# 🐍 Snakes and Ladders Game 🪜

A beautiful, interactive Snakes and Ladders game built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🎮 2-6 player support
- 🎨 Beautiful, modern UI with gradient backgrounds
- ✨ Smooth animations using Framer Motion
- 🎲 Interactive dice rolling with animation
- 🐍 Classic snakes that move you down
- 🪜 Ladders that help you climb up
- 🏆 Winner celebration screen
- 📱 Responsive design

## Getting Started

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to play the game!

## How to Play

1. Enter player names (2-6 players)
2. Click "Start Game"
3. Players take turns rolling the dice
4. Land on a ladder to climb up, or a snake to slide down
5. First player to reach position 100 wins!

## Tech Stack

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Lucide React** - Icons

## Game Rules

- Players start at position 0
- Roll the dice to move forward
- If you land on a ladder's base, climb to the top
- If you land on a snake's head, slide to its tail
- Must roll exact number to reach position 100
- First to reach 100 wins!