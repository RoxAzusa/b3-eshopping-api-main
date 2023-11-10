const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { User } = require('../models');

function generateToken(id) {
    return jwt.sign({'id' : id}, process.env.JWT_SECRET, {expiresIn: '30d'});
}

router.post('/signup', async function(req, res) {
    const { email, password, admin} = req.body;

    if (!email || !password ) {
        res.status(400);
        res.send('The fields "email" and "password" are mandatory.');
        return
    }

    if (password.length < 8) {
        res.status(400);
        res.send('The password must be alleast 8 characters long.')
        return;
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 12);

        const createUser = await User.create({
            email,
            password : hashedPassword,
            admin
        })
        
        ;

        res.status(201).send(createUser);
    } catch (exception) {
        console.error('Error on creation:', exception);
        res.status(500).send('Internal Server Error.');
    }
});

router.post('/login', async function (req, res) {
    const {email, password} = req.body;
    
    if(!email || !password) {
        res.status(400);
        res.send('The fields "email" and "password" are mandatory');
        return
    }
    
    // Get the user from the db
    try {
        const user = await User.findOne({
            where: {
                email: body.email
            }
        });
    
        if (!user) {
            res.status(400).send('Invalid password or email');
            return;
        }
    
        // Validate password
        const isPasswordValid = await bcrypt.compare(body.password, user.password);
    
        if (!isPasswordValid) {
            res.status(400).send('Invalid password or email');
        } else {
            delete user.password;
    
            // Generate a JWT token
            return res.json({
                'token': generateToken(user.id),
                'user': user,
            });
        }
    } catch (error) {
        console.error('Error while querying the database:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;