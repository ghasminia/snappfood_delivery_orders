'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('agents', [
      {
        name: 'Agent 1',
        vendorId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Agent 2',
        vendorId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Agent 3',
        vendorId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('agents', null, {});
  }
};
