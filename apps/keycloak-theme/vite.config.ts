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
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
