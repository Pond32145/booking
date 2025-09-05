import React from 'react';
import { Input, Button } from "@heroui/react";
import { Icon } from '@iconify/react';
import { useLanguage } from '../contexts/language-context';

interface SearchFiltersProps {
  onSearch: (query: string) => void;
  onFilterChange?: (filters: any) => void;
  showQuickFilters?: boolean;
  placeholder?: string;
  className?: string;
}

export const SearchFilters: React.FC<SearchFiltersProps> = ({ 
  onSearch, 
  onFilterChange, 
  showQuickFilters = false,
  placeholder,
  className = ""
}) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const { t } = useLanguage();

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleFilterChange = (filters: any) => {
    if (onFilterChange) {
      onFilterChange(filters);
    }
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="relative">
        <div className="premium-card p-0.5 md:p-1 bg-white/90 dark:bg-content1/90 backdrop-blur-xl">
          <Input
            placeholder={placeholder || t.searchPlaceholder}
            value={searchQuery}
            onValueChange={setSearchQuery}
            onKeyPress={handleKeyPress}
            startContent={
              <div className="flex items-center gap-2 pl-2">
                <Icon icon="lucide:search" className="text-slate-400" width={14} height={14} />
              </div>
            }
            endContent={
              <Button
                isIconOnly
                size="md"
                color="primary"
                onPress={handleSearch}
                className="bg-gradient-primary button-glow interactive-scale mr-0.5 md:mr-1"
                radius="lg"
              >
                <Icon icon="lucide:search" width={15} height={15} />
              </Button>
            }
            className="w-full"
            radius="lg"
            variant="flat"
            size="md"
            classNames={{
              inputWrapper: "bg-transparent border-0 shadow-none h-8 md:h-10",
              input: "text-base md:text-md placeholder:text-slate-400"
            }}
          />
        </div>
      </div>
    </div>
  );
};