const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Product = sequelize.define('Product', {
    product_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    brand_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'brands', // name of the related table
            key: 'brand_id'
        }
    },
    lens_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'lenses',
            key: 'lens_id'
        },
        allowNull: true
    },
    model: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    discount_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    },
    target_audience: {
        type: DataTypes.ENUM('men', 'women', 'unisex', 'kids'),
        allowNull: false
    },
    category: {
        type: DataTypes.ENUM('eyeglasses', 'sunglasses', 'lenses'),
        allowNull: false
    },
    sub_category: {
        type: DataTypes.STRING(50)
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
        type: DataTypes.JSONB
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    timestamps: false
});

module.exports = Product;