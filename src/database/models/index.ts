import User from './User';
import Product from './Product';
import ProductImage from './ProductImage';
import ProductColor from './ProductColor';
import Cart from './Cart';
import CartItem from './CartItem';
import Order from './Order';
import OrderItem from './OrderItem';
import Settings from './Settings';

// User associations
User.hasOne(Cart, { foreignKey: 'userId', as: 'cart' });
User.hasMany(Order, { foreignKey: 'userId', as: 'orders' });

// Product associations
Product.hasMany(ProductImage, { foreignKey: 'productId', as: 'images' });
Product.hasMany(ProductColor, { foreignKey: 'productId', as: 'colors' });
Product.hasMany(CartItem, { foreignKey: 'productId', as: 'cartItems' });
Product.hasMany(OrderItem, { foreignKey: 'productId', as: 'orderItems' });

// ProductImage associations
ProductImage.belongsTo(Product, { foreignKey: 'productId', as: 'product' });

// ProductColor associations
ProductColor.belongsTo(Product, { foreignKey: 'productId', as: 'product' });

// Cart associations
Cart.belongsTo(User, { foreignKey: 'userId', as: 'user' });
Cart.hasMany(CartItem, { foreignKey: 'cartId', as: 'items' });

// CartItem associations
CartItem.belongsTo(Cart, { foreignKey: 'cartId', as: 'cart' });
CartItem.belongsTo(Product, { foreignKey: 'productId', as: 'product' });

// Order associations
Order.belongsTo(User, { foreignKey: 'userId', as: 'user' });
Order.hasMany(OrderItem, { foreignKey: 'orderId', as: 'items' });

// OrderItem associations
OrderItem.belongsTo(Order, { foreignKey: 'orderId', as: 'order' });
OrderItem.belongsTo(Product, { foreignKey: 'productId', as: 'product' });

const models = {
  User,
  Product,
  ProductImage,
  ProductColor,
  Cart,
  CartItem,
  Order,
  OrderItem,
  Settings,
};

export default models;
export {
  User,
  Product,
  ProductImage,
  ProductColor,
  Cart,
  CartItem,
  Order,
  OrderItem,
  Settings,
};
