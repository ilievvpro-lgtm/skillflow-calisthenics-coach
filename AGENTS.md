## Project rules

- Skill content (prerequisites, technique, steps, breakdown, tips) lives in `src/data/skills.ts` as one ordered array; pages and the AI coach prompt read from it so order and content stay in one place.
- Wrong/right technique videos are mapped per skill slug in `src/data/videos.ts`; empty slots render a "coming soon" state.
- The AI coach streams plain text from the `/api/coach` server route: Anthropic SDK when `ANTHROPIC_API_KEY` is set, otherwise Vercel AI Gateway (`ai` package). Keys stay server-side; never read them in browser code.
- Mobile-first shell: `__root.tsx` wraps pages in a max-w-md column with a fixed bottom tab bar.
- Deploys to Vercel via Nitro (`vite.config.ts`). Do not edit `src/routeTree.gen.ts`; it is generated.
- Never commit secrets; `.env` is gitignored and `.env.example` documents the variables.
