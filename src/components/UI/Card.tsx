import React from 'react';

interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  actions?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ title, children, className = '', actions }) => {
  return (
    <div className={`glass-card-bright rounded-2xl shadow-xl hover:shadow-neon transition-all duration-300 card-hover card-neon border-2 border-neon-purple/30 ${className}`}>
      {title && (
        <div className="border-b-2 border-neon-purple/40 px-6 py-4 flex justify-between items-center bg-gradient-to-r from-purple-900/40 to-indigo-900/40 rounded-t-2xl">
          <h3 className="text-lg font-bold bg-gradient-to-r from-neon-purple via-neon-yellow to-neon-cyan bg-clip-text text-transparent">{title}</h3>
          {actions && <div>{actions}</div>}
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};
