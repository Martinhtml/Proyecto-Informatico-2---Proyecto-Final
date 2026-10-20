const { asignarRolNombre } = require('./api/controllers/rolController');

async function probar() {
    console.log("Probando asignación de rol...");
    await asignarRolNombre(2, "medico"); 
    console.log("Prueba finalizada.");
}

probar();