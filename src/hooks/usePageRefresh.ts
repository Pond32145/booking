import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const usePageRefresh = () => {
  const [pageKey, setPageKey] = useState(0);
  const location = useLocation();

  useEffect(() => {
    // Track navigation changes and force refresh
    const handleNavigation = () => {
      setPageKey(prev => prev + 1);
    };

    // Force refresh on location change
    handleNavigation();
  }, [location.pathname, location.search]);

  return pageKey;
};