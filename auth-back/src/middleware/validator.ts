import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

// Validation middleware
export const validate = (req: Request, res: Response, next: NextFunction): any => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  
  next();
};