import { useEffect, useState } from 'react'

export default function Perfil() {
  const [usuario, setUsuario] = useState(null)

  useEffect(() => {
    const datos = localStorage.getItem('usuario')
    if (datos) {
      setUsuario(JSON.parse(datos))
    }
  }, [])

  const cerrarSesion = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('usuario')
    window.location.reload()
  }

  if (!usuario) return null

  return (
    <div className="p-4 bg-white rounded shadow max-w-md mx-auto mt-6">
      <h2 className="text-xl font-bold mb-4">Perfil de Usuario</h2>
      <p><strong>Nombre:</strong> {usuario.nombre}</p>
      <p><strong>ID:</strong> {usuario.id}</p>

      <button
        onClick={cerrarSesion}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Cerrar sesión
      </button>
    </div>
  )
}
