// Booking types
export type BookingType = 'time_slot' | 'table_booking' | 'queue_only';

// Table information for restaurants/bars
export interface TableInfo {
  id: string;
  name: string;
  capacity: number;
  location: string; // 'window', 'center', 'private', 'bar'
  available: boolean;
  availableUntil?: string; // For time-limited table bookings
}

export interface ServiceDetail {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  image: string;
  bookingType: BookingType;
  category: string; // 'restaurant', 'salon', 'bar', etc.
  tables?: TableInfo[]; // For table booking services
  queueInfo?: {
    currentQueue: number;
    estimatedWait: number; // in minutes
    isOpen: boolean;
  };
}

// Service data mapping with various booking types
export const serviceDetailsMap: Record<string, ServiceDetail> = {
  // Time-based booking services (Salon, Spa, etc.)
  '101': {
    id: '101',
    name: 'ตัดผมและสไตล์',
    description: 'บริการตัดผมและจัดแต่งทรงผม โดยช่างมืออาชีพ',
    price: 500,
    duration: 60,
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&h=400&fit=crop&auto=format',
    bookingType: 'time_slot',
    category: 'salon'
  },
  '102': {
    id: '102',
    name: 'นวดผ่อนคลาย',
    description: 'บริการนวดแผนไทย เพื่อผ่อนคลายความเครียด',
    price: 800,
    duration: 90,
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&h=400&fit=crop&auto=format',
    bookingType: 'time_slot',
    category: 'spa'
  },
  '103': {
    id: '103',
    name: 'เทรนเนอร์ส่วนตัว',
    description: 'บริการเทรนเนอร์ส่วนตัว 1:1 ในโปรแกรมออกกำลังกาย',
    price: 1200,
    duration: 60,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop&auto=format',
    bookingType: 'time_slot',
    category: 'gym'
  },

  // Table booking services (Restaurants, Bars)
  '201': {
    id: '201',
    name: 'อาหารชุดพิเศษสำหรับ 2 ท่าน',
    description: 'ชุดอาหารสำหรับ 2 ท่าน พร้อมของหวานและเครื่องดื่ม',
    price: 1200,
    duration: 120,
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=400&fit=crop&auto=format',
    bookingType: 'table_booking',
    category: 'restaurant',
    tables: [
      { id: 'T01', name: 'โต๊ะริมหน้าต่าง 1', capacity: 2, location: 'window', available: true, availableUntil: '22:00' },
      { id: 'T02', name: 'โต๊ะริมหน้าต่าง 2', capacity: 2, location: 'window', available: false },
      { id: 'T03', name: 'โต๊ะกลางร้าน 1', capacity: 4, location: 'center', available: true, availableUntil: '21:30' },
      { id: 'T04', name: 'โต๊ะกลางร้าน 2', capacity: 4, location: 'center', available: true },
      { id: 'T05', name: 'ห้องส่วนตัว VIP', capacity: 6, location: 'private', available: true, availableUntil: '23:00' },
    ]
  },
  '202': {
    id: '202',
    name: 'เครื่องดื่มและอาหารว่าง',
    description: 'บาร์เครื่องดื่มและอาหารว่าง บรรยากาศสุดชิค',
    price: 800,
    duration: 180,
    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=600&h=400&fit=crop&auto=format',
    bookingType: 'table_booking',
    category: 'bar',
    tables: [
      { id: 'B01', name: 'โต๊ะบาร์ 1', capacity: 2, location: 'bar', available: true, availableUntil: '02:00' },
      { id: 'B02', name: 'โต๊ะบาร์ 2', capacity: 2, location: 'bar', available: true, availableUntil: '01:30' },
      { id: 'B03', name: 'โต๊ะสูง 1', capacity: 4, location: 'center', available: false },
      { id: 'B04', name: 'โต๊ะสูง 2', capacity: 4, location: 'center', available: true },
      { id: 'B05', name: 'โซฟาเซ็ต 1', capacity: 6, location: 'private', available: true, availableUntil: '02:30' },
      { id: 'B06', name: 'โซฟาเซ็ต 2', capacity: 8, location: 'private', available: true },
    ]
  },
  '203': {
    id: '203',
    name: 'บุฟเฟ่ต์มื้อกลางวัน',
    description: 'บุฟเฟ่ต์อาหารนานาชาติ ไม่จำกัดเวลา',
    price: 599,
    duration: 180,
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=400&fit=crop&auto=format',
    bookingType: 'table_booking',
    category: 'restaurant',
    tables: [
      { id: 'BF01', name: 'โต๊ะใหญ่ 1', capacity: 8, location: 'center', available: true },
      { id: 'BF02', name: 'โต๊ะใหญ่ 2', capacity: 8, location: 'center', available: true },
      { id: 'BF03', name: 'โต๊ะครอบครัว 1', capacity: 6, location: 'window', available: false },
      { id: 'BF04', name: 'โต๊ะครอบครัว 2', capacity: 6, location: 'window', available: true },
    ]
  },

  // Queue-only services (Fast food, Clinics, etc.)
  '301': {
    id: '301',
    name: 'อาหารจานด่วน',
    description: 'อาหารจานเดียว เสิร์ฟรวดเร็ว ไม่ต้องจองล่วงหน้า',
    price: 120,
    duration: 15,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=600&h=400&fit=crop&auto=format',
    bookingType: 'queue_only',
    category: 'fast_food',
    queueInfo: {
      currentQueue: 8,
      estimatedWait: 25,
      isOpen: true
    }
  },
  '302': {
    id: '302',
    name: 'คลินิกตรวจสุขภาพ',
    description: 'บริการตรวจสุขภาพทั่วไป ไม่ต้องนัดหมายล่วงหน้า',
    price: 500,
    duration: 30,
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop&auto=format',
    bookingType: 'queue_only',
    category: 'clinic',
    queueInfo: {
      currentQueue: 12,
      estimatedWait: 40,
      isOpen: true
    }
  },
  '303': {
    id: '303',
    name: 'ซื้อของออนไลน์ - รับที่ร้าน',
    description: 'สั่งซื้อออนไลน์แล้วมารับที่ร้าน ไม่ต้องรอคิว',
    price: 0,
    duration: 5,
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop&auto=format',
    bookingType: 'queue_only',
    category: 'pickup',
    queueInfo: {
      currentQueue: 3,
      estimatedWait: 5,
      isOpen: true
    }
  },

  // Mixed services
  '401': {
    id: '401',
    name: 'ห้องคาราโอเกะ',
    description: 'ห้องคาราโอเกะส่วนตัว เครื่องเสียงคุณภาพสูง',
    price: 300,
    duration: 120,
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop&auto=format',
    bookingType: 'table_booking',
    category: 'karaoke',
    tables: [
      { id: 'K01', name: 'ห้องเล็ก (2-4 คน)', capacity: 4, location: 'private', available: true, availableUntil: '02:00' },
      { id: 'K02', name: 'ห้องกลาง (5-8 คน)', capacity: 8, location: 'private', available: false },
      { id: 'K03', name: 'ห้องใหญ่ (9-12 คน)', capacity: 12, location: 'private', available: true, availableUntil: '01:30' },
      { id: 'K04', name: 'ห้อง VIP (13-20 คน)', capacity: 20, location: 'private', available: true },
    ]
  }
};

