import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  envPrefix: ['VITE_', 'NEXT_PUBLIC_'],
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
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (id.includes('three') || id.includes('@react-three') || id.includes('postprocessing')) {
            return 'three-vendor'
          }
          if (id.includes('react-dom') || id.includes('react/')) {
            return 'react-vendor'
          }
        },
      },
    },
  },
})
