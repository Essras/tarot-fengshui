import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icon.svg'],
      manifest: {
        name: 'Ancient Oracle Tarot',
        short_name: 'Tarot Oracle',
        description: 'Mystical Tarot & Feng Shui Reading App',
        theme_color: '#12090e',
        background_color: '#12090e',
        display: 'standalone',
        icons: [
          {
            src: 'icon.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg,json}'],
        maximumFileSizeToCacheInBytes: 5000000
      }
    })
  ],
})
