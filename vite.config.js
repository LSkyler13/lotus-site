import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // Add this line
  base: '/lotus-site/', 
  
  plugins: [react()],
})