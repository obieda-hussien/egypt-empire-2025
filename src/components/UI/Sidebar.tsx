import React from 'react';
import { useGameStore } from '../../store/gameStore';
import { 
  Map, 
  BarChart3, 
  Handshake, 
  Package, 
  Vote, 
  Globe,
  Sword,
  Home
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { activePanel, setActivePanel } = useGameStore();
  
  const menuItems = [
    { id: 'map', label: 'Map', icon: Map },
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'diplomacy', label: 'Diplomacy', icon: Handshake },
    { id: 'wars', label: 'Wars', icon: Sword },
    { id: 'resources', label: 'Resources', icon: Package },
    { id: 'politics', label: 'Politics', icon: Vote },
    { id: 'organizations', label: 'Organizations', icon: Globe },
  ];
  
  return (
    <aside className="w-64 bg-egypt-slate text-white shadow-lg flex flex-col">
      <div className="p-6 border-b border-slate-600">
        <div className="flex items-center gap-2 text-egypt-gold">
          <Home size={24} />
          <span className="font-bold text-lg">Game Menu</span>
        </div>
      </div>
      
      <nav className="flex-1 py-4">
        {menuItems.map(item => {
          const Icon = item.icon;
          const isActive = activePanel === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActivePanel(item.id)}
              className={`
                w-full flex items-center gap-3 px-6 py-3 text-left transition-colors
                ${isActive 
                  ? 'bg-egypt-navy text-egypt-gold border-r-4 border-egypt-gold' 
                  : 'hover:bg-slate-600 text-gray-200'
                }
              `}
            >
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
      
      <div className="p-6 border-t border-slate-600">
        <div className="text-xs text-gray-400">
          <p>Egypt Empire 2025</p>
          <p>Version 1.0</p>
        </div>
      </div>
    </aside>
  );
};
