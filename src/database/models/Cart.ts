import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../connection';
import { Cart as CartType } from '@/types';

interface CartCreationAttributes extends Optional<CartType, 'id' | 'items' | 'createdAt' | 'updatedAt'> { }

class Cart extends Model<CartType, CartCreationAttributes> implements CartType {
  public id!: number;
  public userId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Associations
  public readonly items?: CartType['items'];
}

Cart.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'user_id',
      references: {
        model: 'users',
        key: 'id',
      },
      onDelete: 'CASCADE',
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
    tableName: 'carts',
    modelName: 'Cart',
    underscored: true,
  }
);

export default Cart;
