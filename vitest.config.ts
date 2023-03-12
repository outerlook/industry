/// <reference types="vitest" />
import { defineConfig } from "vite";

export default defineConfig({
  test: {
    setupFiles: ["./test-config/basic-setup.ts"],
    environment: "happy-dom",
  },
  ...(await import('./astro.config.mjs')).default.vite
});
