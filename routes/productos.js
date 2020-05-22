// Rutas para tareas
const express = require('express')
const router = express.Router()
const productosController = require('../controllers/productosController')
const { check } = require('express-validator')

// api/productos
// Obtener productos
router.get('/',
    productosController.obtenerProductos
)

// Crear producto
router.post('/',
    [
        check('nombre', 'Este campo es obligatorio').notEmpty().trim(),
        check('precio', 'El precio es obligatorio').notEmpty().trim()
    ],
    productosController.agregarProducto
)

// Actualizar producto
router.put('/:id',
    [
        check('nombre', 'Este campo es obligatorio').notEmpty().trim(),
        check('precio', 'El precio es obligatorio').notEmpty().trim()
    ],
    productosController.actualizarProducto
)

// Actualizar producto
router.delete('/:id',
    productosController.eliminarProducto
)

module.exports = router
