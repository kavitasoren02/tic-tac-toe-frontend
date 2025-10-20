export function WaitingRoom({ playerCount, maxPlayers, playerName }) {
    return (
        <div className="flex flex-col items-center justify-center gap-6">
            <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">Waiting for Players</h2>
                <p className="text-gray-600">
                    You are: <span className="font-semibold text-blue-600">{playerName}</span>
                </p>
            </div>

            <div className="flex items-center gap-4">
                <div className="text-center">
                    <p className="text-4xl font-bold text-blue-600">{playerCount}</p>
                    <p className="text-sm text-gray-600">Players Joined</p>
                </div>
                <div className="text-2xl text-gray-400">/</div>
                <div className="text-center">
                    <p className="text-4xl font-bold text-gray-400">{maxPlayers}</p>
                    <p className="text-sm text-gray-600">Max Players</p>
                </div>
            </div>

            <div className="flex gap-2">
                <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce"></div>
                <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
            </div>
        </div>
    )
}
