const express = require('express');
const routerUser = express.Router();
routerUser.use(express.json());
// const archivoDB = require('../conexions')

// Crear el esquema
const mongoose = require('mongoose')
const eschema = mongoose.Schema

const eschemausuario = new eschema({
    nombre: String,
    email: String,
    password: String
    // idusuario: String
})
const ModeloUsuario = mongoose.model('usuario', eschemausuario)

module.exports = routerUser

// ruta de ejemplo
routerUser.get('/ejemplo', (req, res) => {
    res.json({
        msg: 'Aqui desde usuario Ejemplo...'
    })
})

// ruta para agregar/registrar usuario
routerUser.post('/register', async (req, res) => {
    const nuevousuario = new ModeloUsuario({
        nombre: req.body.nombre,
        email: req.body.email,
        password: req.body.password,
        // idusuario: req.body.idusuario
    })
    const verificarUser = await ModeloUsuario.findOne({ email: nuevousuario.email });

    if (verificarUser) {
        res.send(`Existe usuario con email: ${req.body.email}`)
    } else {
        nuevousuario.save()
        if (nuevousuario) {
            console.log('User registered')
            res.send(nuevousuario);
            // res.send(nuevousuario)
        }
        else {
            res.send("error message")
        }
    }

})



// ruta para obtener todos los usuarios en la DB
routerUser.get('/obtenerUsuarios', async (req, res) => {
    try {
        const usuarios = await ModeloUsuario.find({});
        res.send(usuarios);
    } catch (err) {
        res.status(500).send({ error: 'Ocurrió un error al obtener los usuarios' });
    }
    // try {
    //     const usuarios = await ModeloUsuario.find({});

    //     const usuariosJSON = usuarios.map(usuario => {
    //         return {
    //             email: usuario.email,
    //             password: usuario.password
    //         };
    //     });

    //     // res.json(usuariosJSON);
    //     res.send(usuarios[0])
    // } catch (err) {
    //     res.status(500).send({ error: 'Ocurrió un error al obtener los usuarios' });
    // }
});

// ruta para logear un usuario ya existente
routerUser.post('/login', async (req, res) => {
    try {
        const usuarios = await ModeloUsuario.findOne({ email: req.body.email, password: req.body.password});
        if (usuarios){
            res.send(usuarios)
        }
        else{
            res.send(value = false)
        }
        // res.json(usuariosJSON);
    } catch (err) {
        res.status(500).send({ error: 'Ocurrió un error al logearse' });
    }
})

//ruta para crear notas del usuario
    // routerUser.get('/:id/notes', (req, res) =>{
    //     res.send('Id notes')
    // })

