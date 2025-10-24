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
    <header className="bg-gradient-to-r from-egypt-navy-dark via-egypt-navy to-egypt-navy-dark text-white shadow-2xl border-b-2 border-egypt-gold/30 egyptian-pattern">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left: Game Title */}
          <div className="animate-fade-in">
            <h1 className="text-3xl font-bold flex items-center gap-3 shine">
              <span className="text-4xl animate-pulse-slow">🇪🇬</span>
              <span className="gold-gradient">Egypt Empire 2025</span>
            </h1>
            <p className="text-sm text-egypt-gold-light font-medium mt-1 ml-12">Modern Strategy Game</p>
          </div>
          
          {/* Center: Date and Treasury */}
          <div className="flex gap-4 animate-fade-in">
            <div className="flex items-center gap-2 glass-card px-5 py-3 rounded-xl hover:shadow-gold transition-all duration-300 card-hover">
              <Calendar size={22} className="text-egypt-gold animate-pulse-slow" />
              <div>
                <div className="text-xs text-egypt-gold-light font-semibold">Date</div>
                <div className="font-bold text-white">{formatDate(currentDate)}</div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 glass-card px-5 py-3 rounded-xl hover:shadow-gold-lg transition-all duration-300 card-hover">
              <Coins size={22} className="text-egypt-gold animate-glow" />
              <div>
                <div className="text-xs text-egypt-gold-light font-semibold">Treasury</div>
                <div className="font-bold text-white">{formatCurrency(treasury)}</div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 glass-card px-5 py-3 rounded-xl hover:shadow-gold transition-all duration-300 card-hover">
              <div className={`w-3 h-3 rounded-full ${overallHappiness >= 70 ? 'bg-egypt-green' : overallHappiness >= 50 ? 'bg-egypt-gold' : 'bg-egypt-red'} animate-pulse`}></div>
              <div>
                <div className="text-xs text-egypt-gold-light font-semibold">Happiness</div>
                <div className="font-bold text-white">{overallHappiness}%</div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 glass-card px-5 py-3 rounded-xl hover:shadow-gold transition-all duration-300 card-hover">
              <div className={`w-3 h-3 rounded-full ${popularityRating >= 70 ? 'bg-egypt-green' : popularityRating >= 50 ? 'bg-egypt-gold' : 'bg-egypt-red'} animate-pulse`}></div>
              <div>
                <div className="text-xs text-egypt-gold-light font-semibold">Popularity</div>
                <div className="font-bold text-white">{popularityRating}%</div>
              </div>
            </div>
          </div>
          
          {/* Right: Speed Controls */}
          <div className="flex items-center gap-3 animate-fade-in glass-card px-4 py-2 rounded-xl">
            <span className="text-sm font-semibold text-egypt-gold mr-1">Game Speed:</span>
            <Button
              size="sm"
              variant={gameSpeed === 0 ? 'primary' : 'secondary'}
              onClick={() => setGameSpeed(0)}
              className="px-3 py-2 btn-egypt hover:scale-110 transition-transform"
              title="Pause"
            >
              <Pause size={18} />
            </Button>
            <Button
              size="sm"
              variant={gameSpeed === 1 ? 'primary' : 'secondary'}
              onClick={() => setGameSpeed(1)}
              className="px-3 py-2 btn-egypt hover:scale-110 transition-transform"
              title="Normal Speed"
            >
              <Play size={18} />
            </Button>
            <Button
              size="sm"
              variant={gameSpeed === 2 ? 'primary' : 'secondary'}
              onClick={() => setGameSpeed(2)}
              className="px-3 py-2 btn-egypt hover:scale-110 transition-transform"
              title="Fast"
            >
              <FastForward size={18} />
            </Button>
            <Button
              size="sm"
              variant={gameSpeed === 5 ? 'primary' : 'secondary'}
              onClick={() => setGameSpeed(5)}
              className="px-3 py-2 btn-egypt hover:scale-110 transition-transform"
              title="Very Fast"
            >
              <Zap size={18} />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
