import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        // Split the 3D engine into its own chunk so the page shell paints
        // immediately and Three.js streams in behind a Suspense boundary.
        manualChunks: {
          three: ['three', '@react-three/fiber'],
          motion: ['framer-motion'],
        },
      },
    },
    chunkSizeWarningLimit: 1200,
  },
})
