const express = require('express');
const routerUser = express.Router();
// routerUser.use(express.json());

//requerir el archivo para el JWT
const jwt = require('jsonwebtoken');
// const verifyToken = require('../middleware/verifyToken');

// Exportar el modelo de usuarios
const ModeloUsuario = require('../models/usuarioMo');

// Importar archivo config
const config = require('../config/config')



// Controlador para la ruta de ejemplo
exports.example = (req, res) => {
    res.json({ msg: 'Aqui desde usuario Ejemplo...' });
};

// Controlador para agregar/registrar usuario
exports.registerUser = async (req, res, next) => {
    // Tu lógica para registrar un nuevo usuario
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
};

// Controlador para obtener todos los usuarios en la DB
exports.getAllUsers = async (req, res, next) => {
    // Tu lógica para obtener todos los usuarios
    try {
        const usuarios = await ModeloUsuario.find({});
        res.send(usuarios);
    } catch (err) {
        res.status(500).send({ error: 'Ocurrió un error al obtener los usuarios' });
    }
};

// Controlador para logear un usuario ya existente
exports.loginUser = async (req, res, next) => {
    // Tu lógica para el inicio de sesión del usuario
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
                res.json({ msg: "User Logged in" })
            }
        )
    } catch (error) {
        res.json({ msg: "error message in login" })
    }
};

// Controlador para el dashboard
exports.dashboard = async (req, res, next) => {
    // Tu lógica para el dashboard
    res.json({ 'message': "Dashboard!" })
};

// Controlador para logout
exports.logoutUser = (req, res, next) => {
    // Tu lógica para el logout
    res.cookie('token', null, {
        expires: new Date(0),
    });
    return res.status(200).json({ msg: "Loggin out..." })
};
