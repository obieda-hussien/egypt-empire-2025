import React, { useState } from 'react';
import { useGameStore } from '../../store/gameStore';
import { Card } from '../UI/Card';
import { Button } from '../UI/Button';
import { Modal } from '../UI/Modal';
import { ResourceType, CountryId } from '../../types/game';
import { resourcesData } from '../../data/resources';
import { getNeighboringCountries } from '../../data/countries';
import { Package, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

export const ResourceOverview: React.FC = () => {
  const { 
    resources, 
    production, 
    marketPrices, 
    imports, 
    exports,
    importResource,
    exportResource,
    treasury
  } = useGameStore();
  
  const [showTradeModal, setShowTradeModal] = useState(false);
  const [selectedResource, setSelectedResource] = useState<ResourceType | null>(null);
  const [tradeType, setTradeType] = useState<'import' | 'export'>('import');
  const [tradeAmount, setTradeAmount] = useState(100);
  const [tradeCountry, setTradeCountry] = useState<CountryId>('saudi_arabia');
  
  const countries = getNeighboringCountries();
  
  // Calculate total production
  const totalProduction: Partial<Record<ResourceType, number>> = {};
  Object.values(production).forEach(govProd => {
    Object.entries(govProd).forEach(([resource, amount]) => {
      totalProduction[resource as ResourceType] = 
        (totalProduction[resource as ResourceType] || 0) + (amount || 0);
    });
  });
  
  const handleTrade = () => {
    if (!selectedResource) return;
    
    if (tradeType === 'import') {
      importResource(selectedResource, tradeAmount, tradeCountry);
    } else {
      exportResource(selectedResource, tradeAmount, tradeCountry);
    }
    
    setShowTradeModal(false);
    setTradeAmount(100);
  };
  
  const getCategoryResources = (category: string) => {
    return resourcesData.filter(r => r.category === category);
  };
  
  return (
    <div className="space-y-6">
      <Card title="Resource Summary">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <Package className="mx-auto text-green-600 mb-2" size={32} />
            <div className="text-2xl font-bold text-gray-800">
              {Object.keys(totalProduction).length}
            </div>
            <div className="text-sm text-gray-600">Resource Types</div>
          </div>
          
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <TrendingUp className="mx-auto text-blue-600 mb-2" size={32} />
            <div className="text-2xl font-bold text-gray-800">{exports.length}</div>
            <div className="text-sm text-gray-600">Exports</div>
          </div>
          
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <TrendingDown className="mx-auto text-orange-600 mb-2" size={32} />
            <div className="text-2xl font-bold text-gray-800">{imports.length}</div>
            <div className="text-sm text-gray-600">Imports</div>
          </div>
          
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <DollarSign className="mx-auto text-purple-600 mb-2" size={32} />
            <div className="text-2xl font-bold text-gray-800">
              ${(2000000000 / 1000000000).toFixed(1)}B
            </div>
            <div className="text-sm text-gray-600">Suez Revenue/mo</div>
          </div>
        </div>
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {['natural', 'agricultural', 'industrial', 'service'].map(category => (
          <Card key={category} title={`${category.charAt(0).toUpperCase() + category.slice(1)} Resources`}>
            <div className="space-y-2">
              {getCategoryResources(category).map(resource => {
                const stockLevel = resources[resource.id] || 0;
                const productionLevel = totalProduction[resource.id] || 0;
                const price = marketPrices[resource.id] || resource.basePrice;
                
                return (
                  <div key={resource.id} className="border border-gray-200 rounded-lg p-3">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h5 className="font-semibold">{resource.name}</h5>
                        <p className="text-xs text-gray-500">{resource.nameAr}</p>
                      </div>
                      <span className="text-sm text-gray-600">
                        ${price.toLocaleString()}/{resource.unit}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-sm mb-2">
                      <div>
                        <span className="text-gray-600">Stock:</span>
                        <span className="font-semibold ml-1">{stockLevel.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Production:</span>
                        <span className="font-semibold ml-1">{productionLevel.toLocaleString()}/q</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => {
                          setSelectedResource(resource.id);
                          setTradeType('import');
                          setShowTradeModal(true);
                        }}
                        className="flex-1 text-xs"
                      >
                        Import
                      </Button>
                      <Button
                        size="sm"
                        variant="success"
                        onClick={() => {
                          setSelectedResource(resource.id);
                          setTradeType('export');
                          setShowTradeModal(true);
                        }}
                        className="flex-1 text-xs"
                        disabled={stockLevel < 100}
                      >
                        Export
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Recent Exports">
          {exports.slice(-5).reverse().map(trade => (
            <div key={trade.id} className="flex justify-between items-center py-2 border-b last:border-0">
              <div>
                <span className="font-medium">{trade.resource}</span>
                <span className="text-sm text-gray-500 ml-2">to {trade.country}</span>
              </div>
              <div className="text-right">
                <div className="font-semibold text-green-600">
                  +${(trade.amount * trade.pricePerUnit).toLocaleString()}
                </div>
                <div className="text-xs text-gray-500">{trade.amount} units</div>
              </div>
            </div>
          ))}
          {exports.length === 0 && (
            <p className="text-gray-500 text-center py-4">No exports yet</p>
          )}
        </Card>
        
        <Card title="Recent Imports">
          {imports.slice(-5).reverse().map(trade => (
            <div key={trade.id} className="flex justify-between items-center py-2 border-b last:border-0">
              <div>
                <span className="font-medium">{trade.resource}</span>
                <span className="text-sm text-gray-500 ml-2">from {trade.country}</span>
              </div>
              <div className="text-right">
                <div className="font-semibold text-red-600">
                  -${(trade.amount * trade.pricePerUnit).toLocaleString()}
                </div>
                <div className="text-xs text-gray-500">{trade.amount} units</div>
              </div>
            </div>
          ))}
          {imports.length === 0 && (
            <p className="text-gray-500 text-center py-4">No imports yet</p>
          )}
        </Card>
      </div>
      
      {/* Trade Modal */}
      <Modal
        isOpen={showTradeModal}
        onClose={() => setShowTradeModal(false)}
        title={`${tradeType === 'import' ? 'Import' : 'Export'} ${selectedResource || 'Resource'}`}
      >
        {selectedResource && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Country
              </label>
              <select
                value={tradeCountry}
                onChange={(e) => setTradeCountry(e.target.value as CountryId)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-egypt-navy focus:border-transparent"
              >
                {countries.map(country => (
                  <option key={country.id} value={country.id}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount
              </label>
              <input
                type="number"
                value={tradeAmount}
                onChange={(e) => setTradeAmount(Number(e.target.value))}
                min="1"
                step="10"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-egypt-navy focus:border-transparent"
              />
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Price per unit:</span>
                <span className="font-semibold">
                  ${(marketPrices[selectedResource] || 0).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-lg font-bold">
                <span>Total {tradeType === 'import' ? 'Cost' : 'Revenue'}:</span>
                <span className={tradeType === 'import' ? 'text-red-600' : 'text-green-600'}>
                  {tradeType === 'import' ? '-' : '+'}$
                  {(tradeAmount * (marketPrices[selectedResource] || 0)).toLocaleString()}
                </span>
              </div>
            </div>
            
            {tradeType === 'import' && treasury < tradeAmount * (marketPrices[selectedResource] || 0) && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-700">Insufficient funds for this transaction</p>
              </div>
            )}
            
            {tradeType === 'export' && (resources[selectedResource] || 0) < tradeAmount && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-700">Insufficient resources for export</p>
              </div>
            )}
            
            <div className="flex gap-3">
              <Button
                variant="secondary"
                onClick={() => setShowTradeModal(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                variant={tradeType === 'import' ? 'primary' : 'success'}
                onClick={handleTrade}
                className="flex-1"
                disabled={
                  (tradeType === 'import' && treasury < tradeAmount * (marketPrices[selectedResource] || 0)) ||
                  (tradeType === 'export' && (resources[selectedResource] || 0) < tradeAmount)
                }
              >
                Confirm {tradeType === 'import' ? 'Import' : 'Export'}
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
