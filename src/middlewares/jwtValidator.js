const { response } = require('express');
const jwt = require('jsonwebtoken');
const { SECRET_JWT_SEED } = require('../config/config');
const jwtValidator = (req, res, next) => {
    const { token } = req.header('Authorization');
    console.log(token);
    if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });
    try {
        const { uid } = jwt.verify(token, SECRET_JWT_SEED);
        req.uid = uid;
        next();
    } catch (error) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
}

module.exports = { jwtValidator };