export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: 'user' | 'admin';
  createdAt: Date;
  updatedAt: Date;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  company: string;
  featured: boolean;
  shipping: boolean;
  stock: number;
  stars: number;
  reviews: number;
  images?: ProductImage[];
  colors?: ProductColor[];
  createdBy?: number;
  updatedBy?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductImage {
  id: number;
  productId: number;
  url: string;
  filename: string;
  width: number;
  height: number;
  isPrimary: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductColor {
  id: number;
  productId: number;
  color: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Cart {
  id: number;
  userId: number;
  items?: CartItem[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CartItem {
  id: number;
  cartId: number;
  productId: number;
  quantity: number;
  color: string;
  product?: Product;
  createdAt: Date;
  updatedAt: Date;
}

export interface Order {
  id: number;
  userId: number;
  total: number;
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';
  shippingFee: number;
  paymentIntentId?: string;
  items?: OrderItem[];
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  color: string;
  price: number;
  product?: Product;
  createdAt: Date;
  updatedAt: Date;
}

export interface Settings {
  id: number;
  storeName: string;
  email: string;
  phone: string;
  shippingFee: number;
  freeShippingThreshold: number;
  taxRate: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface PaginationResponse<T> {
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
