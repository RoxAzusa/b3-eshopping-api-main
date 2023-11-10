const express = require('express');
const router = express.Router();

// Importation d'un modèle Sequelize dans une vue.
// Par défaut, require ira chercher le fichier index.js
const { Product } = require('../models');
const { Tag } = require('../models');

/* Get all products */
router.get('/', async function(req, res){
    try {
        // Get products and associated tags
        const products = await Product.findAll({
            attributes : ['title', 'price'],
            include: [{
                model: Tag,
                attributes: ['name'],
                through: { attributes: [] }
            }]
        });

        res.status(200).json(products);
    } catch (error) {
        console.log(error);
        res.status(500).json("Internal Server Error");
    }
});

/* Get product by id */
router.get('/:id', async function(req, res){
    try {
        // Get product and associated tags
        const product = await Product.findByPk(req.params.id, {
            attributes : ['title', 'price', 'description'],
            include: [{
                model: Tag,
                attributes: ['name'],
                through: { attributes: [] }
            }]
        });

        res.status(200).json(product);
    } catch (error) {
        console.log(error);
        res.status(500).json("Internal Server Error");
    }
});

/* Create product */
router.post('/', async function(req, res) {
    try {
        const { title, price, description, currentStock, tags } = req.body;

        // Create Product
        const createdProduct = await Product.create({
            title,
            price, 
            description,
            currentStock
        });

        // Add tags to product
        if( tags && tags.length > 0 ) {
            for (const tagName of tags) {
                const [tag] = await Tag.findOrCreate({
                    where: { name: tagName }
                });

                await createdProduct.addTag(tag);
            }
        }
        
        res.status(201).json(createdProduct);
    } catch (error) {
        console.log(error);
        res.status(500).json("Internal Server Error");
    }
});

/* Update product */
router.patch('/:id', async function(req, res) {
    try {
        const { title, price, description, currentStock, tags } = req.body;

        // Update product
        await Product.update({
            title,
            price, 
            description,
            currentStock
        },
        {
            where: {
                id : req.params.id,
            }
        });

        // Get up-to-date product
        const updatedProduct = await Product.findByPk(req.params.id);
        console.log(updatedProduct);

        // Get current tags list of product
        const currentTags = await updatedProduct.getTags();

        // Compares current list and new list of tags
        const newTagNames = tags || [];
        const currentTagNames = currentTags.map(tag => tag.name);

        // Add new tags to the product
        const tagsToAdd = newTagNames.filter(tagName => ! currentTagNames.includes(tagName));
        for (const tagName of tagsToAdd) {
            const [tag] = await Tag.findOrCreate({
                where: {
                    name : tagName
                }
            });
            await updatedProduct.addTag(tag);
        }

        // Remove unused tags on product
        const tagsToRemove = currentTagNames.filter(tagName => !newTagNames.includes(tagName));
        for (const tagName of tagsToRemove) {
            const tagToRemove = currentTags.find(tag => tag.name === tagName);
            if (tagToRemove) {
                await updatedProduct.removeTag(tagToRemove);
            }
        } 

        res.status(200).json(updatedProduct);
    } catch (error) {
        console.log(error);
        res.status(500).json("Internal Server Error");
    }
});

/* Delete product */
router.delete('/:id', async function(req, res) {
    try {
        // Delete product
        const deleteProduct = await Product.destroy(
        {
            where: {
                id : req.params.id,
            }
        });

        res.status(200).json("Deletion successful");
    } catch (error) {
        console.log(error);
        res.status(500).json("Internal Server Error");
    }
});

module.exports = router;