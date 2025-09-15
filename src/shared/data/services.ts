import { api } from './api';

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

// Get service details by ID with fallback
export const getServiceDetails = async (serviceId: string): Promise<ServiceDetail> => {
  const response = await api.services.getServiceById(serviceId);
  if (response.status === 200 && response.data) {
    return response.data;
  } else {
    // Return a default service if not found
    const defaultResponse = await api.services.getServiceById('301');
    return defaultResponse.data || {
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
    };
  }
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
export const getAvailableTables = async (serviceId: string): Promise<TableInfo[]> => {
  const service = await getServiceDetails(serviceId);
  return service?.tables?.filter(table => table.available) || [];
};

export const getAllTables = async (serviceId: string): Promise<TableInfo[]> => {
  const service = await getServiceDetails(serviceId);
  return service?.tables || [];
};

// Queue management functions
export const getQueueInfo = async (serviceId: string) => {
  const service = await getServiceDetails(serviceId);
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