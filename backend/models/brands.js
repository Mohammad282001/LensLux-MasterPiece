'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Brands extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Brands.hasMany(models.Glasses, { foreignKey: 'brand_id' }); // Associating Brands with Glasses
      Brands.hasMany(models.Lenses, { foreignKey: 'brand_id' }); // Associating Brands with Glasses


      // define association here
    }
  }
  Brands.init({
    brand_name: DataTypes.STRING,
    brand_image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Brands',
  });
  return Brands;
};