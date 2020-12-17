const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [ true, 'Se necesista el nombre porfavor' ]
    },

    primer_apellido: {
        type: String,
        required: [true, 'este apellido es necesario']
        
    },
    segundo_apellido: {
        type: String,
        required: false
        
    },
    edad: {
        type: Number,
        required: [true, 'la edad tamabien es necesaria']
    },
    curp: {
        type: String,
        required: [true, 'porfavor ingrese la curp'],
        unique: true
    },
    telefono: {
        type: Number,
        unique: true,
        required: false
    },
    mail: {
        type: String,
        unique: true,
        required: [true, 'ingrese un email porfavor']
    },
    activo: {
        type: Boolean,
        default: true
    }
});
module.exports = mongoose.model('Usuario', usuarioSchema);