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
export const getHomePageVenues = (todayText: string, tomorrowText: string): Venue[] => [
  {
    id: '1',
    name: 'ร้านอาหารริมน้ำ',
    location: 'สยาม',
    date: todayText,
    time: '19:00 น.',
    price: 850,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=400&fit=crop&auto=format',
    available: true,
    distance: 0.5,
    isOpen: true,
    openingHours: '10:00 - 22:00 น.'
  },
  {
    id: '2',
    name: 'สาลอนความงาม',
    location: 'อโศก',
    date: todayText,
    time: '14:30 น.',
    price: 500,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&h=400&fit=crop&auto=format',
    available: true,
    distance: 1.2,
    isOpen: true,
    openingHours: '09:00 - 20:00 น.'
  },
  {
    id: '3',
    name: 'บาร์และเครื่องดื่ม',
    location: 'ทองหล่อ',
    date: tomorrowText,
    time: '20:00 น.',
    price: 800,
    rating: 4.2,
    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=600&h=400&fit=crop&auto=format',
    available: true,
    distance: 2.3,
    isOpen: false,
    openingHours: '18:00 - 02:00 น.'
  },
  {
    id: '4',
    name: 'ร้านอาหารจานด่วน',
    location: 'สยาม',
    date: todayText,
    time: 'เข้าคิวเลย',
    price: 120,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=600&h=400&fit=crop&auto=format',
    available: true,
    distance: 0.8,
    isOpen: true,
    openingHours: '07:00 - 21:00 น.'
  },
  {
    id: '5',
    name: 'คลินิกตรวจสุขภาพ',
    location: 'พญาไท',
    date: todayText,
    time: 'เข้าคิวเลย',
    price: 500,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop&auto=format',
    available: true,
    distance: 3.1,
    isOpen: true,
    openingHours: '08:00 - 18:00 น.'
  },
  {
    id: '6',
    name: 'ฟิตเนสเซ็นเตอร์',
    location: 'เอกมัย',
    date: tomorrowText,
    time: '16:00 น.',
    price: 1200,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop&auto=format',
    available: true,
    distance: 4.2,
    isOpen: false,
    openingHours: '06:00 - 22:00 น.'
  },
];

// Search results venues data with expanded examples
export const searchResultsVenues: Venue[] = [
  {
    id: '1',
    name: 'ร้านอาหารริมน้ำ',
    location: 'สยาม',
    date: 'วันนี้',
    time: '19:00 น.',
    price: 950,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=400&fit=crop&auto=format',
    available: true,
    distance: 0.5,
    isOpen: true,
    openingHours: '10:00 - 22:00 น.'
  },
  {
    id: '2',
    name: 'สาลอนความงาม',
    location: 'อโศก',
    date: 'วันนี้',
    time: '14:30 น.',
    price: 500,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&h=400&fit=crop&auto=format',
    available: true,
    distance: 1.2,
    isOpen: true,
    openingHours: '09:00 - 20:00 น.'
  },
  {
    id: '3',
    name: 'บาร์และเครื่องดื่ม',
    location: 'ทองหล่อ',
    date: 'พรุ่งนี้',
    time: '20:00 น.',
    price: 800,
    rating: 4.2,
    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=600&h=400&fit=crop&auto=format',
    available: true,
    distance: 2.3,
    isOpen: false,
    openingHours: '18:00 - 02:00 น.'
  },
  {
    id: '4',
    name: 'ร้านอาหารจานด่วน',
    location: 'สยาม',
    date: 'วันนี้',
    time: 'เข้าคิวเลย',
    price: 120,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=600&h=400&fit=crop&auto=format',
    available: true,
    distance: 0.8,
    isOpen: true,
    openingHours: '07:00 - 21:00 น.'
  },
  {
    id: '5',
    name: 'คลินิกตรวจสุขภาพ',
    location: 'พญาไท',
    date: 'วันนี้',
    time: 'เข้าคิวเลย',
    price: 500,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop&auto=format',
    available: true,
    distance: 3.1,
    isOpen: true,
    openingHours: '08:00 - 18:00 น.'
  },
  {
    id: '6',
    name: 'ฟิตเนสเซ็นเตอร์',
    location: 'เอกมัย',
    date: 'พรุ่งนี้',
    time: '16:00 น.',
    price: 1200,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop&auto=format',
    available: true,
    distance: 4.2,
    isOpen: false,
    openingHours: '06:00 - 22:00 น.'
  },
  {
    id: '7',
    name: 'คาราโอเกะบาร์',
    location: 'ทองหล่อ',
    date: 'วันนี้',
    time: '21:00 น.',
    price: 300,
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop&auto=format',
    available: true,
    distance: 2.1,
    isOpen: true,
    openingHours: '12:00 - 01:00 น.'
  },
  {
    id: '8',
    name: 'สปาและนวดแผนไทย',
    location: 'สุขุมวิท',
    date: 'พรุ่งนี้',
    time: '11:00 น.',
    price: 800,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&h=400&fit=crop&auto=format',
    available: true,
    distance: 5.7,
    isOpen: true,
    openingHours: '10:00 - 22:00 น.'
  },
  {
    id: '9',
    name: 'ร้านกาแฟและเบเกอรี่',
    location: 'สีลม',
    date: 'วันนี้',
    time: '08:00 น.',
    price: 150,
    rating: 4.3,
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&h=400&fit=crop&auto=format',
    available: true,
    distance: 6.3,
    isOpen: true,
    openingHours: '06:00 - 20:00 น.'
  },
  {
    id: '10',
    name: 'ร้านอาหารอิตาเลียน',
    location: 'พร้อมพงษ์',
    date: 'พรุ่งนี้',
    time: '19:30 น.',
    price: 2000,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=600&h=400&fit=crop&auto=format',
    available: true,
    distance: 7.8,
    isOpen: false,
    openingHours: '11:00 - 23:00 น.'
  },
];

