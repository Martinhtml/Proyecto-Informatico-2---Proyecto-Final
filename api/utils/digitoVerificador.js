const crypto = require('crypto')

const calcularDVH = (...campos) =>{
    return crypto.createHash('sha256').update(campos.join('/')).digest('hex')
} 

    


module.exports = {
    calcularDVH,
}