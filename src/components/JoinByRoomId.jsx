import { useState } from "react"

export function JoinByRoomId({ playerName, onJoin, onBack }) {
    const [roomId, setRoomId] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const handleJoin = async () => {
        if (!roomId.trim()) {
            setError("Please enter a room ID")
            return
        }

        setLoading(true)
        setError("")

        try {
            onJoin(roomId, playerName)
        } catch (err) {
            setError(err.message || "Failed to join room")
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full">
                <h2 className="text-2xl font-bold mb-6 text-center">Join by Room ID</h2>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Room ID</label>
                        <input
                            type="text"
                            value={roomId}
                            onChange={(e) => {
                                setRoomId(e.target.value)
                                setError("")
                            }}
                            placeholder="Paste room ID here"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                            disabled={loading}
                        />
                    </div>

                    <p className="text-xs text-gray-500">
                        Playing as: <span className="font-semibold">{playerName}</span>
                    </p>

                    {error && <p className="text-red-500 text-sm font-semibold">{error}</p>}

                    <button
                        onClick={handleJoin}
                        disabled={loading}
                        className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
                    >
                        {loading ? "Joining..." : "Join Room"}
                    </button>

                    <button
                        onClick={onBack}
                        disabled={loading}
                        className="w-full px-4 py-3 bg-gray-300 text-gray-800 rounded-lg font-semibold hover:bg-gray-400 transition-colors disabled:opacity-50"
                    >
                        Back
                    </button>
                </div>
            </div>
        </div>
    )
}
