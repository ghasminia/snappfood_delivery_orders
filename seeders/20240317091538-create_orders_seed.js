'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('orders', [
      {
        name: 'Order 1',
        description: 'Description of Order 1',
        delivery_time: new Date(),
        vendorId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Order 2',
        description: 'Description of Order 2',
        delivery_time: new Date(),
        vendorId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Order 3',
        description: 'Description of Order 3',
        delivery_time: new Date(),
        bike_delivery: true,
        vendorId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Order 4',
        description: 'Description of Order 4',
        delivery_time: new Date(),
        vendorId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Order 5',
        description: 'Description of Order 5',
        delivery_time: new Date(),
        vendorId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await Order.destroy({ truncate: true, cascade: true });
  }
};
