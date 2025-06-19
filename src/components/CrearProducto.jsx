import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function CrearProducto() {
  const navigate = useNavigate()

  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    imagen_url: '',
    categoria_id: '',
    stock: ''
  })

  const handleChange = (e) => {
    setNuevoProducto({
      ...nuevoProducto,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const token = localStorage.getItem('token')
      if (!token) {
        alert('Debes iniciar sesión como administrador para crear productos')
        return
      }

      // Enviar solo los campos esperados por el backend
      const { nombre, descripcion, precio, imagen_url, categoria_id } = nuevoProducto;

      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/productos`, {
        nombre,
        descripcion,
        precio,
        imagen_url,
        categoria_id
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      alert('Producto creado correctamente ✅')
      navigate('/admin')
    } catch (err) {
      console.error('Error al crear producto:', err)
      alert('Error al crear el producto ❌')
    }
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Crear Nuevo Producto</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="nombre" placeholder="Nombre" value={nuevoProducto.nombre} onChange={handleChange} className="w-full p-2 border rounded" required />
        <textarea name="descripcion" placeholder="Descripción" value={nuevoProducto.descripcion} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input name="precio" placeholder="Precio" type="number" step="0.01" value={nuevoProducto.precio} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input name="imagen_url" placeholder="URL de Imagen" value={nuevoProducto.imagen_url} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input name="categoria_id" placeholder="ID Categoría" type="number" value={nuevoProducto.categoria_id} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input name="stock" placeholder="Stock" type="number" value={nuevoProducto.stock} onChange={handleChange} className="w-full p-2 border rounded" />
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded">Crear Producto</button>
      </form>
    </div>
  )
}
