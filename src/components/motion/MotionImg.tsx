import React from 'react';
import { motion } from 'framer-motion';

interface MotionImgProps {
  src?: string;
  alt?: string;
  className?: string;
  initial?: any;
  animate?: any;
  transition?: any;
  [key: string]: any; // For additional props
}

export const MotionImg: React.FC<MotionImgProps> = ({
  src,
  alt,
  className = '',
  initial = { opacity: 0 },
  animate = { opacity: 1 },
  transition = { duration: 0.3 },
  ...props
}) => {
  return (
    <motion.img
      src={src}
      alt={alt}
      className={className}
      initial={initial}
      animate={animate}
      transition={transition}
      {...props}
    />
  );
};