const express = require('express');
const _ = require('underscore');
const Empleado = require('../models/empleado');
const app = express();

app.get('/empleado', (req, res) => {
    let desde = req.query.desde || 0;
    let hasta = req.query.hasta || 5;

    Empleado.find({})
    .skip(Number(desde))
    .limit(Number(hasta))
    .populate('usuario', 'nombre primer_apellido segundo_apellido')
    .populate('departamento', 'nombre numero_empleado extension_telefonica activo')
    .exec((err, empleados) => {
        if(err) {
            return res.status(400).json({
                ok: false,
                msg: 'ocurrio un error al listar empleados',
                err
            });
        }
        res.json({
            ok: true,
            msg: 'empleados listados con exito',
            empleados
        });
    });
});

app.post('/empleado', (req, res) => {
    let dep = new Empleado ({
        id_usuario: req.body.id_usuario,
        id_departamento: req.body.id_departamento,
        nombre_del_puesto: req.body.nombre_del_puesto,
        anios_servicio: req.body.anios_servicio,
        hora_entrada: req.body.hora_entrada,
        hora_salida: req.body.hora_salida
        
    });

    dep.save((err, empleado) => {
        if(err){
            return res.status(400).json({
                ok: false,
                msg: 'ocurrio un error al insertar empleado',
                err
            });
        }
        res.json ({
            ok: true,
            msg: 'empleado insertado con exito',
            empleado
        });
    });
});

app.put('/empleado/:id', function (req, res) {
    let id = req.params.id;
    let body = _.pick(req.body, ['anios_servicio', 'nombre_del_puesto']);
 
    Empleado.findByIdAndUpdate(id, body, 
     { new: true, runValidators: true, context: 'query' }, 
     (err, empleado) => {
         if(err){
             return res.status(400).json({
                 ok: false,
                 msg: 'ocurrio un error en la actualizacion',
                 err 
             });
         }
         res.json ({
             ok: true,
             msg: 'empleado actualizado con exito',
             empleado
         });
     }); 
 });

 app.delete('/empleado/:id', (req, res) => {
    let id = req.params.id;

    Empleado.findByIdAndRemove(id, { context: 'query' }, 
        (err, empleado) => {
        if(err){
            return res.status(400).json({
                ok: false,
                msg: 'ocurrio un error al eliminar',
                err 
            });
        }
        res.json({
            ok: true,
            msg: 'empleado eliminado con exito',
            empleado
        });
    });
});
module.exports = app;