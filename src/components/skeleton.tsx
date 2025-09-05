import React from 'react';
import { motion } from 'framer-motion';

interface SkeletonProps {
  className?: string;
  children?: React.ReactNode;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = '', children }) => {
  return (
    <motion.div
      className={`bg-default-200 dark:bg-default-100 rounded-medium animate-pulse ${className}`}
      initial={{ opacity: 0.6 }}
      animate={{ opacity: [0.6, 1, 0.6] }}
      transition={{ 
        repeat: Infinity, 
        duration: 1.5,
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.div>
  );
};

// Specific skeleton components for common use cases
export const CardSkeleton: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`border border-default-200 dark:border-default-100 rounded-large p-4 space-y-4 ${className}`}>
      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
      <Skeleton className="h-40 w-full rounded-medium" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </div>
  );
};

export const VenueCardSkeleton: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`border border-default-200 dark:border-default-100 rounded-large overflow-hidden ${className}`}>
      <Skeleton className="h-48 w-full" />
      <div className="p-4 space-y-3">
        <div className="flex justify-between items-start">
          <div className="space-y-2 flex-1">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
          <Skeleton className="h-6 w-12 rounded-full" />
        </div>
        <div className="flex justify-between items-center">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-8 w-20 rounded-medium" />
        </div>
      </div>
    </div>
  );
};

export const ServiceCardSkeleton: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`border border-default-200 dark:border-default-100 rounded-large p-4 ${className}`}>
      <div className="flex gap-4">
        <Skeleton className="h-24 w-24 rounded-medium flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
          <div className="flex justify-between items-center mt-3">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-8 w-16 rounded-medium" />
          </div>
        </div>
      </div>
    </div>
  );
};

export const BookingCardSkeleton: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`border border-default-200 dark:border-default-100 rounded-large p-4 ${className}`}>
      <div className="flex gap-4">
        <Skeleton className="h-16 w-16 rounded-medium flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="flex justify-between items-start">
            <Skeleton className="h-5 w-1/2" />
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>
          <Skeleton className="h-4 w-1/3" />
          <div className="flex gap-4 mt-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>
      </div>
      <div className="flex gap-2 mt-4">
        <Skeleton className="h-8 w-20 rounded-medium" />
        <Skeleton className="h-8 w-20 rounded-medium" />
      </div>
    </div>
  );
};

export const CategorySkeleton: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`border border-default-200 dark:border-default-100 rounded-large p-3 text-center ${className}`}>
      <Skeleton className="h-8 w-8 rounded-medium mx-auto mb-2" />
      <Skeleton className="h-4 w-3/4 mx-auto" />
    </div>
  );
};

export const TimeSlotSkeleton: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <Skeleton className={`h-10 w-full rounded-medium ${className}`} />
  );
};