
import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function ProductList({ selectedCategory, addToCart }) {
  const [productos, setProductos] = useState([])

  useEffect(() => {
    axios.get('`${import.meta.env.VITE_BACKEND_URL}/productos`')
      .then((res) => setProductos(res.data))
      .catch((err) => console.error('Error al obtener productos:', err))
  }, [])

  const productosFiltrados = selectedCategory
    ? productos.filter(p => p.categoria_nombre === selectedCategory)
    : productos

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
      {productosFiltrados.map((producto) => (
        <div
          key={producto.id}
          className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-[1.02]"
        >
          <div className="w-full aspect-[1/1] flex items-center justify-center bg-gray-100">
            <img
              src={producto.imagen_url}
              alt={producto.nombre}
              className="max-h-full max-w-full object-contain"
            />
          </div>

          <div className="p-4">
            <h2 className="text-lg font-semibold text-gray-800">{producto.nombre}</h2>
            <p className="text-sm text-gray-600 mt-1">{producto.descripcion}</p>
            <p className="text-md font-bold text-cyan-700 mt-2">{producto.precio} €</p>
            <button
              onClick={() => addToCart(producto)}
              className="mt-4 w-full bg-cyan-600 hover:bg-cyan-700 text-white font-medium py-2 rounded-lg transition"
            >
              Añadir al carrito
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
