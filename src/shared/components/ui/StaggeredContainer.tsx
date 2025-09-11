import React from 'react';
import { motion } from 'framer-motion';

interface StaggeredContainerProps {
  children: React.ReactNode;
  className?: string;
  initial?: any;
  animate?: any;
  transition?: any;
  staggerDelay?: number;
  [key: string]: any; // For additional props
}

export const StaggeredContainer: React.FC<StaggeredContainerProps> = ({
  children,
  className = '',
  initial = { opacity: 0 },
  animate = { opacity: 1 },
  transition = { duration: 0.3 },
  staggerDelay = 0.1,
  ...props
}) => {
  return (
    <motion.div
      className={className}
      initial={initial}
      animate={animate}
      transition={transition}
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay
          }
        }
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};