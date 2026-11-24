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

## Every change (the "edit → try it" loop)

He tests the app himself by tapping through it on his phone, so every change ends with a
fresh live link. Don't send screenshots or demo videos unless he asks for them
(`/demo`, "покажи ми").

1. Make the change. Keep the existing look: dark theme, orange accents, Unbounded/Onest
   fonts, mobile-first, Bulgarian text.
2. Run `bun run check` (typecheck + tests + build). If it fails, fix it before going on;
   never leave the app broken.
3. Update the live preview with the `/preview` skill: it rebuilds the app and republishes
   the Claude Artifact, which opens and works inside the Claude mobile app (the AI coach
   too, answered by Claude). Reply with one or two sentences on what changed and the link.
4. `bun run format`, then commit with a short plain message and push to this session's
   branch.

## Publishing

The live preview link updates after every change; the real website (Vercel) only changes when they say so. When they say "публикувай", "пусни го",
"publish" or similar, run the `/publish` skill: it marks the PR ready and merges it into
`main`, and Vercel deploys the live site in about a minute.

## Undo

If they say "върни", "undo" or "не ми харесва", revert your last commit(s) with
`git revert` (never rewrite pushed history), push, and republish the preview (`/preview`).
