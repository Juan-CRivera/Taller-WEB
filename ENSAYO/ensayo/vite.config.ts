import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      // Backend 1 (todos) en :3000
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      // Backend 2 (libros) en :5000
      '/books': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/books/, ''), // /books/allData -> /allData
      },
    },
  },
})