import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  // base: '/museum-sandbox/',
  base: '/~cchen/privacyeducation/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Privacy Education App',
        short_name: 'PrivacyApp',
        description: 'My offline PWA app',
        theme_color: '#ffffff',
        icons: [] // 没有图标也可以，只是没有美观图标
      }
    })
  ],
})