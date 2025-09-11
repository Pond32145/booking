import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const usePageRefresh = () => {
  const location = useLocation();
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    // Set initial load to false after the first render
    if (isInitialLoad) {
      const timer = setTimeout(() => {
        setIsInitialLoad(false);
      }, 100); // Small delay to ensure initial render
      
      return () => clearTimeout(timer);
    }
  }, [location.pathname, location.search, isInitialLoad]);

  return { 
    isInitialLoad
  };
};