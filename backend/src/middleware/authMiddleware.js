const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;  // Idealmente, usar variável de ambiente
const logger = require('../logger');

exports.authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        logger.warn('No token provided');
        return res.sendStatus(401);
    }
    

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            logger.warn('Invalid token');
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });
};
