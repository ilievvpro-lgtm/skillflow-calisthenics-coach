// Builds a browser-only copy of the app for publishing as a Claude Artifact.
// Run through `bun run build:artifact` (scripts/build-artifact.mjs).
import tailwindcss from "@tailwindcss/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vite";

// The coach API route is server-only; replace it with an empty route of the same path.
const stubServerRoutes: Plugin = {
  name: "stub-server-routes",
  enforce: "pre",
  load(id) {
    if (/[\\/]src[\\/]routes[\\/]api[\\/]/.test(id)) {
      return `import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/api/coach")({});`;
    }
    return undefined;
  },
};

export default defineConfig({
  base: "./",
  resolve: { tsconfigPaths: true, dedupe: ["react", "react-dom"] },
  css: { transformer: "lightningcss" },
  plugins: [stubServerRoutes, tailwindcss(), viteReact()],
  build: {
    outDir: "dist-artifact",
    emptyOutDir: true,
    assetsInlineLimit: 0,
    rolldownOptions: {
      input: "src/artifact/main.tsx",
      output: {
        codeSplitting: false,
        entryFileNames: "app.js",
        assetFileNames: "assets/[name][extname]",
      },
    },
  },
});
