const { Router } = require('express');
const { getProductoById } = require('../controllers/productos.controllers');


const router = Router()

router.get('/:id', getProductoById);



module.exports = router;