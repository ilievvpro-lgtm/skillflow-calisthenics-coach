import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";

// Deploy target: Vercel. Nitro auto-detects Vercel during its builds; locally it
// falls back to the Node preset (`node .output/server/index.mjs`). Override with
// NITRO_PRESET if you ever host elsewhere.
export default defineConfig({
  server: { host: true, port: 8080 },
  resolve: {
    tsconfigPaths: true,
    dedupe: [
      "react",
      "react-dom",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
      "@tanstack/react-query",
      "@tanstack/query-core",
    ],
  },
  css: { transformer: "lightningcss" },
  plugins: [
    tailwindcss(),
    tanstackStart({
      // src/server.ts wraps the bundled server entry with the SSR error page.
      server: { entry: "server" },
      importProtection: {
        behavior: "error",
        client: { files: ["**/server/**"], specifiers: ["server-only"] },
      },
    }),
    nitro(),
    viteReact(),
  ],
});
