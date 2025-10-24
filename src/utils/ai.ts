// AI logic for opponent candidates in elections

export interface AICandidate {
  id: string;
  name: string;
  nameAr: string;
  ideology: 'liberal' | 'conservative' | 'military' | 'religious' | 'socialist';
  basePopularity: number;
}

export const generateOpponents = (): AICandidate[] => {
  const opponents = [
    {
      id: '1',
      name: 'Ahmed Hassan',
      nameAr: 'أحمد حسن',
      ideology: 'liberal' as const,
      basePopularity: 45,
    },
    {
      id: '2',
      name: 'Mohamed Ibrahim',
      nameAr: 'محمد إبراهيم',
      ideology: 'conservative' as const,
      basePopularity: 40,
    },
    {
      id: '3',
      name: 'General Samir Khalil',
      nameAr: 'اللواء سمير خليل',
      ideology: 'military' as const,
      basePopularity: 38,
    },
    {
      id: '4',
      name: 'Sheikh Omar Abdel Rahman',
      nameAr: 'الشيخ عمر عبد الرحمن',
      ideology: 'religious' as const,
      basePopularity: 35,
    },
    {
      id: '5',
      name: 'Layla Mahmoud',
      nameAr: 'ليلى محمود',
      ideology: 'socialist' as const,
      basePopularity: 32,
    },
  ];
  
  // Randomly select 3-5 opponents
  const count = 3 + Math.floor(Math.random() * 3);
  const shuffled = opponents.sort(() => Math.random() - 0.5);
  
  return shuffled.slice(0, count);
};

export const calculateOpponentPopularity = (
  candidate: AICandidate,
  playerHappiness: number,
  _playerPopularity: number,
  economicGrowth: number
): number => {
  let popularity = candidate.basePopularity;
  
  // Opponents benefit when player does poorly
  if (playerHappiness < 50) {
    popularity += (50 - playerHappiness) * 0.3;
  }
  
  if (economicGrowth < 0) {
    popularity += Math.abs(economicGrowth) * 5;
  }
  
  // Ideology-specific modifiers
  switch (candidate.ideology) {
    case 'liberal':
      // Benefits from high education but low security
      if (playerHappiness < 60) popularity += 5;
      break;
    case 'conservative':
      // Benefits from social issues
      if (playerHappiness < 55) popularity += 8;
      break;
    case 'military':
      // Benefits from security concerns
      if (playerHappiness < 50) popularity += 10;
      break;
    case 'religious':
      // Benefits from moral/social issues
      if (playerHappiness < 45) popularity += 12;
      break;
    case 'socialist':
      // Benefits from economic issues
      if (economicGrowth < 2) popularity += 10;
      break;
  }
  
  // Add randomness
  popularity += (Math.random() - 0.5) * 10;
  
  return Math.max(10, Math.min(90, Math.round(popularity)));
};
