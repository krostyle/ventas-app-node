const { Sequelize } = require('sequelize');
const configurations = require('../config/config');

const sequelize = new Sequelize(
    configurations.DB_NAME,
    configurations.DB_USER,
    configurations.DB_PASSWORD, {
        host: configurations.DB_HOST,
        dialect: configurations.DB_DIALECT,
        pool: {
            max: 5,
            min: 0,
            require: 30000,
            idle: 10000
        },
        logging: false
    },
);

module.exports = sequelize;