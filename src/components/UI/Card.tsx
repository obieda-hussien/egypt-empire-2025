import React from 'react';

interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  actions?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ title, children, className = '', actions }) => {
  return (
    <div className={`glass-card rounded-xl shadow-lg hover:shadow-gold transition-all duration-300 card-hover border border-egypt-gold/20 ${className}`}>
      {title && (
        <div className="border-b border-egypt-gold/30 px-6 py-4 flex justify-between items-center bg-gradient-to-r from-egypt-navy-dark/50 to-egypt-navy/50 rounded-t-xl">
          <h3 className="text-lg font-bold text-egypt-gold">{title}</h3>
          {actions && <div>{actions}</div>}
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};
