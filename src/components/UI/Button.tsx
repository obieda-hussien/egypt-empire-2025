import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className = '',
  ...props 
}) => {
  const baseClasses = 'font-semibold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0';
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-egypt-navy to-egypt-navy-light text-white hover:from-egypt-navy-light hover:to-egypt-navy border-2 border-egypt-gold/30 hover:border-egypt-gold',
    secondary: 'bg-gradient-to-r from-egypt-slate-dark to-egypt-slate text-white hover:from-egypt-slate hover:to-egypt-slate-light border-2 border-egypt-slate-light/30 hover:border-egypt-slate-light',
    danger: 'bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 border-2 border-red-500/30 hover:border-red-400',
    success: 'bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 border-2 border-green-500/30 hover:border-green-400',
  };
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5',
    lg: 'px-7 py-3.5 text-lg',
  };
  
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
