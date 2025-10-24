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
    <aside className="w-72 bg-gradient-to-b from-purple-900/60 via-indigo-900/60 to-blue-900/60 text-white shadow-2xl flex flex-col border-r-2 border-neon-purple/40 backdrop-blur-xl relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-neon-purple/20 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-neon-cyan/20 rounded-full blur-3xl animate-pulse-slow"></div>
      
      <div className="p-6 border-b-2 border-neon-purple/40 glass-card-bright relative z-10">
        <div className="flex items-center gap-3 animate-fade-in">
          <Home size={28} className="text-neon-purple animate-bounce-subtle" />
          <span className="font-bold text-xl bg-gradient-to-r from-neon-purple via-neon-yellow to-neon-cyan bg-clip-text text-transparent">Game Menu</span>
        </div>
      </div>
      
      <nav className="flex-1 py-6 px-3 relative z-10">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = activePanel === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActivePanel(item.id)}
              className={`
                w-full flex items-center gap-4 px-6 py-4 mb-3 text-left transition-all duration-300 rounded-2xl relative overflow-hidden
                ${isActive 
                  ? 'bg-gradient-to-r from-neon-purple/40 to-neon-cyan/40 text-white border-l-4 border-neon-yellow shadow-neon-lg transform scale-105' 
                  : 'hover:bg-purple-800/30 text-gray-200 hover:text-neon-cyan-light hover:translate-x-3 hover:shadow-purple-glow'
                }
              `}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {isActive && (
                <div className="absolute inset-0 bg-gradient-to-r from-neon-purple/20 via-neon-yellow/20 to-neon-cyan/20 animate-pulse"></div>
              )}
              <Icon size={22} className={isActive ? 'animate-float text-neon-yellow' : 'text-neon-purple-light'} />
              <span className="font-semibold text-base relative z-10">{item.label}</span>
              {isActive && (
                <span className="ml-auto relative z-10">
                  <span className="inline-block w-3 h-3 bg-neon-yellow rounded-full animate-neon-pulse shadow-gold"></span>
                </span>
              )}
            </button>
          );
        })}
      </nav>
      
      <div className="p-6 border-t-2 border-neon-purple/40 glass-card-bright relative z-10">
        <div className="text-xs space-y-2">
          <p className="font-bold text-sm bg-gradient-to-r from-neon-purple to-neon-cyan bg-clip-text text-transparent">Egypt Empire 2025</p>
          <p className="text-neon-cyan-light">Version 1.0</p>
          <div className="mt-3 pt-3 border-t border-neon-purple/30">
            <p className="text-neon-yellow font-semibold flex items-center gap-2">
              🏛️ <span className="animate-pulse">Rule with wisdom</span>
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};
