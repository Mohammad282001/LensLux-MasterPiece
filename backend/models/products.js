'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    static associate(models) {
      Products.belongsTo(models.Glasses, {
        foreignKey: 'product_id',
        constraints: false,
        scope: {
          product_type: 'Glasses'
        }
      });
      Products.belongsTo(models.Lenses, {
        foreignKey: 'product_id',
        constraints: false,
        scope: {
          product_type: 'Lenses'
        }
      });
    }
  }
  Products.init({
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    product_type: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Products',
    tableName: 'Products',
    timestamps: true
  });

  return Products;
};
