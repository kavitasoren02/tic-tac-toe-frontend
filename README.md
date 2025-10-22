# Multiplayer Tic-Tac-Toe Game

A real-time multiplayer Tic-Tac-Toe game built with modern web technologies.

## Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **Socket.io** - Real-time bidirectional communication
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling

### Frontend
- **React 19** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Socket.io Client** - WebSocket client

## Architecture

### Server-Authoritative Design
The game state is managed entirely on the server. All moves are validated server-side before being broadcast to clients. This prevents cheating and ensures game integrity.

### Real-Time Communication
WebSocket connections via Socket.io enable instant game updates between players without polling.

### Room-Based Matchmaking
- Players can create new rooms
- Players can join existing rooms by ID
- Players can browse and join from a list of available rooms
- Rooms automatically manage player count and game state

## 📁 Project Structure
```
tictactoe-multiplayer/
├── backend/
│   ├── server.js              # Main Express server
│   ├── models/
│   │   ├── GameRoom.js        # Room schema
│   │   └── Player.js          # Player schema
│   ├── utils/
│   │   └── gameLogic.js       # Game logic utilities
│   ├── package.json
│   └── .env
└── frontend/
    ├── src/
    │   ├── App.jsx            # Main app component
    │   ├── components/
    │   │   ├── MainMenu.jsx
    │   │   ├── JoinByRoomId.jsx
    │   │   ├── RoomsList.jsx
    │   │   ├── GameBoard.jsx
    │   │   ├── WaitingRoom.jsx
    │   │   ├── GameEnd.jsx
    │   │   └── PlayerDisconnected.jsx
    │   ├── config/
    │   │   └── socket.js      # Socket.io configuration
    │   ├── index.css
    │   └── main.jsx
    ├── index.html
    ├── vite.config.js
    ├── package.json
    └── .env
```

---

## Setup Instructions

### Prerequisites
- Node.js (v16+)
- MongoDB (local or cloud instance)

### Backend Setup

1. Navigate to backend directory:
   \`\`\`bash
   cd backend
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Create `.env` file:
   \`\`\`
   MONGODB_URI=mongodb://localhost:27017/tictactoe
   PORT=3001
   FRONTEND_URL=http://localhost:5173
   \`\`\`

4. Start the server:
   \`\`\`bash
   npm run dev
   \`\`\`

### Frontend Setup

1. Navigate to frontend directory:
   \`\`\`bash
   cd frontend
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Create `.env` file:
   \`\`\`
   VITE_SOCKET_URL=http://localhost:3001
   VITE_API_URL=http://localhost:3001/api
   \`\`\`

4. Start the dev server:
   \`\`\`bash
   npm run dev
   \`\`\`

5. Open http://localhost:5173 in your browser

## Game Flow

1. **Main Menu**: Player enters their name and chooses to:
   - Create a new room
   - Join an available room from the list
   - Join by entering a room ID

2. **Waiting Room**: Players wait for the opponent to join

3. **Game**: 
   - Player X goes first
   - Players alternate turns
   - Server validates all moves
   - Game ends when someone wins or board is full

4. **Game End**: Display winner and option to play again or return to menu

## Key Features

- **Real-time multiplayer** - Instant game updates via WebSocket
- **Server-authoritative** - All game logic validated on server
- **Multiple join methods** - Create room, join by ID, or browse available rooms
- **Responsive design** - Works on desktop and mobile
- **Auto-cleanup** - Rooms expire after 1 hour of inactivity
- **Player disconnection handling** - Graceful handling when players disconnect

## Deployment

### Backend (Heroku/Railway/Render)
1. Push code to GitHub
2. Connect repository to hosting platform
3. Set environment variables (MONGODB_URI, PORT, FRONTEND_URL)
4. Deploy

### Frontend (Vercel/Netlify)
1. Push code to GitHub
2. Connect repository to hosting platform
3. Set environment variables (VITE_SOCKET_URL, VITE_API_URL)
4. Deploy

## Future Enhancements

- Leaderboard system
- Player statistics tracking
- Chat functionality
- Game replay feature
- AI opponent option
- Multiple game modes
- User authentication
- Elo rating system

## License


