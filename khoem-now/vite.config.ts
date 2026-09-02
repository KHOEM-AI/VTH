import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// IMPORTANT: base must match your repo name for GitHub Pages
// Repo: github.com/KHOEM-AI/VTH  ->  base: "/VTH/"
export default defineConfig({
  plugins: [react()],
  base: "/VTH/",
});
