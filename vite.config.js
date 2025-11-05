import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc' // Change this line

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',   // or just remove the base line
  plugins: [react()],
})