import React from 'react';
import { Tabs, Tab, Divider, addToast, Button } from "@heroui/react";
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import { SearchFilters } from '../components/search-filters';
import { QuickFilterChips } from '../components/quick-filter-chips';
import { CategoryCard } from '../components/category-card';
import { BookingSlotCard } from '../components/booking-slot-card';
import { VenueCardSkeleton, CategorySkeleton } from '../components/skeleton';
import { SEOHead } from '../components/seo-head';
import { useLanguage } from '../contexts/language-context';
import { useHistory } from 'react-router-dom';
import { getCategories } from '../data/categories';
import { getHomePageVenues } from '../data/venues';
import { seoData } from '../data/seo-data';

export const HomePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = React.useState('restaurant');
  const [selectedQuickFilter, setSelectedQuickFilter] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(true);
  const { t } = useLanguage();
  const history = useHistory();
  
  // Simulate loading
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
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
      <div className="pb-20 md:pb-0 relative overflow-hidden">
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 rounded-full bg-gradient-to-r from-primary-50 via-secondary-50 to-success-50 dark:from-primary-900/30 dark:via-secondary-900/30 dark:to-success-900/30 text-primary-600 dark:text-primary-400 text-sm md:text-base font-semibold mb-6 md:mb-8 shadow-lg backdrop-blur-sm border border-white/20"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Icon icon="lucide:sparkles" width={18} height={18} className="md:w-5 md:h-5" />
          </motion.div>
          <span>Smart Booking System</span>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Icon icon="lucide:zap" width={16} height={16} className="md:w-4 md:h-4 text-warning-500" />
          </motion.div>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 gradient-text-primary leading-tight relative"
        >
          {t.findAndBook}
          <motion.div
            className="absolute -top-2 -right-2 md:-top-4 md:-right-4"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Icon icon="lucide:heart" className="text-danger-400 w-6 h-6 md:w-8 md:h-8" />
          </motion.div>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed px-4 font-medium"
        >
          {t.findAndBookDesc}
        </motion.p>
        
        {/* Floating Action Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex justify-center mt-6 md:mt-8 gap-8 md:gap-12"
        >
          <motion.div
            className="flex flex-col items-center"
            whileHover={{ scale: 1.1 }}
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0 }}
          >
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-lg mb-2">
              <Icon icon="lucide:search" className="text-white w-5 h-5 md:w-6 md:h-6" />
            </div>
            <span className="text-xs md:text-sm text-slate-500 dark:text-slate-400 font-medium">Search</span>
          </motion.div>
          
          <motion.div
            className="flex flex-col items-center"
            whileHover={{ scale: 1.1 }}
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          >
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-success-400 to-success-600 flex items-center justify-center shadow-lg mb-2">
              <Icon icon="lucide:calendar-check" className="text-white w-5 h-5 md:w-6 md:h-6" />
            </div>
            <span className="text-xs md:text-sm text-slate-500 dark:text-slate-400 font-medium">Book</span>
          </motion.div>
          
          <motion.div
            className="flex flex-col items-center"
            whileHover={{ scale: 1.1 }}
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          >
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-warning-400 to-warning-600 flex items-center justify-center shadow-lg mb-2">
              <Icon icon="lucide:star" className="text-white w-5 h-5 md:w-6 md:h-6" />
            </div>
            <span className="text-xs md:text-sm text-slate-500 dark:text-slate-400 font-medium">Enjoy</span>
          </motion.div>
        </motion.div>
      </div>
      
      <div className="flex justify-center"> 
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
              <div key={index} className="animate-pulse">
                <div className="premium-card p-3 md:p-4 text-center">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-slate-200 dark:bg-slate-700 rounded-xl mx-auto mb-2 md:mb-3"></div>
                  <div className="h-3 md:h-4 bg-slate-200 dark:bg-slate-700 rounded-md"></div>
                </div>
              </div>
            ))
          ) : (
            categories.slice(0, 6).map((category, index) => (
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
            ))
          )}
        </div>
      </div>
      
      <div className="mt-12 md:mt-16">
        <Tabs 
          aria-label="Booking options" 
          color="primary" 
          variant="underlined"
          classNames={{
            tabList: "premium-card p-1.5 md:p-2 rounded-xl shadow-lg backdrop-blur-xl",
            cursor: "bg-gradient-primary rounded-lg",
            tab: "data-[hover=true]:text-primary-500 font-semibold px-4 md:px-6 py-2 md:py-3 transition-all duration-200 text-sm md:text-base",
            panel: "mt-6 md:mt-8"
          }}
        >
          <Tab
            key="recommended"
            title={
              <div className="flex items-center gap-1 md:gap-2">
                <Icon icon="lucide:thumbs-up" width={16} height={16} className="md:w-5 md:h-5" />
                <span className="text-xs md:text-sm">{t.recommended}</span>
              </div>
            }
          >
            <div className="">
              {/* Venues with skeleton loading */}
              <div className="flex overflow-x-auto pb-4 md:pb-6 scrollbar-styled gap-3 md:gap-6">
                {isLoading ? (
                  Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="flex-shrink-0 w-64 md:w-80">
                      <div className="premium-card p-4 md:p-6 animate-pulse">
                        <div className="h-40 md:h-48 bg-slate-200 dark:bg-slate-700 rounded-xl mb-3 md:mb-4"></div>
                        <div className="space-y-2 md:space-y-3">
                          <div className="h-4 md:h-6 bg-slate-200 dark:bg-slate-700 rounded-md"></div>
                          <div className="h-3 md:h-4 bg-slate-200 dark:bg-slate-700 rounded-md w-3/4"></div>
                          <div className="h-3 md:h-4 bg-slate-200 dark:bg-slate-700 rounded-md w-1/2"></div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  bookingSlots.map((slot, index) => (
                    <motion.div
                      key={slot.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="flex-shrink-0 w-64 md:w-80"
                    >
                      <BookingSlotCard
                        {...slot}
                        onBook={(id) => history.push(`/venue/${id}`)}
                        hideDetails={true}
                      />
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          </Tab>
          <Tab
            key="popular"
            title={
              <div className="flex items-center gap-1 md:gap-2">
                <Icon icon="lucide:trending-up" width={16} height={16} className="md:w-5 md:h-5" />
                <span className="text-xs md:text-sm">{t.popular}</span>
              </div>
            }
          >
            <div className="">
              {isLoading ? (
                <div className="flex overflow-x-auto pb-4 md:pb-6 scrollbar-styled gap-3 md:gap-6">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="flex-shrink-0 w-64 md:w-80">
                      <div className="premium-card p-4 md:p-6 animate-pulse">
                        <div className="h-40 md:h-48 bg-slate-200 dark:bg-slate-700 rounded-xl mb-3 md:mb-4"></div>
                        <div className="space-y-2 md:space-y-3">
                          <div className="h-4 md:h-6 bg-slate-200 dark:bg-slate-700 rounded-md"></div>
                          <div className="h-3 md:h-4 bg-slate-200 dark:bg-slate-700 rounded-md w-3/4"></div>
                          <div className="h-3 md:h-4 bg-slate-200 dark:bg-slate-700 rounded-md w-1/2"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="glass-card p-8 md:p-12 text-center">
                  <Icon icon="lucide:trending-up" width={40} height={40} className="md:w-12 md:h-12 mx-auto mb-3 md:mb-4 text-primary-400 dark:text-primary-500" />
                  <h3 className="text-lg md:text-xl font-semibold mb-2 text-slate-800 dark:text-slate-200">Popular Bookings</h3>
                  <p className="text-sm md:text-base text-slate-600 dark:text-slate-400">การจองยอดนิยมจะแสดงที่นี่</p>
                </div>
              )}
            </div>
          </Tab>
          <Tab
            key="nearby"
            title={
              <div className="flex items-center gap-1 md:gap-2">
                <Icon icon="lucide:map-pin" width={16} height={16} className="md:w-5 md:h-5" />
                <span className="text-xs md:text-sm">{t.nearby}</span>
              </div>
            }
          >
            <div className="">
              {isLoading ? (
                <div className="flex overflow-x-auto pb-4 md:pb-6 scrollbar-styled gap-3 md:gap-6">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="flex-shrink-0 w-64 md:w-80">
                      <div className="premium-card p-4 md:p-6 animate-pulse">
                        <div className="h-40 md:h-48 bg-slate-200 dark:bg-slate-700 rounded-xl mb-3 md:mb-4"></div>
                        <div className="space-y-2 md:space-y-3">
                          <div className="h-4 md:h-6 bg-slate-200 dark:bg-slate-700 rounded-md"></div>
                          <div className="h-3 md:h-4 bg-slate-200 dark:bg-slate-700 rounded-md w-3/4"></div>
                          <div className="h-3 md:h-4 bg-slate-200 dark:bg-slate-700 rounded-md w-1/2"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="glass-card p-8 md:p-12 text-center">
                  <Icon icon="lucide:map-pin" width={40} height={40} className="md:w-12 md:h-12 mx-auto mb-3 md:mb-4 text-primary-400 dark:text-primary-500" />
                  <h3 className="text-lg md:text-xl font-semibold mb-2 text-slate-800 dark:text-slate-200">Nearby Places</h3>
                  <p className="text-sm md:text-base text-slate-600 dark:text-slate-400">การจองใกล้เคียงจะแสดงที่นี่</p>
                </div>
              )}
            </div>
          </Tab>
        </Tabs>
      </div>
      
      <Divider className="my-10" />
      
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold flex items-center gap-2 text-slate-800 dark:text-slate-200">
            <Icon icon="lucide:sparkles" className="text-amber-500" />
            <span>{t.specialPromotions}</span>
          </h2>
          <Button
            variant="light"
            color="primary"
            size="sm"
            endContent={<Icon icon="lucide:chevron-right" width={16} height={16} />}
            className="font-medium"
            onPress={() => history.push('/search?filter=promotions')}
          >
            {t.viewAll}
          </Button>
        </div>
        
        {/* Horizontal scrolling promotions with skeleton loading */}
        <div className="flex overflow-x-auto pb-4 scrollbar-hidden gap-4">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="flex-shrink-0 w-72">
                <VenueCardSkeleton />
              </div>
            ))
          ) : (
            bookingSlots.slice(0, 4).map((slot, index) => (
              <motion.div
                key={`featured-${slot.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex-shrink-0 w-72"
              >
                <BookingSlotCard
                  {...slot}
                  price={slot.price * 0.8} // 20% discount for featured deals
                  onBook={(id) => history.push(`/venue/${id}`)}
                />
              </motion.div>
            ))
          )}
        </div>
      </div>
      
      {/* Recently viewed section */}
      <div className="mt-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold flex items-center gap-2 text-slate-800 dark:text-slate-200">
            <Icon icon="lucide:clock" className="text-primary-500" />
            <span>{t.recentlyViewed}</span>
          </h2>
        </div>
        
        <div className="flex overflow-x-auto pb-4 scrollbar-hidden gap-4">
          {bookingSlots.slice(2, 5).map((slot, index) => (
            <motion.div
              key={`recent-${slot.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex-shrink-0 w-72"
            >
              <BookingSlotCard
                {...slot}
                onBook={(id) => history.push(`/venue/${id}`)}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
};