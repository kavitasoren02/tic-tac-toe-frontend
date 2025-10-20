import { useState, useEffect } from "react"
import { socket } from "./config/socket"
import { MainMenu } from "./components/MainMenu"
import { JoinByRoomId } from "./components/JoinByRoomId"
import { RoomsList } from "./components/RoomsList"
import { GameBoard } from "./components/GameBoard"
import { WaitingRoom } from "./components/WaitingRoom"
import { GameEnd } from "./components/GameEnd"
import { PlayerDisconnected } from "./components/PlayerDisconnected"

export default function App() {
  const [screen, setScreen] = useState("menu")
  const [playerName, setPlayerName] = useState("")
  const [roomId, setRoomId] = useState("")
  const [board, setBoard] = useState(Array(9).fill(null))
  const [playerCount, setPlayerCount] = useState(0)
  const [currentTurn, setCurrentTurn] = useState(null)
  const [winner, setWinner] = useState(null)
  const [error, setError] = useState("")
  const [isYourTurn, setIsYourTurn] = useState(false)
  const [yourSymbol, setYourSymbol] = useState(null)
  const [yourSocketId, setYourSocketId] = useState(null)

  useEffect(() => {
    socket.on("connect", () => {
      console.log("[v0] Connected to server with socket ID:", socket.id)
    })

    socket.on("player-joined", (data) => {
      console.log("[v0] Player joined event (you):", data)
      setPlayerCount(data.playerCount)
      setBoard(data.gameState || Array(9).fill(null))
      setCurrentTurn(data.currentTurn)
      setYourSocketId(data.yourSocketId)
      setYourSymbol(data.yourSymbol)

      if (data.playerCount === 2) {
        console.log("[v0] Game starting. Your socket:", data.yourSocketId, "Current turn:", data.currentTurn)
        setIsYourTurn(data.currentTurn === data.yourSocketId)
        setScreen("playing")
      }
    })

    socket.on("opponent-joined", (data) => {
      console.log("[v0] Opponent joined event:", data)
      setPlayerCount(data.playerCount)
      setBoard(data.gameState || Array(9).fill(null))
      setCurrentTurn(data.currentTurn)

      if (data.playerCount === 2) {
        console.log("[v0] Game starting with opponent. Current turn:", data.currentTurn, "Your socket:", yourSocketId)
        setIsYourTurn(data.currentTurn === yourSocketId)
        setScreen("playing")
      }
    })

    return () => {
      socket.off("connect")
      socket.off("player-joined")
      socket.off("opponent-joined")
      socket.off("move-made")
      socket.off("game-ended")
      socket.off("player-left")
      socket.off("error")
    }
  }, [yourSocketId])

  useEffect(() => {
    const handleMoveMade = (data) => {
      console.log("[v0] Move made event:", data, "Your socket ID:", yourSocketId)
      setBoard(data.board)
      setCurrentTurn(data.currentTurn)
      setIsYourTurn(data.currentTurn === yourSocketId)
    }

    socket.on("move-made", handleMoveMade)

    return () => {
      socket.off("move-made", handleMoveMade)
    }
  }, [yourSocketId])

  useEffect(() => {
    const handleGameEnded = (data) => {
      console.log("[v0] Game ended:", data, "Your symbol:", yourSymbol)
      setBoard(data.board)
      setWinner(data.winner)
      setScreen("gameEnd")
    }

    socket.on("game-ended", handleGameEnded)

    return () => {
      socket.off("game-ended", handleGameEnded)
    }
  }, [yourSymbol])

  useEffect(() => {
    socket.on("player-left", () => {
      setScreen("disconnected")
    })

    socket.on("error", (data) => {
      console.error("[v0] Error from server:", data)
      setError(data.message)
    })

    return () => {
      socket.off("player-left")
      socket.off("error")
    }
  }, [])

  const handleCreateRoom = (name) => {
    setPlayerName(name)
    fetch(`${import.meta.env.VITE_API_URL}/rooms`, { method: "POST" })
      .then((res) => res.json())
      .then((data) => {
        setRoomId(data.roomId)
        socket.emit("join-room", { roomId: data.roomId, playerName: name })
        setScreen("waiting")
      })
      .catch((err) => {
        setError("Failed to create room")
        console.error(err)
      })
  }

  const handleJoinByRoomId = (id, name) => {
    setPlayerName(name)
    setRoomId(id)
    socket.emit("join-room", { roomId: id, playerName: name })
    setScreen("waiting")
  }

  const handleJoinFromList = (id, name) => {
    setPlayerName(name)
    setRoomId(id)
    socket.emit("join-room", { roomId: id, playerName: name })
    setScreen("waiting")
  }

  const handleCellClick = (index) => {
    console.log("[v0] Cell clicked:", index, "Is your turn:", isYourTurn, "Cell empty:", board[index] === null)
    if (isYourTurn && board[index] === null) {
      socket.emit("make-move", { roomId, position: index })
    }
  }

  const handlePlayAgain = () => {
    setBoard(Array(9).fill(null))
    setWinner(null)
    setScreen("menu")
    setPlayerName("")
    setRoomId("")
    setYourSymbol(null)
    setYourSocketId(null)
    setCurrentTurn(null)
    setPlayerCount(0)
  }

  const handleBackToMenu = () => {
    setScreen("menu")
    setPlayerName("")
    setRoomId("")
    setBoard(Array(9).fill(null))
    setWinner(null)
    setYourSymbol(null)
    setPlayerCount(0)
    setYourSocketId(null)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {screen === "menu" && (
        <MainMenu
          onCreateRoom={handleCreateRoom}
          onJoinRoom={() => setScreen("joinById")}
          onViewRooms={() => setScreen("roomsList")}
        />
      )}

      {screen === "joinById" && (
        <JoinByRoomId playerName={playerName} onJoin={handleJoinByRoomId} onBack={() => setScreen("menu")} />
      )}

      {screen === "roomsList" && (
        <RoomsList
          playerName={playerName}
          onJoinRoom={handleJoinFromList}
          onBack={() => setScreen("menu")}
          onCreateRoom={() => {
            handleCreateRoom(playerName)
            setScreen("waiting")
          }}
        />
      )}

      {screen === "waiting" && (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full">
            <WaitingRoom playerCount={playerCount} maxPlayers={2} playerName={playerName} />
            <button
              onClick={handleBackToMenu}
              className="w-full mt-8 px-4 py-2 bg-gray-300 text-gray-800 rounded-lg font-semibold hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {screen === "playing" && (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full">
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold text-blue-600">Tic-Tac-Toe</h1>
              <p className="text-sm text-gray-600 mt-2">
                You are: <span className="font-semibold">{yourSymbol}</span>
              </p>
            </div>
            <GameBoard
              board={board}
              onCellClick={handleCellClick}
              isYourTurn={isYourTurn}
              currentPlayer={isYourTurn ? "Your Turn" : "Opponent's Turn"}
            />
          </div>
        </div>
      )}

      {screen === "gameEnd" && (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
          <GameEnd
            winner={winner}
            yourSymbol={yourSymbol}
            onPlayAgain={handlePlayAgain}
            onBackToMenu={handleBackToMenu}
          />
        </div>
      )}

      {screen === "disconnected" && (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
          <PlayerDisconnected onBackToMenu={handleBackToMenu} />
        </div>
      )}

      {error && <div className="fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg">{error}</div>}
    </div>
  )
}
