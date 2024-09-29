'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Glasses_details extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Defining association between Glasses_details and Glasses models
      Glasses_details.belongsTo(models.Glasses, {
        foreignKey: 'glasses_id',
        as: 'glasses'
      });
    }
  }
  Glasses_details.init({
    glasses_id: DataTypes.INTEGER,
    lens_width: DataTypes.INTEGER,
    bridge_width: DataTypes.INTEGER,
    temple_length: DataTypes.INTEGER,
    lens_height: DataTypes.INTEGER,
    total_width: DataTypes.INTEGER,
    weight: DataTypes.INTEGER,
    frame_material: DataTypes.STRING(100),
    lens_type: DataTypes.STRING(100)
  }, {
    sequelize,
    modelName: 'Glasses_details',
  });
  return Glasses_details;
};
