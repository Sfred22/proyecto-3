require('./config/config')
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 // parse application/json
app.use(bodyParser.json());


app.get('/', function (req, res) {
    res.send('<h1>bienvenido al servidor examen</h1>');
});

app.use(require('./routes/usuario'));

 
mongoose.connect('mongodb://localhost:27017/empresa', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}, (err, res) => {
 if(err) throw err;
 console.log('base de datos en linea');
});

app.listen(process.env.PORT, () => {
    console.log('el servidor esta en linea por el puerto',process.env.PORT);
});