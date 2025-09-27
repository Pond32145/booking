import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

export interface VenueAttributes {
  id: string;
  name: string;
  location: string;
  date: string;
  time: string;
  price: number;
  rating: number;
  image: string;
  available: boolean;
  distance: number;
  isOpen: boolean;
  openingHours: string;
  description: string;
  images: string[];
  contactInfo: {
    phone: string;
    email: string;
    website: string;
  };
  facilities: string[];
  services: Array<{
    id: string;
    name: string;
    description: string;
    price: number;
    duration: number;
    image: string;
    bookingType: 'time_slot' | 'table_booking' | 'queue_only';
    category: string;
  }>;
}

export interface VenueInstance extends Model<VenueAttributes>, VenueAttributes {}

const Venue = sequelize.define<VenueInstance>(
  'Venue',
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    time: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    available: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    distance: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    isOpen: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    openingHours: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    images: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    contactInfo: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    facilities: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    services: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

export default Venue;