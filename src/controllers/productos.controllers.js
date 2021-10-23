const Producto = require('../models/Producto');
const formatPesos = require('../helpers/pesoChileno');


const getProductoById = async(req, res) => {
    const { id } = req.params;
    try {
        const productoData = await Producto.findOne({
            where: {
                id
            }
        });
        const producto = productoData.dataValues;
        res.send({
            producto
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            error
        });
    }
};

const renderAllProductos = async(req, res) => {
    try {
        const productosData = await Producto.findAll();
        const productos = productosData.sort((a, b) => {
            return a.id - b.id;
        }).
        map((producto, index) => {
            return {
                index: index + 1,
                id: producto.id,
                nombre: producto.nombre,
                precio: formatPesos.format(producto.precio),
                cantidad: producto.cantidad

            }
        });
        res.render('productos', {
            productos
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            error
        });
    }
};

const renderAddProductos = async(req, res) => {
    res.render('addProductos');
};

const renderEditProductos = async(req, res) => {
    const { id } = req.params;
    try {
        const productoData = await Producto.findOne({
            where: {
                id
            }
        });
        const producto = productoData.dataValues;
        res.render('editProductos', {
            producto
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            error
        });
    }

};

const createProducto = async(req, res) => {
    const { nombre, precio, cantidad } = req.body;
    try {
        const producto = await Producto.create({
            nombre,
            precio,
            cantidad
        });
        res.send({
            producto
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            error
        });
    }
};

const deleteProducto = async(req, res) => {
    const { id } = req.params;
    try {
        const producto = await Producto.destroy({
            where: {
                id
            }
        });
        res.send({
            OK: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            error
        });
    }
};

const updateProducto = async(req, res) => {
    const { id } = req.params;
    const { nombre, precio, cantidad } = req.body;
    try {
        const producto = await Producto.update({
            nombre,
            precio,
            cantidad
        }, {
            where: {
                id
            }
        });
        res.send({
            producto
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            error
        });
    }
};

module.exports = {
    getProductoById,
    renderAddProductos,
    renderEditProductos,
    renderAllProductos,
    createProducto,
    deleteProducto,
    updateProducto,
}