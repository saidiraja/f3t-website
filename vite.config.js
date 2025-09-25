// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // keep base if you need it for GitHub Pages; safe in dev too:
  base: '/f3t-website/',
  server: {
    port: 5173,
    proxy: {
      '/api':     { target: 'http://localhost:5174', changeOrigin: true },
      '/uploads': { target: 'http://localhost:5174', changeOrigin: true }
    }
  }
})
