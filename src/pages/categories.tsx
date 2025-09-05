import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from "@heroui/react";
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import { CategoryCard } from '../components/category-card';
import { useLanguage } from '../contexts/language-context';
import { getCategories } from '../data/categories';

export const CategoriesPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = React.useState('');
  const { t } = useLanguage();
  const history = useHistory();
  
  const categories = getCategories({
    restaurant: t.restaurant,
    salon: t.salon,
    hotel: t.hotel,
    pet: t.pet,
    karaoke: t.karaoke,
    gym: t.gym,
    bar: t.bar,
    spa: t.spa,
    fast_food: t.fast_food,
    clinic: t.clinic
  });

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    // Navigate to search results with the selected category
    history.push(`/search?category=${encodeURIComponent(categoryId)}`);
  };

  return (
    <div className="pb-20 md:pb-0">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="light"
          isIconOnly
          startContent={<Icon icon="lucide:arrow-left" width={20} height={20} />}
          onPress={() => history.goBack()}
          className="text-default-600 hover:text-default-900 transition-colors min-w-unit-10 w-10 h-10"
          aria-label={t.back}
        />
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-100">
            {t.categories}
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base">
            Choose a category to explore available services
          </p>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
        {categories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <CategoryCard
              icon={category.icon}
              name={category.name}
              isSelected={selectedCategory === category.id}
              onClick={() => handleCategorySelect(category.id)}
            />
          </motion.div>
        ))}
      </div>
      
      {/* Category Info */}
      <div className="mt-8 p-6 bg-gradient-to-r from-primary-50 to-primary-100/50 dark:from-primary-900/20 dark:to-primary-800/20 rounded-xl border border-primary-200/50 dark:border-primary-700/50">
        <div className="flex items-center gap-3 mb-3">
          <Icon icon="lucide:info" className="text-primary-600 dark:text-primary-400" width={20} height={20} />
          <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
            Browse by Category
          </h2>
        </div>
        <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base">
          Select any category above to view all available services and venues in that category. You can filter and sort results to find exactly what you're looking for.
        </p>
      </div>
    </div>
  );
};