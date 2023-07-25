const jwt = require('jsonwebtoken');
// const config = require('../config');

const config = require('../config/config');

function verifyToken(req, res, next) {   
    const pre_pretoken = req.headers.cookie;
    if(!pre_pretoken){
        return res.json({msg: "Inicia sesion para ver los contenidos"})
    }

    token = pre_pretoken.split('=')[1]
    if (!token) {
        return res.status(401).json({
            auth: false,
            message: "No token provided :("
        });
    }
    const decoded = jwt.verify(token, config.SUPERSECRET);
    req.userId = decoded.id;
    next();
}

module.exports = verifyToken;