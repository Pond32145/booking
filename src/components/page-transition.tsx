import React from 'react';
import { usePageRefresh } from '../hooks/usePageRefresh';

interface PageTransitionProps {
  children: React.ReactNode;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const { isInitialLoad } = usePageRefresh();
  
  // Just render children directly without any animations
  return <div className="w-full min-h-full">{children}</div>;
};
