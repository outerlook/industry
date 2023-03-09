import type { StorybookViteConfig } from "@storybook/builder-vite";
import { mergeConfig } from "vite";
import WindiCSS from "vite-plugin-windicss";

let config = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-viewport",
    "@storybook/addon-mdx-gfm",
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
      plugins: [WindiCSS()],
    });
  },
  docs: {
    autodocs: true,
  },
} satisfies StorybookViteConfig;
export default config;
