'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('vendors', [
      {
        name: 'Vendor 1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Vendor 2',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('vendors', null, {});
  }
};
