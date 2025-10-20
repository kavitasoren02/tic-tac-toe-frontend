import { useState } from "react"

export function MainMenu({ onCreateRoom, onJoinRoom, onViewRooms }) {
    const [playerName, setPlayerName] = useState("")
    const [error, setError] = useState("")

    const handleCreateRoom = () => {
        if (!playerName.trim()) {
            setError("Please enter your name")
            return
        }
        onCreateRoom(playerName)
    }

    const handleJoinRoom = () => {
        if (!playerName.trim()) {
            setError("Please enter your name")
            return
        }
        onJoinRoom(playerName)
    }

    const handleViewRooms = () => {
        if (!playerName.trim()) {
            setError("Please enter your name")
            return
        }
        onViewRooms(playerName)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full">
                <h1 className="text-4xl font-bold text-center mb-2 text-blue-600">Tic-Tac-Toe</h1>
                <p className="text-center text-gray-600 mb-8">Multiplayer Game</p>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Your Name</label>
                        <input
                            type="text"
                            value={playerName}
                            onChange={(e) => {
                                setPlayerName(e.target.value)
                                setError("")
                            }}
                            placeholder="Enter your name"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            maxLength="20"
                        />
                    </div>

                    {error && <p className="text-red-500 text-sm font-semibold">{error}</p>}

                    <button
                        onClick={handleCreateRoom}
                        className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                    >
                        Create New Room
                    </button>

                    <button
                        onClick={handleViewRooms}
                        className="w-full px-4 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
                    >
                        Join Available Room
                    </button>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">or</span>
                        </div>
                    </div>

                    <button
                        onClick={handleJoinRoom}
                        className="w-full px-4 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors"
                    >
                        Join by Room ID
                    </button>
                </div>
            </div>
        </div>
    )
}
