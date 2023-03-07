import type { StorybookViteConfig } from '@storybook/builder-vite';

let config = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions"
  ],
  core: {
    builder: '@storybook/builder-vite', // 👈 The builder enabled here.
  },
  "framework": "@storybook/react"
} satisfies StorybookViteConfig;

export default config;