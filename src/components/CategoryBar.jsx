
import React from 'react'

// Lista de categorías disponibles
const categorias = ['Pokémon', 'Magic', 'One Piece']

// Componente que recibe la categoría seleccionada y una función para cambiarla
export default function CategoryBar({ selectedCategory, setSelectedCategory }) {
  return (
    <div className="flex justify-center space-x-4 bg-gray-100 p-4 rounded shadow mb-6">
      {categorias.map((cat) => (
        <button
          key={cat}
          onClick={() => setSelectedCategory(cat)}
          className={`px-4 py-2 rounded font-semibold ${
            selectedCategory === cat
              ? 'bg-cyan-500 text-white'
              : 'bg-white text-gray-700 border'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  )
}

