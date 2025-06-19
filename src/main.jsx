import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' 
import MainApp from './MainApp'
import './index.css' 
import PayPalProvider from './components/PayPalProvider'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <PayPalProvider>
      <MainApp />
    </PayPalProvider>
  </BrowserRouter>
)
