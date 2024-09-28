'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Lenses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      lens_type: {
        allowNull: false,
        type: Sequelize.STRING(50)
      },
      brand_id: {
        type: Sequelize.INTEGER,
          references: {
            model: 'Brands',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
      },
      model: {
        type: Sequelize.STRING(50)
      },
      description: {
        type: Sequelize.TEXT
      },
      color: {
        type: Sequelize.STRING(50)
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          min: 0,
        },
      },
      discount_price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      discount_percentage: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      quantity: {
        type: Sequelize.INTEGER,
        
        validate: {
          min: 0
        },
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
    await queryInterface.dropTable('Lenses');
  }
};