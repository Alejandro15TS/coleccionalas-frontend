import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' // ✅ Nombre correcto
import MainApp from './MainApp'
import './index.css' // ✅ Ruta correcta si está en /src
import PayPalProvider from './components/PayPalProvider'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <PayPalProvider>
      <MainApp />
    </PayPalProvider>
  </BrowserRouter>
)
