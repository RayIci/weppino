// Shared rules applied to every TypeScript project in this monorepo.
// Only ESLint core rules — no npm plugin imports (no root node_modules).
// Project-level configs import this and extend it with framework-specific rules.
export default [
  {
    rules: {
      "prefer-const": "error",
      "no-var": "error",
      eqeqeq: ["error", "always"],
      "no-console": "warn",
      "no-unused-vars": "off", // TypeScript's own checker handles this
    },
  },
];
