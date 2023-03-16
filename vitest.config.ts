/// <reference types="vitest" />
import { defineConfig } from "vite";

// @ts-ignore - better do this than fail the build
import.meta.env = {}
export default defineConfig({
  test: {
    setupFiles: ["./test-config/basic-setup.ts"],
    environment: "happy-dom",
  },
  ...(await import('./astro.config.mjs')).default.vite
});
