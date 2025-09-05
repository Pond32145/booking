# Data Files Refactoring Summary

## Overview
All mock data has been extracted from individual components and moved to dedicated data files for better organization and maintainability.

## Created Data Files

### 1. `src/data/venues.ts`
- **Interfaces**: `Venue`, `VenueDetails`, `ServiceItem`
- **Data Maps**: 
  - `venueNamesMap` - Maps venue IDs to names
  - `venueLocationsMap` - Maps venue IDs to locations  
  - `venueRatingsMap` - Maps venue IDs to ratings
- **Functions**:
  - `getHomePageVenues(todayText, tomorrowText)` - Returns venues for home page
  - `getVenueDetails(id)` - Returns detailed venue information
- **Constants**: 
  - `searchResultsVenues` - Array of venues for search results

### 2. `src/data/services.ts`
- **Interface**: `ServiceDetail`, `TimeSlot`
- **Data Map**: `serviceDetailsMap` - Maps service IDs to service details
- **Functions**:
  - `getServiceDetails(serviceId)` - Returns service details by ID
  - `generateTimeSlots()` - Generates available time slots

### 3. `src/data/bookings.ts`
- **Interface**: `BookingItem`
- **Constants**:
  - `upcomingBookings` - Array of upcoming bookings
  - `pastBookings` - Array of past bookings

### 4. `src/data/categories.ts`
- **Interface**: `Category`
- **Constants**: `categoryIds` - Array of category IDs
- **Function**: `getCategories(translations)` - Returns categories with translations

### 5. `src/data/filters.ts`
- **Interfaces**: `FilterOption`, `SortOption`
- **Constants**:
  - `filterOptions` - Array of filter options for search
  - `sortOptions` - Array of sort options for search

### 6. `src/data/translations.ts`
- **Constants**:
  - `thTranslations` - Thai translations object
  - `enTranslations` - English translations object
- **Type**: `TranslationKeys` - Type definition for translations

## Updated Files

### Context Files
- **`src/contexts/language-context.tsx`**
  - Imports translations from `data/translations.ts`
  - Updated type definitions

### Page Files
- **`src/pages/home.tsx`**
  - Imports `getCategories` and `getHomePageVenues`
  - Uses data functions instead of inline mock data

- **`src/pages/service-booking.tsx`**
  - Imports `venueNamesMap`, `getServiceDetails`, `generateTimeSlots`
  - Simplified mock data logic using imported functions

- **`src/pages/venue-details.tsx`**
  - Imports `getVenueDetails`, `VenueDetails`, `ServiceItem`
  - Uses function to get venue details instead of inline object

- **`src/pages/search-results.tsx`**
  - Imports `searchResultsVenues`, `filterOptions`, `sortOptions`
  - Uses imported constants instead of inline arrays

- **`src/pages/my-bookings.tsx`**
  - Imports `upcomingBookings`, `pastBookings`
  - Uses imported data instead of inline arrays

## Benefits

1. **Better Organization**: All mock data is centralized in dedicated files
2. **Easier Maintenance**: Changes to mock data only need to be made in one place
3. **Reusability**: Data can be shared across multiple components
4. **Type Safety**: Clear interfaces and types for all data structures
5. **Consistency**: Standardized data structure and format across the application

## Data Structure

All data follows consistent interfaces and patterns:
- Venues have standardized fields (id, name, location, etc.)
- Services follow a common structure with pricing and duration
- Bookings have consistent status types and formatting
- Translations are properly typed and organized by category

## Usage Examples

```typescript
// Import venue data
import { getHomePageVenues, getVenueDetails } from '../data/venues';

// Get venues for home page
const venues = getHomePageVenues(t.today, t.tomorrow);

// Get detailed venue information
const venueDetails = getVenueDetails(venueId);

// Import service data
import { getServiceDetails, generateTimeSlots } from '../data/services';

// Get service details
const service = getServiceDetails(serviceId);

// Generate time slots
const timeSlots = generateTimeSlots();
```

This refactoring makes the codebase more maintainable and provides a solid foundation for future data management improvements.