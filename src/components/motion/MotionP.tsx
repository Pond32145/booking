import React from 'react';
import { motion } from 'framer-motion';

interface MotionPProps {
  children: React.ReactNode;
  className?: string;
  initial?: any;
  animate?: any;
  transition?: any;
  [key: string]: any; // For additional props
}

export const MotionP: React.FC<MotionPProps> = ({
  children,
  className = '',
  initial = { opacity: 0, y: 20 },
  animate = { opacity: 1, y: 0 },
  transition = { duration: 0.3 },
  ...props
}) => {
  return (
    <motion.p
      className={className}
      initial={initial}
      animate={animate}
      transition={transition}
      {...props}
    >
      {children}
    </motion.p>
  );
};