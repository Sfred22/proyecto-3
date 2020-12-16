require('./config/config')
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 // parse application/json
app.use(bodyParser.json());

 
app.get('/', function (req, res) {
  res.send('<h1>bienvenido al servidor examen</h1>');
});

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
 
app.listen(process.env.PORT, () => {
    console.log('el servidor esta en linea por el puerto',process.env.PORT);
});