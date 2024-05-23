import React, { useState } from 'react';
import { IoArrowBackCircleOutline } from "react-icons/io5";
import Swal from 'sweetalert2'

function FormularioRestro({ handleCerrarFormularioRegistro }) {

  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [usuario, setUsuario] = useState('')
  const [correo, setCorreo] = useState('')
  const [contrasena, setContrasena] = useState('')
  const [confirmarContrasena, setConfirmarContrasena] = useState('')
  const [errores, setErrores] = useState({})

  const validarFormulario = () => {
    const newErrors = {}
    if (!nombre) newErrors.nombre = 'El nombre es requerido'
    if (!apellido) newErrors.apellido = 'El apellido es requerido'
    if (!usuario) newErrors.usuario = 'El usuario es requerido'
    if (!correo) newErrors.correo = 'El correo es requerido'
    if (!contrasena) newErrors.contrasena = 'La contraseña es requerida'
    if (!confirmarContrasena) newErrors.confirmarContrasena = 'La confirmación de la contraseña es requerida'
    if (contrasena && confirmarContrasena && contrasena !== confirmarContrasena) {
      newErrors.confirmarContrasena = 'Las contraseñas no coinciden'
    }

    setErrores(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleRegistrar = (e) => {
    const datos = {
      usuario: usuario,
      password: contrasena,
      nombre: nombre,
      apellido: apellido,
      email: correo
    };

    e.preventDefault();
    if (validarFormulario()) {
      fetch('http://26.162.12.140:3000/registrar_usuario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
      })
        .then(response => {
          if (!response.ok) {
            if (response.status === 401) {
              throw new Error('Unauthorized');
            }
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          console.log(data);
          Swal.fire({
            title: 'Registro exitoso',
            icon: 'success'
          });
        })
        .catch(error => {
          console.error('Error:', error);
          let errorMessage = 'Error al registrar';
          if (error.message === 'Unauthorized') {
            errorMessage = 'El usuario ya existe';
          }
          Swal.fire({
            title: errorMessage,
            icon: 'error'
          });
        });
    }
  }

  return (
    <section className={`bg-slate-200 shadow-xl w-[500px] min-w-[500px] h-2/3 rounded-xl p-8 border ${validarFormulario ? 'h-auto' : ''}`}>
      <form className='h-full grid grid-cols-2 items-center border gap-2'>
        <IoArrowBackCircleOutline className='text-4xl col-span-2 cursor-pointer shadow-2xl' onClick={handleCerrarFormularioRegistro} />
        <h1 className='font-bold text-2xl my-5 col-span-2'>Registrate rápido y fácil</h1>
        <div className='col-span-1'>
          <input
            type='text'
            placeholder='Nombre'
            className={`w-full p-2 my-2 rounded-md shadow-2xl border-2 ${errores.nombre ? 'border-red-500' : ''}`}
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          {errores.nombre && <p className='text-red-500 text-xs'>{errores.nombre}</p>}
        </div>
        <div className='col-span-1'>
          <input
            type='text'
            placeholder='Apellido'
            className={`w-full p-2 my-2 rounded-md shadow-2xl border-2 ${errores.apellido ? 'border-red-500' : ''}`}
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
          />
          {errores.apellido && <p className='text-red-500 text-xs'>{errores.apellido}</p>}
        </div>
        <div className='col-span-1'>
          <input
            type='text'
            placeholder='Usuario'
            className={`w-full p-2 my-2 rounded-md shadow-2xl border-2 ${errores.usuario ? 'border-red-500' : ''}`}
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />
          {errores.usuario && <p className='text-red-500 text-xs'>{errores.usuario}</p>}
        </div>
        <div className='col-span-1'>
          <input
            type='email'
            placeholder='Correo'
            className={`w-full p-2 my-2 rounded-md shadow-2xl border-2 ${errores.correo ? 'border-red-500' : ''}`}
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />
          {errores.correo && <p className='text-red-500 text-xs'>{errores.correo}</p>}
        </div>
        <div className='col-span-2'>
          <input
            type='password'
            placeholder='Contraseña'
            className={`w-full p-2 my-2 border-2 rounded-md shadow-2xl ${errores.contrasena ? 'border-red-500' : ''}`}
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
          />
          {errores.contrasena && <p className='text-red-500 text-xs'>{errores.contrasena}</p>}
        </div>
        <div className='col-span-2'>
          <input
            type='password'
            placeholder='Confirmar contraseña'
            className={`w-full p-2 my-2 border-2 rounded-md shadow-2xl ${errores.confirmarContrasena ? 'border-red-500' : ''}`}
            value={confirmarContrasena}
            onChange={(e) => setConfirmarContrasena(e.target.value)}
          />
          {errores.confirmarContrasena && <p className='text-red-500 text-xs'>{errores.confirmarContrasena}</p>}
        </div>
        <button
          type='submit'
          className='w-full p-2 my-2 bg-green-600 text-white rounded-md shadow-2xl hover:bg-green-700 col-span-2'
          onClick={handleRegistrar}
        >
          Registrarse
        </button>
      </form>
    </section>
  )
}

export default FormularioRestro;