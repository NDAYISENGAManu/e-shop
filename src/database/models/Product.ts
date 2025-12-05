import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../connection';

interface ProductAttributes {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  company: string;
  featured: boolean;
  shipping: boolean;
  stock: number;
  stars: number;
  reviews: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ProductCreationAttributes extends Optional<ProductAttributes, 'id' | 'featured' | 'shipping' | 'stock' | 'stars' | 'reviews'> {}

class Product extends Model<ProductAttributes, ProductCreationAttributes> implements ProductAttributes {
  public id!: number;
  public name!: string;
  public price!: number;
  public description!: string;
  public category!: string;
  public company!: string;
  public featured!: boolean;
  public shipping!: boolean;
  public stock!: number;
  public stars!: number;
  public reviews!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
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
  },
  {
    sequelize,
    tableName: 'products',
    modelName: 'Product',
    underscored: true,
  }
);

export default Product;
