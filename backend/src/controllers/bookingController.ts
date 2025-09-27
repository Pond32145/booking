import { Request, Response } from 'express';
import Booking from '../models/Booking';

// Get all bookings
export const getAllBookings = async (req: Request, res: Response) => {
  try {
    const bookings = await Booking.findAll();
    // Convert to plain objects to ensure proper JSON serialization
    const plainBookings = bookings.map(booking => booking.toJSON());
    res.json({
      data: plainBookings,
      status: 200,
      message: 'Success'
    });
  } catch (error) {
    res.status(500).json({
      data: null,
      status: 500,
      message: 'Error fetching bookings'
    });
  }
};

// Get booking by ID
export const getBookingById = async (req: Request, res: Response) => {
  try {
    const booking = await Booking.findByPk(req.params.id);
    if (booking) {
      // Convert to plain object to ensure proper JSON serialization
      const plainBooking = booking.toJSON();
      res.json({
        data: plainBooking,
        status: 200,
        message: 'Success'
      });
    } else {
      res.status(404).json({
        data: null,
        status: 404,
        message: 'Booking not found'
      });
    }
  } catch (error) {
    res.status(500).json({
      data: null,
      status: 500,
      message: 'Error fetching booking'
    });
  }
};

// Cancel a booking
export const cancelBooking = async (req: Request, res: Response) => {
  try {
    const booking = await Booking.findByPk(req.params.id);
    if (booking) {
      // Update booking status to canceled
      booking.status = 'canceled';
      await booking.save();
      
      // Convert to plain object to ensure proper JSON serialization
      const plainBooking = booking.toJSON();
      res.json({
        data: plainBooking,
        status: 200,
        message: 'Booking canceled successfully'
      });
    } else {
      res.status(404).json({
        data: null,
        status: 404,
        message: 'Booking not found'
      });
    }
  } catch (error) {
    res.status(500).json({
      data: null,
      status: 500,
      message: 'Error canceling booking'
    });
  }
};