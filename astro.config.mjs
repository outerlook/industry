import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import WindiCSS from "vite-plugin-windicss";

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  output: "server",
  vite: {
    plugins: [WindiCSS()],
  },
});
