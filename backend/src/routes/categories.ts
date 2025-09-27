import express from 'express';
import { getAllCategories, getCategoryById } from '../controllers/categoryController';

const router = express.Router();

// Get all categories
router.get('/', getAllCategories);

// Get category by ID
router.get('/:id', getCategoryById);

export default router;