import { createServerFn } from "@tanstack/react-start";

import { parks } from "@/data/parks";

const cache = new Map<string, string | null>();
const GATEWAY_URL = "https://connector-gateway.lovable.dev/google_maps/places/v1";

/** Returns Google photo URLs for known Sofia parks only (bounded to our own list). */
export const getParkPhotos = createServerFn({ method: "POST" })
  .inputValidator((input: { ids: string[] }) => {
    if (!Array.isArray(input?.ids)) throw new Error("ids required");
    return { ids: input.ids.filter((id) => typeof id === "string").slice(0, 80) };
  })
  .handler(async ({ data }) => {
    const lovableKey = process.env["LOVABLE_API_KEY"];
    const mapsKey = process.env["GOOGLE_MAPS_API_KEY"];
    const result: Record<string, string | null> = {};
    const todo = parks.filter((p) => data.ids.includes(p.id));
    if (!lovableKey || !mapsKey) return { photos: result, error: "Maps is not configured" };

    let error: string | undefined;
    for (let i = 0; i < todo.length; i += 6) {
      await Promise.all(
        todo.slice(i, i + 6).map(async (p) => {
          if (cache.has(p.id)) return void (result[p.id] = cache.get(p.id) ?? null);
          if (!p.photo || error) return void (result[p.id] = null);
          const res = await fetch(`${GATEWAY_URL}/${p.photo}/media?maxWidthPx=480&skipHttpRedirect=true`, {
            headers: { Authorization: `Bearer ${lovableKey}`, "X-Connection-Api-Key": mapsKey },
          });
          if (!res.ok) {
            const body = await res.text();
            console.error(`Park photo failed [${res.status}]: ${body}`);
            error = `Photos unavailable (${res.status})`;
            result[p.id] = null;
            return;
          }
          const json = (await res.json()) as { photoUri?: string };
          cache.set(p.id, json.photoUri ?? null);
          result[p.id] = json.photoUri ?? null;
        }),
      );
    }
    return { photos: result, error };
  });
