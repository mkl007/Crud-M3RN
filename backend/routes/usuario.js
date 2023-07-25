const express = require('express');
const routerUser = express.Router();
routerUser.use(express.json());

//requerir el archivo para el JWT
const jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/verifyToken');

// Exportar el modelo de usuarios
const ModeloUsuario = require('../models/usuarioMo');

// Importar archivo config
const config = require('../config/config')

module.exports = routerUser

// ruta de ejemplo
routerUser.get('/ejemplo', (req, res) => {
    res.json({
        msg: 'Aqui desde usuario Ejemplo...'
    })
})

// ruta para agregar/registrar usuario
routerUser.post('/register', async (req, res, next) => {
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
        nuevousuario.password = await nuevousuario.encryptPassword(nuevousuario.password);

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
routerUser.get('/obtenerUsuarios', async (req, res, next) => {
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
routerUser.post('/login', async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await ModeloUsuario.findOne({ email: email });
        if (!user) {
            return res.status(404).send("Email not found.")
        }

        const valiPassword = await user.validatePassword(password);
        if (!valiPassword) {
            return res.status(401).json({ auth: false, token: null })
        }
        const token = jwt.sign({ id: user._id }, config.SUPERSECRET, {
            expiresIn: 60 * 60 * 24
        },
            (err, token) => {
                if (err) console.log(err);
                res.cookie('token', token)
                res.json({ msg: "User Logged in"})
            }
        )
    } catch (error) {
        res.json({ msg: "error message in login" })
    }

    // try {
    //     const user = await ModeloUsuario.findOne({ email: email });
    //     if (!user) {
    //         return res.status(404).send("Email not found.")
    //     }

    //     const valiPassword = await user.validatePassword(password);
    //     if (!valiPassword) {
    //         return res.status(401).json({ auth: false, token: null })
    //     }
    //     const token = jwt.sign({ id: user._id }, config.secret, {
    //         expiresIn: 60 * 60 * 24
    //     },
    //         (err, token) => {
    //             if (err) console.log(err);
//     //             res.cookie('token', token)
//     res.json({ msg: "User Logged in", user })
// }
// )



//     } catch (err) {
//     res.status(500).send({ error: 'Ocurrió un error al logearse' });
// }
})


//SI QUIERO TENER OTRA RUTA Y QUIERO HACER EL MISMO PROCESSO
routerUser.get('/dashboard', verifyToken, async (req, res, next) => {
    // res.json({ 'message': "Dashboard!" })const user_found = await User.findById(req.userId);
    const user_found = await ModeloUsuario.findById(req.userId);
    if (!user_found) {
        return res.status(404).send('User not found')
    }
    res.json({ msg: `welcome to Dashboard ${user_found.nombre}`});
})

// LOGOUT
routerUser.post('/logout', (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(0),
    });
    return res.status(200).json({msg:"Loggin out..."})
    
})


