import React, { useState } from 'react';
import { useGameStore } from '../../store/gameStore';
import { GovernorateId } from '../../types/game';
import { Card } from '../UI/Card';

export const EgyptMap: React.FC = () => {
  const { governorates, selectedGovernorate, selectGovernorate, overallHappiness } = useGameStore();
  const [hoveredGov, setHoveredGov] = useState<GovernorateId | null>(null);
  
  const getHappinessColor = (happiness: number) => {
    if (happiness >= 80) return '#22c55e'; // green
    if (happiness >= 60) return '#fbbf24'; // gold
    if (happiness >= 40) return '#f97316'; // orange
    return '#ef4444'; // red
  };
  
  const handleGovernorateClick = (govId: GovernorateId) => {
    selectGovernorate(govId);
  };
  
  const selectedGov = governorates.find(g => g.id === selectedGovernorate);
  const hovered = governorates.find(g => g.id === hoveredGov);
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card title="Map of Egypt - 27 Governorates">
          <div className="relative">
            <svg viewBox="0 0 700 700" className="w-full h-auto">
              {/* Simplified Egypt map with governorates as circles */}
              {governorates.map(gov => (
                <g key={gov.id}>
                  <circle
                    cx={gov.coordinates.x}
                    cy={gov.coordinates.y}
                    r="20"
                    fill={getHappinessColor(gov.happiness)}
                    stroke={selectedGovernorate === gov.id ? '#1e3a8a' : '#475569'}
                    strokeWidth={selectedGovernorate === gov.id ? '3' : '1'}
                    className="cursor-pointer transition-all hover:r-25 hover:opacity-80"
                    onClick={() => handleGovernorateClick(gov.id)}
                    onMouseEnter={() => setHoveredGov(gov.id)}
                    onMouseLeave={() => setHoveredGov(null)}
                  />
                  <text
                    x={gov.coordinates.x}
                    y={gov.coordinates.y + 35}
                    textAnchor="middle"
                    className="text-xs font-semibold fill-gray-700 pointer-events-none"
                  >
                    {gov.name}
                  </text>
                </g>
              ))}
              
              {/* Neighboring countries labels */}
              <text x="50" y="200" className="text-sm font-bold fill-gray-500">Libya →</text>
              <text x="450" y="650" className="text-sm font-bold fill-gray-500">Sudan ↓</text>
              <text x="600" y="150" className="text-sm font-bold fill-gray-500">← Palestine</text>
              <text x="620" y="220" className="text-sm font-bold fill-gray-500">← Jordan</text>
              <text x="650" y="400" className="text-sm font-bold fill-gray-500">← Saudi Arabia</text>
            </svg>
            
            {/* Legend */}
            <div className="mt-4 flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-green-500"></div>
                <span>Happy (80+)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                <span>Content (60-79)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-orange-500"></div>
                <span>Unhappy (40-59)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-red-500"></div>
                <span>Critical (&lt;40)</span>
              </div>
            </div>
            
            {/* Hover tooltip */}
            {hovered && (
              <div className="absolute top-4 right-4 bg-white p-3 rounded shadow-lg border border-gray-200">
                <h4 className="font-bold text-gray-800">{hovered.name}</h4>
                <p className="text-sm text-gray-600">{hovered.nameAr}</p>
                <p className="text-sm mt-1">Happiness: {hovered.happiness}%</p>
                <p className="text-sm">Population: {(hovered.population / 1000000).toFixed(1)}M</p>
              </div>
            )}
          </div>
        </Card>
      </div>
      
      <div>
        {selectedGov ? (
          <Card title={`${selectedGov.name} (${selectedGov.nameAr})`}>
            <div className="space-y-3">
              <div>
                <span className="text-sm text-gray-600">Population:</span>
                <p className="font-semibold">{(selectedGov.population / 1000000).toFixed(2)} Million</p>
              </div>
              
              <div>
                <span className="text-sm text-gray-600">Happiness:</span>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full"
                      style={{
                        width: `${selectedGov.happiness}%`,
                        backgroundColor: getHappinessColor(selectedGov.happiness)
                      }}
                    />
                  </div>
                  <span className="font-semibold">{selectedGov.happiness}%</span>
                </div>
              </div>
              
              <div>
                <span className="text-sm text-gray-600">Infrastructure:</span>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${selectedGov.infrastructure}%` }}
                    />
                  </div>
                  <span className="font-semibold">{selectedGov.infrastructure}%</span>
                </div>
              </div>
              
              <div>
                <span className="text-sm text-gray-600 block mb-2">Main Resources:</span>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(selectedGov.resources).map(([resource, value]) => (
                    <span 
                      key={resource}
                      className="px-2 py-1 bg-egypt-gold text-egypt-navy text-xs font-semibold rounded"
                    >
                      {resource}: {value}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        ) : (
          <Card title="Governorate Details">
            <p className="text-gray-500 text-center py-8">
              Click on a governorate to view details
            </p>
          </Card>
        )}
        
        <div className="mt-6">
          <Card title="National Overview">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Governorates:</span>
                <span className="font-semibold">27</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Avg Happiness:</span>
                <span className="font-semibold">{overallHappiness}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Population:</span>
                <span className="font-semibold">
                  {(governorates.reduce((sum, g) => sum + g.population, 0) / 1000000).toFixed(0)}M
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
