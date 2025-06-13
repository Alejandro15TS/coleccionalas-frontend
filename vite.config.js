import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/crear-pedido': 'http://localhost:3001',
      '/registro': 'http://localhost:3001',
      '/login': 'http://localhost:3001',
      '/productos': 'http://localhost:3001'
    }
  }
})
