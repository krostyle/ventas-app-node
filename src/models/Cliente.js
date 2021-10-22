const { Sequelize } = require('sequelize');
const sequelize = require('../database/database');
const Venta = require('./Venta');
const Cliente = sequelize.define('cliente', {
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
    estado: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    timestamps: false,
    freezeTableName: true
});

Cliente.hasMany(Venta, { foreignKey: 'cliente_id', sourceKey: 'id' });
Venta.belongsTo(Cliente, { foreignKey: 'cliente_id', sourceKey: 'id' });

module.exports = Cliente;