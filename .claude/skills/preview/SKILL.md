---
name: preview
description: Rebuild the app and republish the live preview link (a Claude Artifact the user taps through on their phone). Run after every change, and when the user asks for the link or to try the app.
---

1. Run `bun run build:artifact`. It writes `dist-artifact/index.html` and prints the other files to publish.
2. Publish with the Artifact tool:
   - `file_path`: `dist-artifact/index.html`
   - `files`: each printed file mapped to itself, e.g. `{"app.js": "dist-artifact/app.js", "assets/styles.css": "dist-artifact/assets/styles.css", "assets/hero-front-lever.jpg": "dist-artifact/assets/hero-front-lever.jpg"}` (use the printed list; it changes when assets are added). Pass `null` for a published file that no longer exists.
   - `capabilities`: `{"sample": {}}` (lets the AI coach answer through Claude).
   - `url`: the link in `.claude/preview-link`, so the same link keeps working.
   - first publish only: `icon: "fitness"`.
3. If that publish is refused because the link belongs to someone else, or `.claude/preview-link` is empty, publish without `url`, then write the new link into `.claude/preview-link` and commit it.
4. Reply in Bulgarian with one line on what to try and the link. No screenshots unless asked.

The preview build is `src/artifact/` + `vite.artifact.config.ts`: the same routes and components, in-memory navigation, and `/api/coach` answered by the artifact's `sample` capability instead of the server. If a change adds something server-only, make the preview degrade gracefully instead of breaking.
