import React from 'react';

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-gradient-to-br from-dark-800/70 to-dark-900/70 backdrop-blur-sm p-8 md:p-10 rounded-xl border border-dark-700/50 hover:border-primary-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary-500/10 ${className}`}>
      {children}
    </div>
  );
};

export default Card;