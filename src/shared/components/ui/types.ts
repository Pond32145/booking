import { ReactNode } from 'react';

export interface MotionComponentProps {
  children: ReactNode;
  className?: string;
  initial?: any;
  animate?: any;
  transition?: any;
  whileHover?: any;
  whileTap?: any;
  exit?: any;
  [key: string]: any;
}