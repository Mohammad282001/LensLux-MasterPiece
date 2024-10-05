'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Brands', 'brand_for', {
      type: Sequelize.STRING,
      allowNull: true, // You can change this to `false` if you want it to be a required field
      defaultValue: null // You can set a default value if necessary
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Brands', 'brand_for');
  }
};
