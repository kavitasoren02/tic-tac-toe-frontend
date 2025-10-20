export function PlayerDisconnected({ onBackToMenu }) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-2xl p-8 max-w-sm w-full text-center">
                <h2 className="text-2xl font-bold mb-4 text-red-600">Opponent Disconnected</h2>
                <p className="text-gray-600 mb-6">The opponent has left the game.</p>
                <button
                    onClick={onBackToMenu}
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                    Back to Menu
                </button>
            </div>
        </div>
    )
}
