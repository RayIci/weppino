import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { keycloakify } from "keycloakify/vite-plugin";
import path from "path";

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    keycloakify({
      accountThemeImplementation: "Multi-Page",
      themeName: "weppino",
      // Only build the JAR for Keycloak 26.2+ — we run 26.6.2.
      // Without this, keycloakify emits 6 JARs (one per version range) which
      // breaks the single-JAR assumption in the Dockerfile injection step.
      keycloakVersionTargets: {
        "21-and-below": false,
        "23": false,
        "24": false,
        "25": false,
        "26.0-to-26.1": false,
        "26.2-and-above": true,
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
