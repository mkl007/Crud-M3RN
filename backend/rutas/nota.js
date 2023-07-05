const express = require('express');
const routerNote = express.Router();
routerNote.use(express.json());
// const archivoDB = require('../conexions')

// Crear el esquema
const mongoose = require('mongoose')
const eschema = mongoose.Schema

const eschemaNota = new eschema({
    titulo: String,
    descripcion: String,
    fecha_creada: String,
    idusuario: String
})
const ModeloNota = mongoose.model('nota', eschemaNota)

module.exports = routerNote

// ruta de ejemplo
routerNote.get('/ejemplo', (req, res) => {
    res.json({
        msg: 'Aqui desde nota Ejemplo ...'
    })
})

//ruta para crear notas del usuario
routerNote.post('/:id/crear', async (req, res) => {
    try {
        idusuario = req.params.id
        const notaCrear = new ModeloNota({
            titulo: req.body.titulo,
            descripcion: req.body.descripcion,
            fecha_creada: req.body.fecha_creada,
            idusuario: idusuario
        })
        if (notaCrear) {
            notaCrear.save()
            res.send(notaCrear)
        }
    }
    catch (err) {
        res.status(500).send({ error: 'Ocurrio un error bro' });
    }
})

//ruta para ver todas las notas de un solo ID
routerNote.get('/:id/', async (req, res) => {
    try {
        const idrecivido = req.params.id
        const notas = await ModeloNota.find({idusuario:idrecivido});
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
})

// Editar una nota especifica
routerNote.put('/:id/editar/:nota_id', async (req, res) =>{
    try {
        const id_user = req.params.id
        const id_note = req.params.nota_id
        const editedNota = await ModeloNota.findByIdAndUpdate({idusuario:id_user, _id: id_note},
            {titulo: req.body.titulo,
            descripcion: req.body.descripcion
            },{new:true})

        if(editedNota){
            res.send(editedNota)
        }else console.log('Me dio un error al editar')
    } catch (error) {
        res.status(500).send('Hubo un solo error mi bro!')
    }
})

// ruta para eliminar una nota
routerNote.delete('/:id/eliminar/:nota_id', async (req, res) => {
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
  });
  