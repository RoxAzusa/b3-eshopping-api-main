const sequelize = require('./_database');
const DataTypes = require('sequelize');

const Order = sequelize.define('Order', {
    // Définition des colonnes ici
    deliveryAdress : {
        type : DataTypes.STRING,
        allowNull : false,
    }
});

module.exports = Order