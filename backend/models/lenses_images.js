'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lenses_images extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Lenses_images.hasMany(models.Lenses, { foreignKey: 'id', as: 'images' });
    }
  }
  Lenses_images.init({
    lenses_id: DataTypes.INTEGER,
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
    modelName: 'Lenses_images',
  });
  return Lenses_images;
};