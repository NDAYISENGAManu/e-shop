import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../connection';
import { Order as OrderType } from '@/types';

interface OrderCreationAttributes extends Optional<OrderType, 'id' | 'status' | 'paymentIntentId' | 'items' | 'createdAt' | 'updatedAt'> { }

class Order extends Model<OrderType, OrderCreationAttributes> implements OrderType {
  public id!: number;
  public userId!: number;
  public total!: number;
  public status!: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';
  public shippingFee!: number;
  public paymentIntentId?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Associations
  public readonly items?: OrderType['items'];
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
    tableName: 'orders',
    modelName: 'Order',
    underscored: true,
  }
);

export default Order;
