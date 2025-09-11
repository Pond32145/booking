import React from 'react';
import { Tabs, Tab, Divider, addToast, Button } from "@heroui/react";
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import { SearchFilters } from '../../shared/components/ui/search-filters';
import { QuickFilterChips } from '../../shared/components/ui/quick-filter-chips';
import { CategoryCard } from '../../shared/components/ui/category-card';
import { BookingSlotCard } from '../../shared/components/ui/booking-slot-card';
import { CategorySkeleton, BookingSlotCardSkeleton } from '../../shared/components/ui/skeleton';
import { SEOHead } from '../../shared/components/seo/seo-head';
import { useLanguage } from '../../shared/contexts/language-context';
import { useHistory } from 'react-router-dom';
import { getCategories } from '../../shared/data/categories';
import { getHomePageVenues } from '../../shared/data/venues';
import { seoData } from '../../shared/data/seo-data';

export const HomePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = React.useState('restaurant');
  const [selectedQuickFilter, setSelectedQuickFilter] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(true);
  const { t } = useLanguage();
  const history = useHistory();

  // Simulate loading with reduced delay for faster loading
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800); // Reduced from 1500ms to 500ms
    return () => clearTimeout(timer);
  }, []);

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

  const bookingSlots = getHomePageVenues(t.today, t.tomorrow);

  const handleSearch = (query: string) => {
    history.push(`/search?q=${encodeURIComponent(query)}`);
  };

  const handleFilterChange = (filters: any) => {
    localStorage.setItem('searchFilters', JSON.stringify(filters));
  };

  const handleQuickFilterSelect = (filter: string) => {
    setSelectedQuickFilter(selectedQuickFilter === filter ? '' : filter);
    // Navigate to search with quick filter
    if (filter && filter !== selectedQuickFilter) {
      history.push(`/search?filter=${encodeURIComponent(filter)}`);
    }
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    // Navigate to search results with the selected category
    history.push(`/search?category=${encodeURIComponent(categoryId)}`);
  };

  const handleBookSlot = (id: string) => {
    // Instead of showing a toast, navigate to the venue details page
    history.push(`/venue/${id}`);
  };

  return (
    <>
      <SEOHead
        title={seoData.home.title}
        description={seoData.home.description}
        keywords={seoData.home.keywords}
        ogUrl={seoData.home.ogUrl}
        jsonLd={seoData.home.jsonLd}
      />
      <div className="pb-20 md:pb-0 relative overflow-hidden px-0.5 ">

        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-primary-400/20 to-secondary-400/20 rounded-full blur-xl"
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-success-400/20 to-warning-400/20 rounded-full blur-xl"
            animate={{
              y: [0, 15, 0],
              x: [0, -15, 0],
              scale: [1, 0.9, 1]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
          <motion.div
            className="absolute bottom-40 left-1/4 w-20 h-20 bg-gradient-to-br from-danger-400/20 to-primary-400/20 rounded-full blur-xl"
            animate={{
              y: [0, -10, 0],
              x: [0, 20, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 4
            }}
          />
        </div>

        {/* Enhanced Hero Section */}
        <div className="mb-8 md:mb-12 text-center relative z-10">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 rounded-full bg-gradient-to-r from-primary-50 via-secondary-50 to-success-50 dark:from-primary-900/30 dark:via-secondary-900/30 dark:to-success-900/30 text-primary-600 dark:text-primary-400 text-sm md:text-base font-semibold mb-6 md:mb-8 shadow-lg backdrop-blur-sm border border-white/20"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <Icon icon="lucide:sparkles" width={18} height={18} className="md:w-5 md:h-5" />
            </motion.div>
            <span>Smart Booking System</span>
            <Icon icon="lucide:zap" width={16} height={16} className="md:w-4 md:h-4 text-warning-500" />
          </div>

          <motion.h1
            className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 gradient-text-primary leading-tight relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }} // Reduced from 0.5s
          >
            {t.findAndBook}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <Icon icon="lucide:heart" className="text-danger-400 w-6 h-6 md:w-8 md:h-8 absolute -top-2 -right-2 md:-top-4 md:-right-4" />
            </motion.div>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed px-4 font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.05 }} // Reduced from 0.5s
          >
            {t.findAndBookDesc}
          </motion.p>


        </div>

        <div className="flex justify-center ">
          <SearchFilters onSearch={handleSearch} onFilterChange={handleFilterChange} />
        </div>

        {/* Quick Filter Chips */}
        <div className="mt-4 md:mt-6">
          <QuickFilterChips
            onFilterSelect={handleQuickFilterSelect}
            selectedFilter={selectedQuickFilter}
          />
        </div>

        <div className="mt-8 md:mt-12">
          <div className="flex items-center justify-between mb-4 md:mb-6 px-1">
            <h2 className="text-lg md:text-2xl font-bold flex items-center gap-2 md:gap-3 text-slate-800 dark:text-slate-100">
              <div className="w-6 h-6 md:w-8 md:h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Icon icon="lucide:grid" className="text-white md:w-[18px] md:h-[18px]" width={14} height={14} />
              </div>
              <span>{t.categories}</span>
            </h2>
            <Button
              variant="light"
              size="sm"
              endContent={<Icon icon="lucide:arrow-right" width={14} height={14} />}
              className="text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 text-xs md:text-sm"
              onPress={() => history.push('/categories')}
            >
              {t.viewAll}
            </Button>
          </div>

          {/* Categories with skeleton loading - Show only first 6 */}
          <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 gap-2 md:gap-4">
            {isLoading ? (
              Array.from({ length: 6 }).map((_, index) => (
                <CategorySkeleton key={index} />
              ))
            ) : (
              categories.slice(0, 6).map((category) => (
                <CategoryCard
                  key={category.id}
                  icon={category.icon}
                  name={category.name}
                  isSelected={selectedCategory === category.id}
                  onClick={() => handleCategorySelect(category.id)}
                />
              ))
            )}
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-5 mt-5">
            <h2 className="text-lg font-semibold flex items-center gap-2 text-slate-800 dark:text-slate-200">
              <Icon icon="lucide:map-pin" width={16} height={16} className="md:w-5 md:h-5" />
              <span>{t.nearby}</span>
            </h2>
            <Button
              variant="light"
              color="primary"
              size="sm"
              endContent={<Icon icon="lucide:arrow-right" width={16} height={16} />}
              className="font-medium"
              onPress={() => history.push('/search?filter=promotions')}
            >
              {t.viewAll}
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pb-4">
            {isLoading ? (
              Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="w-full">
                  <BookingSlotCardSkeleton />
                </div>
              ))
            ) : (
              bookingSlots.slice(0, 10).map((slot) => (
                <div key={`featured-${slot.id}`} className="w-full">
                  <BookingSlotCard
                    {...slot}
                    price={slot.price * 0.8} // 20% discount for featured deals
                    onBook={(id) => history.push(`/venue/${id}`)}
                  />
                </div>
              ))
            )}
          </div>

        </div>


      </div>
    </>
  );
};