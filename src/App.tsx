import { useTicTacToe } from './hooks/useTicTacToe';
import { GameSetup } from './components/GameSetup';
import { PlayerInfo } from './components/PlayerInfo';
import { GameBoard } from './components/GameBoard';
import { GameStatus } from './components/GameStatus';
import { GameControls } from './components/GameControls';

function App() {
  const {
    board,
    currentPlayer,
    winner,
    scores,
    gameStarted,
    players,
    totalRounds,
    currentRound,
    handleClick,
    startNewRound,
    resetGame,
    handleStartGame,
    handleBackToSetup,
    updatePlayer,
    updateRounds,
  } = useTicTacToe();

  if (!gameStarted) {
    return (
      <GameSetup
        players={players}
        totalRounds={totalRounds}
        onPlayerChange={updatePlayer}
        onRoundsChange={updateRounds}
        onStartGame={handleStartGame}
      />
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
            <PlayerInfo player={players.X} score={scores.X} color="indigo" />
            <PlayerInfo player={players.O} score={scores.O} color="purple" />
          </div>
          <GameControls onReset={resetGame} onBackToSetup={handleBackToSetup} />
        </div>

        <GameBoard board={board} onCellClick={handleClick} disabled={!!winner} />

        <div className="text-center">
          <GameStatus
            winner={winner}
            currentPlayer={currentPlayer}
            players={players}
            currentRound={currentRound}
            totalRounds={totalRounds}
            scores={scores}
            onNextRound={startNewRound}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
