import { copyFileSync, writeFileSync } from 'node:fs'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

function pagesReady() {
  return {
    name: 'pages-ready',
    apply: 'build',
    closeBundle() {
      copyFileSync('dist/index.html', 'dist/404.html')
      writeFileSync('dist/.nojekyll', '')
    },
  }
}

export default defineConfig({
  base: '/',
  plugins: [tailwindcss(), react(), pagesReady()],
})
