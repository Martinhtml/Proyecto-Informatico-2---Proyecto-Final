const crypto = require('crypto')

const calcularDVH = (...campos) =>{
    return crypto.createHash('sha256').update(campos.join('|')).digest('hex')
} //los tres puntos agrupan todos los argumentos que le pasen a la función en un array.

    


module.exports = {
    calcularDVH,
}