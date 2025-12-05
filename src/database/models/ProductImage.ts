import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../connection';
import Product from './Product';

interface ProductImageAttributes {
  id: number;
  productId: number;
  url: string;
  filename: string;
  width: number;
  height: number;
  isPrimary: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ProductImageCreationAttributes extends Optional<ProductImageAttributes, 'id' | 'isPrimary'> {}

class ProductImage extends Model<ProductImageAttributes, ProductImageCreationAttributes> implements ProductImageAttributes {
  public id!: number;
  public productId!: number;
  public url!: string;
  public filename!: string;
  public width!: number;
  public height!: number;
  public isPrimary!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

ProductImage.init(
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
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    filename: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    width: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    height: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isPrimary: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      field: 'is_primary',
    },
  },
  {
    sequelize,
    tableName: 'product_images',
    modelName: 'ProductImage',
    underscored: true,
  }
);

export default ProductImage;
