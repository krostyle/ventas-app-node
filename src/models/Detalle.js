const { Sequelize } = require('sequelize');
const sequelize = require('../database/database');
const Detalle = sequelize.define('detalle', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    cantidad: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    subtotal: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    venta_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    producto_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = Detalle;