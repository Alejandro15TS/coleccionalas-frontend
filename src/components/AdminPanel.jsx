import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function AdminPanel() {
  const [productos, setProductos] = useState([])

  // Cargar productos al iniciar
  useEffect(() => {
    fetchProductos()
  }, [])

  const fetchProductos = async () => {
    try {
      const res = await axios.get('http://localhost:3001/productos')
      setProductos(res.data)
    } catch (err) {
      console.error('Error al cargar productos:', err)
    }
  }

  // Eliminar producto con token de autenticación
  const eliminarProducto = async (id) => {
    const confirmar = confirm('¿Estás seguro de que deseas eliminar este producto?')
    if (!confirmar) return

    const token = localStorage.getItem('token')

    try {
      await axios.delete(`http://localhost:3001/productos/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      alert('Producto eliminado correctamente ✅')
      setProductos(prev => prev.filter(p => p.id !== id))
    } catch (err) {
      console.error('Error al eliminar producto:', err)
      alert('Error al eliminar el producto ❌')
    }
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Panel de Administración</h2>

      <Link
        to="/admin/crear"
        className="inline-block mb-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        + Crear nuevo producto
      </Link>

      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Nombre</th>
            <th className="border px-4 py-2">Descripción</th>
            <th className="border px-4 py-2">Precio</th>
            <th className="border px-4 py-2">Categoría</th>
            <th className="border px-4 py-2">Stock</th>
            <th className="border px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map(producto => (
            <tr key={producto.id}>
              <td className="border px-4 py-2">{producto.id}</td>
              <td className="border px-4 py-2">{producto.nombre}</td>
              <td className="border px-4 py-2">{producto.descripcion}</td>
              <td className="border px-4 py-2">{producto.precio} €</td>
              <td className="border px-4 py-2">{producto.categoria_nombre}</td>
              <td className="border px-4 py-2">{producto.stock ?? 'N/A'}</td>
              <td className="border px-4 py-2 text-center">
                <Link
                  to={`/admin/editar/${producto.id}`}
                  className="text-blue-600 mr-2 hover:underline"
                >
                  Editar
                </Link>
                <button
                  onClick={() => eliminarProducto(producto.id)}
                  className="text-red-600 hover:underline"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
