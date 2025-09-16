import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Input, Button, Tabs, Tab, Pagination, Chip, Dropdown, DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem, Skeleton } from "@heroui/react";
import { Icon } from '@iconify/react';
import { MotionDiv } from '../../shared/components/ui/MotionDiv';
import { MotionH1 } from '../../shared/components/ui/MotionH1';
import { MotionP } from '../../shared/components/ui/MotionP';
import { BookingSlotCard } from '../../shared/components/ui/booking-slot-card';
import { BookingSlotCardSkeleton } from '../../shared/components/ui/skeleton';
import { SearchFilters } from '../../shared/components/ui/search-filters';
import { useLanguage } from '../../shared/contexts/language-context';
import { getSearchResultsVenues, type Venue } from '../../shared/data/venues';
import { filterOptions, sortOptions } from '../../shared/data/filters';

// Define search history item type
interface SearchHistoryItem {
  query: string;
  timestamp: number;
}

export const SearchResultsPage: React.FC = () => {
  const location = useLocation();
  const history = useHistory();
  const { t } = useLanguage();
  const [activeFilters, setActiveFilters] = React.useState<string[]>([]);
  const [sortBy, setSortBy] = React.useState<string>('recommended');
  const [currentPage, setCurrentPage] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(true);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [searchResults, setSearchResults] = React.useState<Venue[]>([]);
  const [searchHistory, setSearchHistory] = React.useState<SearchHistoryItem[]>([]);
  
  // Load search history from localStorage on component mount
  React.useEffect(() => {
    const savedHistory = localStorage.getItem('searchHistory');
    if (savedHistory) {
      try {
        setSearchHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error('Failed to parse search history', e);
        setSearchHistory([]);
      }
    }
  }, []);
  
  // Save search history to localStorage whenever it changes
  React.useEffect(() => {
    if (searchHistory.length > 0) {
      try {
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
      } catch (e) {
        console.error('Failed to save search history', e);
      }
    }
  }, [searchHistory]);
  
  // Parse URL parameters
  React.useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const query = urlParams.get('q') || '';
    const category = urlParams.get('category');
    const filterParams = urlParams.getAll('filter');
    
    setSearchQuery(query);
    
    // Add to search history if there's a query
    if (query) {
      addToSearchHistory(query);
    }
    
    // Set active filters based on URL parameters
    const filters: string[] = [];
    if (category) filters.push(category);
    if (filterParams.length > 0) filters.push(...filterParams);
    setActiveFilters(filters);
  }, [location.search]);
  
  // Simulate loading
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);
  
  // Fetch search results
  React.useEffect(() => {
    const fetchResults = async () => {
      setIsLoading(true);
      try {
        const results = await getSearchResultsVenues();
        // In a real app, we would filter these results based on the search query
        // For now, we'll just use all venues as search results
        setSearchResults(results);
      } catch (error) {
        console.error('Error fetching search results:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchResults();
  }, []);
  
  // Add search query to history
  const addToSearchHistory = (query: string) => {
    if (!query.trim()) return;
    
    const newHistoryItem: SearchHistoryItem = {
      query: query.trim(),
      timestamp: Date.now()
    };
    
    setSearchHistory(prevHistory => {
      // Remove duplicates
      const filteredHistory = prevHistory.filter(item => item.query.toLowerCase() !== query.trim().toLowerCase());
      // Add new item at the beginning
      const newHistory = [newHistoryItem, ...filteredHistory];
      // Keep only the last 10 items
      return newHistory.slice(0, 10);
    });
  };
  
  // Clear search history
  const clearSearchHistory = () => {
    setSearchHistory([]);
    try {
      localStorage.removeItem('searchHistory');
    } catch (e) {
      console.error('Failed to clear search history', e);
    }
  };
  
  // Use a search history item
  const useSearchHistoryItem = (query: string) => {
    setSearchQuery(query);
    addToSearchHistory(query);
    // Update URL with the selected search query
    const params = new URLSearchParams(location.search);
    params.set('q', query);
    history.push(`/search?${params.toString()}`);
  };
  
  const handleSearch = (newQuery: string) => {
    setSearchQuery(newQuery);
    // Add to search history
    addToSearchHistory(newQuery);
    // Update URL with new search query
    const params = new URLSearchParams(location.search);
    if (newQuery) {
      params.set('q', newQuery);
    } else {
      params.delete('q');
    }
    history.push(`/search?${params.toString()}`);
  };
  
  const handleFilterChange = (filters: any) => {
    // Handle filter changes from search bar
    console.log('Search filters changed:', filters);
  };
  
  const toggleFilter = (filterId: string) => {
    const newFilters = activeFilters.includes(filterId) 
      ? activeFilters.filter(id => id !== filterId)
      : [...activeFilters, filterId];
    
    setActiveFilters(newFilters);
    
    // Update URL with new filters
    updateURL(searchQuery, newFilters, sortBy);
  };
  
  const updateURL = (query: string, filters: string[], sort: string) => {
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (filters.length > 0) {
      filters.forEach(filter => {
        params.append('filter', filter);
      });
    }
    if (sort !== 'recommended') params.set('sort', sort);
    
    history.replace(`/search?${params.toString()}`);
  };
  
  const handleBookVenue = (id: string) => {
    history.push(`/venue/${id}`);
  };
  
  // Enhanced filtering logic
  const filteredResults = React.useMemo(() => {
    let results = searchResults; // Use the state variable instead of undefined searchResultsVenues
    
    // Text search filtering
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      results = results.filter(result => 
        result.name.toLowerCase().includes(query) ||
        result.location.toLowerCase().includes(query)
      );
    }
    
    // Category/Filter based filtering
    if (activeFilters.length > 0) {
      results = results.filter(result => {
        return activeFilters.some(filter => {
          switch (filter) {
            case 'restaurant':
              return result.name.includes('ร้านอาหาร') || result.name.includes('Restaurant');
            case 'cafe':
              return result.name.includes('คาเฟ่') || result.name.includes('Cafe');
            case 'bar':
              return result.name.includes('บาร์') || result.name.includes('Bar');
            case 'salon':
              return result.name.includes('ร้านเสริมสวย') || result.name.includes('Salon');
            case 'gym':
              return result.name.includes('ฟิตเนส') || result.name.includes('Gym');
            case 'hotel':
              return result.name.includes('โรงแรม') || result.name.includes('Hotel');
            case 'promotions':
              return result.price > 1000; // Assuming high-priced items have promotions
            case 'nearby':
              return result.location.includes('สยาม') || result.location.includes('อโศก');
            case 'today':
            case 'tomorrow':
            case 'weekend':
            case 'popular':
              return result.rating >= 4.5;
            default:
              return true;
          }
        });
      });
    }
    
    return results;
  }, [searchResults, searchQuery, activeFilters]); // Add searchResults to dependency array
  
  // Enhanced sorting logic
  const sortedResults = React.useMemo(() => {
    const results = [...filteredResults];
    
    switch (sortBy) {
      case 'price_low':
        return results.sort((a, b) => a.price - b.price);
      case 'price_high':
        return results.sort((a, b) => b.price - a.price);
      case 'rating':
        return results.sort((a, b) => b.rating - a.rating);
      case 'name':
        return results.sort((a, b) => a.name.localeCompare(b.name));
      case 'recommended':
      default:
        // Sort by a combination of rating and popularity
        return results.sort((a, b) => {
          const scoreA = a.rating * 0.7 + (a.available ? 0.3 : 0);
          const scoreB = b.rating * 0.7 + (b.available ? 0.3 : 0);
          return scoreB - scoreA;
        });
    }
  }, [filteredResults, sortBy]);
  
  // Handle sort change
  const handleSortChange = (newSort: string) => {
    setSortBy(newSort);
    updateURL(searchQuery, activeFilters, newSort);
    // Reset to first page when sorting changes
    setCurrentPage(1);
  };
  
  // Pagination logic
  const itemsPerPage = 8;
  const totalPages = Math.ceil(sortedResults.length / itemsPerPage);
  const paginatedResults = React.useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedResults.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedResults, currentPage, itemsPerPage]);
  
  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of results
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <div className="pb-10 md:pb-0">
      <div className='flex justify-between gap-1'>
      <div className="flex gap-4 mb-0">
        <Button
          variant="light"
          isIconOnly
          startContent={<Icon icon="lucide:arrow-left" width={20} height={20} />}
          onPress={() => history.goBack()}
          className="text-default-600 hover:text-default-900 transition-colors min-w-unit-10 w-10 h-10 pt-3"
          aria-label={t.back}
        />
      </div>
      
      {/* Search Bar */}
      <SearchFilters 
        onSearch={handleSearch} 
        onFilterChange={handleFilterChange}
        // placeholder="Search venues, services..."
        className="mb-3"
        searchHistory={searchHistory}
        onUseHistoryItem={useSearchHistoryItem}
        onClearHistory={clearSearchHistory}
      />
      
      {/* Search Results Header */}
      {!isLoading && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold">
                {t.searchResults} ({sortedResults.length} {t.resultsFound})
              </h2>
              {searchQuery && (
                <p className="text-default-500">
                  {t.searchResults} "{searchQuery}"
                </p>
              )}
            </div>
          </div>
        </div>
      )}
      </div>

      <div className="">
        {isLoading ? (
          <div className="flex items-center justify-between mb-1">
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-8 w-20" />
          </div>
        ) : (
          <div className="flex items-center justify-between mb-3 gap-2">
            {/* Filter Dropdown */}
            <Dropdown>
              <DropdownTrigger>
                <Button 
                  variant="bordered" 
                  size="sm"
                  endContent={<Icon icon="lucide:chevron-down" width={12} height={12} />}
                  className="w-full"
                >
                  <Icon icon="lucide:filter" width={12} height={12} className="mr-2" />
                  <span className="text-xs">{t.filters}</span>
                  {activeFilters.length > 0 && (
                    <Chip size="sm" color="primary" className="ml-2">
                      {activeFilters.length}
                    </Chip>
                  )}
                </Button>
              </DropdownTrigger>
              <DropdownMenu 
                aria-label="Filter options"
                variant="flat"
                closeOnSelect={false}
                selectionMode="multiple"
                selectedKeys={new Set(activeFilters)}
                onSelectionChange={(keys) => setActiveFilters(Array.from(keys as Set<string>))}
              >
                <DropdownSection title={t.filters}>
                  {filterOptions.map(filter => (
                    <DropdownItem
                      key={filter.id}
                      startContent={<Icon icon={filter.icon} width={16} height={16} />}
                    >
                      {filter.label}
                    </DropdownItem>
                  ))}
                </DropdownSection>
              </DropdownMenu>
            </Dropdown>

            {/* Sort Dropdown */}
            <Dropdown>
              <DropdownTrigger>
                <Button 
                  variant="bordered"
                  size="sm"
                  endContent={<Icon icon="lucide:chevron-down" width={12} height={12} />}
                  className="w-full"
                >
                  <Icon icon="lucide:arrow-up-down" width={12} height={12} className="mr-2" />
                  <span className="text-xs">{sortOptions.find(option => option.id === sortBy)?.label || t.sortBy}</span>
                </Button>
              </DropdownTrigger>
              <DropdownMenu 
                aria-label="Sort options"
                variant="flat"
                selectionMode="single"
                selectedKeys={new Set([sortBy])}
                onSelectionChange={(keys) => {
                  const selectedKey = Array.from(keys)[0] as string;
                  if (selectedKey) handleSortChange(selectedKey);
                }}
              >
                <DropdownSection title={t.sortBy}>
                  {sortOptions.map(option => (
                    <DropdownItem key={option.id}>
                      {option.label}
                    </DropdownItem>
                  ))}
                </DropdownSection>
              </DropdownMenu>
            </Dropdown>
          </div>
        )}

        {/* Active Filters Display */}
        {!isLoading && activeFilters.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {activeFilters.map(filterId => {
                const filter = filterOptions.find(f => f.id === filterId);
                return filter ? (
                  <Chip
                    key={filterId}
                    variant="solid"
                    color="primary"
                    size="sm"
                    onClose={() => toggleFilter(filterId)}
                    startContent={<Icon icon={filter.icon} width={14} height={14} />}
                  >
                    {filter.label}
                  </Chip>
                ) : null;
              })}
              <Button
                variant="light"
                size="sm"
                onPress={() => setActiveFilters([])}
                className="text-danger h-6 px-2 min-w-fit"
              >
                {t.clearAll}
              </Button>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {isLoading ? (
            Array.from({ length: 8 }).map((_, index) => (
              <BookingSlotCardSkeleton key={index} />
            ))
          ) : (
            paginatedResults.map((result) => (
              <div
                key={result.id}
              >
                <BookingSlotCard
                  {...result}
                  onBook={handleBookVenue}
                />
              </div>
            ))
          )}
        </div>
        
        <div className="flex justify-center mt-8 mb-8">
          <Pagination
            total={totalPages || 1}
            initialPage={1}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            showControls
            showShadow
          />
        </div>
      </div>
    </div>
  );
};