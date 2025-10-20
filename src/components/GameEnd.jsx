export function GameEnd({ winner, yourSymbol, onPlayAgain, onBackToMenu }) {
    const getWinnerMessage = () => {
        if (winner === "draw") {
            return { title: "It's a Draw!", message: "Great match! Play again?" }
        }
        if (winner === yourSymbol) {
            return { title: "🎉 You Won!", message: "Congratulations! You are the champion!" }
        }
        return { title: "You Lost!", message: "Better luck next time!" }
    }

    const { title, message } = getWinnerMessage()

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-2xl p-8 max-w-sm w-full text-center">
                <h2 className="text-3xl font-bold mb-4">{title}</h2>
                <p className="text-gray-600 mb-6">{message}</p>
                <div className="flex gap-3">
                    <button
                        onClick={onBackToMenu}
                        className="flex-1 px-4 py-2 bg-gray-300 text-gray-800 rounded-lg font-semibold hover:bg-gray-400 transition-colors"
                    >
                        Back to Menu
                    </button>
                    <button
                        onClick={onPlayAgain}
                        className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                    >
                        Play Again
                    </button>
                </div>
            </div>
        </div>
    )
}
