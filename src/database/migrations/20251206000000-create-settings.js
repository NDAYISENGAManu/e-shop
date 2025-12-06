'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('settings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      storeName: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'E-Shop',
        field: 'store_name',
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'admin@eshop.com',
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '+1234567890',
      },
      shippingFee: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 5.00,
        field: 'shipping_fee',
      },
      freeShippingThreshold: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 50.00,
        field: 'free_shipping_threshold',
      },
      taxRate: {
        type: Sequelize.DECIMAL(5, 2),
        allowNull: false,
        defaultValue: 8.50,
        field: 'tax_rate',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'created_at',
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'updated_at',
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('settings');
  },
};
