import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    // Needed inside Docker/Codespaces so Vite binds to all interfaces
    host: "0.0.0.0",
    port: 5173,
    proxy: {
      // Proxy /v1 API calls to the backend container.
      // In devcontainer: backend runs at localhost:5000 (port-forwarded).
      // In production: nginx handles routing, this proxy is unused.
      "/v1": {
        target: process.env.VITE_BACKEND_URL || "http://localhost:5000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
