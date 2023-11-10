const express = require('express');
const router = express.Router();

// Importation d'un modèle Sequelize dans une vue.
// Par défaut, require ira chercher le fichier index.js
const { Tag } = require('../models');

/* Get all tags */
router.get('/', async function(req, res){
    try {
        const tags = await Tag.findAll()
        .then(
            (tags) => {
              res.json(tags);
              res.writeHead(200);
            }
        ).catch((error) => {
          console.log(error);
          res.writeHead(404);
        });
        res.json(tags);
    } catch (error) {
        console.log(error);
        res.status(500);
    }
});

/* Get tag by id */
router.get('/:id', async function(req, res){
    try {
        const tag = await Tag.findByPk(req.params.id)
        .then(
            (tag) => {
              res.json(tag);
              res.writeHead(200);
            }
        ).catch((error) => {
          console.log(error);
          res.writeHead(404);
        });
        res.json(tag);
    } catch (error) {
        console.log(error);
        res.status(500);
    }
});

/* Create tag */
router.post('/', async function(req, res) {
    try {
        const result = await Tag.create({
            name: req.body.name
        })
        .then(
            (result) => {
              res.json(result);
              res.writeHead(201);
            }
        ).catch((error) => {
          console.log(error);
          res.writeHead(404);
        });
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(500);
    }
});

/* Update tag */
router.patch('/:id', async function(req, res) {
    try {
        const result = await Tag.update({
            name: req.body.name
        },
        {
            where: {
                id : req.params.id,
            }
        }) 
        .then(
            (result) => {
              res.json(result);
              res.writeHead(200);
            }
        ).catch((error) => {
          console.log(error);
          res.writeHead(404);
        });
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(500);
    }
});

module.exports = router;