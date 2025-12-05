'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Add indexes for products table
    await queryInterface.addIndex('products', ['category'], {
      name: 'idx_products_category',
    });
    await queryInterface.addIndex('products', ['company'], {
      name: 'idx_products_company',
    });
    await queryInterface.addIndex('products', ['featured'], {
      name: 'idx_products_featured',
    });
    await queryInterface.addIndex('products', ['created_at'], {
      name: 'idx_products_created_at',
    });
    await queryInterface.addIndex('products', ['price'], {
      name: 'idx_products_price',
    });

    // Add indexes for product_images table
    await queryInterface.addIndex('product_images', ['product_id'], {
      name: 'idx_product_images_product_id',
    });
    await queryInterface.addIndex('product_images', ['is_primary'], {
      name: 'idx_product_images_is_primary',
    });
    await queryInterface.addIndex('product_images', ['product_id', 'is_primary'], {
      name: 'idx_product_images_product_primary',
    });

    // Add indexes for product_colors table
    await queryInterface.addIndex('product_colors', ['product_id'], {
      name: 'idx_product_colors_product_id',
    });

    // Add indexes for carts table
    await queryInterface.addIndex('carts', ['user_id'], {
      name: 'idx_carts_user_id',
    });

    // Add indexes for cart_items table
    await queryInterface.addIndex('cart_items', ['cart_id'], {
      name: 'idx_cart_items_cart_id',
    });
    await queryInterface.addIndex('cart_items', ['product_id'], {
      name: 'idx_cart_items_product_id',
    });

    // Add indexes for orders table
    await queryInterface.addIndex('orders', ['user_id'], {
      name: 'idx_orders_user_id',
    });
    await queryInterface.addIndex('orders', ['status'], {
      name: 'idx_orders_status',
    });
    await queryInterface.addIndex('orders', ['created_at'], {
      name: 'idx_orders_created_at',
    });

    // Add indexes for order_items table
    await queryInterface.addIndex('order_items', ['order_id'], {
      name: 'idx_order_items_order_id',
    });
    await queryInterface.addIndex('order_items', ['product_id'], {
      name: 'idx_order_items_product_id',
    });

    // Add indexes for users table
    await queryInterface.addIndex('users', ['email'], {
      name: 'idx_users_email',
      unique: true,
    });
    await queryInterface.addIndex('users', ['role'], {
      name: 'idx_users_role',
    });
  },

  async down(queryInterface, Sequelize) {
    // Remove all indexes
    await queryInterface.removeIndex('products', 'idx_products_category');
    await queryInterface.removeIndex('products', 'idx_products_company');
    await queryInterface.removeIndex('products', 'idx_products_featured');
    await queryInterface.removeIndex('products', 'idx_products_created_at');
    await queryInterface.removeIndex('products', 'idx_products_price');
    await queryInterface.removeIndex('product_images', 'idx_product_images_product_id');
    await queryInterface.removeIndex('product_images', 'idx_product_images_is_primary');
    await queryInterface.removeIndex('product_images', 'idx_product_images_product_primary');
    await queryInterface.removeIndex('product_colors', 'idx_product_colors_product_id');
    await queryInterface.removeIndex('carts', 'idx_carts_user_id');
    await queryInterface.removeIndex('cart_items', 'idx_cart_items_cart_id');
    await queryInterface.removeIndex('cart_items', 'idx_cart_items_product_id');
    await queryInterface.removeIndex('orders', 'idx_orders_user_id');
    await queryInterface.removeIndex('orders', 'idx_orders_status');
    await queryInterface.removeIndex('orders', 'idx_orders_created_at');
    await queryInterface.removeIndex('order_items', 'idx_order_items_order_id');
    await queryInterface.removeIndex('order_items', 'idx_order_items_product_id');
    await queryInterface.removeIndex('users', 'idx_users_email');
    await queryInterface.removeIndex('users', 'idx_users_role');
  },
};
