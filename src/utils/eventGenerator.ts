import { getRandomEvent } from '../data/events';
import { GameEvent, EventChoice } from '../types/game';

export const generateGameEvent = (
  currentHappiness: number,
  currentTreasury: number,
  yearsInPower: number
): GameEvent | null => {
  const template = getRandomEvent(currentHappiness, currentTreasury, yearsInPower);
  
  if (!template) return null;
  
  const choices: EventChoice[] = template.choices.map((choice, index) => ({
    id: `choice_${index}`,
    text: choice.text,
    textAr: choice.textAr,
    effects: choice.effects,
  }));
  
  return {
    id: `event_${Date.now()}`,
    type: template.type,
    title: template.title,
    titleAr: template.titleAr,
    description: template.description,
    descriptionAr: template.descriptionAr,
    date: new Date(),
    choices,
  };
};

export const shouldTriggerEvent = (gameSpeed: number): boolean => {
  // Base probability per week
  const baseProbability = 0.05; // 5% chance per week
  
  // Adjust for game speed
  const adjustedProbability = baseProbability * (gameSpeed || 1);
  
  return Math.random() < adjustedProbability;
};
