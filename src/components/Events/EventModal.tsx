import React from 'react';
import { useGameStore } from '../../store/gameStore';
import { Modal } from '../UI/Modal';
import { Button } from '../UI/Button';
import { AlertTriangle, TrendingUp, Globe, Zap, DollarSign } from 'lucide-react';

export const EventModal: React.FC = () => {
  const { activeEvents, handleEventChoice } = useGameStore();
  
  const currentEvent = activeEvents[0];
  
  if (!currentEvent) return null;
  
  const getEventIcon = () => {
    switch (currentEvent.type) {
      case 'economic':
        return <DollarSign className="text-yellow-600" size={48} />;
      case 'political':
        return <AlertTriangle className="text-red-600" size={48} />;
      case 'natural_disaster':
        return <AlertTriangle className="text-orange-600" size={48} />;
      case 'opportunity':
        return <Zap className="text-green-600" size={48} />;
      case 'international':
        return <Globe className="text-blue-600" size={48} />;
      default:
        return <TrendingUp size={48} />;
    }
  };
  
  const getEventColor = () => {
    switch (currentEvent.type) {
      case 'economic':
        return 'border-yellow-300 bg-yellow-50';
      case 'political':
        return 'border-red-300 bg-red-50';
      case 'natural_disaster':
        return 'border-orange-300 bg-orange-50';
      case 'opportunity':
        return 'border-green-300 bg-green-50';
      case 'international':
        return 'border-blue-300 bg-blue-50';
      default:
        return 'border-gray-300 bg-gray-50';
    }
  };
  
  const handleChoice = (choiceId: string) => {
    const choice = currentEvent.choices.find(c => c.id === choiceId);
    if (choice) {
      handleEventChoice(currentEvent.id, choice);
    }
  };
  
  return (
    <Modal
      isOpen={true}
      onClose={() => {}}
      title="Random Event"
      size="lg"
    >
      <div className={`border-2 rounded-lg p-6 mb-6 ${getEventColor()}`}>
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            {getEventIcon()}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-xl font-bold text-gray-800">{currentEvent.title}</h3>
              <span className="px-2 py-1 bg-white rounded text-xs font-semibold uppercase">
                {currentEvent.type.replace('_', ' ')}
              </span>
            </div>
            <p className="text-gray-600 mb-2">{currentEvent.titleAr}</p>
            <p className="text-gray-700">{currentEvent.description}</p>
          </div>
        </div>
      </div>
      
      <div className="space-y-3">
        <h4 className="font-semibold text-gray-800 mb-3">Choose your response:</h4>
        
        {currentEvent.choices.map(choice => (
          <div
            key={choice.id}
            className="border-2 border-gray-200 rounded-lg p-4 hover:border-egypt-navy transition-colors cursor-pointer"
            onClick={() => handleChoice(choice.id)}
          >
            <h5 className="font-semibold text-gray-800 mb-1">{choice.text}</h5>
            <p className="text-sm text-gray-600 mb-3">{choice.textAr}</p>
            
            <div className="flex flex-wrap gap-2 text-xs">
              {choice.effects.treasury && (
                <span className={`px-2 py-1 rounded ${choice.effects.treasury > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  Treasury: {choice.effects.treasury > 0 ? '+' : ''}{(choice.effects.treasury / 1000000000).toFixed(1)}B EGP
                </span>
              )}
              {choice.effects.happiness && (
                <span className={`px-2 py-1 rounded ${choice.effects.happiness > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  Happiness: {choice.effects.happiness > 0 ? '+' : ''}{choice.effects.happiness}%
                </span>
              )}
              {choice.effects.popularity && (
                <span className={`px-2 py-1 rounded ${choice.effects.popularity > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  Popularity: {choice.effects.popularity > 0 ? '+' : ''}{choice.effects.popularity}%
                </span>
              )}
            </div>
            
            <div className="mt-3">
              <Button size="sm" variant="primary" className="w-full">
                Select This Option
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
};
