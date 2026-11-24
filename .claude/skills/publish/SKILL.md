---
name: publish
description: Publish this session's changes to the live site by merging them into main. Use only when the user asks to publish ("публикувай", "пусни го").
---

1. Make sure everything is committed and pushed; run `bun run check` and stop if it fails (fix first, then tell the user).
2. Find this session's pull request into `main` (open one if there isn't any), mark it ready for review, and merge it with a merge commit (no squash, no force push).
3. If the merge has conflicts, merge `main` into this branch, fix the conflicts, run `bun run check`, push, then merge.
4. Tell the user in Bulgarian that it's live, and give the production link from the Vercel deployment on `main` (or tell them to open their Vercel project if you can't find it). Mention it can take about a minute.
