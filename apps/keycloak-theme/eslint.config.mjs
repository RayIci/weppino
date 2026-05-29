import typescriptEslint from "typescript-eslint";
import reactRefresh from "eslint-plugin-react-refresh";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import eslintConfigPrettier from "eslint-config-prettier";
import globals from "globals";
import js from "@eslint/js";
import storybook from "eslint-plugin-storybook";
import baseConfig from "../../eslint.config.mjs";

export default typescriptEslint.config(
  baseConfig,
  js.configs.recommended,
  ...typescriptEslint.configs.recommended,
  react.configs.flat.recommended,
  react.configs.flat["jsx-runtime"],
  eslintConfigPrettier,
  ...storybook.configs["flat/recommended"],
  {
    ignores: ["dist/**", "dist_keycloak/**", "public/**", "storybook-static/**"],
  },
  {
    plugins: {
      "react-refresh": reactRefresh,
      "react-hooks": reactHooks,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      "react-hooks/exhaustive-deps": "off",
      "@typescript-eslint/no-redeclare": "off",
      "no-labels": "off",
      // TypeScript provides prop-type checking — the react/prop-types rule is redundant.
      "react/prop-types": "off",
    },
  },
  {
    // shadcn/ui components intentionally export both components and utility values
    // (e.g. buttonVariants, useTheme). The react-refresh warning is a false positive here.
    files: ["src/components/**"],
    rules: {
      "react-refresh/only-export-components": "off",
    },
  },
  {
    files: ["**/*.stories.*"],
    rules: {
      "import/no-anonymous-default-export": "off",
    },
  }
);
