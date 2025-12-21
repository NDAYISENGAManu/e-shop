import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../connection';
import { Product as ProductType } from '@/types';

interface ProductCreationAttributes extends Optional<ProductType, 'id' | 'featured' | 'shipping' | 'stock' | 'stars' | 'reviews' | 'images' | 'colors' | 'createdAt' | 'updatedAt'> { }

class Product extends Model<ProductType, ProductCreationAttributes> implements ProductType {
  declare public id: number;
  declare public name: string;
  declare public price: number;
  declare public description: string;
  declare public category: string;
  declare public company: string;
  declare public featured: boolean;
  declare public shipping: boolean;
  declare public stock: number;
  declare public stars: number;
  declare public reviews: number;
  declare public createdBy?: number;
  declare public updatedBy?: number;
  declare public readonly createdAt: Date;
  declare public readonly updatedAt: Date;

  // Associations
  declare public readonly images?: ProductType['images'];
  declare public readonly colors?: ProductType['colors'];
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    company: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    featured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    shipping: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    stars: {
      type: DataTypes.DECIMAL(2, 1),
      defaultValue: 0,
    },
    reviews: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'created_by',
    },
    updatedBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'updated_by',
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at',
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updated_at',
    },
  },
  {
    sequelize,
    tableName: 'products',
    modelName: 'Product',
    underscored: true,
  }
);

export default Product;
