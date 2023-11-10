const sequelize = require('./_database');
const DataTypes = require('sequelize');

const User = sequelize.define('User', {
    // Définition des colonnes ici
    email : {
        type : DataTypes.STRING,
        allowNull : false,
        unique : true,
    },
    password : {
        type : DataTypes.STRING,
        allowNull : false,
    },
    admin : {
        type : DataTypes.BOOLEAN,
        allowNull : false,
    }
});

module.exports = User