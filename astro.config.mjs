import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import WindiCSS from "vite-plugin-windicss";
import vercel from "@astrojs/vercel/serverless";
import tsconfigPaths from "vite-tsconfig-paths";

const noExternal = ["tinykeys", "fp-ts-rxjs", "fp-ts"];

// Don't use nullish coalescing operator here
// Vite doesn't support it yet as import.meta.env is not a real object
// but this check is needed to make it work on vitest config
if (import.meta.env && import.meta.env.PROD) {
  // won't work locally
  noExternal.push("mappersmith");
}
export default defineConfig({
  integrations: [react()],
  output: "server",
  adapter: vercel(),
  vite: {
    plugins: [WindiCSS(), tsconfigPaths()],
    ssr: {
      noExternal: noExternal,
    },
  },
});
