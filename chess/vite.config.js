import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target:
          "https://supernatural-crypt-pjpq5pvp6qgq399q7-3000.app.github.dev",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
