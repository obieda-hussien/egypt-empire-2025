import React from 'react';
import { useGameStore } from '../../store/gameStore';
import { Card } from '../UI/Card';
import { TrendingUp, TrendingDown, Users, DollarSign, Heart } from 'lucide-react';

export const MainDashboard: React.FC = () => {
  const { 
    gdp, 
    gdpGrowth, 
    treasury, 
    inflation, 
    unemployment,
    overallHappiness,
    armySize,
    popularityRating,
    governorates,
    activeWars,
    treaties
  } = useGameStore();
  
  const formatCurrency = (amount: number) => {
    if (amount >= 1000000000) {
      return `$${(amount / 1000000000).toFixed(2)}B`;
    }
    return `$${(amount / 1000000).toFixed(2)}M`;
  };
  
  const StatCard = ({ 
    title, 
    value, 
    icon: Icon, 
    trend, 
    color = 'blue' 
  }: { 
    title: string; 
    value: string | number; 
    icon: any; 
    trend?: number;
    color?: string;
  }) => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-600">{title}</span>
        <Icon className={`text-${color}-500`} size={24} />
      </div>
      <div className="text-2xl font-bold text-gray-800">{value}</div>
      {trend !== undefined && (
        <div className={`flex items-center gap-1 mt-2 text-sm ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {trend >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
          <span>{Math.abs(trend).toFixed(1)}%</span>
        </div>
      )}
    </div>
  );
  
  const totalPopulation = governorates.reduce((sum, g) => sum + g.population, 0);
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="GDP"
          value={formatCurrency(gdp)}
          icon={DollarSign}
          trend={gdpGrowth}
          color="green"
        />
        
        <StatCard
          title="Treasury"
          value={`${(treasury / 1000000000).toFixed(1)}B EGP`}
          icon={DollarSign}
          color="blue"
        />
        
        <StatCard
          title="Happiness"
          value={`${overallHappiness}%`}
          icon={Heart}
          color="red"
        />
        
        <StatCard
          title="Popularity"
          value={`${popularityRating}%`}
          icon={Users}
          color="purple"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card title="Economic Indicators">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">GDP Growth</span>
              <span className={`font-semibold ${gdpGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {gdpGrowth >= 0 ? '+' : ''}{gdpGrowth.toFixed(1)}%
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Inflation</span>
              <span className={`font-semibold ${inflation <= 5 ? 'text-green-600' : 'text-orange-600'}`}>
                {inflation.toFixed(1)}%
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Unemployment</span>
              <span className={`font-semibold ${unemployment <= 5 ? 'text-green-600' : 'text-red-600'}`}>
                {unemployment.toFixed(1)}%
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600">GDP per Capita</span>
              <span className="font-semibold">
                ${Math.round(gdp / totalPopulation).toLocaleString()}
              </span>
            </div>
          </div>
        </Card>
        
        <Card title="Social Indicators">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Population</span>
              <span className="font-semibold">
                {(totalPopulation / 1000000).toFixed(0)}M
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Happiness</span>
              <div className="flex items-center gap-2">
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      overallHappiness >= 70 ? 'bg-green-500' : 
                      overallHappiness >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${overallHappiness}%` }}
                  />
                </div>
                <span className="font-semibold">{overallHappiness}%</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Governorates</span>
              <span className="font-semibold">27</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Avg Infrastructure</span>
              <span className="font-semibold">
                {Math.round(governorates.reduce((sum, g) => sum + g.infrastructure, 0) / governorates.length)}%
              </span>
            </div>
          </div>
        </Card>
        
        <Card title="Military & Diplomacy">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Army Size</span>
              <span className="font-semibold">{armySize.toLocaleString()}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Active Wars</span>
              <span className={`font-semibold ${activeWars.length > 0 ? 'text-red-600' : 'text-green-600'}`}>
                {activeWars.length}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Treaties</span>
              <span className="font-semibold">{treaties.length}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Defense Budget</span>
              <span className="font-semibold">
                ${(5000000000 / 1000000000).toFixed(1)}B
              </span>
            </div>
          </div>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Top Performing Governorates">
          <div className="space-y-2">
            {governorates
              .sort((a, b) => b.happiness - a.happiness)
              .slice(0, 5)
              .map(gov => (
                <div key={gov.id} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                  <div>
                    <span className="font-medium">{gov.name}</span>
                    <span className="text-sm text-gray-500 ml-2">({gov.nameAr})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-gray-200 rounded-full h-1.5">
                      <div 
                        className="bg-green-500 h-1.5 rounded-full"
                        style={{ width: `${gov.happiness}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold w-10 text-right">{gov.happiness}%</span>
                  </div>
                </div>
              ))}
          </div>
        </Card>
        
        <Card title="Areas Needing Attention">
          <div className="space-y-2">
            {governorates
              .sort((a, b) => a.happiness - b.happiness)
              .slice(0, 5)
              .map(gov => (
                <div key={gov.id} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                  <div>
                    <span className="font-medium">{gov.name}</span>
                    <span className="text-sm text-gray-500 ml-2">({gov.nameAr})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-gray-200 rounded-full h-1.5">
                      <div 
                        className="bg-red-500 h-1.5 rounded-full"
                        style={{ width: `${gov.happiness}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold w-10 text-right">{gov.happiness}%</span>
                  </div>
                </div>
              ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
