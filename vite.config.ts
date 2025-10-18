import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  preview: {
    port: 3001,
  },
  server: {
    port: 3001,
  },
  build: {
    outDir: "build",
  },
  resolve: {
    alias: {
      "@app": path.resolve(__dirname, "src"),
    },
  },
  plugins: [react(), tailwindcss(), svgr()],
});
