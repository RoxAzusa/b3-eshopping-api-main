const express = require('express');
const router = express.Router();

// Importation d'un modèle Sequelize dans une vue.
// Par défaut, require ira chercher le fichier index.js
const { Product } = require('../models');

/* Get all products */
router.get('/', async function(req, res){
    try {
        const products = await Product.findAll({
            attributes : ['title', 'price'] // Don't forget to add tags
        })
        .then(
            (products) => {
              res.json(products);
              res.writeHead(200);
            }
        ).catch((error) => {
          console.log(error);
          res.writeHead(404);
        });
        res.json(products);
    } catch (error) {
        console.log(error);
        res.status(500);
    }
});

/* Get product by id */
router.get('/:id', async function(req, res){
    try {
        const product = await Product.findByPk(req.params.id, {
            attributes : ['title', 'price', 'description'] // Don't forget to add tags
        })
        .then(
            (products) => {
              res.json(products);
              res.writeHead(200);
            }
        ).catch((error) => {
          console.log(error);
          res.writeHead(404);
        });
        res.json(product);
    } catch (error) {
        console.log(error);
        res.status(500);
    }
});

/* Create product */

/* Update product */

/* Delete product */

module.exports = router;