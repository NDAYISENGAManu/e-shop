'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Get actual product IDs from database
    const products = await queryInterface.sequelize.query(
      'SELECT id, name FROM products ORDER BY id ASC',
      { type: Sequelize.QueryTypes.SELECT }
    );

    if (products.length === 0) {
      console.log('No products found. Please run products seeder first.');
      return;
    }

    // Map product names to their actual IDs
    const productMap = {};
    products.forEach(p => {
      productMap[p.name] = p.id;
    });

    // Product colors based on the sample data
    const colorData = [
      // accent chair
      { name: 'accent chair', colors: ['#ff0000', '#00ff00', '#0000ff'] },
      // albany sectional
      { name: 'albany sectional', colors: ['#000', '#ffb900'] },
      // albany table
      { name: 'albany table', colors: ['#ffb900', '#0000ff'] },
      // armchair
      { name: 'armchair', colors: ['#000', '#00ff00', '#0000ff'] },
      // dining table
      { name: 'dining table', colors: ['#00ff00', '#0000ff', '#ff0000'] },
      // emperor bed
      { name: 'emperor bed', colors: ['#0000ff', '#000'] },
      // entertainment center
      { name: 'entertainment center', colors: ['#000', '#ff0000'] },
      // high-back bench
      { name: 'high-back bench', colors: ['#000', '#00ff00'] },
      // leather chair
      { name: 'leather chair', colors: ['#ff0000', '#ffb900', '#00ff00'] },
      // leather sofa
      { name: 'leather sofa', colors: ['#00ff00', '#0000ff'] },
      // modern bookshelf
      { name: 'modern bookshelf', colors: ['#ffb900', '#ff0000', '#00ff00'] },
      // modern poster
      { name: 'modern poster', colors: ['#000'] },
      // shelf
      { name: 'shelf', colors: ['#00ff00'] },
      // simple chair
      { name: 'simple chair', colors: ['#000', '#0000ff'] },
      // sofa set
      { name: 'sofa set', colors: ['#00ff00', '#ffb900'] },
      // suede armchair
      { name: 'suede armchair', colors: ['#ffb900'] },
      // utopia sofa
      { name: 'utopia sofa', colors: ['#ff0000', '#00ff00'] },
      // vase table
      { name: 'vase table', colors: ['#ff0000'] },
      // wooden bed
      { name: 'wooden bed', colors: ['#000', '#ffb900'] },
      // wooden desk
      { name: 'wooden desk', colors: ['#000'] },
      // wooden table
      { name: 'wooden table', colors: ['#ffb900', '#ff0000'] },
    ];

    const colors = [];
    colorData.forEach(item => {
      const productId = productMap[item.name];
      if (productId) {
        item.colors.forEach(color => {
          colors.push({
            product_id: productId,
            color: color,
            created_at: new Date(),
            updated_at: new Date(),
          });
        });
      }
    });

    if (colors.length > 0) {
      await queryInterface.bulkInsert('product_colors', colors, {});
      console.log(`Inserted ${colors.length} product colors`);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('product_colors', null, {});
  },
};
