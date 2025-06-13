import { useState } from 'react'
import axios from 'axios'

export default function Registro() {
  const [form, setForm] = useState({ nombre: '', email: '', password: '' })
  const [mensaje, setMensaje] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    axios.post('http://localhost:3001/registro', form)  // ✅ Llamada directa al backend

      .then(res => {
        setMensaje('Usuario registrado correctamente ✅')
        setForm({ nombre: '', email: '', password: '' })
      })
      .catch(err => {
        setMensaje('Error al registrar ❌')
        console.error(err)
      })
  }

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-4">Registro</h2>
      {mensaje && <p className="mb-2 text-center text-sm text-gray-600">{mensaje}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
        <input type="password" name="password" placeholder="Contraseña" value={form.password} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Registrarse</button>
      </form>
    </div>
  )
}
