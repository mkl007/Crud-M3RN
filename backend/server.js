const express = require('express');
const app = express();
const cors = require('cors')
const mongoos = require('mongoose');

// Importar la conexion base de datosc
// const archivoDB = require('./conexion')
const conexion = require('./config/conexion')

// importar la configuracion del .env
const config = require('./config/config')

// importar las rutas del usuario
const rutasUsuario = require('./routes/usuario')
// importar rutas de notas
const rutasNota = require('./routes/nota')
//importar el bodyparser
const bodyParser = require('body-parser')

// importar cookie-parser
const cookieParser = require('cookie-parser')

app.use(cookieParser());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: 'true'}))
// Habilitar CORS para todas las rutas
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
// app.use(cors());

//aqui para usar las rutas del usuario
app.use('/api/usuario', rutasUsuario)
//aqui para usar las rutas de las notas
app.use('/api/usuario/nota', rutasNota)

// probar mi servidor
app.get('/', (req, res) => {
    res.json({
        msg: 'Ruta Activa!'
    })
})


// config el server basico
app.listen(config.port, function () {
    console.log(`Server on ${config.port}`)
})