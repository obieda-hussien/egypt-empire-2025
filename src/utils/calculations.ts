import { HappinessIndicators, Governorate, ResourceType } from '../types/game';

// Calculate overall happiness from individual indicators
export const calculateOverallHappiness = (indicators: HappinessIndicators): number => {
  const weights = {
    health: 0.20,
    education: 0.18,
    security: 0.15,
    economy: 0.22,
    infrastructure: 0.15,
    employment: 0.10,
  };

  return Math.round(
    indicators.health * weights.health +
    indicators.education * weights.education +
    indicators.security * weights.security +
    indicators.economy * weights.economy +
    indicators.infrastructure * weights.infrastructure +
    indicators.employment * weights.employment
  );
};

// Calculate governorate happiness based on local factors
export const calculateGovernorateHappiness = (
  governorate: Governorate,
  nationalIndicators: HappinessIndicators
): number => {
  const localFactor = governorate.infrastructure / 100;
  const nationalHappiness = calculateOverallHappiness(nationalIndicators);
  
  return Math.round(nationalHappiness * 0.7 + governorate.happiness * 0.3 * localFactor);
};

// Calculate resource production for a governorate
export const calculateResourceProduction = (
  governorate: Governorate,
  resourceType: ResourceType,
  happiness: number,
  tech: number
): number => {
  const baseProduction = governorate.resources[resourceType] || 0;
  
  // Happiness affects production (60% to 140%)
  const happinessFactor = 0.6 + (happiness / 100) * 0.8;
  
  // Infrastructure affects production
  const infraFactor = 0.7 + (governorate.infrastructure / 100) * 0.3;
  
  // Technology affects production (90% to 130%)
  const techFactor = 0.9 + (tech / 100) * 0.4;
  
  return Math.round(baseProduction * happinessFactor * infraFactor * techFactor);
};

// Calculate total GDP from all governorates and resources
export const calculateGDP = (
  governorates: Governorate[],
  production: Record<string, Partial<Record<ResourceType, number>>>,
  marketPrices: Partial<Record<ResourceType, number>>
): number => {
  let totalGDP = 0;
  
  governorates.forEach(gov => {
    const govProduction = production[gov.id] || {};
    
    Object.entries(govProduction).forEach(([resource, amount]) => {
      const price = marketPrices[resource as ResourceType] || 0;
      totalGDP += (amount || 0) * price;
    });
  });
  
  return Math.round(totalGDP);
};

// Calculate military strength
export const calculateMilitaryStrength = (
  armySize: number,
  militaryTech: number,
  defenseBudget: number,
  alliances: number
): number => {
  const sizeFactor = Math.min(armySize / 500000, 1) * 30; // Max 30 points from size
  const techFactor = (militaryTech / 100) * 35; // Max 35 points from tech
  const budgetFactor = Math.min(defenseBudget / 10000000000, 1) * 25; // Max 25 points from budget
  const allianceFactor = alliances * 2.5; // 2.5 points per alliance, max 10 points
  
  return Math.round(sizeFactor + techFactor + budgetFactor + allianceFactor);
};

// Calculate popularity based on various factors
export const calculatePopularity = (
  happiness: number,
  gdpGrowth: number,
  unemployment: number,
  yearsInPower: number,
  militaryVictories: number,
  relations: Record<string, number>
): number => {
  let popularity = 50; // Base popularity
  
  // Happiness is most important (±40 points)
  popularity += (happiness - 50) * 0.8;
  
  // Economic growth (±15 points)
  popularity += gdpGrowth * 3;
  
  // Unemployment penalty (up to -20 points)
  popularity -= Math.min(unemployment * 2, 20);
  
  // Incumbency bonus/penalty (±10 points)
  if (yearsInPower < 4) {
    popularity += 5; // Honeymoon period
  } else if (yearsInPower > 12) {
    popularity -= (yearsInPower - 12) * 0.5; // Fatigue
  }
  
  // Military victories bonus
  popularity += militaryVictories * 5;
  
  // International relations avg
  const avgRelations = Object.values(relations).reduce((a, b) => a + b, 0) / Object.keys(relations).length;
  popularity += avgRelations * 0.1;
  
  return Math.max(0, Math.min(100, Math.round(popularity)));
};

// Calculate trade balance
export const calculateTradeBalance = (
  exports: Array<{ amount: number; pricePerUnit: number }>,
  imports: Array<{ amount: number; pricePerUnit: number }>
): number => {
  const exportValue = exports.reduce((sum, trade) => sum + (trade.amount * trade.pricePerUnit), 0);
  const importValue = imports.reduce((sum, trade) => sum + (trade.amount * trade.pricePerUnit), 0);
  
  return exportValue - importValue;
};

