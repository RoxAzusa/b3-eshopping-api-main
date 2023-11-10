const sequelize = require('./_database');
const DataTypes = require('sequelize');

const Right = sequelize.define('Right', {
    // Définition des colonnes ici
    name : {
        type : DataTypes.STRING,
        allowNull : false,
        unique : true,
    }
});

module.exports = Right