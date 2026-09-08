import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// Relative base matches the former CRA `homepage: "."` so the built UI can
// be dropped into any ServerStatus web directory (including subpaths).
export default defineConfig({
  plugins: [react()],
  base: "./",
  build: {
    outDir: "dist",
    emptyOutDir: true,
    assetsDir: "static",
  },
  server: {
    port: 5173,
  },
  preview: {
    port: 4173,
  },
});
