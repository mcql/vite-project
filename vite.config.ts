import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import cesium from 'vite-plugin-cesium'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), cesium()],
  server: {
    port: 3333,
    proxy: {
      '^/vite-api/': {
        target: 'http://localhost:3334/',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/vite-api/, '')
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '*': path.resolve(__dirname, '')
    }
  }
})
