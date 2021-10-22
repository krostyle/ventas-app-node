const { Router } = require('express');
const { renderVentas, createVenta, deleteVenta, updateVenta } = require('../controllers/ventas.controllers');

const router = Router()
    // /api/ventas/:cliente_id
router.get('/:cliente_id', renderVentas)
    // /api/ventas/
router.post('/', createVenta)
    // /api/ventas/:id
router.delete('/:id', deleteVenta)

router.put('/:id', updateVenta)

module.exports = router;