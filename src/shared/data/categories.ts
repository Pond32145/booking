import { api } from './api';

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
export const getCategories = async (translations: Record<CategoryId, string>): Promise<Category[]> => {
  const response = await api.categories.getAllCategories();
  if (response.status === 200) {
    // Map the JSON data to include translations
    return response.data.map(category => ({
      ...category,
      name: translations[category.id as CategoryId] || category.name
    }));
  } else {
    console.error('Failed to fetch categories:', response.message);
    // Return default categories if API fails
    return [
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
  }
};