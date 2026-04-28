import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  build: {
    rollupOptions: {
      input: {
        main:    fileURLToPath(new URL('index.html',   import.meta.url)),
        seventh: fileURLToPath(new URL('seventh.html', import.meta.url)),
      },
    },
  },
})
