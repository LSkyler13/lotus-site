import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// IMPORTANT: the repo name goes here
export default defineConfig({
  plugins: [react()],
  base: "/lotus-site/", // <-- required for GitHub Pages (repo name)
});
