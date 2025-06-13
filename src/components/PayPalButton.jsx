import { useEffect } from 'react';

export default function PayPalButton({ carrito, onPagoExitoso }) {
  useEffect(() => {
    if (!window.paypal || !carrito.length) return;

    const total = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0).toFixed(2);

    // Limpiamos el contenedor para evitar renderizados duplicados
    const container = document.getElementById('paypal-button-container');
    container.innerHTML = '';

    window.paypal.Buttons({
      createOrder: (data, actions) => {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: total
            }
          }]
        });
      },
      onApprove: async (data, actions) => {
        try {
          const detalles = await actions.order.capture();
          console.log('Pago completado:', detalles);
          onPagoExitoso(); // Llama al backend y vacía el carrito
        } catch (err) {
          console.error('Error al capturar el pago:', err);
          alert('Error al capturar el pago');
        }
      },
      onError: err => {
        console.error('Error en PayPal:', err);
        alert('Hubo un problema al procesar el pago con PayPal');
      }
    }).render('#paypal-button-container');

  }, [carrito, onPagoExitoso]);

  return <div id="paypal-button-container" className="mt-4" />;
}
