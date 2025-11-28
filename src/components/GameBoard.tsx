import { BoardCell } from './BoardCell';

type Player = 'X' | 'O';
type Board = (Player | null)[];

interface GameBoardProps {
  board: Board;
  onCellClick: (index: number) => void;
  disabled: boolean;
}

export function GameBoard({ board, onCellClick, disabled }: GameBoardProps) {
  return (
    <div className="grid grid-cols-3 mb-6">
      {board.map((cell, index) => (
        <BoardCell
          key={index}
          value={cell}
          index={index}
          onClick={() => onCellClick(index)}
          disabled={disabled || !!cell}
        />
      ))}
    </div>
  );
}

