import { Request, Response } from 'express';
import Category from '../models/Category';

// Get all categories
export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.findAll();
    // Convert to plain objects to ensure proper JSON serialization
    const plainCategories = categories.map(category => category.toJSON());
    res.json({
      data: plainCategories,
      status: 200,
      message: 'Success'
    });
  } catch (error) {
    res.status(500).json({
      data: null,
      status: 500,
      message: 'Error fetching categories'
    });
  }
};

// Get category by ID
export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (category) {
      // Convert to plain object to ensure proper JSON serialization
      const plainCategory = category.toJSON();
      res.json({
        data: plainCategory,
        status: 200,
        message: 'Success'
      });
    } else {
      res.status(404).json({
        data: null,
        status: 404,
        message: 'Category not found'
      });
    }
  } catch (error) {
    res.status(500).json({
      data: null,
      status: 500,
      message: 'Error fetching category'
    });
  }
};