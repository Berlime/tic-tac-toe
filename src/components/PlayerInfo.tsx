import { Trophy } from 'lucide-react';

interface PlayerInfo {
  symbol: 'X' | 'O';
  name: string;
}

interface PlayerInfoProps {
  player: PlayerInfo;
  score: number;
  color: 'indigo' | 'purple';
}

export function PlayerInfo({ player, score, color }: PlayerInfoProps) {
  const colorClasses = {
    indigo: 'text-indigo-600',
    purple: 'text-purple-600',
  };

  return (
    <div className="text-center">
      <div className={`text-xl font-bold ${colorClasses[color]}`}>{player.name}</div>
      <div className="flex items-center gap-1">
        <Trophy size={16} className="text-yellow-500" />
        <span>{score}</span>
      </div>
    </div>
  );
}

