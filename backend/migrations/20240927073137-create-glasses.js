'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Glasses', {
      glasses_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      brand_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Brands',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      model: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          min: 0.01
        }
      },
      discount_price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      discount_percentage: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      target_audience: {
        type: Sequelize.STRING(10),
        allowNull: false,
        validate: {
          isIn: [['men', 'women', 'unisex', 'kids']]
        }
      },
      category: {
        type: Sequelize.STRING(50),
        allowNull: false,
        validate: {
          isIn: [['eyeglasses', 'sunglasses']]
        }
      },
      sub_category: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      stock_quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      has_virtual_try_on: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      virtual_try_on_data: {
        type: Sequelize.JSONB,
        allowNull: true
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Glasses');
  }
};