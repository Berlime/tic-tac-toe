interface PlayerInfo {
  symbol: 'X' | 'O';
  name: string;
}

type Player = 'X' | 'O';

interface GameStatusProps {
  winner: Player | 'Draw' | null;
  currentPlayer: Player;
  players: { X: PlayerInfo; O: PlayerInfo };
  currentRound: number;
  totalRounds: number;
  scores: { X: number; O: number };
  onNextRound: () => void;
}

export function GameStatus({
  winner,
  currentPlayer,
  players,
  currentRound,
  totalRounds,
  scores,
  onNextRound,
}: GameStatusProps) {
  if (winner) {
    return (
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
            onClick={onNextRound}
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
    );
  }

  return (
    <div className="text-xl font-bold">
      <span className={currentPlayer === 'X' ? 'text-indigo-600' : 'text-purple-600'}>
        {players[currentPlayer].name}'s Turn
      </span>
    </div>
  );
}

