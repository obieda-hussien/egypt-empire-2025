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
    <aside className="w-72 bg-gradient-to-b from-egypt-slate-dark to-egypt-navy-dark text-white shadow-2xl flex flex-col border-r-2 border-egypt-gold/20 egyptian-pattern">
      <div className="p-6 border-b-2 border-egypt-gold/30 glass-card">
        <div className="flex items-center gap-3 text-egypt-gold animate-fade-in">
          <Home size={28} className="animate-pulse-slow" />
          <span className="font-bold text-xl gold-gradient">Game Menu</span>
        </div>
      </div>
      
      <nav className="flex-1 py-6 px-3">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = activePanel === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActivePanel(item.id)}
              className={`
                w-full flex items-center gap-4 px-6 py-4 mb-2 text-left transition-all duration-300 rounded-lg btn-egypt
                ${isActive 
                  ? 'bg-gradient-to-r from-egypt-navy to-egypt-navy-light text-egypt-gold border-l-4 border-egypt-gold shadow-gold transform scale-105' 
                  : 'hover:bg-egypt-slate/30 text-gray-200 hover:text-egypt-gold-light hover:translate-x-2'
                }
              `}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Icon size={22} className={isActive ? 'animate-pulse-slow' : ''} />
              <span className="font-semibold text-base">{item.label}</span>
              {isActive && (
                <span className="ml-auto">
                  <span className="inline-block w-2 h-2 bg-egypt-gold rounded-full animate-pulse"></span>
                </span>
              )}
            </button>
          );
        })}
      </nav>
      
      <div className="p-6 border-t-2 border-egypt-gold/30 glass-card">
        <div className="text-xs text-egypt-gold-light space-y-1">
          <p className="font-bold text-sm">Egypt Empire 2025</p>
          <p className="text-egypt-slate-light">Version 1.0</p>
          <div className="mt-3 pt-3 border-t border-egypt-gold/20">
            <p className="text-egypt-gold font-semibold">🏛️ Rule with wisdom</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
