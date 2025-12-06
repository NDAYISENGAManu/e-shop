import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../connection';
import { ProductImage as ProductImageType } from '@/types';

interface ProductImageCreationAttributes extends Optional<ProductImageType, 'id' | 'isPrimary' | 'createdAt' | 'updatedAt'> { }

class ProductImage extends Model<ProductImageType, ProductImageCreationAttributes> implements ProductImageType {
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
    tableName: 'product_images',
    modelName: 'ProductImage',
    underscored: true,
  }
);

export default ProductImage;
