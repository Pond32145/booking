import { Request, Response } from 'express';
import Service from '../models/Service';

// Get all services
export const getAllServices = async (req: Request, res: Response) => {
  try {
    const services = await Service.findAll();
    // Convert to plain objects to ensure proper JSON serialization
    const plainServices = services.map(service => service.toJSON());
    res.json({
      data: plainServices,
      status: 200,
      message: 'Success'
    });
  } catch (error) {
    res.status(500).json({
      data: null,
      status: 500,
      message: 'Error fetching services'
    });
  }
};

// Get service by ID
export const getServiceById = async (req: Request, res: Response) => {
  try {
    const service = await Service.findByPk(req.params.id);
    if (service) {
      // Convert to plain object to ensure proper JSON serialization
      const plainService = service.toJSON();
      res.json({
        data: plainService,
        status: 200,
        message: 'Success'
      });
    } else {
      res.status(404).json({
        data: null,
        status: 404,
        message: 'Service not found'
      });
    }
  } catch (error) {
    res.status(500).json({
      data: null,
      status: 500,
      message: 'Error fetching service'
    });
  }
};