import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function Navbar() {
  const navigate = useNavigate()
  const [loggeado, setLoggeado] = useState(false)
  const [rol, setRol] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const usuario = JSON.parse(localStorage.getItem('usuario'))

    if (token && usuario) {
      setLoggeado(true)
      setRol(usuario.rol)
    }
  }, [])

  const cerrarSesion = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('carrito')
    localStorage.removeItem('usuario')
    setLoggeado(false)
    navigate('/', { state: { mensaje: 'Sesión cerrada correctamente' } })
  }

  return (
    <>
      {/* Encabezado fijo*/}
      <header className="bg-cyan-600 text-white text-center py-4 shadow-md mb-4">
        <h1 className="text-2xl font-bold uppercase tracking-wide">Colecciónalas Todas</h1>
      </header>

      {/* Barra de navegación */}
      <nav className="flex flex-wrap justify-center gap-3 px-4">
        <Link to="/" className="bg-cyan-600 text-white px-4 py-2 rounded hover:bg-cyan-800 transition">Inicio</Link>
        <Link to="/carrito" className="bg-cyan-600 text-white px-4 py-2 rounded hover:bg-cyan-800 transition">Carrito</Link>
        <Link to="/registro" className="bg-cyan-600 text-white px-4 py-2 rounded hover:bg-cyan-800 transition">Registro</Link>
        <Link to="/login" className="bg-cyan-600 text-white px-4 py-2 rounded hover:bg-cyan-800 transition">Login</Link>
        <Link to="/perfil" className="bg-cyan-600 text-white px-4 py-2 rounded hover:bg-cyan-800 transition">Perfil</Link>
        <Link to="/historial" className="bg-cyan-600 text-white px-4 py-2 rounded hover:bg-cyan-800 transition">Historial</Link>

        {rol === 'admin' && (
          <Link to="/admin" className="bg-emerald-500 text-white px-4 py-2 rounded hover:bg-emerald-300 transition">
            Panel Admin
          </Link>
        )}

        {loggeado && (
          <button
            onClick={cerrarSesion}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          >
            Cerrar sesión
          </button>
        )}
      </nav>
    </>
  )
}
