require('dotenv').config();

const configurations = {
    PORT: process.env.PORT || 3000,
    DB_NAME: process.env.DB_NAME,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_HOST: process.env.DB_HOST,
    DB_DIALECT: process.env.DB_DIALECT,
    SECRET_JWT_SEED: process.env.SECRET_JWT_SEED,
}


module.exports = configurations;