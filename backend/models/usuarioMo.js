const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

// Crear el esquema

const eschema = mongoose.Schema

const eschemausuario = new eschema({
    nombre: String,
    email: String,
    password: String
    // idusuario: String
})
eschemausuario.methods.encryptPassword = async (password) =>{
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt); 
 };
 
 eschemausuario.methods.validatePassword = function (password){
    return bcrypt.compare(password, this.password)
 }
module.exports =  mongoose.model('usuario', eschemausuario);


