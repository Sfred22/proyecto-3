const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let empleadoSchema = new Schema ({
    id_usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    id_departamento: {
        type: Schema.Types.ObjectId,
        ref: 'Departamento'
    },
    nombre_del_puesto: {
        type: String,
    },
    anios_servicio: {
        type: Number
    },
    hora_entrada: {
        type:Number,
        required: [ true, 'Se necesista la hora de entrada' ]
    },
    hora_salida: {
        type: Number,
        required: [ true, 'Se necesista la hora de salida' ]
    },
    activo: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('Empleado', empleadoSchema)