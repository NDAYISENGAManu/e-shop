'use strict';
const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const adminPassword = await bcrypt.hash('Admin@123', 10);
    const customerPassword = await bcrypt.hash('Customer@123', 10);
    
    await queryInterface.bulkInsert('users', [
      {
        email: 'admin@eshop.com',
        password: adminPassword,
        first_name: 'Admin',
        last_name: 'User',
        role: 'admin',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        email: 'customer@eshop.com',
        password: customerPassword,
        first_name: 'John',
        last_name: 'Doe',
        role: 'user',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', { 
      email: ['admin@eshop.com', 'customer@eshop.com'] 
    }, {});
  },
};
