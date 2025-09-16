// Simulated API service that fetches data from JSON files
// This mimics real API calls for a production-like environment

interface Booking {
  id: string;
  serviceName: string;
  providerName: string;
  date: string;
  time: string;
  location: string;
  status: 'confirmed' | 'pending' | 'canceled';
  image: string;
}

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  image: string;
  bookingType: 'time_slot' | 'table_booking' | 'queue_only';
  category: string;
  tables?: Array<{
    id: string;
    name: string;
    capacity: number;
    location: string;
    available: boolean;
    availableUntil?: string;
  }>;
  queueInfo?: {
    currentQueue: number;
    estimatedWait: number;
    isOpen: boolean;
  };
}

interface Venue {
  id: string;
  name: string;
  location: string;
  date: string;
  time: string;
  price: number;
  rating: number;
  image: string;
  available: boolean;
  distance: number;
  isOpen: boolean;
  openingHours: string;
  description: string;
  images: string[];
  contactInfo: {
    phone: string;
    email: string;
    website: string;
  };
  facilities: string[];
  services: Service[];
}

interface Category {
  id: string;
  name: string;
  icon: string;
}

interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

// Helper function to simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Helper function to simulate API call to JSON files
const fetchFromJson = async <T>(filePath: string): Promise<ApiResponse<T>> => {
  try {
    // In a real app, this would be an actual API call
    // For now, we're importing the JSON data directly
    let data;
    switch (filePath) {
      case 'upcoming-bookings.json':
        data = await import('./json/upcoming-bookings.json');
        break;
      case 'past-bookings.json':
        data = await import('./json/past-bookings.json');
        break;
      case 'services.json':
        data = await import('./json/services.json');
        break;
      case 'venues.json':
        data = await import('./json/venues.json');
        break;
      case 'categories.json':
        data = await import('./json/categories.json');
        break;
      default:
        throw new Error(`Unknown file path: ${filePath}`);
    }
    
    await delay(300); // Simulate network delay
    return {
      data: data.default,
      status: 200,
      message: 'Success'
    };
  } catch (error) {
    await delay(300); // Simulate network delay even for errors
    return {
      data: null as unknown as T,
      status: 500,
      message: 'Error fetching data'
    };
  }
};

// Booking API functions
export const bookingApi = {
  // Get upcoming bookings
  getUpcomingBookings: async () => {
    return await fetchFromJson<Booking[]>('upcoming-bookings.json');
  },

  // Get past bookings
  getPastBookings: async () => {
    return await fetchFromJson<Booking[]>('past-bookings.json');
  },

  // Cancel a booking
  cancelBooking: async (bookingId: string, reason: string) => {
    await delay(500); // Simulate API call delay
    console.log(`Booking ${bookingId} canceled with reason: ${reason}`);
    return {
      status: 200,
      message: 'Booking canceled successfully'
    };
  },

  // Get booking by ID
  getBookingById: async (id: string) => {
    // In a real implementation, this would fetch a specific booking
    // For now, we'll simulate by searching through existing data
    const upcomingResponse = await fetchFromJson<Booking[]>('upcoming-bookings.json');
    const pastResponse = await fetchFromJson<Booking[]>('past-bookings.json');
    
    const allBookings = [
      ...upcomingResponse.data,
      ...pastResponse.data
    ];
    
    const booking = allBookings.find(b => b.id === id);
    
    if (booking) {
      await delay(300);
      return {
        data: booking,
        status: 200,
        message: 'Success'
      };
    } else {
      await delay(300);
      return {
        data: null,
        status: 404,
        message: 'Booking not found'
      };
    }
  }
};

// Service API functions
export const serviceApi = {
  // Get all services
  getAllServices: async () => {
    return await fetchFromJson<Service[]>('services.json');
  },

  // Get service by ID
  getServiceById: async (id: string) => {
    const response = await fetchFromJson<Service[]>('services.json');
    const service = response.data.find((s: Service) => s.id === id);
    return {
      data: service,
      status: service ? 200 : 404,
      message: service ? 'Success' : 'Service not found'
    };
  }
};

// Venue API functions
export const venueApi = {
  // Get all venues
  getAllVenues: async () => {
    return await fetchFromJson<Venue[]>('venues.json');
  },

  // Get venue by ID
  getVenueById: async (id: string) => {
    const response = await fetchFromJson<Venue[]>('venues.json');
    const venue = response.data.find((v: Venue) => v.id === id);
    return {
      data: venue,
      status: venue ? 200 : 404,
      message: venue ? 'Success' : 'Venue not found'
    };
  }
};

// Category API functions
export const categoryApi = {
  // Get all categories
  getAllCategories: async () => {
    return await fetchFromJson<Category[]>('categories.json');
  }
};

// Export all APIs
export const api = {
  bookings: bookingApi,
  services: serviceApi,
  venues: venueApi,
  categories: categoryApi
};