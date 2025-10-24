import { useEffect } from 'react';
import { useGameStore } from '../store/gameStore';

export const useGameLoop = () => {
  const { gameSpeed, advanceTime } = useGameStore();
  
  useEffect(() => {
    if (gameSpeed === 0) return; // Paused
    
    // 1 real second = 1 game week
    // Speed multipliers: 1x, 2x, 5x
    const interval = setInterval(() => {
      advanceTime();
    }, 1000 / gameSpeed);
    
    return () => clearInterval(interval);
  }, [gameSpeed, advanceTime]);
};
