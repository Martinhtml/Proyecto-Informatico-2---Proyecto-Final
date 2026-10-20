const { asignarRolNombre } = require('./controllers/rolController');

async function probar() {
    console.log("Probando asignación de rol...");
    await asignarRolNombre(2, "medico"); 
    console.log("Prueba finalizada.");
}

probar();