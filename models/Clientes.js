const mongoose = require('mongoose')

const ClientesSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    telefono: {
        type: Number,
        required: true,
    },
    correo: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    empresa: {
        type: String,
        required: false,
        trim: true
    },
    creado: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Clientes', ClientesSchema)