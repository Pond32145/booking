import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

interface SimplePageTransitionProps {
  children: React.ReactNode;
}

export const SimplePageTransition: React.FC<SimplePageTransitionProps> = ({ children }) => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname + location.search}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{
          duration: 0.2,
          ease: 'easeInOut'
        }}
        className="w-full"
        onAnimationComplete={() => {
          // Ensure page is scrolled to top
          window.scrollTo(0, 0);
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};