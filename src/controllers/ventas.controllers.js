const sequelize = require('../database/database');
const Venta = require('../models/Venta');
const Cliente = require('../models/Cliente');
const formatPesos = require('../helpers/pesoChileno');





const renderVentas = async(req, res) => {
    const { cliente_id } = req.params
    try {
        const VentasData = await Venta.findAll({
            where: {
                cliente_id
            }
        });
        const ventas = VentasData.sort((a, b) => {
            if (a.fecha > b.fecha) {
                return -1;
            }
            if (a.fecha < b.fecha) {
                return 1;
            }
            return 0;
        }).
        map((venta, index) => {

            return {
                index: index + 1,
                id: venta.id,
                fecha: venta.fecha,
                iva: formatPesos.format(venta.iva),
                descuento: formatPesos.format(venta.descuento),
                total: formatPesos.format(venta.total),
                cliente_id: venta.cliente_id
            }
        });
        console.log(ventas);

        const clienteData = await Cliente.findOne({
            where: {
                id: cliente_id
            }
        });
        const cliente = clienteData.dataValues;
        res.render('ventas', {
            ventas,
            cliente
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            error
        });
    }
}


const createVenta = async(req, res) => {
    const { fecha, cliente_id } = req.body;
    // const cliente_id = parseInt(clienteIdString);

    const transaction = await sequelize.transaction();
    try {
        const ventaData = await Venta.create({
            fecha,
            cliente_id: parseInt(cliente_id)
        }, { transaction });
        await transaction.commit();
        const venta = ventaData.dataValues;
        res.send({
            venta
        });
    } catch (error) {
        console.log(error);
        await transaction.rollback();
        res.status(400).send({
            error
        });
    }
}

const deleteVenta = async(req, res) => {
    const { id } = req.params;
    const transaction = await sequelize.transaction();
    try {
        const ventaData = await Venta.findOne({
            where: {
                id
            }
        });
        if (ventaData) {
            await Venta.destroy({
                where: {
                    id
                },
                transaction,
                returning: true
            });
            await transaction.commit();
            const venta = ventaData.dataValues;
            return res.send({
                venta
            });
        } else {
            await transaction.rollback();
            return res.status(400).send({
                error: 'No existe la venta'
            });
        }
    } catch (error) {
        console.log(error);
        await transaction.rollback();
        res.status(400).send({
            error
        });
    }
}

const updateVenta = async(req, res) => {
    const { id } = req.params;
    const { total, descuento, cliente_id } = req.body;
    console.log(id, total, descuento);
    const productoSinIva = total / 1.19;
    const iva = (total - productoSinIva);
    const transaction = await sequelize.transaction();
    try {
        const ventaData = await Venta.findOne({
            where: { id }
        });
        console.log(ventaData);
        await ventaData.update({
            total: parseFloat(total),
            descuento: parseFloat(descuento),
            iva: parseFloat(iva),
        }, {
            transaction
        });
        await transaction.commit();
        const venta = ventaData.dataValues;
        console.log(venta);
        return res.send({
            venta
        });

    } catch (error) {
        console.log(error);
        await transaction.rollback();
        res.status(400).send({
            error
        });
    }
}


module.exports = {
    renderVentas,
    createVenta,
    deleteVenta,
    updateVenta
}