import { Request, Response } from 'express';
import Venue from '../models/Venue';

// Get all venues
export const getAllVenues = async (req: Request, res: Response) => {
  try {
    const venues = await Venue.findAll();
    // Convert to plain objects to ensure proper JSON serialization
    const plainVenues = venues.map(venue => venue.toJSON());
    res.json({
      data: plainVenues,
      status: 200,
      message: 'Success'
    });
  } catch (error) {
    res.status(500).json({
      data: null,
      status: 500,
      message: 'Error fetching venues'
    });
  }
};

// Get venue by ID
export const getVenueById = async (req: Request, res: Response) => {
  try {
    const venue = await Venue.findByPk(req.params.id);
    if (venue) {
      // Convert to plain object to ensure proper JSON serialization
      const plainVenue = venue.toJSON();
      res.json({
        data: plainVenue,
        status: 200,
        message: 'Success'
      });
    } else {
      res.status(404).json({
        data: null,
        status: 404,
        message: 'Venue not found'
      });
    }
  } catch (error) {
    res.status(500).json({
      data: null,
      status: 500,
      message: 'Error fetching venue'
    });
  }
};