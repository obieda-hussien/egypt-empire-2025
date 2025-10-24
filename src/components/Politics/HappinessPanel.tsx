import React from 'react';
import { useGameStore } from '../../store/gameStore';
import { Card } from '../UI/Card';
import { Heart, GraduationCap, Shield, DollarSign, Building, Briefcase } from 'lucide-react';

export const HappinessPanel: React.FC = () => {
  const { happinessIndicators, overallHappiness } = useGameStore();
  
  const indicators = [
    { id: 'health', name: 'Health', nameAr: 'صحة', value: happinessIndicators.health, icon: Heart, color: 'red' },
    { id: 'education', name: 'Education', nameAr: 'تعليم', value: happinessIndicators.education, icon: GraduationCap, color: 'blue' },
    { id: 'security', name: 'Security', nameAr: 'أمن', value: happinessIndicators.security, icon: Shield, color: 'green' },
    { id: 'economy', name: 'Economy', nameAr: 'اقتصاد', value: happinessIndicators.economy, icon: DollarSign, color: 'yellow' },
    { id: 'infrastructure', name: 'Infrastructure', nameAr: 'بنية تحتية', value: happinessIndicators.infrastructure, icon: Building, color: 'gray' },
    { id: 'employment', name: 'Employment', nameAr: 'توظيف', value: happinessIndicators.employment, icon: Briefcase, color: 'purple' },
  ];
  
  const getColor = (value: number) => {
    if (value >= 80) return 'bg-green-500';
    if (value >= 60) return 'bg-yellow-500';
    if (value >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };
  
  return (
    <div className="space-y-6">
      <Card title="Overall Citizen Happiness">
        <div className="text-center mb-6">
          <div className="text-6xl font-bold text-gray-800 mb-2">{overallHappiness}%</div>
          <div className="text-lg text-gray-600">
            {overallHappiness >= 80 ? 'Excellent' : 
             overallHappiness >= 60 ? 'Good' :
             overallHappiness >= 40 ? 'Fair' : 'Poor'}
          </div>
          <div className="mt-4 w-full bg-gray-200 rounded-full h-4">
            <div 
              className={`h-4 rounded-full transition-all ${getColor(overallHappiness)}`}
              style={{ width: `${overallHappiness}%` }}
            />
          </div>
        </div>
      </Card>
      
      <Card title="Happiness Indicators">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {indicators.map(indicator => {
            const Icon = indicator.icon;
            return (
              <div key={indicator.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-semibold">{indicator.name}</h4>
                    <p className="text-sm text-gray-500">{indicator.nameAr}</p>
                  </div>
                  <Icon className={`text-${indicator.color}-500`} size={24} />
                </div>
                
                <div className="mb-2">
                  <div className="text-2xl font-bold text-gray-800">{indicator.value}%</div>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${getColor(indicator.value)}`}
                    style={{ width: `${indicator.value}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </Card>
      
      <Card title="How to Improve Happiness">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h5 className="font-semibold text-red-800 mb-2">🏥 Health</h5>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Build hospitals and clinics</li>
              <li>• Invest in healthcare infrastructure</li>
              <li>• Launch health awareness campaigns</li>
            </ul>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h5 className="font-semibold text-blue-800 mb-2">🎓 Education</h5>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Build schools and universities</li>
              <li>• Increase teacher salaries</li>
              <li>• Modernize curriculum</li>
            </ul>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h5 className="font-semibold text-green-800 mb-2">🛡️ Security</h5>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Increase police presence</li>
              <li>• Combat crime effectively</li>
              <li>• Maintain peace and order</li>
            </ul>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h5 className="font-semibold text-yellow-800 mb-2">💰 Economy</h5>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Boost GDP growth</li>
              <li>• Control inflation</li>
              <li>• Support local businesses</li>
            </ul>
          </div>
          
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h5 className="font-semibold text-gray-800 mb-2">🏗️ Infrastructure</h5>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Build roads and bridges</li>
              <li>• Improve public transport</li>
              <li>• Develop utilities</li>
            </ul>
          </div>
          
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h5 className="font-semibold text-purple-800 mb-2">💼 Employment</h5>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Create job opportunities</li>
              <li>• Support entrepreneurship</li>
              <li>• Reduce unemployment</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};
