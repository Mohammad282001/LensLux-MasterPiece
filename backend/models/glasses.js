'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Glasses extends Model {
    static associate(models) {
      // define association here
      Glasses.belongsTo(models.Brands, { foreignKey: 'brand_id', as: 'brand' });
      Glasses.hasMany(models.Glasses_images, { foreignKey: 'glasses_id', as: 'images' });

    }
  }

  Glasses.init({
    glasses_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    brand_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Brands', // refers to Brand model
        key: 'brand_id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    },
    model: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0.01
      }
    },
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
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    target_audience: {
      type: DataTypes.STRING(10),
      allowNull: false,
      validate: {
        isIn: [['men', 'women', 'unisex', 'kids']]
      }
    },
    category: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        isIn: [['eyeglasses', 'sunglasses']]
      }
    },
    sub_category: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    stock_quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    has_virtual_try_on: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    virtual_try_on_data: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    frame_shape: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    face_frame_shape: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Glasses',
    tableName: 'Glasses',
    underscored: true,
    timestamps: true
  });

  return Glasses;
};
