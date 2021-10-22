const jwt = require('jsonwebtoken');

const generateJWT = (uid, nombre) => {

    return new Promise((resolve, reject) => {

        const payload = { uid, nombre };

        jwt.sign(payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '2h'
        }, (error, token) => {
            if (error) {
                console.log(error);
                reject('No fue posible generar un token');
            }
            resolve(token);
        });
    });

}

module.exports = {
    generateJWT
}