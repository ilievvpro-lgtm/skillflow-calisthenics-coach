<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

## Imported app architecture
- Keep the app phone-first: one max-w-md column, a six-tab bottom bar, and full-screen welcome, onboarding, auth and paywall routes listed in the root's fullScreenRoutes set; the product is a mobile app.
- Keep subscription prices and derived savings in one plans module covered by tests; screens must read prices from it, never hardcode them.
- Keep the coach on a raw streaming server route using the AI Gateway SDK; streaming HTTP requires a server route rather than serialized server functions.
- Reference downloaded media through asset pointers; this preserves the source imagery without committing binaries.
- Keep technique clips and poster asset pointers mapped by skill slug in the shared video catalog; each skill must resolve its own wrong/right pair without cropping the demonstration.

- Render the full technique catalog as in-page skill sections with an index; this keeps every video pair discoverable without hidden tabs.
- Render skill lessons as sequential visible sections, with progressions followed by one shared movement breakdown; this avoids hidden content and repeated instructions.
