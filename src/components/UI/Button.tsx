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
  const baseClasses = 'font-bold rounded-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-2xl transform hover:-translate-y-1 active:translate-y-0 relative overflow-hidden';
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-neon-purple via-neon-pink to-neon-cyan text-white hover:from-neon-purple-light hover:via-neon-pink-light hover:to-neon-cyan-light border-2 border-neon-purple/50 hover:border-neon-cyan shadow-neon hover:shadow-neon-lg',
    secondary: 'bg-gradient-to-r from-purple-800/60 to-indigo-800/60 text-white hover:from-purple-700/80 hover:to-indigo-700/80 border-2 border-purple-500/30 hover:border-purple-400 backdrop-blur-sm',
    danger: 'bg-gradient-to-r from-neon-pink to-red-600 text-white hover:from-neon-pink-light hover:to-red-500 border-2 border-neon-pink/50 hover:border-neon-pink shadow-lg',
    success: 'bg-gradient-to-r from-neon-cyan to-green-600 text-white hover:from-neon-cyan-light hover:to-green-500 border-2 border-neon-cyan/50 hover:border-neon-cyan shadow-cyan-glow',
  };
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3',
    lg: 'px-8 py-4 text-lg',
  };
  
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full hover:translate-x-full transition-transform duration-700"></span>
    </button>
  );
};
