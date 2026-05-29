import type { StorybookConfig } from "@storybook/react-vite";
import type { Plugin } from "vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  staticDirs: ["../public"],
  viteFinal(config) {
    // keycloakify's vite plugin is irrelevant in Storybook and can cause issues.
    // @storybook/react-vite handles the react() plugin deduplication automatically.
    config.plugins = (config.plugins as Plugin[])
      .flat()
      .filter(
        (plugin): plugin is Plugin =>
          !!plugin && (plugin as Plugin).name !== "vite-plugin-keycloakify"
      );
    return config;
  },
};
export default config;
