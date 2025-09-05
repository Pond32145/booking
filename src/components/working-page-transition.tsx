import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

interface WorkingPageTransitionProps {
  children: React.ReactNode;
}

export const WorkingPageTransition: React.FC<WorkingPageTransitionProps> = ({ children }) => {
  const location = useLocation();

  // animation variants
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  // transition settings
  const pageTransition = {
    type: 'tween' as const,
    ease: 'easeInOut',
    duration: 0.3,
  };

  // scroll top helper
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'auto' });

  return (
    <AnimatePresence
      mode="wait"
      initial={false}
      onExitComplete={scrollToTop}
    >
      <motion.div
        key={`${location.pathname}${location.search}`}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={pageTransition}
        className="w-full min-h-screen"
        style={{ willChange: 'transform, opacity' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
