import React from 'react';

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

const Container: React.FC<ContainerProps> = ({ children, className = '' }) => {
  return (
    <div className={`container mx-auto px-6 md:px-10 ${className}`}>
      {children}
    </div>
  );
};

export default Container;