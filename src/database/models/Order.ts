import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../connection';
import User from './User';

interface OrderAttributes {
  id: number;
  userId: number;
  total: number;
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';
  shippingFee: number;
  paymentIntentId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface OrderCreationAttributes extends Optional<OrderAttributes, 'id' | 'status' | 'paymentIntentId'> {}

class Order extends Model<OrderAttributes, OrderCreationAttributes> implements OrderAttributes {
  public id!: number;
  public userId!: number;
  public total!: number;
  public status!: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';
  public shippingFee!: number;
  public paymentIntentId?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Order.init(
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
    total: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('pending', 'paid', 'shipped', 'delivered', 'cancelled'),
      defaultValue: 'pending',
    },
    shippingFee: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      field: 'shipping_fee',
    },
    paymentIntentId: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'payment_intent_id',
    },
  },
  {
    sequelize,
    tableName: 'orders',
    modelName: 'Order',
    underscored: true,
  }
);

export default Order;
