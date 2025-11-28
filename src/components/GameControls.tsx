import { RotateCcw, Settings } from 'lucide-react';

interface GameControlsProps {
  onReset: () => void;
  onBackToSetup: () => void;
}

export function GameControls({ onReset, onBackToSetup }: GameControlsProps) {
  return (
    <div className="flex gap-2">
      <button
        onClick={onBackToSetup}
        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        title="Back to Setup"
      >
        <Settings size={24} className="text-gray-600" />
      </button>
      <button
        onClick={onReset}
        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        title="Reset Game"
      >
        <RotateCcw size={24} className="text-gray-600" />
      </button>
    </div>
  );
}

