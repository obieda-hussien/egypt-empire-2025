import { create } from 'zustand';
import { GameState, CountryId, TreatyType, ResourceType, War, WarTactic, GovernorateId, Policy, EventChoice, Notification } from '../types/game';
import { governoratesData } from '../data/governorates';
import { resourcesData } from '../data/resources';
import { calculateMilitaryStrength, calculateTradeBalance } from '../utils/calculations';
import { calculatePeriodUpdates, applyPolicyEffects, updateRelations } from '../utils/gameLogic';
import { generateOpponents } from '../utils/ai';

interface GameStore extends GameState {
  // Actions
  advanceTime: () => void;
  setGameSpeed: (speed: 0 | 1 | 2 | 5) => void;
  selectGovernorate: (id: GovernorateId | undefined) => void;
  setActivePanel: (panel: string) => void;
  
  // Diplomacy
  declareWar: (country: CountryId, tactic: WarTactic) => void;
  signTreaty: (country: CountryId, type: TreatyType) => void;
  sendDiplomaticAction: (country: CountryId, action: string, cost: number, relationsChange: number) => void;
  
  // Trade
  importResource: (resource: ResourceType, amount: number, country: CountryId) => void;
  exportResource: (resource: ResourceType, amount: number, country: CountryId) => void;
  
  // Politics
  implementPolicy: (policy: Policy) => void;
  handleEventChoice: (eventId: string, choice: EventChoice) => void;
  
  // Organizations
  joinOrganization: (orgId: string, cost: number) => void;
  
  // Notifications
  addNotification: (type: 'success' | 'warning' | 'error' | 'info', message: string) => void;
  removeNotification: (id: string) => void;
  
  // Game control
  resetGame: () => void;
}

const initialMarketPrices: Partial<Record<ResourceType, number>> = {};
resourcesData.forEach(r => {
  initialMarketPrices[r.id] = r.basePrice;
});

const initialState: GameState = {
  currentDate: new Date(2025, 0, 1),
  gameSpeed: 1,
  
  playerName: 'President',
  popularityRating: 65,
  yearsInPower: 0,
  
  treasury: 1000000000000, // 1 trillion EGP
  gdp: 400000000000, // 400 billion USD
  gdpGrowth: 3.5,
  inflation: 5.0,
  unemployment: 7.5,
  tradeBalance: 0,
  debt: 100000000000, // 100 billion USD
  
  resources: {},
  production: {} as any,
  imports: [],
  exports: [],
  marketPrices: initialMarketPrices,
  
  governorates: governoratesData,
  
  overallHappiness: 65,
  happinessIndicators: {
    health: 65,
    education: 68,
    security: 70,
    economy: 62,
    infrastructure: 60,
    employment: 64,
  },
  
  armySize: 450000,
  militaryTech: 70,
  defenseBudget: 5000000000, // 5 billion USD
  activeWars: [],
  militaryAlliances: [],
  
  relations: {
    egypt: 100,
    libya: 0,
    sudan: 5,
    palestine: 30,
    jordan: 20,
    saudi_arabia: 10,
  },
  treaties: [],
  
  organizationMemberships: {
    arabLeague: true,
    africanUnion: true,
    unitedNations: true,
    securityCouncil: false,
  },
  
  nextElectionDate: new Date(2029, 0, 1),
  opponents: generateOpponents().map(opp => ({
    id: opp.id,
    name: opp.name,
    nameAr: opp.nameAr,
    ideology: opp.ideology,
    popularity: opp.basePopularity,
    policies: [],
  })),
  
  eventHistory: [],
  activeEvents: [],
  
  selectedGovernorate: undefined,
  activePanel: 'map',
  notifications: [],
};

