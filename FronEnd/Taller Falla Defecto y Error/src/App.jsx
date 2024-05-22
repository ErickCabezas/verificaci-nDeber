import './App.css'
import { useState } from 'react'
import LogoPoli from './assets/logo-poli.png'
import FormularioRestro from './componentes/formularioRegistro'
import Swal from 'sweetalert2'

function App() {

  const [mostrarFormularioRegistro, setMostrarFormularioRegistro] = useState(false)
  const [usuario, setUsuario] = useState('')
  const [contrasena, setContrasena] = useState('')
  const [errores, setErrores] = useState({})

  const validarFormulario = () => {
    const newErrors = {}
    if (!usuario) newErrors.usuario = 'El usuario es requerido'
    if (!contrasena) newErrors.contrasena = 'La contraseña es requerida'

    setErrores(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleIniciarSesion = (e) => {
  
    const datos = {
      usuario: usuario,
      password: contrasena
    }
    console.log(datos)
    e.preventDefault()
    if (validarFormulario()) {
      fetch('http://26.162.12.140:3000/autenticar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
      })
        .then(response => response.json())
        .then(data => {
          console.log(data)
          Swal.fire({
            title: 'Inicio de sesión exitoso',
            icon: 'success'            
          })
        })
        .catch(error => {
          console.error('Error:', error)
          Swal.fire({
            title: 'Error al iniciar sesión',
            text: 'Usuario o contraseña incorrectos',
            icon: 'error'
          })
        })
    }
  }

  const handleAbrirFormularioRegistro = () => {
    setMostrarFormularioRegistro(true)
  }

  const handleCerrarFormularioRegistro = () => {
    setMostrarFormularioRegistro(false)
  }

  return (
    <div className='flex items-center justify-center h-screen w-screen'>
      {!mostrarFormularioRegistro ? (
        <section className={`bg-slate-200 shadow-xl w-[500px] min-w-[500px] h-2/3 rounded-xl p-8 ${validarFormulario ? 'h-auto' : ''}`}>
          <form className='h-full flex flex-col items-center '>
            <img src={LogoPoli} alt='logo' className='w-32 h-32' />
            <h1 className='font-bold text-2xl my-5'>Iniciar Sesión</h1>
            <div className='w-2/3'>
              <input
                type='text'
                placeholder='Usuario'
                className={`w-full p-2 my-2 rounded-md shadow-2xl border-2 ${errores.usuario ? 'border-red-500' : ''}`}
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
              />
              {errores.usuario && <p className='text-red-500 text-xs'>{errores.usuario}</p>}
            </div>
            <div className='w-2/3'>
              <input
                type='password'
                placeholder='Contraseña'
                className={`w-full p-2 my-2 border-2 rounded-md shadow-2xl ${errores.contrasena ? 'border-red-500' : ''}`}
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
              />
              {errores.contrasena && <p className='text-red-500 text-xs'>{errores.contrasena}</p>}
            </div>
            <button
              className='w-2/3 p-2 my-2 bg-green-600 text-white rounded-md shadow-2xl hover:bg-green-700'
              onClick={handleIniciarSesion}
            >
              Iniciar Sesión
            </button>
            <button
              className='w-2/3 p-2 my-2 bg-blue-600 text-white rounded-md shadow-2xl hover:bg-blue-700'
              onClick={handleAbrirFormularioRegistro}
            >Crear cuenta nueva</button>
          </form>
        </section>
      ) : (
        <FormularioRestro handleCerrarFormularioRegistro={handleCerrarFormularioRegistro} />
      )}
    </div>
  )
}

export default App
