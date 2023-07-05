const mongoose = require ('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/IndDBCRUD')

const objetdb = mongoose.connection

//Verificar si la connecion fue exitosa
objetdb.on('connected', ()=>{
    console.log('Conexion a DB')
})

//Verificar si hubo error en la connexion
objetdb.on('error', ()=>{
    console.log('Error conectando..')
})

module.exports = mongoose