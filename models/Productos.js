const mongoose = require('mongoose')

const ProductosSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    precio: {
        type: Number,
        required: true,
    },
    creado: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Productos', ProductosSchema)