import type { StorybookViteConfig } from "@storybook/builder-vite";
import { mergeConfig } from "vite";
import WindiCSS from "vite-plugin-windicss";
import tsconfigPaths from "vite-tsconfig-paths";

let config = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-viewport",
  ],
  core: {},
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  viteFinal: async (config, { configType }) => {
    return mergeConfig(config, {
      optimizeDeps: {
        include: ["jest-mock"],
      },
      plugins: [WindiCSS(), tsconfigPaths()],
    });
  },
  docs: {
    autodocs: true,
  },
} satisfies StorybookViteConfig;
export default config;
