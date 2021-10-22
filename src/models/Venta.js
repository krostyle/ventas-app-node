const { Sequelize } = require('sequelize');
const sequelize = require('../database/database');
const Detalle = require('./Detalle');
const Venta = sequelize.define('venta', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    fecha: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    iva: {
        type: Sequelize.FLOAT,
        allowNull: true
    },
    descuento: {
        type: Sequelize.FLOAT,
        allowNull: true
    },
    total: {
        type: Sequelize.FLOAT,
        allowNull: true
    },
    cliente_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }
}, {
    timestamps: false,
    freezeTableName: true
});

Venta.hasMany(Detalle, { foreignKey: 'venta_id', sourceKey: 'id' });
Detalle.belongsTo(Venta, { foreignKey: 'venta_id', targetKey: 'id' });

module.exports = Venta;