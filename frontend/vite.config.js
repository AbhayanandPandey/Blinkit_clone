import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
  base: '/',
  plugins: [
    react(),
    tailwindcss(),
    viteStaticCopy({
      targets: [
        {
          src: './_redirects',  // 👈 This must be at root or adjust path if it's in /public
          dest: '.'             // 👈 Copy directly to dist/
        }
      ]
    })
  ]
})
