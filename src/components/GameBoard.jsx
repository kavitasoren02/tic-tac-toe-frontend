export function GameBoard({ board, onCellClick, isYourTurn, currentPlayer }) {
    return (
        <div className="flex flex-col items-center gap-6">
            <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">Current Turn</p>
                <p className="text-2xl font-bold text-blue-600">{currentPlayer}</p>
                {!isYourTurn && <p className="text-sm text-red-500 mt-2">Waiting for opponent...</p>}
            </div>

            <div className="grid grid-cols-3 gap-2 bg-gray-800 p-2 rounded-lg shadow-lg">
                {board.map((cell, index) => (
                    <button
                        key={index}
                        onClick={() => onCellClick(index)}
                        disabled={!isYourTurn || cell !== null}
                        className={`
              w-20 h-20 text-3xl font-bold rounded-lg transition-all
              ${cell === null ? "bg-white hover:bg-gray-100 cursor-pointer" : "bg-gray-200 cursor-not-allowed"}
              ${cell === "X" ? "text-blue-600" : cell === "O" ? "text-red-600" : ""}
              ${!isYourTurn && cell === null ? "opacity-50" : ""}
              disabled:opacity-100
            `}
                    >
                        {cell}
                    </button>
                ))}
            </div>
        </div>
    )
}
