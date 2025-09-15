import { api } from './api';

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

// Function to get upcoming bookings
export const getUpcomingBookings = async (): Promise<BookingItem[]> => {
  const response = await api.bookings.getUpcomingBookings();
  if (response.status === 200) {
    return response.data;
  } else {
    console.error('Failed to fetch upcoming bookings:', response.message);
    return [];
  }
};

// Function to get past bookings
export const getPastBookings = async (): Promise<BookingItem[]> => {
  const response = await api.bookings.getPastBookings();
  if (response.status === 200) {
    return response.data;
  } else {
    console.error('Failed to fetch past bookings:', response.message);
    return [];
  }
};

// Function to cancel a booking
export const cancelBooking = async (bookingId: string, reason: string): Promise<void> => {
  const response = await api.bookings.cancelBooking(bookingId, reason);
  if (response.status === 200) {
    console.log(`Booking ${bookingId} canceled successfully`);
  } else {
    console.error('Failed to cancel booking:', response.message);
    throw new Error(response.message);
  }
};

// Function to get booking by ID
export const getBookingById = async (id: string): Promise<BookingItem | null> => {
  const response = await api.bookings.getBookingById(id);
  if (response.status === 200) {
    return response.data;
  } else {
    console.error('Failed to fetch booking:', response.message);
    return null;
  }
};