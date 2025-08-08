import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist' // pasta que o Vercel vai usar para servir o app
  },
  server: {
    port: 5173, // porta padrão do Vite em dev
    open: true  // abre no navegador automaticamente
  },
  base: '/', // mantém raiz do site no Vercel
})