// Get service details by ID with fallback
export const getServiceDetails = (serviceId: string): ServiceDetail => {
  return serviceDetailsMap[serviceId] || serviceDetailsMap['301']; // Default to fast food
};

// Time slot generation for time-based bookings
export interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

export const generateTimeSlots = (): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  const startHour = 10; // 10 AM
  const endHour = 21; // 9 PM
  
  for (let hour = startHour; hour <= endHour; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      
      // Randomly determine if slot is available (for demo purposes)
      const isAvailable = Math.random() > 0.3;
      
      slots.push({
        id: `${hour}-${minute}`,
        time: `${timeString} น.`,
        available: isAvailable,
      });
    }
  }
  
  return slots;
};

// Table management functions
export const getAvailableTables = (serviceId: string): TableInfo[] => {
  const service = serviceDetailsMap[serviceId];
  return service?.tables?.filter(table => table.available) || [];
};

export const getAllTables = (serviceId: string): TableInfo[] => {
  const service = serviceDetailsMap[serviceId];
  return service?.tables || [];
};

// Queue management functions
export const getQueueInfo = (serviceId: string) => {
  const service = serviceDetailsMap[serviceId];
  return service?.queueInfo;
};

// Helper function to get booking type display name
export const getBookingTypeLabel = (bookingType: BookingType): string => {
  switch (bookingType) {
    case 'time_slot':
      return 'เลือกเวลา';
    case 'table_booking':
      return 'เลือกโต๊ะ';
    case 'queue_only':
      return 'เข้าคิว';
    default:
      return 'จอง';
  }
};

// Helper function to get table location display name
export const getTableLocationLabel = (location: string): string => {
  switch (location) {
    case 'window':
      return 'ริมหน้าต่าง';
    case 'center':
      return 'กลางร้าน';
    case 'private':
      return 'ห้องส่วนตัว';
    case 'bar':
      return 'เคาน์เตอร์บาร์';
    default:
      return location;
  }
};