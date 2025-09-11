import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const useForceNavigation = () => {
  const [navigationKey, setNavigationKey] = useState(0);
  const location = useLocation();

  useEffect(() => {
    // Force navigation refresh when route changes
    setNavigationKey(prev => prev + 1);
  }, [location.pathname, location.search]);

  return navigationKey;
};