// Calculate battle outcome
export const calculateBattleOutcome = (
  egyptStrength: number,
  opponentStrength: number,
  tactic: string,
  terrain: string = 'neutral'
): {
  winner: 'egypt' | 'opponent' | 'stalemate';
  egyptLosses: number;
  opponentLosses: number;
  territoryChange: number;
} => {
  let egyptMod = 1.0;
  let opponentMod = 1.0;
  
  // Tactic modifiers
  if (tactic === 'offensive') {
    egyptMod += 0.15;
    opponentMod -= 0.05;
  } else if (tactic === 'defensive') {
    egyptMod += 0.1;
    opponentMod -= 0.1;
  } else if (tactic === 'guerrilla') {
    egyptMod += 0.05;
    opponentMod -= 0.15;
  }
  
  // Terrain modifiers
  if (terrain === 'desert') {
    egyptMod += 0.1; // Egypt has desert warfare advantage
  }
  
  const egyptTotal = egyptStrength * egyptMod;
  const opponentTotal = opponentStrength * opponentMod;
  
  const strengthDiff = egyptTotal - opponentTotal;
  
  let winner: 'egypt' | 'opponent' | 'stalemate';
  if (Math.abs(strengthDiff) < 10) {
    winner = 'stalemate';
  } else if (strengthDiff > 0) {
    winner = 'egypt';
  } else {
    winner = 'opponent';
  }
  
  // Calculate casualties (percentage of strength)
  const baseCasualties = 0.05;
  const egyptLosses = Math.round(
    egyptStrength * (baseCasualties + (winner === 'opponent' ? 0.1 : 0.02))
  );
  const opponentLosses = Math.round(
    opponentStrength * (baseCasualties + (winner === 'egypt' ? 0.1 : 0.02))
  );
  
  // Territory change
  let territoryChange = 0;
  if (winner === 'egypt') {
    territoryChange = Math.round(strengthDiff / 10);
  } else if (winner === 'opponent') {
    territoryChange = Math.round(strengthDiff / 10);
  }
  
  return {
    winner,
    egyptLosses,
    opponentLosses,
    territoryChange,
  };
};

// Calculate election results
export const calculateElectionResults = (
  playerPopularity: number,
  opponents: Array<{ name: string; popularity: number }>
): { winner: string; votes: Record<string, number> } => {
  const candidates = [
    { name: 'Player', popularity: playerPopularity },
    ...opponents
  ];
  
  // Add some randomness to results (±5%)
  const votes: Record<string, number> = {};
  let totalVotes = 0;
  
  candidates.forEach(candidate => {
    const randomFactor = 0.95 + Math.random() * 0.1;
    const voteCount = Math.max(0, candidate.popularity * randomFactor);
    votes[candidate.name] = voteCount;
    totalVotes += voteCount;
  });
  
  // Normalize to percentages
  Object.keys(votes).forEach(name => {
    votes[name] = Math.round((votes[name] / totalVotes) * 100);
  });
  
  // Find winner
  let winner = 'Player';
  let maxVotes = votes['Player'];
  
  Object.entries(votes).forEach(([name, voteCount]) => {
    if (voteCount > maxVotes) {
      maxVotes = voteCount;
      winner = name;
    }
  });
  
  return { winner, votes };
};

// Check victory conditions
export const checkVictoryConditions = (
  yearsInPower: number,
  _happiness: number,
  happinessHistory: number[],
  gdp: number,
  neighborsGDP: number[],
  electionsWon: number,
  securityCouncil: boolean
): string | null => {
  // 20 years in power
  if (yearsInPower >= 20) {
    return 'Congratulations! You maintained power for 20 years!';
  }
  
  // 90+ happiness for 5 years
  if (happinessHistory.length >= 5) {
    const recent5 = happinessHistory.slice(-5);
    if (recent5.every(h => h >= 90)) {
      return 'Congratulations! You achieved exceptional happiness for 5 consecutive years!';
    }
  }
  
  // Regional superpower
  const totalNeighborGDP = neighborsGDP.reduce((a, b) => a + b, 0);
  if (gdp > totalNeighborGDP) {
    return 'Congratulations! Egypt has become the regional superpower!';
  }
  
  // 5 consecutive elections
  if (electionsWon >= 5) {
    return 'Congratulations! You won 5 consecutive elections!';
  }
  
  // UN Security Council permanent member
  if (securityCouncil) {
    return 'Congratulations! Egypt joined the UN Security Council as a permanent member!';
  }
  
  return null;
};

// Check defeat conditions
export const checkDefeatConditions = (
  electionsLost: number,
  _happiness: number,
  happinessHistory: number[],
  treasury: number,
  monthsBankrupt: number,
  activeWars: Array<{ active: boolean; opponent: string }>
): string | null => {
  // Lost 2 elections in a row
  if (electionsLost >= 2) {
    return 'Game Over: You lost two consecutive elections.';
  }
  
  // Happiness below 20 for 2+ years
  if (happinessHistory.length >= 2) {
    const recent2Years = happinessHistory.slice(-2);
    if (recent2Years.every(h => h < 20)) {
      return 'Game Over: Revolution! Happiness too low for too long.';
    }
  }
  
  // Bankrupt for 6+ months
  if (treasury < 0 && monthsBankrupt >= 6) {
    return 'Game Over: National bankruptcy.';
  }
  
  // Lost major war
  const lostWars = activeWars.filter(w => !w.active && w.opponent === 'defeated');
  if (lostWars.length > 0) {
    return 'Game Over: Complete military defeat and occupation.';
  }
  
  return null;
};
