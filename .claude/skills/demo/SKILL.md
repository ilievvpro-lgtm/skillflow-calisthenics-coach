---
name: demo
description: Record a short phone-screen video of the app being used and send it. Use only when the user asks for a video or demo ("покажи ми", "демо", "запиши видео"); they normally test the app themselves through the /preview link.
---

1. If http://localhost:8080 isn't answering, start `bun run dev` in the background and wait until it responds.
2. With no specific feature in mind, run `node scripts/demo.mjs` (a tour of every tab).
   To show a specific change, write the steps to `.preview/steps.json` (format at the top of
   `scripts/demo.mjs`): open the page, tap what changed, scroll to it, pause ~1.5 s on each
   result, and run `node scripts/demo.mjs .preview/steps.json`.
   For the AI coach: type into `textarea`, press Enter, then `{"wait": 8000}` so the answer shows.
3. Send `.preview/demo.mp4` with SendUserFile (display: render) and a one-line Bulgarian caption
   saying what the video shows.
4. If a step fails because a selector is wrong, take a screenshot (`node scripts/screenshot.mjs`)
   to see the page, fix the step and record again. Don't send a broken video.
