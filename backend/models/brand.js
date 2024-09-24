'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Brand extends Model {
        static associate(models) {
            // define associations here if necessary
        }
    }

    Brand.init({
        brand_name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        brand_image: {
            type: DataTypes.STRING,
        }
    }, {
        sequelize,
        modelName: 'Brand',
    });

    return Brand;
};