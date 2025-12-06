import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../connection';
import { CartItem as CartItemType } from '@/types';

interface CartItemCreationAttributes extends Optional<CartItemType, 'id' | 'color' | 'product' | 'createdAt' | 'updatedAt'> { }

class CartItem extends Model<CartItemType, CartItemCreationAttributes> implements CartItemType {
  public id!: number;
  public cartId!: number;
  public productId!: number;
  public quantity!: number;
  public color!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Associations
  public readonly product?: CartItemType['product'];
}

CartItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    cartId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'cart_id',
      references: {
        model: 'carts',
        key: 'id',
      },
      onDelete: 'CASCADE',
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
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: true,
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
    tableName: 'cart_items',
    modelName: 'CartItem',
    underscored: true,
  }
);

export default CartItem;
