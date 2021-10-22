const Producto = require('../models/Producto');



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

module.exports = {
    getProductoById
}