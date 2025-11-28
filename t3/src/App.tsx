import React, { useState } from 'react';
import { RotateCcw, Trophy, User, Hash } from 'lucide-react';

type Player = 'X' | 'O';
type Board = (Player | null)[];

interface PlayerInfo {
  symbol: Player;
  name: string;
}

function App() {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X');
  const [winner, setWinner] = useState<Player | 'Draw' | null>(null);
  const [scores, setScores] = useState({ X: 0, O: 0 });
  const [gameStarted, setGameStarted] = useState(false);
  const [players, setPlayers] = useState<{ X: PlayerInfo; O: PlayerInfo }>({
    X: { symbol: 'X', name: '' },
    O: { symbol: 'O', name: '' }
  });
  const [totalRounds, setTotalRounds] = useState(1);
  const [currentRound, setCurrentRound] = useState(1);

  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  const checkWinner = (boardState: Board): Player | 'Draw' | null => {
    for (const combo of winningCombinations) {
      const [a, b, c] = combo;
      if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
        return boardState[a] as Player;
      }
    }
    return boardState.every(cell => cell !== null) ? 'Draw' : null;
  };

  const handleClick = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
      if (gameWinner !== 'Draw') {
        setScores(prev => ({
          ...prev,
          [gameWinner]: prev[gameWinner] + 1
        }));
      }
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  const startNewRound = () => {
    if (currentRound < totalRounds) {
      setBoard(Array(9).fill(null));
      setCurrentPlayer('X');
      setWinner(null);
      setCurrentRound(prev => prev + 1);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setWinner(null);
    setScores({ X: 0, O: 0 });
    setCurrentRound(1);
  };

  const handleStartGame = () => {
    if (players.X.name && players.O.name && totalRounds > 0) {
      setGameStarted(true);
    }
  };

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full">
          <h1 className="text-2xl font-bold text-center mb-6">Game Setup</h1>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <div className="flex items-center gap-2">
                  <User size={16} />
                  Player X Name
                </div>
              </label>
              <input
                type="text"
                value={players.X.name}
                onChange={(e) => setPlayers(prev => ({
                  ...prev,
                  X: { ...prev.X, name: e.target.value }
                }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <div className="flex items-center gap-2">
                  <User size={16} />
                  Player O Name
                </div>
              </label>
              <input
                type="text"
                value={players.O.name}
                onChange={(e) => setPlayers(prev => ({
                  ...prev,
                  O: { ...prev.O, name: e.target.value }
                }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <div className="flex items-center gap-2">
                  <Hash size={16} />
                  Number of Rounds
                </div>
              </label>
              <input
                type="number"
                min="1"
                value={totalRounds}
                onChange={(e) => setTotalRounds(Math.max(1, parseInt(e.target.value)))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <button
              onClick={handleStartGame}
              disabled={!players.X.name || !players.O.name || totalRounds < 1}
              className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Start Game
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full">
        <div className="text-center mb-4">
          <div className="text-sm font-medium text-gray-500">
            Round {currentRound} of {totalRounds}
          </div>
        </div>
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-xl font-bold text-indigo-600">{players.X.name}</div>
              <div className="flex items-center gap-1">
                <Trophy size={16} className="text-yellow-500" />
                <span>{scores.X}</span>
              </div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-purple-600">{players.O.name}</div>
              <div className="flex items-center gap-1">
                <Trophy size={16} className="text-yellow-500" />
                <span>{scores.O}</span>
              </div>
            </div>
          </div>
          <button
            onClick={resetGame}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            title="Reset Game"
          >
            <RotateCcw size={24} className="text-gray-600" />
          </button>
        </div>

        <div className="grid grid-cols-3 mb-6">
          {board.map((cell, index) => (
            <button
              key={index}
              onClick={() => handleClick(index)}
              disabled={!!cell || !!winner}
              className={`h-24 text-4xl font-bold transition-all duration-200 ${
                cell ? 'bg-gray-100' : 'hover:bg-gray-50'
              } ${
                cell === 'X' ? 'text-indigo-600' : 'text-purple-600'
              } disabled:cursor-not-allowed
              ${index % 3 === 0 ? 'border-r-4' : ''}
              ${index % 3 === 1 ? 'border-r-4' : ''}
              ${index < 3 ? 'border-b-4' : ''}
              ${index > 2 && index < 6 ? 'border-b-4' : ''}
              border-gray-300`}
            >
              {cell}
            </button>
          ))}
        </div>

        <div className="text-center">
          {winner ? (
            <div className="space-y-4">
              <div className="text-xl font-bold">
                {winner === 'Draw' ? (
                  <span className="text-gray-700">It's a Draw!</span>
                ) : (
                  <span className={winner === 'X' ? 'text-indigo-600' : 'text-purple-600'}>
                    {players[winner].name} Wins!
                  </span>
                )}
              </div>
              {currentRound < totalRounds && (
                <button
                  onClick={startNewRound}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
                >
                  Next Round
                </button>
              )}
              {currentRound === totalRounds && (
                <div className="text-lg font-semibold text-gray-700">
                  Game Over! Final Score:<br />
                  {players.X.name}: {scores.X} - {players.O.name}: {scores.O}
                </div>
              )}
            </div>
          ) : (
            <div className="text-xl font-bold">
              <span className={currentPlayer === 'X' ? 'text-indigo-600' : 'text-purple-600'}>
                {players[currentPlayer].name}'s Turn
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;