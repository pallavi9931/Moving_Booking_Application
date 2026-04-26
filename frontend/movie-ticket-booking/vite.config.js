import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const GATEWAY = "http://localhost:8080";

// https://vite.dev/config/ — string shorthand: forward to API Gateway
const proxy = {
  "/auth": GATEWAY,
  "/shows": GATEWAY,
  "/booking": GATEWAY,
};

export default defineConfig({
  plugins: [react()],
  server: {
    proxy,
  },
  preview: {
    proxy,
  },
});
