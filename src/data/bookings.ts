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
    location: '0.9 กม',
    status: 'confirmed',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=400&fit=crop&auto=format',
  },
  {
    id: '102',
    serviceName: 'ร้านอาหารวิวสกาย',
    providerName: 'กรุ๊ป ซิตี้วิว',
    date: '18 ต.ค. 2566',
    time: '20:30 น.',
    location: '1.2 กม.',
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
    location: '2.9 กม',
    status: 'confirmed',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&h=400&fit=crop&auto=format',
  },
  {
    id: '104',
    serviceName: 'Urban Eatery',
    providerName: 'City Bites Inc.',
    date: 'Sep 28, 2023',
    time: '6:30 PM',
    location: '1.9 กม',
    status: 'canceled',
    image: 'https://images.unsplash.com/photo-1590846083693-4583b83eeee3?w=600&h=400&fit=crop&auto=format',
  },
];

// Function to get upcoming bookings
export const getUpcomingBookings = async (): Promise<BookingItem[]> => {
  // Simulate API call delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(upcomingBookings);
    }, 500);
  });
};

// Function to get past bookings
export const getPastBookings = async (): Promise<BookingItem[]> => {
  // Simulate API call delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(pastBookings);
    }, 500);
  });
};

// Function to cancel a booking
export const cancelBooking = async (bookingId: string, reason: string): Promise<void> => {
  // Simulate API call delay
  return new Promise((resolve) => {
    setTimeout(() => {
      // In a real app, you would update the booking status in the backend
      console.log(`Booking ${bookingId} canceled with reason: ${reason}`);
      resolve();
    }, 500);
  });
};