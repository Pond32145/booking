import React from 'react';

interface WorkingPageTransitionProps {
  children: React.ReactNode;
}

export const WorkingPageTransition: React.FC<WorkingPageTransitionProps> = ({ children }) => {
  // Just render children directly without any animations
  return <div className="w-full min-h-screen">{children}</div>;
};
