const Clientes = require('../models/Clientes')
const { validationResult } = require('express-validator')

// Obtener todos los clientes
exports.obtenerClientes = async (req, res) => {
    try {
        // Consultar clientes
        const clientes = await Clientes.find().sort({ nombre: -1 })

        res.json({ clientes })

    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'Hubo un error inesperado (ERR-1)'})
    }
}

// Nuevo cliente
exports.agregarCliente = async (req, res) => {
    // Revisar si hay errores
    const errores = validationResult(req)
    if(!errores.isEmpty()){
        return res.status(400).json({ errores: errores.array() })
    }

    try {
        // Crear un cliente
        const cliente = new Clientes(req.body)

        // Guadar cliente
        await cliente.save()

        // Retornar respuesta
        res.json(cliente)
        
    } catch (error) {
        console.log(error)
        let msg = 'Hubo un error inesperado (ERR-2)'
        if(error.code === 11000) msg = "El correo ya se encuentra registrado"
        res.status(500).json({ msg })
    }
}

// Actualiza un cliente
exports.actualizarCliente = async (req, res) => {
    // Revisar si hay errores
    const errores = validationResult(req)
    if(!errores.isEmpty()){
        return res.status(400).json({ errores: errores.array() })
    }

    // Extraer la información del proyecto
    const { nombre, telefono, correo, empresa } = req.body
    const nuevoCliente = {}

    if(nombre) nuevoCliente.nombre = nombre
    if(telefono) nuevoCliente.telefono = telefono
    if(correo) nuevoCliente.correo = correo
    if(empresa) nuevoCliente.empresa = empresa

    try {
        // Revisar el ID
        const id = req.params.id
        let cliente = await Clientes.findById(id)

        // Si el cliente existe o no
        if(!cliente) return res.status(404).json({ msg: 'No se encontró el cliente' })

        // Actualizar el cliente
        cliente = await Clientes.findByIdAndUpdate({ 
                _id: id
            }, {
                $set: nuevoCliente
            }, {
                new: true
            }
        )

        res.json({ cliente })

    } catch (error) {
        console.log(error)
        let msg = 'Hubo un error inesperado (ERR-3)'
        if(error.code === 11000) msg = "El correo ya se encuentra registrado"
        res.status(500).json({ msg })
    }
}

// Eliminar un cliente
exports.eliminarCliente =  async (req, res) => {
    try {
        // Revisar el ID
        const id = req.params.id
        let cliente = await Clientes.findById(id)

        // Si el cliente existe o no
        if(!cliente) return res.status(404).json({ msg: 'No se encontró el cliente' })

        // Eliminar el cliente
        await Clientes.deleteOne({ _id: id})
        await Clientes.findOneAndRemove({ _id: id})

        res.json({ msg: 'Cliente eliminado' })

    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'Hubo un error inesperado (ERR-4)'})
    }
}
