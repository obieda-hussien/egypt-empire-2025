import { GameState, Policy, CountryId, ResourceType, GovernorateId } from '../types/game';
import { calculateOverallHappiness, calculateResourceProduction, calculateGDP, calculatePopularity } from './calculations';
import { resourcesData } from '../data/resources';

// Apply policy effects to game state
export const applyPolicyEffects = (state: GameState, policy: Policy): Partial<GameState> => {
  const updates: Partial<GameState> = {
    treasury: state.treasury - policy.cost,
  };
  
  if (policy.effects.happiness) {
    const newIndicators = { ...state.happinessIndicators };
    
    Object.entries(policy.effects.happiness).forEach(([key, value]) => {
      if (key in newIndicators && value) {
        newIndicators[key as keyof typeof newIndicators] = Math.max(
          0,
          Math.min(100, newIndicators[key as keyof typeof newIndicators] + value)
        );
      }
    });
    
    updates.happinessIndicators = newIndicators;
    updates.overallHappiness = calculateOverallHappiness(newIndicators);
  }
  
  if (policy.effects.gdp) {
    updates.gdp = state.gdp + policy.effects.gdp;
  }
  
  if (policy.effects.popularity) {
    updates.popularityRating = Math.max(
      0,
      Math.min(100, state.popularityRating + policy.effects.popularity)
    );
  }
  
  return updates;
};

// Update resource prices based on supply and demand
export const updateMarketPrices = (
  currentPrices: Partial<Record<ResourceType, number>>,
  production: Record<string, Partial<Record<ResourceType, number>>>,
  imports: Array<{ resource: ResourceType; amount: number }>,
  exports: Array<{ resource: ResourceType; amount: number }>
): Partial<Record<ResourceType, number>> => {
  const newPrices = { ...currentPrices };
  
  resourcesData.forEach(resource => {
    const basePrice = resource.basePrice;
    let price = currentPrices[resource.id] || basePrice;
    
    // Calculate total production
    let totalProduction = 0;
    Object.values(production).forEach(govProd => {
      totalProduction += govProd[resource.id] || 0;
    });
    
    // Calculate net imports/exports
    const totalImports = imports
      .filter(t => t.resource === resource.id)
      .reduce((sum, t) => sum + t.amount, 0);
    const totalExports = exports
      .filter(t => t.resource === resource.id)
      .reduce((sum, t) => sum + t.amount, 0);
    
    // Adjust price based on supply/demand
    const supply = totalProduction + totalImports;
    const demand = totalExports + (totalProduction * 0.3); // Assume 30% domestic consumption
    
    if (supply > demand) {
      price *= 0.98; // Price decreases
    } else if (demand > supply) {
      price *= 1.02; // Price increases
    }
    
    // Keep price within reasonable bounds (50% to 200% of base)
    price = Math.max(basePrice * 0.5, Math.min(basePrice * 2, price));
    
    newPrices[resource.id] = Math.round(price);
  });
  
  return newPrices;
};

// Calculate monthly/quarterly updates
export const calculatePeriodUpdates = (state: GameState): Partial<GameState> => {
  const updates: Partial<GameState> = {};
  
  // Update production for all governorates
  const newProduction: Record<GovernorateId, Partial<Record<ResourceType, number>>> = {} as any;
  
  state.governorates.forEach(gov => {
    newProduction[gov.id] = {};
    
    Object.keys(gov.resources).forEach(resource => {
      const production = calculateResourceProduction(
        gov,
        resource as ResourceType,
        state.overallHappiness,
        state.militaryTech
      );
      newProduction[gov.id][resource as ResourceType] = production;
    });
  });
  
  updates.production = newProduction;
  
  // Update GDP
  updates.gdp = calculateGDP(state.governorates, newProduction, state.marketPrices);
  
  // Update GDP growth
  if (state.gdp > 0) {
    updates.gdpGrowth = Math.round(((updates.gdp - state.gdp) / state.gdp) * 100 * 100) / 100;
  }
  
  // Update resources from production
  const newResources = { ...state.resources };
  Object.values(newProduction).forEach(govProd => {
    Object.entries(govProd).forEach(([resource, amount]) => {
      if (amount) {
        newResources[resource as ResourceType] = 
          (newResources[resource as ResourceType] || 0) + amount;
      }
    });
  });
  updates.resources = newResources;
  
  // Update market prices
  updates.marketPrices = updateMarketPrices(
    state.marketPrices,
    newProduction,
    state.imports,
    state.exports
  );
  
  // Calculate new popularity
  const militaryVictories = state.activeWars.filter(w => !w.active).length;
  updates.popularityRating = calculatePopularity(
    state.overallHappiness,
    updates.gdpGrowth || state.gdpGrowth,
    state.unemployment,
    state.yearsInPower,
    militaryVictories,
    state.relations
  );
  
  return updates;
};

// Update relations based on actions
export const updateRelations = (
  currentRelations: Record<CountryId, number>,
  country: CountryId,
  change: number
): Record<CountryId, number> => {
  const newRelations = { ...currentRelations };
  
  newRelations[country] = Math.max(-100, Math.min(100, currentRelations[country] + change));
  
  return newRelations;
};

// Calculate Suez Canal revenue
export const calculateSuezRevenue = (
  base: number,
  relations: Record<CountryId, number>,
  _internationalEvents: number
): number => {
  let revenue = base;
  
  // Good relations increase traffic
  const avgRelations = Object.values(relations).reduce((a, b) => a + b, 0) / Object.keys(relations).length;
  revenue *= (1 + avgRelations / 200);
  
  // Random fluctuation
  revenue *= (0.9 + Math.random() * 0.2);
  
  return Math.round(revenue);
};

// Check if can afford action
export const canAfford = (treasury: number, cost: number): boolean => {
  return treasury >= cost;
};

// Check if relations are sufficient for action
export const hasRequiredRelations = (
  relations: Record<CountryId, number>,
  country: CountryId,
  required: number
): boolean => {
  return relations[country] >= required;
};
