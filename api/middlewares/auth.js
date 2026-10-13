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

module.exports = auth;


