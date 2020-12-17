const express = require('express');
const Usuario = require('../models/usuario');
const app = express();

  
app.get('/usuario', function (req, res) {
    res.json({
        ok: '200',
        msg: 'usuario consultado'   
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
        email: body.email
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
  
app.put('/usuario/:id/:nombre', function (req, res) {
    let id = req.params.id;
    let nombre = req.params.nombre;
  
    res.json({
        ok: '200',
        msg: 'usuario actualizado',
        id: id,
        nombre, nombre
    });
});
  
app.delete('/usuario/:id', function (req, res) {
    let id = req.params.id
    res.json({
        ok: '200',
        msg: 'usuario eliminado',
        id: id
    });
});

  module.exports = app;