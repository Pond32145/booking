import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

export interface CategoryAttributes {
  id: string;
  name: string;
  icon: string;
}

export interface CategoryInstance extends Model<CategoryAttributes>, CategoryAttributes {}

const Category = sequelize.define<CategoryInstance>(
  'Category',
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    icon: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

export default Category;