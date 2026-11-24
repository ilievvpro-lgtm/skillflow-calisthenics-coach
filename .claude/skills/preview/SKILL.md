---
name: preview
description: Show the app as it looks right now on a phone screen. Use when the user asks to see the app, a page, or "как изглежда".
---

1. If the dev server isn't answering on http://localhost:8080, start `bun run dev` in the background and wait until it responds.
2. Run `node scripts/screenshot.mjs` with the paths to show (default `/`; pages: `/`, `/technique`, `/skills`, `/skills/<slug>`, `/story`). Use the arguments, if any, to pick pages.
3. Send the PNGs from `.preview/` with SendUserFile (display: render), with a one-line Bulgarian caption per page.
4. If this session has a draft PR, also give the Vercel preview link from its Vercel comment.
