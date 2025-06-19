import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'

import ProductList from './components/ProductList'
import CategoryBar from './components/CategoryBar'
import Cart from './components/Cart'
import Registro from './components/Registro'
import Login from './components/Login'
import Historial from './components/HistorialPedidos'
import Navbar from './components/Navbar'
import Perfil from './components/Perfil'
import AdminPanel from './components/AdminPanel'
import EditarProducto from './components/EditarProducto'
import CrearProducto from './components/CrearProducto'

export default function MainApp() {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const location = useLocation()
  const mensajeCierre = location.state?.mensaje || ''

  const [cart, setCart] = useState(() => {
    const guardado = localStorage.getItem('carrito')
    return guardado ? JSON.parse(guardado) : []
  })

  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(cart))
  }, [cart])

  const addToCart = (producto) => {
    setCart(prev => {
      const i = prev.findIndex(item => item.id === producto.id)
      if (i !== -1) {
        const actualizado = [...prev]
        actualizado[i].cantidad += 1
        return actualizado
      }
      return [...prev, { ...producto, cantidad: 1 }]
    })
  }

  const removeFromCart = (index) => {
    setCart(prev => prev.filter((_, i) => i !== index))
  }

  const clearCart = () => {
    setCart([])
    localStorage.removeItem('carrito')
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white text-black">
        {mensajeCierre && (
          <p className="text-green-600 text-center mt-2">{mensajeCierre}</p>
        )}

        <Routes>
          <Route path="/" element={
            <>
              <CategoryBar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
              <ProductList selectedCategory={selectedCategory} addToCart={addToCart} />
            </>
          } />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/login" element={<Login />} />
          <Route path="/carrito" element={<Cart cart={cart} removeFromCart={removeFromCart} clearCart={clearCart} />} />
          <Route path="/historial" element={<Historial />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/admin/editar/:id" element={<EditarProducto />} />
          <Route path="/admin/crear" element={<CrearProducto />} /> 
        </Routes>
      </div>
    </>
  )
}
