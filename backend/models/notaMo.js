
// Crear el esquema
const mongoose = require('mongoose')
const eschema = mongoose.Schema

const eschemaNota = new eschema({
    titulo: String,
    descripcion: String,
    fecha_creada: String,
    idusuario: String
})
// const ModeloNota = mongoose.model('nota', eschemaNota)

module.exports =  mongoose.model('nota', eschemaNota);


