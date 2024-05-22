const mongoose = require('mongoose');
//const { cargo, empresa, experiencia } = req.body y la carta;
const ModeloUsuarios= new mongoose.Schema({
    usuario: {
        type: String,
    },
    password: {
        type: String,
    },
    nombre: {
        type: String,
    },
    apellido: {
        type: String,
    },
    email: {
        type: String,
    }
},
{
    //timestamps: para que me agrege de forma automatica la fecha de creación en una columna
    timestamps: true,
    //
    versionKey: false,
}
);

const modeloUsuarios= mongoose.model("usuarios", ModeloUsuarios);
module.exports = modeloUsuarios;