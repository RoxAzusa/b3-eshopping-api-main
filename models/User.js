const sequelize = require('./_database');
const DataTypes = require('sequelize');

const User = sequelize.define('User', {
    // Définition des colonnes ici
    email : {
        type : DataTypes.STRING,
        allowNull : false,
    },
    password : {
        type : DataTypes.STRING,
        allowNull : false,
    }
});

module.exports = User