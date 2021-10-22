const { Router } = require('express');
const { renderDetalles, createDetalle, deleteDetalle } = require('../controllers/detalles.controllers');

const router = Router()

// /api/detalles/:id
router.get('/:venta_id', renderDetalles);
router.post('/', createDetalle);
router.delete('/:detalle_id', deleteDetalle);



module.exports = router;