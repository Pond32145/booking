export interface FilterOption {
  id: string;
  label: string;
  icon: string;
}

export interface SortOption {
  id: string;
  label: string;
}

// Filter options for search page
export const filterOptions: FilterOption[] = [
  { id: 'restaurant', label: 'ร้านอาหาร', icon: 'lucide:utensils' },
  { id: 'cafe', label: 'คาเฟ่', icon: 'lucide:coffee' },
  { id: 'bar', label: 'บาร์', icon: 'lucide:wine' },
  { id: 'promotions', label: 'โปรโมชั่น', icon: 'lucide:tag' },
  { id: 'nearby', label: 'ใกล้ฉัน', icon: 'lucide:map-pin' },
];

// Sort options for search page
export const sortOptions: SortOption[] = [
  { id: 'recommended', label: 'แนะนำ' },
  { id: 'distance', label: 'ระยะทาง' },
];