export const useGameStore = create<GameStore>((set, get) => ({
  ...initialState,
  
  advanceTime: () => {
    const state = get();
    if (state.gameSpeed === 0) return; // Paused
    
    // Advance by 1 week
    const newDate = new Date(state.currentDate);
    newDate.setDate(newDate.getDate() + 7);
    
    // Check if month changed
    const monthChanged = newDate.getMonth() !== state.currentDate.getMonth();
    
    let updates: Partial<GameState> = { currentDate: newDate };
    
    // Monthly updates
    if (monthChanged) {
      // Suez Canal revenue
      const suezRevenue = 2000000000; // 2 billion EGP/month
      updates.treasury = state.treasury + suezRevenue;
      
      // Pay military
      updates.treasury = (updates.treasury || state.treasury) - state.defenseBudget / 12;
      
      // Organization fees (if member)
      if (state.organizationMemberships.arabLeague) {
        updates.treasury = (updates.treasury || state.treasury) - 50000000 / 12;
      }
      if (state.organizationMemberships.africanUnion) {
        updates.treasury = (updates.treasury || state.treasury) - 30000000 / 12;
      }
      if (state.organizationMemberships.unitedNations) {
        updates.treasury = (updates.treasury || state.treasury) - 100000000 / 12;
      }
    }
    
    // Quarterly updates
    if (newDate.getMonth() % 3 === 0 && monthChanged) {
      const periodUpdates = calculatePeriodUpdates(state);
      updates = { ...updates, ...periodUpdates };
    }
    
    // Yearly updates
    if (newDate.getMonth() === 0 && monthChanged) {
      updates.yearsInPower = state.yearsInPower + 1;
    }
    
    set(updates);
  },
  
  setGameSpeed: (speed) => set({ gameSpeed: speed }),
  
  selectGovernorate: (id) => set({ selectedGovernorate: id }),
  
  setActivePanel: (panel) => set({ activePanel: panel }),
  
  declareWar: (country, tactic) => {
    const state = get();
    
    const egyptStrength = calculateMilitaryStrength(
      state.armySize,
      state.militaryTech,
      state.defenseBudget,
      state.militaryAlliances.length
    );
    
    const newWar: War = {
      id: `war_${Date.now()}`,
      opponent: country,
      startDate: state.currentDate,
      tactic,
      militaryStrength: {
        egypt: egyptStrength,
        opponent: 50, // Simplified
      },
      casualties: {
        egypt: 0,
        opponent: 0,
      },
      active: true,
    };
    
    set({
      activeWars: [...state.activeWars, newWar],
      relations: updateRelations(state.relations, country, -50),
      overallHappiness: Math.max(0, state.overallHappiness - 10),
    });
    
    get().addNotification('warning', `War declared on ${country}!`);
  },
  
  signTreaty: (country, type) => {
    const state = get();
    
    const treaty = {
      id: `treaty_${Date.now()}`,
      country,
      type,
      signedDate: state.currentDate,
      benefits: [],
      obligations: [],
      active: true,
    };
    
    let cost = 100000000; // Base cost
    let relationsBonus = 5;
    
    if (type === 'military_alliance') {
      cost = 500000000;
      relationsBonus = 10;
      set({ militaryAlliances: [...state.militaryAlliances, country] });
    }
    
    set({
      treaties: [...state.treaties, treaty],
      treasury: state.treasury - cost,
      relations: updateRelations(state.relations, country, relationsBonus),
    });
    
    get().addNotification('success', `Treaty signed with ${country}!`);
  },
  
  sendDiplomaticAction: (country, action, cost, relationsChange) => {
    const state = get();
    
    set({
      treasury: state.treasury - cost,
      relations: updateRelations(state.relations, country, relationsChange),
    });
    
    get().addNotification('info', `Diplomatic action: ${action} with ${country}`);
  },
  
  importResource: (resource, amount, country) => {
    const state = get();
    const price = state.marketPrices[resource] || 1000;
    const cost = amount * price;
    
    if (state.treasury < cost) {
      get().addNotification('error', 'Insufficient funds for import!');
      return;
    }
    
    const trade = {
      id: `trade_${Date.now()}`,
      resource,
      amount,
      pricePerUnit: price,
      country,
      type: 'import' as const,
      date: state.currentDate,
    };
    
    const newResources = { ...state.resources };
    newResources[resource] = (newResources[resource] || 0) + amount;
    
    set({
      imports: [...state.imports, trade],
      treasury: state.treasury - cost,
      resources: newResources,
      tradeBalance: calculateTradeBalance([...state.exports], [...state.imports, trade]),
    });
    
    get().addNotification('success', `Imported ${amount} ${resource}`);
  },
  
  exportResource: (resource, amount, country) => {
    const state = get();
    const available = state.resources[resource] || 0;
    
    if (available < amount) {
      get().addNotification('error', 'Insufficient resources for export!');
      return;
    }
    
    const price = state.marketPrices[resource] || 1000;
    const revenue = amount * price;
    
    const trade = {
      id: `trade_${Date.now()}`,
      resource,
      amount,
      pricePerUnit: price,
      country,
      type: 'export' as const,
      date: state.currentDate,
    };
    
    const newResources = { ...state.resources };
    newResources[resource] = (newResources[resource] || 0) - amount;
    
    set({
      exports: [...state.exports, trade],
      treasury: state.treasury + revenue,
      resources: newResources,
      tradeBalance: calculateTradeBalance([...state.exports, trade], [...state.imports]),
    });
    
    get().addNotification('success', `Exported ${amount} ${resource} for ${revenue.toLocaleString()} EGP`);
  },
  
  implementPolicy: (policy) => {
    const state = get();
    
    if (state.treasury < policy.cost) {
      get().addNotification('error', 'Insufficient funds for policy!');
      return;
    }
    
    const updates = applyPolicyEffects(state, policy);
    set(updates);
    
    get().addNotification('success', `Policy implemented: ${policy.name}`);
  },
  
  handleEventChoice: (eventId, choice) => {
    const state = get();
    const event = state.activeEvents.find(e => e.id === eventId);
    
    if (!event) return;
    
    // Apply effects
    let updates: Partial<GameState> = {};
    
    if (choice.effects.treasury) {
      updates.treasury = state.treasury + choice.effects.treasury;
    }
    
    if (choice.effects.happiness) {
      updates.overallHappiness = Math.max(0, Math.min(100, state.overallHappiness + choice.effects.happiness));
    }
    
    if (choice.effects.popularity) {
      updates.popularityRating = Math.max(0, Math.min(100, state.popularityRating + choice.effects.popularity));
    }
    
    if (choice.effects.relations) {
      const newRelations = { ...state.relations };
      Object.entries(choice.effects.relations).forEach(([country, change]) => {
        newRelations[country as CountryId] = Math.max(-100, Math.min(100, 
          newRelations[country as CountryId] + change
        ));
      });
      updates.relations = newRelations;
    }
    
    if (choice.effects.resources) {
      const newResources = { ...state.resources };
      Object.entries(choice.effects.resources).forEach(([resource, change]) => {
        newResources[resource as ResourceType] = Math.max(0, 
          (newResources[resource as ResourceType] || 0) + change
        );
      });
      updates.resources = newResources;
    }
    
    // Move event to history
    updates.activeEvents = state.activeEvents.filter(e => e.id !== eventId);
    updates.eventHistory = [...state.eventHistory, { ...event, outcome: choice.text }];
    
    set(updates);
    get().addNotification('info', 'Event resolved');
  },
  
  joinOrganization: (orgId, cost) => {
    const state = get();
    
    if (state.treasury < cost) {
      get().addNotification('error', 'Insufficient funds to join organization!');
      return;
    }
    
    const updates: Partial<GameState> = {
      treasury: state.treasury - cost,
    };
    
    if (orgId === 'arab_league') {
      updates.organizationMemberships = { ...state.organizationMemberships, arabLeague: true };
    } else if (orgId === 'african_union') {
      updates.organizationMemberships = { ...state.organizationMemberships, africanUnion: true };
    } else if (orgId === 'united_nations') {
      updates.organizationMemberships = { ...state.organizationMemberships, unitedNations: true };
    }
    
    set(updates);
    get().addNotification('success', `Joined ${orgId}!`);
  },
  
  addNotification: (type, message) => {
    const notification: Notification = {
      id: `notif_${Date.now()}`,
      type,
      message,
      timestamp: new Date(),
    };
    
    set(state => ({
      notifications: [...state.notifications, notification],
    }));
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      get().removeNotification(notification.id);
    }, 5000);
  },
  
  removeNotification: (id) => {
    set(state => ({
      notifications: state.notifications.filter(n => n.id !== id),
    }));
  },
  
  resetGame: () => {
    set({
      ...initialState,
      opponents: generateOpponents().map(opp => ({
        id: opp.id,
        name: opp.name,
        nameAr: opp.nameAr,
        ideology: opp.ideology,
        popularity: opp.basePopularity,
        policies: [],
      })),
    });
  },
}));
