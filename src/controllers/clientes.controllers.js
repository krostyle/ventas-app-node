const Cliente = require("../models/Cliente");


const renderIndex = async(req, res) => {
    try {
        const clientesData = await Cliente.findAll();
        const clientes = clientesData.
        sort((a, b) => {
            if (a.nombre < b.nombre) {
                return -1;
            }
            if (a.nombre > b.nombre) {
                return 1;
            }
            return 0;
        }).map((skater, index) => {
            const skaterData = skater.dataValues;
            return {
                index: index + 1,
                id: skaterData.id,
                nombre: skaterData.nombre,
                estado: skaterData.estado,
            }
        });
        return res.render('index', {
            clientes
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Error al listar los clientes"
        });
    }
};


const updateCliente = async(req, res) => {
    const { id } = req.params;
    try {
        const clienteData = await Cliente.findOne({
            where: {
                id
            }
        });
        if (!clienteData) {
            return res.send({
                message: "Cliente no encontrado"
            });
        }
        const cliente = clienteData.dataValues;
        if (cliente.estado) {
            await clienteData.update({
                estado: false
            });
        } else {
            await clienteData.update({
                estado: true
            });
        }
        return res.send({
            cliente
        });
    } catch (error) {
        console.log(error);
    }
}


const createCliente = async(req, res) => {
    const { nombre } = req.body;
    try {
        const clienteData = await Cliente.create({
            nombre,
            estado: true
        });
        const cliente = clienteData.dataValues;
        return res.send({
            cliente
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            error
        });
    }
}

module.exports = {
    renderIndex,
    updateCliente,
    createCliente
}