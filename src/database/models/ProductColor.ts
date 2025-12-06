import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../connection';
import { ProductColor as ProductColorType } from '@/types';

interface ProductColorCreationAttributes extends Optional<ProductColorType, 'id' | 'createdAt' | 'updatedAt'> { }

class ProductColor extends Model<ProductColorType, ProductColorCreationAttributes> implements ProductColorType {
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
    tableName: 'product_colors',
    modelName: 'ProductColor',
    underscored: true,
  }
);

export default ProductColor;
