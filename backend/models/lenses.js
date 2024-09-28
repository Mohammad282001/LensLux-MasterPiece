'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Lenses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Lenses belongs to Brand
      Lenses.belongsTo(models.Brands, { foreignKey: 'brand_id', as: 'brand' });
      Lenses.hasMany(models.Lenses_images, { foreignKey: 'lenses_id', as: 'images' });

    }
  }
  Lenses.init({

    lens_type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['contact', 'colored']],
      },
    },
    brand_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Brands',
        key: 'brand_id',
      },
    },
    model: DataTypes.STRING,
    color: DataTypes.STRING,
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    description: DataTypes.TEXT,
    discount_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      validate: {
        isLessThanPrice(value) {
          if (value && value >= this.price) {
            throw new Error('Discount price must be less than the original price');
          }
        },
      },
    },
    discount_percentage: {

      type:DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
      },
    }
  }, {
    sequelize,
    modelName: 'Lenses',
    timestamps: true,
  });
  return Lenses;
};



// description, quantity, discount_percentage