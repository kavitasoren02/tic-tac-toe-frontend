import { useState, useEffect } from "react"

export function RoomsList({ playerName, onJoinRoom, onBack, onCreateRoom }) {
    const [rooms, setRooms] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        fetchRooms()
        const interval = setInterval(fetchRooms, 2000)
        return () => clearInterval(interval)
    }, [])

    const fetchRooms = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/rooms`)
            const data = await response.json()
            setRooms(data)
            setError("")
        } catch (err) {
            setError("Failed to fetch rooms")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full">
                <h2 className="text-2xl font-bold mb-2 text-center">Available Rooms</h2>
                <p className="text-center text-gray-600 mb-6 text-sm">
                    Playing as: <span className="font-semibold">{playerName}</span>
                </p>

                <div className="space-y-3 mb-6 max-h-96 overflow-y-auto">
                    {loading ? (
                        <p className="text-center text-gray-500">Loading rooms...</p>
                    ) : rooms.length === 0 ? (
                        <p className="text-center text-gray-500">No available rooms</p>
                    ) : (
                        rooms.map((room) => (
                            <button
                                key={room._id}
                                onClick={() => onJoinRoom(room._id, playerName)}
                                className="w-full p-4 border border-gray-300 rounded-lg hover:bg-blue-50 transition-colors text-left"
                            >
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="font-semibold text-gray-800">Room {room._id.slice(-6)}</p>
                                        <p className="text-sm text-gray-600">
                                            {room.playerCount}/{room.maxPlayers} players
                                        </p>
                                    </div>
                                    <div className="text-blue-600 font-semibold">Join</div>
                                </div>
                            </button>
                        ))
                    )}
                </div>

                {error && <p className="text-red-500 text-sm font-semibold mb-4">{error}</p>}

                <div className="space-y-2">
                    <button
                        onClick={onCreateRoom}
                        className="w-full px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors text-sm"
                    >
                        Create New Room
                    </button>
                    <button
                        onClick={onBack}
                        className="w-full px-4 py-2 bg-gray-300 text-gray-800 rounded-lg font-semibold hover:bg-gray-400 transition-colors text-sm"
                    >
                        Back
                    </button>
                </div>
            </div>
        </div>
    )
}
