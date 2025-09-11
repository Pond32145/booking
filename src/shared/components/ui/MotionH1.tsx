import React from 'react';
import { motion } from 'framer-motion';

interface MotionH1Props {
  children: React.ReactNode;
  className?: string;
  initial?: any;
  animate?: any;
  transition?: any;
  [key: string]: any; // For additional props
}

export const MotionH1: React.FC<MotionH1Props> = ({
  children,
  className = '',
  initial = { opacity: 0, y: 20 },
  animate = { opacity: 1, y: 0 },
  transition = { duration: 0.3 },
  ...props
}) => {
  return (
    <motion.h1
      className={className}
      initial={initial}
      animate={animate}
      transition={transition}
      {...props}
    >
      {children}
    </motion.h1>
  );
};