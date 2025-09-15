import { api } from './api';

export interface Venue {
  id: string;
  name: string;
  location: string;
  date: string;
  time: string;
  price: number;
  rating: number;
  image: string;
  available: boolean;
  distance?: number; // Distance in kilometers
  isOpen?: boolean; // Opening status
  openingHours?: string; // Opening hours
}

export interface VenueDetails extends Venue {
  description: string;
  images: string[];
  services: ServiceItem[];
  openingHours: string;
  contactInfo: {
    phone: string;
    email: string;
    website: string;
  };
  facilities: string[];
}

export interface ServiceItem {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  image: string;
  bookingType: 'time_slot' | 'table_booking' | 'queue_only';
  category: string;
}

// Venue lookup data
export const venueNamesMap: Record<string, string> = {
  '1': 'ร้านอาหารริมน้ำ',
  '2': 'สาลอนความงาม', 
  '3': 'บาร์และเครื่องดื่ม',
  '4': 'ร้านอาหารจานด่วน',
  '5': 'คลินิกตรวจสุขภาพ',
  '6': 'ฟิตเนสเซ็นเตอร์',
  '7': 'คาราโอเกะบาร์',
  '8': 'สปาและนวดแผนไทย',
  '9': 'ร้านกาแฟและเบเกอรี่',
  '10': 'ร้านอาหารอิตาเลียน'
};

export const venueLocationsMap: Record<string, string> = {
  '1': 'สยาม',
  '2': 'อโศก',
  '3': 'ทองหล่อ',
  '4': 'สยาม',
  '5': 'พญาไท',
  '6': 'เอกมัย',
  '7': 'ทองหล่อ',
  '8': 'สุขุมวิท',
  '9': 'สีลม',
  '10': 'พร้อมพงษ์'
};

export const venueRatingsMap: Record<string, number> = {
  '1': 4.8,
  '2': 4.5,
  '3': 4.2,
  '4': 4.7,
  '5': 4.9,
  '6': 4.6,
  '7': 4.4,
  '8': 4.8,
  '9': 4.3,
  '10': 4.7
};

// Home page venues data with diverse examples
export const getHomePageVenues = async (todayText: string, tomorrowText: string): Promise<Venue[]> => {
  const response = await api.venues.getAllVenues();
  if (response.status === 200) {
    // For demo purposes, we'll just return the first 6 venues
    return response.data.slice(0, 6).map(venue => ({
      ...venue,
      date: venue.id === '3' || venue.id === '6' ? tomorrowText : todayText
    }));
  } else {
    console.error('Failed to fetch venues:', response.message);
    return [];
  }
};

// Search results venues data
export const getSearchResultsVenues = async (): Promise<Venue[]> => {
  const response = await api.venues.getAllVenues();
  if (response.status === 200) {
    return response.data;
  } else {
    console.error('Failed to fetch venues:', response.message);
    return [];
  }
};

// Enhanced venue details with diverse service types
export const getVenueDetails = async (id: string): Promise<VenueDetails> => {
  const response = await api.venues.getVenueById(id);
  if (response.status === 200 && response.data) {
    // Transform the API Venue to VenueDetails
    const venue = response.data;
    return {
      ...venue,
      // Ensure all required properties are present
      description: venue.description || 'ไม่มีคำอธิบาย',
      images: venue.images || [],
      openingHours: venue.openingHours || '',
      contactInfo: venue.contactInfo || {
        phone: '',
        email: '',
        website: ''
      },
      facilities: venue.facilities || [],
      services: venue.services.map(service => ({
        id: service.id,
        name: service.name,
        description: service.description,
        price: service.price,
        duration: service.duration,
        image: service.image,
        bookingType: service.bookingType as 'time_slot' | 'table_booking' | 'queue_only',
        category: service.category
      }))
    };
  } else {
    // Return default venue details if not found
    const defaultResponse = await api.venues.getVenueById('4');
    const defaultVenue = defaultResponse.data || {
      id: '4',
      name: 'ร้านอาหารจานด่วน',
      location: 'สยาม',
      date: 'วันนี้',
      time: 'เข้าคิวเลย',
      price: 120,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=600&h=400&fit=crop&auto=format',
      available: true,
      distance: Math.floor(Math.random() * 10) + 1,
      isOpen: Math.random() > 0.5,
      openingHours: '10:00 - 22:00 น. ทุกวัน',
      description: 'ร้านบริการคุณภาพ เหมาะสำหรับทุกโอกาส',
      images: [
        'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=500&fit=crop&auto=format',
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=500&fit=crop&auto=format',
        'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&h=500&fit=crop&auto=format',
      ],
      contactInfo: {
        phone: '02-123-4567',
        email: 'contact@venue.com',
        website: 'www.venue.com',
      },
      facilities: ['ที่จอดรถ', 'Wi-Fi ฟรี', 'ห้องแอร์', 'รับบัตรเครดิต'],
      services: [{
        id: '301',
        name: 'อาหารจานด่วน',
        description: 'อาหารจานเดียว เสิร์ฟรวดเร็ว ไม่ต้องจองล่วงหน้า',
        price: 120,
        duration: 15,
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop&auto=format',
        bookingType: 'queue_only',
        category: 'fast_food'
      }]
    };
    
    return {
      ...defaultVenue,
      services: defaultVenue.services.map(service => ({
        id: service.id,
        name: service.name,
        description: service.description,
        price: service.price,
        duration: service.duration,
        image: service.image,
        bookingType: service.bookingType,
        category: service.category
      }))
    };
  }
};
