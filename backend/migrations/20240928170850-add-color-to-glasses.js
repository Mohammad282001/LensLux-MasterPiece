'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Adding new columns to the Glasses table
    await queryInterface.addColumn('Glasses', 'color_name', {
      type: Sequelize.STRING(50),
      allowNull: false, // Set to false
    });

    await queryInterface.addColumn('Glasses', 'color_hex', {
      type: Sequelize.STRING(7), // Hex code format (#RRGGBB)
      allowNull: false, // Set to false
    });
  },

  async down(queryInterface, Sequelize) {
    // Removing the columns if needed
    await queryInterface.removeColumn('Glasses', 'color_name');
    await queryInterface.removeColumn('Glasses', 'color_hex');
  }
};
