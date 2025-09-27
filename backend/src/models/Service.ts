import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

export interface ServiceAttributes {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  image: string;
  bookingType: 'time_slot' | 'table_booking' | 'queue_only';
  category: string;
  tables?: Array<{
    id: string;
    name: string;
    capacity: number;
    location: string;
    available: boolean;
    availableUntil?: string;
  }>;
  queueInfo?: {
    currentQueue: number;
    estimatedWait: number;
    isOpen: boolean;
  };
}

export interface ServiceInstance extends Model<ServiceAttributes>, ServiceAttributes {}

const Service = sequelize.define<ServiceInstance>(
  'Service',
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bookingType: {
      type: DataTypes.ENUM('time_slot', 'table_booking', 'queue_only'),
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tables: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    queueInfo: {
      type: DataTypes.JSON,
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);

export default Service;