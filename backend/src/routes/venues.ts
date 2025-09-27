import express from 'express';
import { getAllVenues, getVenueById } from '../controllers/venueController';

const router = express.Router();

// Get all venues
router.get('/', getAllVenues);

// Get venue by ID
router.get('/:id', getVenueById);

export default router;