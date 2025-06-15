// src/components/Login.jsx
import { useState } from 'react'
import axios from 'axios'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [mensaje, setMensaje] = useState('')
  const [usuario, setUsuario] = useState(null)

  // Guardamos los cambios del formulario
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // Enviamos los datos al backend
  const handleSubmit = (e) => {
    e.preventDefault()

    axios.post('`${import.meta.env.VITE_BACKEND_URL}/login', form)
      .then(res => {
        setMensaje('Login exitoso ✅')
        setUsuario(res.data.usuario) // Guardamos el usuario en el estado
        localStorage.setItem('token', res.data.token) // Guardamos el token
        localStorage.setItem('usuario', JSON.stringify(res.data.usuario))
      })
      .catch(err => {
        setMensaje('Error al iniciar sesión ❌')
        console.error(err)
      })
  }

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-4">Iniciar Sesión</h2>
      {mensaje && <p className="mb-2 text-center text-sm text-gray-600">{mensaje}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <button type="submit" className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">
          Iniciar sesión
        </button>
      </form>

      {/* Mostrar info del usuario si está logueado */}
      {usuario && (
        <div className="mt-4 text-center">
          <p>Bienvenido, <strong>{usuario.nombre}</strong></p>
        </div>
      )}
    </div>
  )
}

