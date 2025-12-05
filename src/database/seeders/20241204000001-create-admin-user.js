'use strict';
const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const adminPassword = await bcrypt.hash('Admin@123', 10);
    const customerPassword = await bcrypt.hash('Customer@123', 10);
    const adminAnswer1 = await bcrypt.hash('fluffy', 10);
    const adminAnswer2 = await bcrypt.hash('kigali', 10);
    const customerAnswer1 = await bcrypt.hash('rover', 10);
    const customerAnswer2 = await bcrypt.hash('nairobi', 10);
    
    await queryInterface.bulkInsert('users', [
      {
        email: 'admin@eshop.com',
        password: adminPassword,
        first_name: 'Admin',
        last_name: 'User',
        role: 'admin',
        security_question_1: 'What is your first pet\'s name?',
        security_answer_1: adminAnswer1,
        security_question_2: 'What city were you born in?',
        security_answer_2: adminAnswer2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        email: 'customer@eshop.com',
        password: customerPassword,
        first_name: 'John',
        last_name: 'Doe',
        role: 'user',
        security_question_1: 'What is your first pet\'s name?',
        security_answer_1: customerAnswer1,
        security_question_2: 'What city were you born in?',
        security_answer_2: customerAnswer2,
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
