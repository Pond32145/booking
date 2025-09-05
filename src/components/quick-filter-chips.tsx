import React from 'react';
import { Button } from "@heroui/react";
import { Icon } from '@iconify/react';

interface QuickFilterChipsProps {
  onFilterSelect?: (filter: string) => void;
  selectedFilter?: string;
}

interface FilterOption {
  id: string;
  label: string;
  icon: string;
}

export const QuickFilterChips: React.FC<QuickFilterChipsProps> = ({ 
  onFilterSelect, 
  selectedFilter 
}) => {
  const filterOptions: FilterOption[] = [
    { id: 'today', label: 'Today', icon: 'lucide:calendar-days' },
    { id: 'tomorrow', label: 'Tomorrow', icon: 'lucide:calendar-plus' },
    { id: 'weekend', label: 'Weekend', icon: 'lucide:calendar-range' },
    { id: 'nearby', label: 'Nearby', icon: 'lucide:map-pin' },
    { id: 'popular', label: 'Popular', icon: 'lucide:trending-up' }
  ];

  const handleFilterClick = (filterId: string) => {
    onFilterSelect?.(filterId);
  };

  return (
    <div className="flex flex-wrap gap-2 md:gap-3 justify-center">
      {filterOptions.map((filter) => (
        <Button
          key={filter.id}
          variant="flat"
          size="sm"
          className={`bg-slate-50 dark:bg-slate-800/50 hover:bg-primary-50 dark:hover:bg-primary-900/20 border border-slate-200 dark:border-slate-700 font-medium transition-all duration-200 text-xs md:text-sm ${
            selectedFilter === filter.id 
              ? 'bg-primary-50 dark:bg-primary-900/30 border-primary-200 dark:border-primary-700 text-primary-700 dark:text-primary-300' 
              : ''
          }`}
          radius="full"
          onPress={() => handleFilterClick(filter.id)}
          startContent={
            <Icon 
              icon={filter.icon}
              width={12} 
              height={12} 
              className={`transition-colors duration-200 ${
                selectedFilter === filter.id 
                  ? 'text-primary-600 dark:text-primary-400' 
                  : 'text-primary-500'
              }`}
            />
          }
        >
          {filter.label}
        </Button>
      ))}
    </div>
  );
};