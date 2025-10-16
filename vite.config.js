import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc' // Change this line

// https://vitejs.dev/config/
export default defineConfig({
  base: '/lotus-site/',
  plugins: [react()],
})