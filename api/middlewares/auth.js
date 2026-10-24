const jwt = require("jsonwebtoken");


const auth = async (req, res, next) => {
    try {
        const token = req.headers["authorization"].split(' ')[1];
        const decode = jwt.verify(token, "Proyecto Informatico II");
        req.user = decode;
        next();
    }catch (error) {
        return res.status(401).json({ error: "Token invalido" });
    }
}


const verificarToken = async(req, res)=>{
    try{
        const token = req.headers["authorization"].split(' ')[1];
        const decode = jwt.verify(token, "Proyecto Informatico II");
        return res.status(200).json(decode)
    }catch(error){
        return res.status(401).json(error)
    }
}


const usuarioTienePermisoFront = async (req, res) => {
    const usuarioID = req.user.id
    const {tabla, accion} = req.params
    const accesos = await obtenerAccesos(usuarioID)
    if (!accesos) return false
    return accesos.permisos.has(`${tabla}:${accion}`)
}



module.exports = {auth, verificarToken, usuarioTienePermisoFront};


