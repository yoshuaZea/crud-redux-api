const Productos = require('../models/Productos')
const { validationResult } = require('express-validator')

// Obtener todos los productos
exports.obtenerProductos = async (req, res) => {
    try {
        // Consultar productos
        const productos = await Productos.find().sort({ nombre: -1 })

        res.json({ productos })

    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'Hubo un error inesperado (ERR-1)'})
    }
}

// Nuevo producto
exports.agregarProducto = async (req, res) => {
    // Revisar si hay errores
    const errores = validationResult(req)
    if(!errores.isEmpty()){
        return res.status(400).json({ errores: errores.array() })
    }

    try {
        // Crear un producto
        const producto = new Productos(req.body)

        // Guadar producto
        await producto.save()

        // Retornar respuesta
        res.json(producto)
        
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'Hubo un error inesperado (ERR-2)'})
    }
}

// Actualiza un producto
exports.actualizarProducto = async (req, res) => {
    // Revisar si hay errores
    const errores = validationResult(req)
    if(!errores.isEmpty()){
        return res.status(400).json({ errores: errores.array() })
    }

    // Extraer la información del proyecto
    const { nombre, precio } = req.body
    const nuevoProducto = {}

    if(nombre) nuevoProducto.nombre = nombre
    if(precio) nuevoProducto.precio = precio

    try {
        // Revisar el ID
        const id = req.params.id
        let producto = await Productos.findById(id)

        // Si el producto existe o no
        if(!producto) return res.status(404).json({ msg: 'No se encontró el producto' })

        // Actualizar el producto
        producto = await Productos.findByIdAndUpdate({ 
                _id: id
            }, {
                $set: nuevoProducto
            }, {
                new: true
            }
        )

        res.json({ producto })

    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'Hubo un error inesperado (ERR-3)'})
    }
}

// Eliminar un producto
exports.eliminarProducto =  async (req, res) => {
    try {
        // Revisar el ID
        const id = req.params.id
        let producto = await Productos.findById(id)

        // Si el producto existe o no
        if(!producto) return res.status(404).json({ msg: 'No se encontró el producto' })

        // Eliminar el producto
        await Productos.deleteOne({ _id: id})
        await Productos.findOneAndRemove({ _id: id})

        res.json({ msg: 'Producto eliminado' })

    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'Hubo un error inesperado (ERR-4)'})
    }
}
