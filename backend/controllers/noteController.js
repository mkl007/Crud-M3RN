const express = require('express');
// routerUser.use(express.json());

//requerir el archivo para el JWT
const jwt = require('jsonwebtoken');

// Exportar el modelo de usuarios
const ModeloNota = require('../models/notaMo');

// Importar archivo config
const config = require('../config/config')



// Controlador para la ruta de ejemplo
exports.example = (req, res) => {
    res.json({ msg: 'Aqui desde nota Ejemplo ...' });
};

// Controlador para crear notas del usuario
exports.createNote = async (req, res, next) => {
    // Tu lógica para crear una nueva nota
    const { titulo, descripcion } = req.body;
    const idParams = req.params.id;

    try {
        const miNota = new ModeloNota({
            titulo,
            descripcion,
            fecha_creada: new Date(),
            idusuario: idParams,
        })
        const guardar = await miNota.save();
        if (!guardar) {
            res.status(501).send("Error al guardar")
        }
        res.json({ msg: "nota creada" });


    } catch (error) {
        res.status(500).json({ error, msg: "This section falied" })
    }

};

// Controlador para ver todas las notas de un solo ID
exports.getAllNotes = async (req, res, next) => {
    // Tu lógica para obtener todas las notas de un usuario específico
    try {
        const idrecivido = req.params.id
        const notas = await ModeloNota.find({ idusuario: idrecivido });
        res.send(notas)

        // const notasJso = notas.map(nota => {
        //     return {
        //         titulo: nota.titulo,
        //         descripcion: nota.descripcion
        //     };
        // });

        // res.json(notasJso);
    } catch (err) {
        res.status(500).send({ error: 'Ocurrió un error mas mano' });
    }
};

// Controlador para editar una nota específica
exports.editNote = async (req, res, next) => {
    // Tu lógica para editar una nota específica
    try {
        const id_user = req.params.id
        const id_note = req.params.nota_id
        const editedNota = await ModeloNota.findByIdAndUpdate({ idusuario: id_user, _id: id_note },
            {
                titulo: req.body.titulo,
                descripcion: req.body.descripcion,
                fecha_editada: new Date()
            }, { new: true })

        if (!editedNota) {
            res.send("Error al editar la nota");
        }
        res.json({ msg: "Nota editada" });


    } catch (error) {
        res.status(500).send('Hubo un solo error mi bro!')
    }
};

// Controlador para eliminar una nota
exports.deleteNote = async (req, res, next) => {
    // Tu lógica para eliminar una nota
    try {
        nota_id = req.params.nota_id
        const response = await ModeloNota.findByIdAndDelete({
            _id: nota_id
        });
        console.log(`Nota eliminada!`);
        //   res.send(response);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al eliminar la nota');
    }
};
