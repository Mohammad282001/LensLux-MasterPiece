'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('OrderItems', 'details', {
      type: Sequelize.STRING, // You can modify the type based on your needs (e.g., TEXT, JSON)
      allowNull: true, // Set to false if details should be mandatory
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('OrderItems', 'details');
  }
};
