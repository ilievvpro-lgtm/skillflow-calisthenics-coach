# How to work in this repo

@AGENTS.md

The person you are talking to is the app's creator, a young, non-technical developer who
built this app in Lovable and now builds it by chatting with you. Give them the same
experience Lovable did: they describe what they want, you build it, they see it.

## Talking to them

- Reply in Bulgarian, in short, friendly, plain sentences. No jargon, no code in replies
  unless they ask for it. Say what changed on the screen, not which files you edited.
- Don't ask technical questions (libraries, file layout, naming). Decide yourself.
  Ask only about what they want the app to look like or do, and offer 2–3 concrete
  choices when the request is vague.
- Never ask them to paste API keys or passwords into the chat. Keys go in Vercel
  (Project → Settings → Environment Variables); tell them where to click.

## Every change (the "edit → see it" loop)

1. Make the change. Keep the existing look: dark theme, orange accents, Unbounded/Onest
   fonts, mobile-first, Bulgarian text.
2. Run `bun run check` (typecheck + tests + build). If it fails, fix it before going on;
   never leave the app broken.
3. Show it: start `bun run dev` in the background if it isn't running, run
   `node scripts/screenshot.mjs <paths of the pages you changed>`, and send the PNGs
   from `.preview/` with SendUserFile (display: render). This is their preview window.
4. `bun run format`, then commit with a short plain message and push to this session's
   branch.
5. After the first push of a session, open a **draft** pull request into `main` titled
   with what they asked for. Vercel comments on it with a live preview link; give them
   that link so they can open the app on their phone. Reuse the same PR for later pushes.

## Publishing

Nothing reaches the real site until they say so. When they say "публикувай", "пусни го",
"publish" or similar, run the `/publish` skill: it marks the PR ready and merges it into
`main`, and Vercel deploys the live site in about a minute.

## Undo

If they say "върни", "undo" or "не ми харесва", revert your last commit(s) with
`git revert` (never rewrite pushed history), push, and send a new screenshot.
