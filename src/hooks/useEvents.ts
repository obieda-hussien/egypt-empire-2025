import { useEffect } from 'react';
import { useGameStore } from '../store/gameStore';
import { generateGameEvent, shouldTriggerEvent } from '../utils/eventGenerator';

export const useEvents = () => {
  const { 
    gameSpeed, 
    overallHappiness, 
    treasury, 
    yearsInPower, 
    activeEvents 
  } = useGameStore();
  
  useEffect(() => {
    if (gameSpeed === 0) return; // Paused
    
    // Check for events every 10 seconds
    const interval = setInterval(() => {
      if (shouldTriggerEvent(gameSpeed) && activeEvents.length < 3) {
        const event = generateGameEvent(overallHappiness, treasury, yearsInPower);
        
        if (event) {
          useGameStore.setState(state => ({
            activeEvents: [...state.activeEvents, event],
          }));
        }
      }
    }, 10000);
    
    return () => clearInterval(interval);
  }, [gameSpeed, overallHappiness, treasury, yearsInPower, activeEvents.length]);
};
