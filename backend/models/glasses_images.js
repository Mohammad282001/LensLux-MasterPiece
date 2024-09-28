'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Glasses_images extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Glasses_images.hasMany(models.Glasses, { foreignKey: 'glasses_id', as: 'images' });

    }
  }
  Glasses_images.init({
    glasses_id: DataTypes.INTEGER,
    image_url: DataTypes.STRING,
    image_type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['main', 'alternative', 'detail', '3d_view']]
      }
    },
  }, {
    sequelize,
    modelName: 'Glasses_images',
  });
  return Glasses_images;
};