import React, { useState } from 'react';
import { useGameStore } from '../../store/gameStore';
import { Card } from '../UI/Card';
import { Button } from '../UI/Button';
import { Modal } from '../UI/Modal';
import { CountryId, WarTactic } from '../../types/game';
import { getNeighboringCountries } from '../../data/countries';
import { Sword, Shield, AlertTriangle } from 'lucide-react';

export const WarPanel: React.FC = () => {
  const { activeWars, relations, armySize, militaryTech, declareWar, treaties } = useGameStore();
  const [showDeclareWarModal, setShowDeclareWarModal] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<CountryId | null>(null);
  const [selectedTactic, setSelectedTactic] = useState<WarTactic>('defensive');
  
  const countries = getNeighboringCountries();
  
  const tactics: { id: WarTactic; name: string; nameAr: string; description: string }[] = [
    { id: 'offensive', name: 'Offensive', nameAr: 'هجومي', description: '+15% attack power, higher casualties' },
    { id: 'defensive', name: 'Defensive', nameAr: 'دفاعي', description: '+10% defense, lower casualties' },
    { id: 'guerrilla', name: 'Guerrilla', nameAr: 'حرب عصابات', description: 'Unconventional warfare, unpredictable' },
    { id: 'naval_blockade', name: 'Naval Blockade', nameAr: 'حصار بحري', description: 'Economic pressure, slow approach' },
  ];
  
  const handleDeclareWar = () => {
    if (selectedCountry && selectedTactic) {
      declareWar(selectedCountry, selectedTactic);
      setShowDeclareWarModal(false);
      setSelectedCountry(null);
    }
  };
  
  const canDeclareWar = (countryId: CountryId) => {
    // Check if there's a non-aggression pact
    const hasNonAggressionPact = treaties.some(
      t => t.country === countryId && t.type === 'non_aggression' && t.active
    );
    
    // Check if already at war
    const alreadyAtWar = activeWars.some(w => w.opponent === countryId && w.active);
    
    return !hasNonAggressionPact && !alreadyAtWar;
  };
  
  return (
    <div className="space-y-6">
      <Card title="Military Overview">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <Sword className="mx-auto text-blue-600 mb-2" size={32} />
            <div className="text-2xl font-bold text-gray-800">{armySize.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Army Size</div>
          </div>
          
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <Shield className="mx-auto text-green-600 mb-2" size={32} />
            <div className="text-2xl font-bold text-gray-800">{militaryTech}%</div>
            <div className="text-sm text-gray-600">Military Technology</div>
          </div>
          
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <AlertTriangle className="mx-auto text-red-600 mb-2" size={32} />
            <div className="text-2xl font-bold text-gray-800">{activeWars.length}</div>
            <div className="text-sm text-gray-600">Active Wars</div>
          </div>
        </div>
      </Card>
      
      <Card title="Active Wars">
        {activeWars.filter(w => w.active).length > 0 ? (
          <div className="space-y-4">
            {activeWars.filter(w => w.active).map(war => (
              <div key={war.id} className="border border-red-300 bg-red-50 rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-bold text-lg">War with {war.opponent}</h4>
                    <p className="text-sm text-gray-600">
                      Started: {new Date(war.startDate).toLocaleDateString()}
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-red-600 text-white rounded-full text-sm font-semibold">
                    {war.tactic}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <div className="text-sm text-gray-600">Egypt Strength</div>
                    <div className="text-xl font-bold text-blue-600">{war.militaryStrength.egypt}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Enemy Strength</div>
                    <div className="text-xl font-bold text-red-600">{war.militaryStrength.opponent}</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-600">Egypt Casualties</div>
                    <div className="text-lg font-semibold">{war.casualties.egypt.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Enemy Casualties</div>
                    <div className="text-lg font-semibold">{war.casualties.opponent.toLocaleString()}</div>
                  </div>
                </div>
                
                <div className="mt-3 flex gap-2">
                  <Button size="sm" variant="secondary" className="flex-1">
                    Peace Negotiations
                  </Button>
                  <Button size="sm" variant="danger" className="flex-1">
                    Escalate
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">No active wars</p>
        )}
      </Card>
      
      <Card 
        title="Potential Targets" 
        actions={
          <Button size="sm" onClick={() => setShowDeclareWarModal(true)}>
            Declare War
          </Button>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {countries.map(country => {
            const canWar = canDeclareWar(country.id);
            const relation = relations[country.id];
            
            return (
              <div key={country.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h5 className="font-bold">{country.name}</h5>
                    <p className="text-sm text-gray-500">{country.nameAr}</p>
                  </div>
                  <span className={`text-sm ${relation >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    Relations: {relation}
                  </span>
                </div>
                
                <div className="space-y-1 text-sm mb-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Military Power:</span>
                    <span className="font-semibold">{country.militaryPower}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Population:</span>
                    <span className="font-semibold">{(country.population / 1000000).toFixed(1)}M</span>
                  </div>
                </div>
                
                {!canWar && (
                  <p className="text-xs text-red-600 mb-2">
                    {activeWars.some(w => w.opponent === country.id) 
                      ? 'Already at war' 
                      : 'Non-aggression pact active'}
                  </p>
                )}
                
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => {
                    setSelectedCountry(country.id);
                    setShowDeclareWarModal(true);
                  }}
                  disabled={!canWar}
                  className="w-full"
                >
                  Declare War
                </Button>
              </div>
            );
          })}
        </div>
      </Card>
      
      {/* Declare War Modal */}
      <Modal
        isOpen={showDeclareWarModal}
        onClose={() => {
          setShowDeclareWarModal(false);
          setSelectedCountry(null);
        }}
        title={selectedCountry ? `Declare War on ${selectedCountry}` : 'Declare War'}
      >
        {selectedCountry && (
          <div className="space-y-6">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <AlertTriangle className="text-red-600 mb-2" size={24} />
              <h4 className="font-bold text-red-800 mb-2">Warning</h4>
              <p className="text-sm text-red-700">
                Declaring war will have serious consequences:
              </p>
              <ul className="text-sm text-red-700 list-disc list-inside mt-2 space-y-1">
                <li>Significant military and civilian casualties</li>
                <li>Economic damage and increased spending</li>
                <li>Decrease in citizen happiness</li>
                <li>Deterioration of international relations</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Select Military Tactic:</h4>
              <div className="space-y-2">
                {tactics.map(tactic => (
                  <div
                    key={tactic.id}
                    onClick={() => setSelectedTactic(tactic.id)}
                    className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                      selectedTactic === tactic.id 
                        ? 'border-egypt-navy bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h5 className="font-semibold">{tactic.name}</h5>
                        <p className="text-sm text-gray-600">{tactic.nameAr}</p>
                      </div>
                      {selectedTactic === tactic.id && (
                        <div className="w-5 h-5 bg-egypt-navy rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-2">{tactic.description}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex gap-3">
              <Button
                variant="secondary"
                onClick={() => {
                  setShowDeclareWarModal(false);
                  setSelectedCountry(null);
                }}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                onClick={handleDeclareWar}
                className="flex-1"
              >
                Confirm Declaration
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
