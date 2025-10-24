import React, { useState } from 'react';
import { useGameStore } from '../../store/gameStore';
import { Card } from '../UI/Card';
import { Button } from '../UI/Button';
import { Modal } from '../UI/Modal';
import { CountryId, TreatyType } from '../../types/game';
import { getNeighboringCountries } from '../../data/countries';
import { treatyTypes } from '../../data/treaties';
import { Handshake, Gift, Shield, Ban, Award } from 'lucide-react';

export const DiplomacyPanel: React.FC = () => {
  const { relations, treaties, treasury, sendDiplomaticAction, signTreaty } = useGameStore();
  const [selectedCountry, setSelectedCountry] = useState<CountryId | null>(null);
  const [showTreatyModal, setShowTreatyModal] = useState(false);
  
  const countries = getNeighboringCountries();
  
  const getRelationColor = (value: number) => {
    if (value >= 50) return 'text-green-600';
    if (value >= 0) return 'text-yellow-600';
    if (value >= -50) return 'text-orange-600';
    return 'text-red-600';
  };
  
  const getRelationLabel = (value: number) => {
    if (value >= 75) return 'Allied';
    if (value >= 50) return 'Friendly';
    if (value >= 25) return 'Cordial';
    if (value >= 0) return 'Neutral';
    if (value >= -25) return 'Tense';
    if (value >= -50) return 'Hostile';
    return 'Enemy';
  };
  
  const handleDiplomaticAction = (country: CountryId, action: string, cost: number, change: number) => {
    if (treasury < cost) {
      return;
    }
    sendDiplomaticAction(country, action, cost, change);
  };
  
  const handleSignTreaty = (country: CountryId, type: TreatyType, cost: number) => {
    if (treasury < cost) {
      return;
    }
    signTreaty(country, type);
    setShowTreatyModal(false);
  };
  
  return (
    <div className="space-y-6">
      <Card title="International Relations">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {countries.map(country => {
            const relation = relations[country.id];
            const countryTreaties = treaties.filter(t => t.country === country.id && t.active);
            
            return (
              <div key={country.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-bold text-lg">{country.name}</h4>
                    <p className="text-sm text-gray-500">{country.nameAr}</p>
                  </div>
                  <div className="text-right">
                    <div className={`text-2xl font-bold ${getRelationColor(relation)}`}>
                      {relation > 0 ? '+' : ''}{relation}
                    </div>
                    <div className="text-xs text-gray-500">{getRelationLabel(relation)}</div>
                  </div>
                </div>
                
                <div className="mb-3">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        relation >= 50 ? 'bg-green-500' : 
                        relation >= 0 ? 'bg-yellow-500' : 
                        relation >= -50 ? 'bg-orange-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${Math.abs(relation)}%` }}
                    />
                  </div>
                </div>
                
                {countryTreaties.length > 0 && (
                  <div className="mb-3">
                    <p className="text-xs text-gray-600 mb-1">Active Treaties:</p>
                    <div className="flex flex-wrap gap-1">
                      {countryTreaties.map(treaty => (
                        <span key={treaty.id} className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded">
                          {treaty.type.replace('_', ' ')}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => {
                      setSelectedCountry(country.id);
                      setShowTreatyModal(true);
                    }}
                    className="flex-1 text-xs"
                  >
                    <Handshake size={14} className="inline mr-1" />
                    Treaty
                  </Button>
                  
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => handleDiplomaticAction(country.id, 'Economic Aid', 100000000, 5)}
                    className="flex-1 text-xs"
                  >
                    <Gift size={14} className="inline mr-1" />
                    Aid
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Diplomatic Actions">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <div className="flex items-center gap-2">
                <Gift className="text-blue-500" />
                <span>Economic Aid</span>
              </div>
              <span className="text-sm text-gray-600">Cost: 100M | +5 Relations</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <div className="flex items-center gap-2">
                <Shield className="text-green-500" />
                <span>Joint Military Exercises</span>
              </div>
              <span className="text-sm text-gray-600">Cost: 200M | +8 Relations</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <div className="flex items-center gap-2">
                <Ban className="text-red-500" />
                <span>Economic Sanctions</span>
              </div>
              <span className="text-sm text-gray-600">Cost: 50M | -15 Relations</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <div className="flex items-center gap-2">
                <Award className="text-purple-500" />
                <span>Cultural Exchange</span>
              </div>
              <span className="text-sm text-gray-600">Cost: 50M | +3 Relations</span>
            </div>
          </div>
        </Card>
        
        <Card title="Active Treaties">
          {treaties.filter(t => t.active).length > 0 ? (
            <div className="space-y-3">
              {treaties.filter(t => t.active).map(treaty => (
                <div key={treaty.id} className="border border-gray-200 rounded p-3">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h5 className="font-semibold">{treaty.type.replace('_', ' ').toUpperCase()}</h5>
                      <p className="text-sm text-gray-600">with {treaty.country}</p>
                    </div>
                    <span className="text-xs text-gray-500">
                      {new Date(treaty.signedDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No active treaties</p>
          )}
        </Card>
      </div>
      
      {/* Treaty Modal */}
      <Modal
        isOpen={showTreatyModal}
        onClose={() => setShowTreatyModal(false)}
        title={selectedCountry ? `Sign Treaty with ${selectedCountry}` : 'Sign Treaty'}
        size="lg"
      >
        {selectedCountry && (
          <div className="space-y-4">
            {treatyTypes.map(treaty => {
              const hasRelations = relations[selectedCountry] >= treaty.requirements.minRelations;
              const canAfford = treasury >= treaty.requirements.cost;
              
              return (
                <div key={treaty.type} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-bold">{treaty.name}</h4>
                      <p className="text-sm text-gray-600">{treaty.nameAr}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-egypt-navy">
                        ${(treaty.requirements.cost / 1000000).toFixed(0)}M
                      </div>
                      <div className="text-xs text-gray-500">
                        Requires: +{treaty.requirements.minRelations} relations
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-700 mb-3">{treaty.description}</p>
                  
                  <div className="mb-3">
                    <p className="text-xs font-semibold text-gray-600 mb-1">Benefits:</p>
                    <ul className="text-sm space-y-1">
                      {treaty.benefits.map((benefit, i) => (
                        <li key={i} className="text-green-600">✓ {benefit}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <Button
                    size="sm"
                    variant="primary"
                    onClick={() => handleSignTreaty(selectedCountry, treaty.type, treaty.requirements.cost)}
                    disabled={!hasRelations || !canAfford}
                    className="w-full"
                  >
                    {!hasRelations ? 'Insufficient Relations' : !canAfford ? 'Insufficient Funds' : 'Sign Treaty'}
                  </Button>
                </div>
              );
            })}
          </div>
        )}
      </Modal>
    </div>
  );
};
