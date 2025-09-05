import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { usePageRefresh } from '../hooks/usePageRefresh';

interface PageTransitionProps {
  children: React.ReactNode;
}

// Define page hierarchy for determining transition direction
const pageHierarchy: Record<string, number> = {
  '/': 0,
  '/categories': 1,
  '/my-bookings': 1,
  '/venue': 2,
  '/booking': 3,
  '/search': 1,
  '/profile': 4,
  '/support': 4,
};

// Get the hierarchy level of a path
const getPageLevel = (path: string): number => {
  // Check for exact match first
  if (pageHierarchy[path] !== undefined) {
    return pageHierarchy[path];
  }
  
  // Check for route patterns
  if (path.startsWith('/venue/')) return 2;
  if (path.startsWith('/booking/')) return 3;
  if (path.includes('search')) return 1;
  
  return 0; // default to home level
};

export const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const location = useLocation();
  const { isInitialLoad } = usePageRefresh();
  const [prevPath, setPrevPath] = React.useState<string>(location.pathname);
  const [forceUpdate, setForceUpdate] = React.useState(0);
  
  // Update previous path when location changes
  React.useEffect(() => {
    // Force component refresh for proper state management
    setForceUpdate(prev => prev + 1);
    
    const timer = setTimeout(() => {
      setPrevPath(location.pathname);
    }, 50);
    
    return () => clearTimeout(timer);
  }, [location.pathname, location.search]);

  const currentLevel = getPageLevel(location.pathname);
  const previousLevel = getPageLevel(prevPath);
  
  // Determine transition direction
  const isForward = currentLevel > previousLevel;
  const slideDirection = isForward ? 1 : -1;

  const pageVariants = {
    initial: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    animate: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? '-100%' : '100%',
      opacity: 0,
    }),
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.3,
  };

  // Skip animation on initial load or if it's causing issues
  if (isInitialLoad) {
    return (
      <div className="w-full min-h-full">
        {children}
      </div>
    );
  }

  return (
    <AnimatePresence 
      mode="wait" 
      custom={slideDirection} 
      initial={false}
      onExitComplete={() => {
        // Ensure proper cleanup after exit animation
        window.scrollTo(0, 0);
      }}
    >
      <motion.div
        key={`${location.pathname}-${location.search}-${forceUpdate}`} // Include all state for proper re-renders
        custom={slideDirection}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={pageTransition}
        className="w-full min-h-full"
        style={{ willChange: 'transform, opacity' }} // Optimize for animations
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};