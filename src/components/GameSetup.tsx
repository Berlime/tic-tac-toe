import { User, Hash } from 'lucide-react';

interface PlayerInfo {
  symbol: 'X' | 'O';
  name: string;
}

interface GameSetupProps {
  players: { X: PlayerInfo; O: PlayerInfo };
  totalRounds: number;
  onPlayerChange: (symbol: 'X' | 'O', name: string) => void;
  onRoundsChange: (rounds: number) => void;
  onStartGame: () => void;
}

export function GameSetup({
  players,
  totalRounds,
  onPlayerChange,
  onRoundsChange,
  onStartGame,
}: GameSetupProps) {
  const canStart = players.X.name && players.O.name && totalRounds > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-6">Tic Tac Toe Game Setup</h1>
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
              onChange={(e) => onPlayerChange('X', e.target.value)}
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
              onChange={(e) => onPlayerChange('O', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <div className="flex items-center gap-2">
                <Hash size={16} />
                Number of Rounds (Max 10)
              </div>
            </label>
            <input
              type="number"
              min="1"
              max="10"
              value={totalRounds}
              onChange={(e) => onRoundsChange(Math.max(1, Math.min(10, parseInt(e.target.value) || 1)))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button
            onClick={onStartGame}
            disabled={!canStart}
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Start Game
          </button>
        </div>
      </div>
    </div>
  );
}

