// Ce fichier contient les middleware relatif à l'authentification
const jwt = require('jsonwebtoken');
const { User } = require('../models');

function authenticateUser(req, res, next){
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                res.status(401)
                if (err.name == 'TokenExpiredError') {
                    res.send('Token expired');
                }
                else {
                    res.send('Invelid token');
                }
                return
            }
            await User.findOne({
                attributes : ['id', 'email'],
                where : {
                    id : decoded.id
                }
            })
            .then(
                (results) => {
                    if(!results.length) {
                        res.status(401);
                        res.send('Unauthorized');
                        return;
                    }

                    const user = results[0];

                    req.user = user;
                    next();
                });
        });
    }
    else {
        res.status(401);
        res.send('Unauthorized');
    }
}

module.exports = {
    authenticateUser: authenticateUser
}