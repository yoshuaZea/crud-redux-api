// Rutas para clientes
const express = require('express')
const router = express.Router()
const clientesController = require('../controllers/clientesController')
const { check } = require('express-validator')

// api/clientes
// Obtener clientes
router.get('/',
    clientesController.obtenerClientes
)

// Crear cliente
router.post('/',
    [
        check('nombre', 'Este campo es obligatorio').notEmpty().trim(),
        check('telefono', 'Este campo es obligatorio').notEmpty().trim(),
        check('correo', 'Este campo es obligatorio').notEmpty().trim().isEmail(),
        check('empresa', 'Este campo es obligatorio').notEmpty().trim()
    ],
    clientesController.agregarCliente
)

// Actualizar cliente
router.put('/:id',
    [
        check('nombre', 'Este campo es obligatorio').notEmpty().trim(),
        check('telefono', 'Este campo es obligatorio').notEmpty().trim(),
        check('correo', 'Este campo es obligatorio').notEmpty().trim().isEmail(),
        check('empresa', 'Este campo es obligatorio').notEmpty().trim()
    ],
    clientesController.actualizarCliente
)

// Actualizar cliente
router.delete('/:id',
    clientesController.eliminarCliente
)

module.exports = router
