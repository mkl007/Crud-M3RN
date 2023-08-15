const express = require('express');
const routerNote = express.Router();
routerNote.use(express.json());

// import verifyToken
const verifyToken = require('../middleware/verifyToken');
// Importar controladores de nota
const noteController = require('../controllers/noteController');

// Ruta de ejemplo
routerNote.get('/ejemplo', verifyToken, noteController.example);

// Ruta para crear notas del usuario
// routerNote.post('/:id/crear',verifyToken, noteController.createNote);
routerNote.post('/crear',verifyToken, noteController.createNote);

// Ruta para ver todas las notas de un solo ID
routerNote.get('/', verifyToken, noteController.getAllNotes);

// Ruta para editar una nota específica
routerNote.put('/:id/editar/:nota_id', verifyToken, noteController.editNote);

// Ruta para eliminar una nota
routerNote.delete('/tasks/:nota_id', verifyToken,  noteController.deleteNote);

module.exports = routerNote;
