const sequelize = require('./_database');
const DataTypes = require('sequelize');

// Product table model
const Product = sequelize.define('Product', {
    // Définition des colonnes ici
    title: {
        type : DataTypes.STRING,
        allowNull : false,
    },
    price : {
        type : DataTypes.DOUBLE,
        allowNull : false,
    },
    description : {
        type : DataTypes.TEXT,
    },
    currentStock : {
        type : DataTypes.INTEGER,
        allowNull : false,
    }
});

module.exports = Product