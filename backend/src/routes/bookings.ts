import express from 'express';
import { getAllBookings, getBookingById, cancelBooking } from '../controllers/bookingController';

const router = express.Router();

// Get all bookings
router.get('/', getAllBookings);

// Get booking by ID
router.get('/:id', getBookingById);

// Cancel a booking
router.post('/:id/cancel', cancelBooking);

export default router;