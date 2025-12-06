import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../connection';
import { OrderItem as OrderItemType } from '@/types';

interface OrderItemCreationAttributes extends Optional<OrderItemType, 'id' | 'product' | 'createdAt' | 'updatedAt'> { }

class OrderItem extends Model<OrderItemType, OrderItemCreationAttributes> implements OrderItemType {
  public id!: number;
  public orderId!: number;
  public productId!: number;
  public quantity!: number;
  public color!: string;
  public price!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Associations
  public readonly product?: OrderItemType['product'];
}

OrderItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'order_id',
      references: {
        model: 'orders',
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
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
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
    tableName: 'order_items',
    modelName: 'OrderItem',
    underscored: true,
  }
);

export default OrderItem;
