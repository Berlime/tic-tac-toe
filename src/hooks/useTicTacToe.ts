import { useState } from 'react';

type Player = 'X' | 'O';
type Board = (Player | null)[];

interface PlayerInfo {
  symbol: Player;
  name: string;
}

const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

export function useTicTacToe() {
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

  const handleBackToSetup = () => {
    setGameStarted(false);
    resetGame();
  };

  const updatePlayer = (symbol: 'X' | 'O', name: string) => {
    setPlayers(prev => ({
      ...prev,
      [symbol]: { ...prev[symbol], name }
    }));
  };

  const updateRounds = (rounds: number) => {
    setTotalRounds(Math.max(1, Math.min(10, rounds)));
  };

  return {
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
  };
}

