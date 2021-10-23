const { Router } = require('express');
const { getProductoById, renderAddProductos, renderEditProductos, renderAllProductos, createProducto, updateProducto, deleteProducto } = require('../controllers/productos.controllers');


const router = Router()

router.get('/:id', getProductoById);
router.get('/add/nuevoProducto/', renderAddProductos);
router.post('/add/nuevoProducto', createProducto);
router.get('/edit/:id', renderEditProductos);
router.get('/', renderAllProductos);
router.put('/edit/:id', updateProducto);
router.delete('/:id', deleteProducto);



module.exports = router;