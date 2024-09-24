'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'soft_deleted', {
      type: Sequelize.BOOLEAN,
      defaultValue: false, // Default to false
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'soft_deleted');
  }
};