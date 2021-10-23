const { Router } = require('express');
const { renderIndex, updateCliente, createCliente } = require('../controllers/clientes.controllers');


const router = Router()


//localhost:3000/
router.get('/', renderIndex);
//localhost:3000/api/clientes/:id
router.put('/:id', updateCliente);

router.post('/', createCliente);


module.exports = router