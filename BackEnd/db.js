const mongoose = require('mongoose');

async function dbconnect(){
  try {
    const db = await mongoose.connect("mongodb+srv://erickcabezas0704:M2001KKp@cluster01.mlexy5u.mongodb.net/usuarios?retryWrites=true&w=majority&appName=Cluster01")
    console.log("conexión exitosa a la BD: ", db.connection.name)
  } catch (error) {
    console.log("Error: "+error)
  }
}

module.exports = dbconnect;
//mongodb://localhost:27017/compatibilidad
