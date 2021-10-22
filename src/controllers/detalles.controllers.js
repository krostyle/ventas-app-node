const Detalle = require('../models/Detalle');
const Producto = require('../models/Producto');
const Venta = require('../models/Venta');
const Cliente = require('../models/Cliente');
const sequelize = require('../database/database');
const formatPesos = require('../helpers/pesoChileno');

const renderDetalles = async(req, res) => {
    const { venta_id } = req.params;
    try {
        //Obtener Cliente, Venta, Detalles y Productos relacionados
        const data = await Venta.findOne({
            where: { id: venta_id },
            include: [{
                model: Cliente,
                as: 'cliente'
            }, {
                model: Detalle,
                as: 'detalles',
                include: [{
                    model: Producto,
                    as: 'producto'
                }]
            }]
        });

        const dataProperties = data.dataValues;
        const venta = {
            id: dataProperties.id,
            fecha: dataProperties.fecha,
            descuento: dataProperties.descuento,
            total: dataProperties.total,
            cliente_id: dataProperties.cliente_id
        }
        const cliente = dataProperties.cliente.dataValues;
        const detalles = dataProperties.detalles;
        const detallesProducto = detalles.map((detalle) => {
            const producto = detalle.producto.dataValues;
            return {
                id: detalle.id,
                cantidad: detalle.cantidad,
                total: formatPesos.format(detalle.subtotal),
                producto_id: producto.id,
                producto: producto.nombre,
                precio: producto.precio,
                venta_id: detalle.venta_id
            }
        });

        const total = detalles.reduce((total, detalle) => {
            return total + detalle.subtotal;
        }, 0);




        //Todos los productos , necesarios para el formulario
        const productosData = await Producto.findAll();
        const productos = productosData.sort((a, b) => {
            if (a.nombre > b.nombre) return 1;
            if (a.nombre < b.nombre) return -1;
            return 0;
        }).
        map((producto, index) => {
            const stock = producto.cantidad > 0
            return {
                index: index + 1,
                id: producto.id,
                nombre: producto.nombre,
                precio: producto.precio,
                cantidad: producto.cantidad,
                stock

            }
        });
        return res.render('detalles', {
            productos, //para el formulario
            venta,
            cliente,
            detallesProducto,
            totalFormat: formatPesos.format(total),
            total
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error
        });
    }
}


const createDetalle = async(req, res) => {
    const { cantidad, subtotal, venta_id, producto_id } = req.body;
    try {
        const transaction = await sequelize.transaction();
        //Crear Detalle
        const detalleData = await Detalle.create({
            cantidad,
            subtotal,
            venta_id,
            producto_id
        }, { transaction });
        const detalle = detalleData.dataValues;


        //Encontrar Producto
        const productoData = await Producto.findOne({
            where: { id: producto_id }
        });
        //Actualizar Stock del producto
        const productoUpdateData = await productoData.update({
            cantidad: productoData.cantidad - cantidad
        }, { transaction });
        const producto = productoUpdateData.dataValues;
        console.log(detalle);
        console.log(producto);
        await transaction.commit();
        return res.status(200).json({
            detalle,
            producto
        });


    } catch (error) {
        console.log(error);
        await transaction.rollback();
        return res.status(500).json({
            error
        });
    }
}

const deleteDetalle = async(req, res) => {
    const { detalle_id } = req.params;
    const { producto_id, cantidad, venta_id } = req.body;

    try {
        const transaction = await sequelize.transaction();
        //Eliminar Detalle
        const detalleData = await Detalle.destroy({
            where: { id: detalle_id },
            transaction,
            returning: true
        });
        // const detalle = detalleData.dataValues;
        //Actualizar Stock del producto
        const productoData = await Producto.findOne({
            where: { id: producto_id }
        });
        const productoUpdateData = await productoData.update({
            cantidad: productoData.cantidad + parseInt(cantidad)
        }, { transaction });
        const producto = productoUpdateData.dataValues;
        console.log(detalleData);
        console.log(producto);
        await transaction.commit();
        return res.status(200).send({
            producto
        });


    } catch (error) {
        console.log(error);
        await transaction.rollback();
        return res.status(500).send({
            error
        });
    }
}



module.exports = {
    renderDetalles,
    createDetalle,
    deleteDetalle
}