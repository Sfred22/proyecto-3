const express = require('express');
const app = express();

  
app.get('/usuario', function (req, res) {
    res.json({
        ok: '200',
        msg: 'usuario consultado'   
    });
});
  
app.post('/usuario', function (req, res) {
    let nombre = req.body.nombre;
    let body = req.body;
  
    if(nombre == undefined){
          res.status(400).json({
            ok: 400,
            msg: 'enviar el nombre'
        });
  
    }else{
  
        res.json({
            ok: '200',
            msg: 'usuario insertado',
            body: body
         });
    }
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