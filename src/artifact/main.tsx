// Browser-only entry for the Claude Artifact build (bun run build:artifact).
// Same routes and components as the real app, with in-memory navigation and the
// AI coach answered by Claude instead of the /api/coach server route.
import "../styles.css";

import { QueryClient } from "@tanstack/react-query";
import { RouterProvider, createMemoryHistory, createRouter } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { createRoot } from "react-dom/client";

import { Route as rootRoute } from "../routes/__root";
import { routeTree } from "../routeTree.gen";
import { installCoachShim } from "./coach-shim";

installCoachShim();

// The root shell renders <html>/<body> for SSR; the artifact page already has them.
(
  rootRoute.options as { shellComponent?: (p: { children: ReactNode }) => ReactNode }
).shellComponent = ({ children }) => children;

const router = createRouter({
  routeTree,
  context: { queryClient: new QueryClient() },
  history: createMemoryHistory({ initialEntries: ["/"] }),
  scrollRestoration: true,
  defaultPreloadStaleTime: 0,
});

const el = document.getElementById("app");
if (el) createRoot(el).render(<RouterProvider router={router} />);
