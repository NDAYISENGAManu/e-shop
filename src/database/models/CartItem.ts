import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../connection';
import Cart from './Cart';
import Product from './Product';

interface CartItemAttributes {
  id: number;
  cartId: number;
  productId: number;
  quantity: number;
  color: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

interface CartItemCreationAttributes extends Optional<CartItemAttributes, 'id' | 'color'> {}

class CartItem extends Model<CartItemAttributes, CartItemCreationAttributes> implements CartItemAttributes {
  public id!: number;
  public cartId!: number;
  public productId!: number;
  public quantity!: number;
  public color!: string | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
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
  },
  {
    sequelize,
    tableName: 'cart_items',
    modelName: 'CartItem',
    underscored: true,
  }
);

export default CartItem;
