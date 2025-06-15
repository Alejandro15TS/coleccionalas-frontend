import axios from 'axios';
import PayPalButton from './PayPalButton';

export default function Cart({ cart, removeFromCart, setCart }) {
  const token = localStorage.getItem('token');

  // Función a ejecutar cuando el pago con PayPal se completa correctamente
  const handlePagoExitoso = async () => {
    const carritoProcesado = cart.map(item => ({
      ...item,
      precio: parseFloat(item.precio),
      cantidad: item.cantidad || 1,
    }));

    try {
      const respuesta = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/crear-pedido`, {
        carrito: carritoProcesado,
        metodo_pago: 'paypal'
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log(respuesta.data);
      alert('Pedido realizado correctamente ✅');
      setCart([]); // Vacía el carrito
      localStorage.removeItem('carrito');
    } catch (error) {
      console.error('Error al registrar el pedido:', error.response?.data || error);
      alert('Error al registrar el pedido ❌');
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow mt-6 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Carrito</h2>

      {cart.length === 0 ? (
        <p className="text-gray-600">Tu carrito está vacío</p>
      ) : (
        <ul className="space-y-4">
          {cart.map((item, index) => (
            <li key={index} className="border-b pb-2">
              <p className="font-semibold">{item.nombre}</p>
              <p className="text-sm text-gray-600">Precio: {item.precio} €</p>
              <p className="text-sm text-gray-600">Cantidad: {item.cantidad || 1}</p>
              <button
                onClick={() => removeFromCart(index)}
                className="text-red-500 text-sm mt-1"
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}

      {cart.length > 0 && (
        <>
          {/* Botón de PayPal */}
          <PayPalButton carrito={cart} onPagoExitoso={handlePagoExitoso} />
        </>
      )}
    </div>
  );
}
