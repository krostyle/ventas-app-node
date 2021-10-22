const { Sequelize } = require('sequelize');
const sequelize = require('../database/database');
const Detalle = require('./Detalle');

const Producto = sequelize.define('producto', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nombre: {
        type: Sequelize.STRING,
        allowNull: false
    },
    precio: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0
    },
    cantidad: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
}, {
    timestamps: false,
    freezeTableName: true
});

Producto.hasMany(Detalle, { foreignKey: 'producto_id', sourceKey: 'id' });
Detalle.belongsTo(Producto, { foreignKey: 'producto_id', sourceKey: 'id' });

module.exports = Producto;