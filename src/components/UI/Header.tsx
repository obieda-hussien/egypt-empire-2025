import React from 'react';
import { useGameStore } from '../../store/gameStore';
import { Calendar, Coins, Play, Pause, FastForward, Zap } from 'lucide-react';
import { Button } from './Button';

export const Header: React.FC = () => {
  const { currentDate, treasury, gameSpeed, setGameSpeed, popularityRating, overallHappiness } = useGameStore();
  
  const formatCurrency = (amount: number) => {
    if (amount >= 1000000000000) {
      return `${(amount / 1000000000000).toFixed(2)}T EGP`;
    } else if (amount >= 1000000000) {
      return `${(amount / 1000000000).toFixed(2)}B EGP`;
    } else if (amount >= 1000000) {
      return `${(amount / 1000000).toFixed(2)}M EGP`;
    }
    return `${amount.toLocaleString()} EGP`;
  };
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };
  
  return (
    <header className="bg-egypt-navy text-white shadow-lg">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left: Game Title */}
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <span className="text-egypt-gold">🇪🇬</span>
              Egypt Empire 2025
            </h1>
            <p className="text-sm text-blue-200">Modern Strategy Game</p>
          </div>
          
          {/* Center: Date and Treasury */}
          <div className="flex gap-8">
            <div className="flex items-center gap-2 bg-blue-900 px-4 py-2 rounded-lg">
              <Calendar size={20} className="text-egypt-gold" />
              <div>
                <div className="text-xs text-blue-200">Date</div>
                <div className="font-semibold">{formatDate(currentDate)}</div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 bg-blue-900 px-4 py-2 rounded-lg">
              <Coins size={20} className="text-egypt-gold" />
              <div>
                <div className="text-xs text-blue-200">Treasury</div>
                <div className="font-semibold">{formatCurrency(treasury)}</div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 bg-blue-900 px-4 py-2 rounded-lg">
              <div>
                <div className="text-xs text-blue-200">Happiness</div>
                <div className="font-semibold">{overallHappiness}%</div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 bg-blue-900 px-4 py-2 rounded-lg">
              <div>
                <div className="text-xs text-blue-200">Popularity</div>
                <div className="font-semibold">{popularityRating}%</div>
              </div>
            </div>
          </div>
          
          {/* Right: Speed Controls */}
          <div className="flex items-center gap-2">
            <span className="text-sm mr-2">Game Speed:</span>
            <Button
              size="sm"
              variant={gameSpeed === 0 ? 'primary' : 'secondary'}
              onClick={() => setGameSpeed(0)}
              className="px-2"
            >
              <Pause size={16} />
            </Button>
            <Button
              size="sm"
              variant={gameSpeed === 1 ? 'primary' : 'secondary'}
              onClick={() => setGameSpeed(1)}
              className="px-2"
            >
              <Play size={16} />
            </Button>
            <Button
              size="sm"
              variant={gameSpeed === 2 ? 'primary' : 'secondary'}
              onClick={() => setGameSpeed(2)}
              className="px-2"
            >
              <FastForward size={16} />
            </Button>
            <Button
              size="sm"
              variant={gameSpeed === 5 ? 'primary' : 'secondary'}
              onClick={() => setGameSpeed(5)}
              className="px-2"
            >
              <Zap size={16} />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
