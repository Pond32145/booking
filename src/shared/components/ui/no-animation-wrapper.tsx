import React from 'react';
import { useLocation } from 'react-router-dom';

interface NoAnimationWrapperProps {
  children: React.ReactNode;
}

export const NoAnimationWrapper: React.FC<NoAnimationWrapperProps> = ({ children }) => {
  const location = useLocation();
  
  // Force page refresh and scroll to top on route change
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname, location.search]);
  
  return (
    <div key={location.pathname + location.search} className="w-full">
      {children}
    </div>
  );
};