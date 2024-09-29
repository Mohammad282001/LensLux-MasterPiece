'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define association between Order and User
      Order.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      });
    }
  }
  Order.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    total_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    status: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: 'pending',
      validate: {
        isIn: [['pending', 'processing', 'shipping', 'delivered', 'cancelled']]
      }
    },
    shipping_address: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Order',
    tableName: 'Orders',
    timestamps: true // Enables createdAt and updatedAt
  });
  return Order;
};
