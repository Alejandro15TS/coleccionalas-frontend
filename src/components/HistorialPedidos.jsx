import { useEffect, useState } from 'react'
import axios from 'axios'

export default function HistorialPedidos() {
  const [pedidos, setPedidos] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      setError('Debes iniciar sesión para ver tu historial')
      return
    }

    axios.get(`${import.meta.env.VITE_BACKEND_URL}/historial-pedidos`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        setPedidos(res.data)
      })
      .catch(err => {
        console.error('Error al obtener historial:', err)
        setError('Error al obtener el historial de pedidos')
      })
  }, [])

  return (
    <div className="p-4 max-w-3xl mx-auto mt-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Historial de Pedidos</h2>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      {pedidos.length === 0 && !error ? (
        <p className="text-gray-600">No tienes pedidos realizados aún.</p>
      ) : (
        pedidos.map(pedido => (
          <div key={pedido.id} className="border-b py-4">
            <p className="font-semibold">Pedido #{pedido.id}</p>
            <p>Fecha: {new Date(pedido.fecha).toLocaleString('es-ES')}</p>
            <p>Método de pago: {pedido.metodo_pago}</p>
            <p>Total: {pedido.total} €</p>
            <h4 className="mt-2 font-semibold">Productos:</h4>
            {pedido.detalles?.length > 0 ? (
              <ul className="ml-4 list-disc">
                {pedido.detalles.map((detalle, index) => (
                  <li key={index}>
                    ID Producto: {detalle.producto_id}, Cantidad: {detalle.cantidad}, Precio Unitario: {detalle.precio_unitario} €
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">No hay detalles para este pedido.</p>
            )}
          </div>
        ))
      )}
    </div>
  )
}
