const sequelize = require('./_database');
const DataTypes = require('sequelize');

// Label table model
const Tag = sequelize.define('Tag', {
    // Définition des colonnes ici
    name : {
        type : DataTypes.STRING,
        allowNull : false,
        unique : true,
    }
});

module.exports = Tag