import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  css: {
    devSourcemap: false,  // 🔹 Disable CSS source maps
  },
});