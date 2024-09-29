'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Glasses_details', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      glasses_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Glasses', // name of the referenced table
          key: 'glasses_id', // primary key of the referenced table
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true, // You can adjust this to `false` if you want to make it mandatory
      },
      lens_width: {
        type: Sequelize.INTEGER
      },
      bridge_width: {
        type: Sequelize.INTEGER
      },
      temple_length: {
        type: Sequelize.INTEGER
      },
      lens_height: {
        type: Sequelize.INTEGER
      },
      total_width: {
        type: Sequelize.INTEGER
      },
      weight: {
        type: Sequelize.INTEGER
      },
      frame_material: {
        type: Sequelize.STRING(100)
      },
      lens_type: {
        type: Sequelize.STRING(100)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Glasses_details');
  }
};
