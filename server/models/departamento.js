const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let departamentoSchema = new Schema({
    id_jefe_de_area: {
        ref: 'Usuario',
        type: Schema.Types.ObjectId 
    },
    nombre: {
        type: String,
        required: [ true, 'Se necesista el nombre del departamento' ],
        unique: true
    },
    numero_empleados: {
        type: Number,
        required: [ true, 'Se necesista el numero del empleado' ],
        unique: true
    },
    extension_telefonica: {
        type: Number,
        required: false
    },
    activo: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('Departamento', departamentoSchema)