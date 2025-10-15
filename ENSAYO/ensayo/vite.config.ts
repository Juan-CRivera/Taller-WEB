import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/allData': 'http://localhost:5000',
      '/dataInfo': 'http://localhost:5000',
      '/dataInfoQuery': 'http://localhost:5000'
    }
  }
})