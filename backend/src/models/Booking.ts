import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

export interface BookingAttributes {
  id: string;
  serviceName: string;
  providerName: string;
  date: string;
  time: string;
  location: string;
  status: 'confirmed' | 'pending' | 'canceled';
  image: string;
}

export interface BookingInstance extends Model<BookingAttributes>, BookingAttributes {}

const Booking = sequelize.define<BookingInstance>(
  'Booking',
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    serviceName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    providerName: {
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
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('confirmed', 'pending', 'canceled'),
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

export default Booking;