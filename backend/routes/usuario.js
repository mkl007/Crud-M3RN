const express = require('express');
const routerUser = express.Router();
routerUser.use(express.json());

// Importar controladores de usuario
const userController = require('../controllers/userController');
// Middleware para verificar el token
const verifyToken = require('../middleware/verifyToken');

// Ruta de ejemplo
routerUser.get('/ejemplo', userController.example);

// Ruta para agregar/registrar usuario
routerUser.post('/register', userController.registerUser);

// Ruta para obtener todos los usuarios en la DB
routerUser.get('/obtenerUsuarios', userController.getAllUsers);

// Ruta para logear un usuario ya existente
routerUser.post('/login', userController.loginUser);

// Ruta para el dashboard
routerUser.get('/dashboard',verifyToken, userController.dashboard);

// Ruta para logout
routerUser.post('/logout', userController.logoutUser);

module.exports = routerUser;
