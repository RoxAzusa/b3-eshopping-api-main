const express = require('express');
const router = express.Router();

// Importation d'un modèle Sequelize dans une vue.
// Par défaut, require ira chercher le fichier index.js
const { Product } = require('../models');

/* Get all products */
router.get('/', async function(req, res){
    try {
        const results = await Product.findAll({
            attributes : ['title', 'price']
        });
        res.json(results);
    } catch (error) {
        console.log(error);
        res.status(500);
    }
});

/* Get product by id */

/* Create product */

/* Update product */

/* Delete product */

module.exports = router;