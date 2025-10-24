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
    <header className="bg-gradient-to-r from-purple-900/80 via-indigo-900/80 to-blue-900/80 text-white shadow-2xl border-b-2 border-neon-purple/50 backdrop-blur-xl relative overflow-hidden">
      {/* Animated background effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-neon-purple/20 via-neon-cyan/20 to-neon-yellow/20 animate-pulse-slow"></div>
      
      <div className="px-6 py-4 relative z-10">
        <div className="flex items-center justify-between">
          {/* Left: Game Title */}
          <div className="animate-fade-in">
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <span className="text-5xl animate-bounce-subtle">🇪🇬</span>
              <span className="neon-text drop-shadow-2xl">Egypt Empire 2025</span>
            </h1>
            <p className="text-sm text-neon-cyan-light font-medium mt-1 ml-14 animate-pulse">Modern Strategy Game ✨</p>
          </div>
          
          {/* Center: Date and Treasury */}
          <div className="flex gap-4 animate-fade-in">
            <div className="flex items-center gap-2 glass-card-bright px-5 py-3 rounded-2xl hover:shadow-neon transition-all duration-300 card-hover border-2 border-neon-purple/30">
              <Calendar size={22} className="text-neon-cyan animate-float" />
              <div>
                <div className="text-xs text-neon-cyan-light font-semibold">Date</div>
                <div className="font-bold text-white">{formatDate(currentDate)}</div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 glass-card-bright px-5 py-3 rounded-2xl hover:shadow-neon-lg transition-all duration-300 card-hover border-2 border-neon-yellow/30">
              <Coins size={22} className="text-neon-yellow animate-neon-pulse" />
              <div>
                <div className="text-xs text-neon-yellow font-semibold">Treasury</div>
                <div className="font-bold text-white">{formatCurrency(treasury)}</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 glass-card-bright px-5 py-3 rounded-2xl hover:shadow-purple-glow transition-all duration-300 card-hover border-2 border-neon-pink/30">
              <div className={`w-3 h-3 rounded-full ${overallHappiness >= 70 ? 'bg-neon-cyan' : overallHappiness >= 50 ? 'bg-neon-yellow' : 'bg-neon-pink'} animate-pulse shadow-lg`}></div>
              <div>
                <div className="text-xs text-neon-purple-light font-semibold">Happiness</div>
                <div className="font-bold text-white">{overallHappiness}%</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 glass-card-bright px-5 py-3 rounded-2xl hover:shadow-cyan-glow transition-all duration-300 card-hover border-2 border-electric-blue/30">
              <div className={`w-3 h-3 rounded-full ${popularityRating >= 70 ? 'bg-neon-cyan' : popularityRating >= 50 ? 'bg-neon-yellow' : 'bg-neon-pink'} animate-pulse shadow-lg`}></div>
              <div>
                <div className="text-xs text-electric-blue font-semibold">Popularity</div>
                <div className="font-bold text-white">{popularityRating}%</div>
              </div>
            </div>
          </div>
          
          {/* Right: Speed Controls */}
          <div className="flex items-center gap-3 animate-fade-in glass-card-bright px-5 py-3 rounded-2xl border-2 border-rainbow-gradient">
            <span className="text-sm font-bold bg-gradient-to-r from-neon-purple to-neon-cyan bg-clip-text text-transparent mr-1">Game Speed:</span>
            <Button
              size="sm"
              variant={gameSpeed === 0 ? 'primary' : 'secondary'}
              onClick={() => setGameSpeed(0)}
              className="px-3 py-2 rounded-xl hover:scale-125 transition-all duration-300 hover:rotate-12"
              title="Pause"
            >
              <Pause size={18} />
            </Button>
            <Button
              size="sm"
              variant={gameSpeed === 1 ? 'primary' : 'secondary'}
              onClick={() => setGameSpeed(1)}
              className="px-3 py-2 rounded-xl hover:scale-125 transition-all duration-300 hover:rotate-12"
              title="Normal Speed"
            >
              <Play size={18} />
            </Button>
            <Button
              size="sm"
              variant={gameSpeed === 2 ? 'primary' : 'secondary'}
              onClick={() => setGameSpeed(2)}
              className="px-3 py-2 rounded-xl hover:scale-125 transition-all duration-300 hover:rotate-12"
              title="Fast"
            >
              <FastForward size={18} />
            </Button>
            <Button
              size="sm"
              variant={gameSpeed === 5 ? 'primary' : 'secondary'}
              onClick={() => setGameSpeed(5)}
              className="px-3 py-2 rounded-xl hover:scale-125 transition-all duration-300 hover:rotate-12"
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
