import React from 'react';
import { Input, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";
import { Icon } from '@iconify/react';
import { useLanguage } from '../../contexts/language-context';

interface SearchHistoryItem {
  query: string;
  timestamp: number;
}

interface SearchFiltersProps {
  onSearch: (query: string) => void;
  onFilterChange?: (filters: any) => void;
  showQuickFilters?: boolean;
  placeholder?: string;
  className?: string;
  searchHistory?: SearchHistoryItem[];
  onUseHistoryItem?: (query: string) => void;
  onClearHistory?: () => void;
}

export const SearchFilters: React.FC<SearchFiltersProps> = ({ 
  onSearch, 
  onFilterChange, 
  showQuickFilters = false,
  placeholder,
  className = "",
  searchHistory = [],
  onUseHistoryItem,
  onClearHistory
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

  const handleUseHistoryItem = (query: string) => {
    setSearchQuery(query);
    if (onUseHistoryItem) {
      onUseHistoryItem(query);
    } else {
      onSearch(query);
    }
  };

  const handleClearHistory = () => {
    if (onClearHistory) {
      onClearHistory();
    }
  };

  return (
    <div className={`w-full md:w-1/2 items-center justify-center ${className}`}>
      <div className="relative">
        <div className="premium-card p-0.5  bg-white/90 dark:bg-content1/90 backdrop-blur-xl">
          <Input
            placeholder={placeholder || t.searchPlaceholder}
            value={searchQuery}
            onValueChange={setSearchQuery}
            onKeyPress={handleKeyPress}
            startContent={
              <div className="flex items-center gap-1 pl-1">
                <Icon icon="lucide:search" className="text-slate-400" width={14} height={14} />
              </div>
            }
            endContent={
              <div className="flex items-center gap-1">
                {searchHistory.length > 0 && (
                  <Dropdown>
                    <DropdownTrigger>
                      <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        className="min-w-unit-8 w-8 h-8"
                      >
                        <Icon icon="lucide:history" width={16} height={16} />
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                      aria-label="Search history"
                      variant="flat"
                      className="max-h-60 overflow-y-auto"
                    >
                      <>
                        {searchHistory.map((item, index) => (
                          <DropdownItem
                            key={index}
                            onPress={() => handleUseHistoryItem(item.query)}
                            startContent={<Icon icon="lucide:clock" width={16} height={16} />}
                          >
                            {item.query}
                          </DropdownItem>
                        ))}
                        <DropdownItem
                          key="clear-history"
                          onPress={handleClearHistory}
                          startContent={<Icon icon="lucide:trash" width={16} height={16} />}
                          className="text-danger"
                        >
                          {t.clearAll}
                        </DropdownItem>
                      </>
                    </DropdownMenu>
                  </Dropdown>
                )}
                <Button
                  isIconOnly
                  size="md"
                  color="primary"
                  onPress={handleSearch}
                  className="bg-gradient-primary button-glow interactive-scale mr-0.5 md:mr-1"
                  radius="md"
                >
                  <Icon icon="lucide:search" width={15} height={15} />
                </Button>
              </div>
            }
            className="w-full"
            radius="md"
            variant="bordered"
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