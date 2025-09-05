import React from 'react';
import { Card, CardBody } from "@heroui/react";
import { Icon } from '@iconify/react';

interface CategoryCardProps {
  icon: string;
  name: string;
  isSelected?: boolean;
  onClick: () => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ 
  icon, 
  name, 
  isSelected = false, 
  onClick 
}) => {
  return (
    <Card 
      isPressable 
      onPress={onClick}
      className={`w-full premium-card interactive-scale transition-all duration-300 ${
        isSelected 
          ? ' hover:ring-2 hover:ring-primary-200 dark:hover:ring-primary-800 hover:bg-primary-25 dark:hover:bg-primary-950/20' 
          : 'hover:ring-2 hover:ring-primary-200 dark:hover:ring-primary-800 hover:bg-primary-25 dark:hover:bg-primary-950/20'
      }`}
      shadow="none"
    >
      <CardBody className="flex flex-col items-center justify-center p-3 md:p-5">
        <div className={`rounded-xl md:rounded-2xl p-2.5 md:p-4 mb-2 md:mb-3 transition-all duration-300 ${
          isSelected 
            ? 'bg-slate-100 dark:bg-slate-800' 
            : 'bg-slate-100 dark:bg-slate-800 group-hover:bg-primary-100 dark:group-hover:bg-primary-900/30'
        }`}>
          <Icon 
            icon={icon} 
            width={18} 
            height={18} 
            className={`md:w-6 md:h-6 transition-colors duration-300 ${
              isSelected ? 'text-slate-600 dark:text-slate-400' : 'text-slate-600 dark:text-slate-400 group-hover:text-primary-500'
            }`} 
          />
        </div>
        <p className={`text-xs md:text-sm font-medium transition-colors duration-300 text-center leading-tight ${
          isSelected ? 'text-slate-700 dark:text-slate-300' : 'text-slate-700 dark:text-slate-300'
        }`}>
          {name}
        </p>
      </CardBody>
    </Card>
  );
};