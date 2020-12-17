const express = require('express');
const _ = require('underscore');
const Usuario = require('../models/usuario');
const app = express();

  
app.get('/usuario', function (req, res) {
    let desde = req.query.desde || 0;
    let hasta = req.query.hasta || 5;

    Usuario.find({ activo: true })
    .skip(Number(desde))
    .limit(Number(hasta))

    .exec((err, usuarios) => {
        if(err) {
            return res.status(400).json({
                ok: false,
                msg: 'ocurrio un error al consultar',
                err
            });
        }

        res.json({
            ok: true,
            msg: 'Usuarios listados con exito',
            usuarios
        });

    });
});
  
app.post('/usuario', function (req, res) {
    let body = req.body;
    let usr = new Usuario ({
        nombre: body.nombre,
        primer_apellido: body.primer_apellido,
        segundo_apellido: body.segundo_apellido,
        edad: body.edad,
        curp: body.curp,
        telefono: body.telefono,
        mail: body.mail
    });

    usr.save((err, usuario) => {
        if(err){
            return res.status(400).json({
                ok: false,
                msg: 'ocurrio un error',
                err: err
            });
        }
        res.json ({
            ok: true,
            msg: 'usuario insertado con exito',
            usuario
        });
    });
});
  
app.put('/usuario/:id', function (req, res) {
   let id = req.params.id;
   let body = _.pick(req.body, ['edad', 'telefono', 'mail']);

   Usuario.findByIdAndUpdate(id, body, 
    { new: true, runValidators: true, context: 'query' }, 
    (err, usuario) => {
        if(err){
            return res.status(400).json({
                ok: false,
                msg: 'ocurrio un error en la actualizacion',
                err 
            });
        }
        res.json ({
            ok: true,
            msg: 'usuario actualizado con exito',
            usuario: usuario
        });
    }); 
});
  
app.delete('/usuario/:id', function (req, res) {
    let id = req.params.id;

    Usuario.findByIdAndUpdate(id, 
        { activo: false }, {new: true, runValidators: true, context: 'query' }, 
        (err, usuario) => {
        if(err){
            return res.status(400).json({
                ok: false,
                msg: 'ocurrio un error al eliminar',
                err 
            });
        }
        res.json({
            ok: true,
            msg: 'usuario eliminado con exito',
            usuario
        });
    });
});

  module.exports = app;