// Enhanced venue details with diverse service types
export const getVenueDetails = (id: string): VenueDetails => {
  const baseInfo = {
    id,
    name: venueNamesMap[id] || 'ร้านอาหารเมือง',
    location: venueLocationsMap[id] || 'สยาม',
    rating: venueRatingsMap[id] || 4.7,
    date: 'วันนี้',
    time: '18:00 น.',
    price: 0,
    available: true,
    image: '',
    distance: Math.floor(Math.random() * 10) + 1,
    isOpen: Math.random() > 0.5,
    openingHours: '10:00 - 22:00 น. ทุกวัน',
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
  };

  // Different service types based on venue ID
  switch (id) {
    case '1': // Restaurant with table booking
      return {
        ...baseInfo,
        description: 'ร้านอาหารบรรยากาศดี ตกแต่งสวยงาม จองโต๊ะล่วงหน้า',
        services: [
          {
            id: '201',
            name: 'อาหารชุดพิเศษสำหรับ 2 ท่าน',
            description: 'ชุดอาหารสำหรับ 2 ท่าน พร้อมของหวานและเครื่องดื่ม',
            price: 1200,
            duration: 120,
            image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop&auto=format',
            bookingType: 'table_booking' as const,
            category: 'restaurant'
          },
          {
            id: '203',
            name: 'บุฟเฟ่ต์มื้อกลางวัน',
            description: 'บุฟเฟ่ต์อาหารนานาชาติ ไม่จำกัดเวลา',
            price: 599,
            duration: 180,
            image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop&auto=format',
            bookingType: 'table_booking' as const,
            category: 'restaurant'
          },
        ]
      };
    
    case '2': // Beauty Salon with time slots
      return {
        ...baseInfo,
        name: 'สาลอนความงาม',
        description: 'สาลอนความงามครบวงจร บริการตัดผม เมคอัพ และสปา',
        openingHours: '09:00 - 20:00 น. ทุกวัน',
        services: [
          {
            id: '101',
            name: 'ตัดผมและสไตล์',
            description: 'บริการตัดผมและจัดแต่งทรงผม โดยช่างมืออาชีพ',
            price: 500,
            duration: 60,
            image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop&auto=format',
            bookingType: 'time_slot' as const,
            category: 'salon'
          },
          {
            id: '102',
            name: 'นวดผ่อนคลาย',
            description: 'บริการนวดแผนไทย เพื่อผ่อนคลายความเครียด',
            price: 800,
            duration: 90,
            image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=300&fit=crop&auto=format',
            bookingType: 'time_slot' as const,
            category: 'spa'
          },
        ]
      };

    case '3': // Bar with table booking
      return {
        ...baseInfo,
        name: 'บาร์และเครื่องดื่ม',
        description: 'บาร์บรรยากาศดี เครื่องดื่มคุณภาพ ดนตรีสด จองโต๊ะล่วงหน้า',
        openingHours: '18:00 - 02:00 น. ทุกวัน',
        services: [
          {
            id: '202',
            name: 'เครื่องดื่มและอาหารว่าง',
            description: 'บาร์เครื่องดื่มและอาหารว่าง บรรยากาศสุดชิค',
            price: 800,
            duration: 180,
            image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&h=300&fit=crop&auto=format',
            bookingType: 'table_booking' as const,
            category: 'bar'
          },
          {
            id: '401',
            name: 'ห้องคาราโอเกะ',
            description: 'ห้องคาราโอเกะส่วนตัว เครื่องเสียงคุณภาพสูง',
            price: 300,
            duration: 120,
            image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop&auto=format',
            bookingType: 'table_booking' as const,
            category: 'karaoke'
          },
        ]
      };

    case '5': // Medical Clinic with queue system
      return {
        ...baseInfo,
        name: 'คลินิกตรวจสุขภาพ',
        description: 'คลินิกตรวจสุขภาพทั่วไป บริการโดยแพทย์ผู้เชี่ยวชาญ',
        openingHours: '08:00 - 18:00 น. (จันทร์-ศุกร์)',
        services: [{
          id: '302',
          name: 'คลินิกตรวจสุขภาพ',
          description: 'บริการตรวจสุขภาพทั่วไป ไม่ต้องนัดหมายล่วงหน้า',
          price: 500,
          duration: 30,
          image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop&auto=format',
          bookingType: 'queue_only' as const,
          category: 'clinic'
        }]
      };
    
    case '6': // Fitness Center with time slots
      return {
        ...baseInfo,
        name: 'ฟิตเนสเซ็นเตอร์',
        description: 'ศูนย์ฟิตเนสครบครัน บริการเทรนเนอร์ส่วนตัว อุปกรณ์ทันสมัย',
        openingHours: '06:00 - 22:00 น. ทุกวัน',
        services: [{
          id: '103',
          name: 'เทรนเนอร์ส่วนตัว',
          description: 'บริการเทรนเนอร์ส่วนตัว 1:1 ในโปรแกรมออกกำลังกาย',
          price: 1200,
          duration: 60,
          image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&auto=format',
          bookingType: 'time_slot' as const,
          category: 'gym'
        }]
      };
    
    default:
      return {
        ...baseInfo,
        description: 'ร้านบริการคุณภาพ เหมาะสำหรับทุกโอกาส',
        services: [{
          id: '301',
          name: 'อาหารจานด่วน',
          description: 'อาหารจานเดียว เสิร์ฟรวดเร็ว ไม่ต้องจองล่วงหน้า',
          price: 120,
          duration: 15,
          image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop&auto=format',
          bookingType: 'queue_only' as const,
          category: 'fast_food'
        }]
      };
  }
};
