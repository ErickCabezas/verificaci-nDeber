const express = require('express');
const dbconnect = require('./db.js');
const cors = require('cors');
const modeloUsuarios = require('./models/userModel.js');

const app = express();

// Middleware para habilitar CORS
app.use(cors());

// Servir archivos estáticos desde el directorio 'public' para probar con el html
//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.get('/usuarios_registrados',async (req, res)=>{
    try{
        const ourdatos =  await modeloUsuarios.find()
        res.send(ourdatos)
    }catch(error){
        console.log(error)
    }
});

async function usuarioRegistrado(usuario) {
    try {
        if (!usuario) {
            return res.status(400).json({ error: 'El parámetro "usuario" es requerido' });
        }
        // Buscar el usuario en la base de datos
        const usuarioExistente = await modeloUsuarios.findOne({ usuario: usuario });

        if (usuarioExistente) {
            return usuarioExistente;
        } else {
           return null;
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error });
    }
}

app.post('/registrar_usuario', async (req, res) => {
    try {
        const { usuario, password, nombre, apellido, email} = req.body;

        const userExiste= await usuarioRegistrado(usuario);

        if(userExiste!=null){
            res.status(201).json({ respuesta: 'Nombre de usuario existente' });
        }else{
            // Crear una instancia del modelo de usuario con los datos
        const newUser = new modeloUsuarios({
            usuario: usuario,
            password: password,
            nombre: nombre,
            apellido: apellido,
            email: email
        }); 
        
        // Guardar la instancia en la base de datos
        console.log(await newUser.save());

        // Enviar una respuesta exitosa
        res.status(201).json({ respuesta: 'Usuario registrado con éxito' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ respuesta: 'Error al registrar usuario' });
    }
});

app.get('/autenticar', async (req, res) => {
    try {
        const { usuario, password } = req.body;

        const userExiste= await usuarioRegistrado(usuario);

        if(userExiste!=null) {
            if(userExiste.password === password){
                res.status(201).json({ 
                    respuesta: 'Inicio de sesión correcto',
                    usuario:userExiste 
                });
            }else{
                res.status(201).json({ respuesta: 'Contraseña incorrecta' });
            }
        }else{
            res.status(201).json({ respuesta: 'Usuario no registrado' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ respuesta: 'Error al iniciar sesión' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

dbconnect();