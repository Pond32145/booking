export interface Category {
  id: string;
  name: string;
  icon: string;
}

// Category IDs for translation lookup
export const categoryIds = [
  'restaurant',
  'salon', 
  'hotel',
  'pet',
  'karaoke',
  'gym',
  'bar',
  'spa',
  'fast_food',
  'clinic'
] as const;

export type CategoryId = typeof categoryIds[number];

// Get categories with translations
export const getCategories = (translations: Record<CategoryId, string>): Category[] => [
  { id: 'restaurant', name: translations.restaurant, icon: 'lucide:utensils' },
  { id: 'salon', name: translations.salon, icon: 'lucide:scissors' },
  { id: 'hotel', name: translations.hotel, icon: 'lucide:hotel' },
  { id: 'pet', name: translations.pet, icon: 'lucide:paw-print' },
  { id: 'karaoke', name: translations.karaoke, icon: 'lucide:mic' },
  { id: 'gym', name: translations.gym, icon: 'lucide:dumbbell' },
  { id: 'bar', name: translations.bar, icon: 'lucide:wine' },
  { id: 'spa', name: translations.spa, icon: 'lucide:flower' },
  { id: 'fast_food', name: translations.fast_food, icon: 'lucide:coffee' },
  { id: 'clinic', name: translations.clinic, icon: 'lucide:stethoscope' },
];