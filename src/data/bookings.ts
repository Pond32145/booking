export interface BookingItem {
  id: string;
  serviceName: string;
  providerName: string;
  date: string;
  time: string;
  location: string;
  status: 'confirmed' | 'pending' | 'canceled';
  image: string;
}

// Upcoming bookings data
export const upcomingBookings: BookingItem[] = [
  {
    id: '101',
    serviceName: 'ร้านอาหารริมน้ำ',
    providerName: 'บริษัท ไฟน์ไดนิ่ง จำกัด',
    date: '15 ต.ค. 2566',
    time: '19:00 น.',
    location: 'สยาม',
    status: 'confirmed',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=400&fit=crop&auto=format',
  },
  {
    id: '102',
    serviceName: 'ร้านอาหารวิวสกาย',
    providerName: 'กรุ๊ป ซิตี้วิว',
    date: '18 ต.ค. 2566',
    time: '20:30 น.',
    location: 'อโศก',
    status: 'pending',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop&auto=format',
  },
];

// Past bookings data
export const pastBookings: BookingItem[] = [
  {
    id: '103',
    serviceName: 'Garden Cafe',
    providerName: 'Green Spaces Ltd.',
    date: 'Oct 5, 2023',
    time: '12:00 PM',
    location: 'Westside',
    status: 'confirmed',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&h=400&fit=crop&auto=format',
  },
  {
    id: '104',
    serviceName: 'Urban Eatery',
    providerName: 'City Bites Inc.',
    date: 'Sep 28, 2023',
    time: '6:30 PM',
    location: 'Downtown',
    status: 'canceled',
    image: 'https://images.unsplash.com/photo-1590846083693-4583b83eeee3?w=600&h=400&fit=crop&auto=format',
  },
];