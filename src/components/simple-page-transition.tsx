import React from 'react';

interface SimplePageTransitionProps {
  children: React.ReactNode;
}

export const SimplePageTransition: React.FC<SimplePageTransitionProps> = ({ children }) => {
  // Just render children directly without any animations
  return <div className="w-full">{children}</div>;
};