import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import WindiCSS from "vite-plugin-windicss";
import vercel from '@astrojs/vercel/serverless'

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  output: "server",
  adapter: vercel(),
  vite: {
    plugins: [WindiCSS()],
  },
});
