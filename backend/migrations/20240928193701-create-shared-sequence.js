'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Create the shared sequence
    await queryInterface.sequelize.query(`
      CREATE SEQUENCE shared_id_sequence
      START WITH 1
      INCREMENT BY 1;
    `);
  },

  async down(queryInterface, Sequelize) {
    // Drop the shared sequence if it exists
    await queryInterface.sequelize.query(`
      DROP SEQUENCE IF EXISTS shared_id_sequence;
    `);
  }
};