import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Custom hook that scrolls to the top of the page when the location changes.
 * This ensures that when navigating between pages, the user always starts at the top.
 */
export const useScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    // Scroll to top of page when location changes
    window.scrollTo(0, 0);
  }, [location.pathname, location.search]);
};