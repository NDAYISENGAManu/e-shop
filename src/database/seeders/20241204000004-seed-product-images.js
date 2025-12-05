'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Get actual product IDs from database
    const products = await queryInterface.sequelize.query(
      'SELECT id FROM products ORDER BY id ASC',
      { type: Sequelize.QueryTypes.SELECT }
    );

    if (products.length === 0) {
      console.log('No products found. Please run products seeder first.');
      return;
    }

    const images = [];
    
    // Generate placeholder images for each product
    products.forEach((product, index) => {
      const productId = product.id;
      const productNumber = index + 1;
      
      // Primary image
      images.push({
        product_id: productId,
        url: `https://via.placeholder.com/1000x667/CCCCCC/666666?text=Product+${productNumber}`,
        filename: `product-${productId}-1.jpg`,
        width: 1000,
        height: 667,
        is_primary: true,
        created_at: new Date(),
        updated_at: new Date(),
      });
      
      // Additional images
      for (let i = 2; i <= 5; i++) {
        images.push({
          product_id: productId,
          url: `https://via.placeholder.com/1000x667/DDDDDD/777777?text=Product+${productNumber}+Extra+${i}`,
          filename: `product-${productId}-${i}.jpg`,
          width: 1000,
          height: 667,
          is_primary: false,
          created_at: new Date(),
          updated_at: new Date(),
        });
      }
    });

    await queryInterface.bulkInsert('product_images', images, {});
    console.log(`Inserted ${images.length} product images for ${products.length} products`);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('product_images', null, {});
  },
};
