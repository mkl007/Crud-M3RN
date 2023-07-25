const mongoose = require ('mongoose');
const config = require('./config')


mongoose.connect(config.mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })

const objetdb = mongoose.connection

//Verificar si la connecion fue exitosa
objetdb.on('connected', ()=>{
    console.log('Successfuly Connected')
})

//Verificar si hubo error en la connexion
objetdb.on('error', ()=>{
    console.log('Error conectando..')
})

module.exports = mongoose

// const mongoose = require('mongoose');
// const config = require('./config')

// mongoose.connect(config.mongoURI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
// .then(() => {
//     console.log('Successfully Connected');
// })
// .catch((error) => {
//     console.error('Error connecting to DB', error);
// });