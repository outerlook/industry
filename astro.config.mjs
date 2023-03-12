import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import WindiCSS from "vite-plugin-windicss";
import vercel from "@astrojs/vercel/serverless";
import tsconfigPaths from "vite-tsconfig-paths";

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  output: "server",
  adapter: vercel(),
  vite: {
    plugins: [WindiCSS(), tsconfigPaths()],
    ssr: {
      noExternal: ["tinykeys", "fp-ts-rxjs", "fp-ts"],
    },
  },
});
