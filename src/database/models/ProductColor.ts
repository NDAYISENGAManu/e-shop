import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../connection';
import Product from './Product';

interface ProductColorAttributes {
  id: number;
  productId: number;
  color: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ProductColorCreationAttributes extends Optional<ProductColorAttributes, 'id'> {}

class ProductColor extends Model<ProductColorAttributes, ProductColorCreationAttributes> implements ProductColorAttributes {
  public id!: number;
  public productId!: number;
  public color!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

ProductColor.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'product_id',
      references: {
        model: 'products',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'product_colors',
    modelName: 'ProductColor',
    underscored: true,
  }
);

export default ProductColor;
