import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // This is the correct base for username.github.io repos
  server: {
    host: '0.0.0.0', // Allow access from network
    port: 5173
  }
})