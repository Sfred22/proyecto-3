const express = require('express');
const _ = require('underscore');
const Departamento = require('../models/departamento');
const app = express();


app.get('/departamento', (req, res) => {
    let desde = req.query.desde || 0;
    let hasta = req.query.hasta || 5;

    Departamento.find({})
    .skip(Number(desde))
    .limit(Number(hasta))
    .populate('usuario', 'nombre primer_apellido segundo_apellido')
    .exec((err, departamentos) => {
        if(err) {
            return res.status(400).json({
                ok: false,
                msg: 'ocurrio un error al listar departamento',
                err
            });
        }
        res.json({
            ok: true,
            msg: 'Departamentos listados con exito',
            departamentos
        });
    });
});

app.post('/departamento', (req, res) => {
    let dep = new Departamento ({
        id_jefe_de_area: req.body.id_jefe_de_area,
        nombre: req.body.nombre,
        numero_empleados: req.body.numero_empleados,
        extension_telefonica: req.body.extension_telefonica
    });

    dep.save((err, departamento) => {
        if(err){
            return res.status(400).json({
                ok: false,
                msg: 'ocurrio un error al insertar departamento',
                err
            });
        }
        res.json ({
            ok: true,
            msg: 'departamento insertado con exito',
            departamento
        });
    });
});

app.put('/departamento/:id', function (req, res) {
    let id = req.params.id;
    let body = _.pick(req.body, ['numero_empleados', 'extension_telefonica']);
 
    Departamento.findByIdAndUpdate(id, body, 
     { new: true, runValidators: true, context: 'query' }, 
     (err, departamento) => {
         if(err){
             return res.status(400).json({
                 ok: false,
                 msg: 'ocurrio un error en la actualizacion',
                 err 
             });
         }
         res.json ({
             ok: true,
             msg: 'departamento actualizado con exito',
             departamento
         });
     }); 
 });

 app.delete('/departamento/:id', (req, res) => {
    let id = req.params.id;

    Departamento.findByIdAndRemove(id, { context: 'query' }, 
        (err, departamento) => {
        if(err){
            return res.status(400).json({
                ok: false,
                msg: 'ocurrio un error al eliminar',
                err 
            });
        }
        res.json({
            ok: true,
            msg: 'departamento eliminado con exito',
            departamento
        });
    });
});
module.exports = app;