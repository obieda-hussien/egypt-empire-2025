// Core game types for Egypt Empire 2025

export type ResourceType =
  | 'oil'
  | 'gas'
  | 'cotton'
  | 'phosphates'
  | 'iron'
  | 'gold'
  | 'wheat'
  | 'rice'
  | 'fruits'
  | 'vegetables'
  | 'textiles'
  | 'chemicals'
  | 'electronics'
  | 'steel'
  | 'tourism'
  | 'suez_canal'
  | 'finance';

export type GovernorateId =
  | 'cairo'
  | 'giza'
  | 'alexandria'
  | 'dakahlia'
  | 'red_sea'
  | 'beheira'
  | 'fayoum'
  | 'gharbiya'
  | 'ismailia'
  | 'menofia'
  | 'minya'
  | 'qaliubiya'
  | 'new_valley'
  | 'suez'
  | 'aswan'
  | 'assiut'
  | 'beni_suef'
  | 'port_said'
  | 'damietta'
  | 'sharkia'
  | 'south_sinai'
  | 'kafr_el_sheikh'
  | 'matrouh'
  | 'luxor'
  | 'qena'
  | 'north_sinai'
  | 'sohag';

export type CountryId =
  | 'egypt'
  | 'libya'
  | 'sudan'
  | 'palestine'
  | 'jordan'
  | 'saudi_arabia';

export type TreatyType =
  | 'trade_agreement'
  | 'military_alliance'
  | 'non_aggression'
  | 'strategic_cooperation'
  | 'technology_exchange';

export type WarTactic = 'offensive' | 'defensive' | 'guerrilla' | 'naval_blockade';

export type EventType =
  | 'economic'
  | 'political'
  | 'natural_disaster'
  | 'opportunity'
  | 'international';

export type DiplomaticAction =
  | 'send_ambassador'
  | 'economic_aid'
  | 'joint_exercises'
  | 'sanctions'
  | 'embargo'
  | 'trade_deal'
  | 'alliance_offer';

export interface Governorate {
  id: GovernorateId;
  name: string;
  nameAr: string;
  population: number;
  resources: Partial<Record<ResourceType, number>>;
  happiness: number;
  infrastructure: number;
  coordinates: { x: number; y: number };
}

export interface Country {
  id: CountryId;
  name: string;
  nameAr: string;
  population: number;
  gdp: number;
  militaryPower: number;
  leader: string;
}

export interface Treaty {
  id: string;
  country: CountryId;
  type: TreatyType;
  signedDate: Date;
  benefits: string[];
  obligations: string[];
  active: boolean;
}

export interface War {
  id: string;
  opponent: CountryId;
  startDate: Date;
  tactic: WarTactic;
  militaryStrength: {
    egypt: number;
    opponent: number;
  };
  casualties: {
    egypt: number;
    opponent: number;
  };
  active: boolean;
}

export interface Trade {
  id: string;
  resource: ResourceType;
  amount: number;
  pricePerUnit: number;
  country: CountryId;
  type: 'import' | 'export';
  date: Date;
}

export interface Candidate {
  id: string;
  name: string;
  nameAr: string;
  ideology: 'liberal' | 'conservative' | 'military' | 'religious' | 'socialist';
  popularity: number;
  policies: string[];
}

export interface GameEvent {
  id: string;
  type: EventType;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  date: Date;
  choices: EventChoice[];
  outcome?: string;
}

export interface EventChoice {
  id: string;
  text: string;
  textAr: string;
  effects: {
    treasury?: number;
    happiness?: number;
    popularity?: number;
    relations?: Partial<Record<CountryId, number>>;
    resources?: Partial<Record<ResourceType, number>>;
  };
}

export interface Policy {
  id: string;
  name: string;
  nameAr: string;
  cost: number;
  duration: number; // in months
  effects: {
    happiness?: {
      health?: number;
      education?: number;
      security?: number;
      economy?: number;
      infrastructure?: number;
      employment?: number;
    };
    treasury?: number;
    gdp?: number;
    popularity?: number;
  };
}

export interface HappinessIndicators {
  health: number;
  education: number;
  security: number;
  economy: number;
  infrastructure: number;
  employment: number;
}

export interface GameState {
  // Time
  currentDate: Date;
  gameSpeed: 0 | 1 | 2 | 5;
  
  // Player
  playerName: string;
  popularityRating: number;
  yearsInPower: number;
  
  // Economy
  treasury: number;
  gdp: number;
  gdpGrowth: number;
  inflation: number;
  unemployment: number;
  tradeBalance: number;
  debt: number;
  
  // Resources
  resources: Partial<Record<ResourceType, number>>;
  production: Record<GovernorateId, Partial<Record<ResourceType, number>>>;
  imports: Trade[];
  exports: Trade[];
  marketPrices: Partial<Record<ResourceType, number>>;
  
  // Governorates
  governorates: Governorate[];
  
  // Happiness
  overallHappiness: number;
  happinessIndicators: HappinessIndicators;
  
  // Military
  armySize: number;
  militaryTech: number;
  defenseBudget: number;
  activeWars: War[];
  militaryAlliances: CountryId[];
  
  // Diplomacy
  relations: Record<CountryId, number>;
  treaties: Treaty[];
  
  // Organizations
  organizationMemberships: {
    arabLeague: boolean;
    africanUnion: boolean;
    unitedNations: boolean;
    securityCouncil: boolean;
  };
  
  // Elections
  nextElectionDate: Date;
  opponents: Candidate[];
  lastElectionResult?: {
    winner: string;
    votes: Record<string, number>;
  };
  
  // Events
  eventHistory: GameEvent[];
  activeEvents: GameEvent[];
  
  // UI State
  selectedGovernorate?: GovernorateId;
  activePanel: string;
  notifications: Notification[];
}

export interface Notification {
  id: string;
  type: 'success' | 'warning' | 'error' | 'info';
  message: string;
  messageAr?: string;
  timestamp: Date;
}
