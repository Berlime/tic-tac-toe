type Player = 'X' | 'O';

interface BoardCellProps {
  value: Player | null;
  index: number;
  onClick: () => void;
  disabled: boolean;
}

export function BoardCell({ value, index, onClick, disabled }: BoardCellProps) {
  const getBorderClasses = () => {
    const classes: string[] = [];
    if (index % 3 === 0 || index % 3 === 1) {
      classes.push('border-r-4');
    }
    if (index < 3 || (index > 2 && index < 6)) {
      classes.push('border-b-4');
    }
    return classes.join(' ');
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`h-24 text-4xl font-bold transition-all duration-200 ${
        value ? 'bg-gray-100' : 'hover:bg-gray-50'
      } ${
        value === 'X' ? 'text-indigo-600' : 'text-purple-600'
      } disabled:cursor-not-allowed ${getBorderClasses()} border-gray-300`}
    >
      {value}
    </button>
  );
}

