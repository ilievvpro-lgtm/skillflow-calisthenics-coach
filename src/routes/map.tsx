import { Link, createFileRoute } from "@tanstack/react-router";
import { ClientOnly } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { ArrowLeft, MapPin, Search, Star, X } from "lucide-react";
import { lazy, Suspense, useEffect, useMemo, useState } from "react";

import { equipment, type EquipmentId } from "@/data/park-equipment";
import { parks, type Park } from "@/data/parks";
import { getSkill } from "@/data/skills";
import { techniqueVideos } from "@/data/videos";
import { getParkPhotos } from "@/lib/park-photos.functions";
import { searchParks } from "@/lib/park-search";

const ParksMap = lazy(() => import("@/components/app/ParksMap").then((m) => ({ default: m.ParksMap })));
const StreetView = lazy(() => import("@/components/app/ParksMap").then((m) => ({ default: m.StreetView })));

export const Route = createFileRoute("/map")({
  head: () => ({
    meta: [
      { title: "Calisthenics parks in Sofia – map | CALISTHIC" },
      { name: "description", content: "Every outdoor calisthenics park in Sofia on one map. Search your neighbourhood and see what to train there." },
      { property: "og:title", content: "Calisthenics parks in Sofia | CALISTHIC" },
      { property: "og:description", content: "Find a calisthenics park in your Sofia neighbourhood and see which skills you can train there." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: MapPage,
});

const Fallback = () => <div className="size-full animate-pulse bg-muted" />;

function Thumb({ url, className }: { url: string | null | undefined; className: string }) {
  return url ? (
    <img src={url} alt="" loading="lazy" referrerPolicy="no-referrer" className={`${className} object-cover`} />
  ) : (
    <div className={`${className} grid place-items-center bg-gradient-to-br from-secondary to-muted`}>
      <MapPin className="size-6 text-primary" />
    </div>
  );
}

function MapPage() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Park | null>(null);
  const [open, setOpen] = useState<Park | null>(null);
  const [photos, setPhotos] = useState<Record<string, string | null>>({});
  const fetchPhotos = useServerFn(getParkPhotos);
  const results = useMemo(() => searchParks(parks, query), [query]);

  useEffect(() => {
    fetchPhotos({ data: { ids: parks.map((p) => p.id) } })
      .then((r) => setPhotos(r.photos))
      .catch(() => undefined);
  }, [fetchPhotos]);

  useEffect(() => {
    if (!selected) return;
    document.getElementById(`park-${selected.id}`)?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [selected]);

  return (
    <div className="flex h-[calc(100dvh-4.5rem)] flex-col">
      <div className="relative min-h-0 flex-1">
        <ClientOnly fallback={<Fallback />}>
          <Suspense fallback={<Fallback />}>
            <ParksMap parks={results} selectedId={selected?.id ?? null} onSelect={setSelected} />
          </Suspense>
        </ClientOnly>
        <div className="absolute inset-x-0 top-0 bg-gradient-to-b from-background via-background/80 to-transparent px-4 pb-6 pt-[max(1rem,env(safe-area-inset-top))]">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Map</p>
          <h1 className="text-xl font-extrabold leading-tight">Calisthenics parks in Sofia</h1>
          <label className="mt-3 flex items-center gap-2 rounded-xl border border-border bg-card/95 px-3 py-2.5 shadow-lg backdrop-blur">
            <Search className="size-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => { setQuery(e.target.value); setSelected(null); }}
              placeholder="Search your neighbourhood, e.g. Geo Milev"
              className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              aria-label="Search neighbourhood"
            />
            {query && <button onClick={() => setQuery("")} aria-label="Clear search"><X className="size-4 text-muted-foreground" /></button>}
          </label>
          <p className="mt-2 text-xs text-muted-foreground">{results.length} {results.length === 1 ? "park" : "parks"}{query ? ` in “${query}”` : " across Sofia"}</p>
        </div>
      </div>

      <ul className="flex shrink-0 snap-x gap-3 overflow-x-auto px-4 py-3">
        {results.length === 0 && <li className="py-6 text-sm text-muted-foreground">No parks found. Try another neighbourhood.</li>}
        {results.map((p) => (
          <li key={p.id} id={`park-${p.id}`} className="w-60 shrink-0 snap-center">
            <button
              onClick={() => (selected?.id === p.id ? setOpen(p) : setSelected(p))}
              className={`flex w-full gap-3 rounded-xl border bg-card p-2 text-left transition-colors ${selected?.id === p.id ? "border-primary" : "border-border"}`}
            >
              <Thumb url={photos[p.id]} className="size-16 shrink-0 rounded-lg" />
              <div className="min-w-0 py-0.5">
                <p className="truncate text-sm font-bold">{p.name}</p>
                <p className="truncate text-xs text-muted-foreground">{p.area}</p>
                {selected?.id === p.id ? (
                  <span className="mt-1 inline-block text-xs font-bold text-primary">Tap to walk in →</span>
                ) : p.rating ? (
                  <span className="mt-1 inline-flex items-center gap-1 text-xs text-muted-foreground"><Star className="size-3 fill-primary text-primary" />{p.rating}</span>
                ) : null}
              </div>
            </button>
          </li>
        ))}
      </ul>

      {open && <ParkSheet park={open} photo={photos[open.id]} onClose={() => setOpen(null)} />}
    </div>
  );
}

function ParkSheet({ park, photo, onClose }: { park: Park; photo: string | null | undefined; onClose: () => void }) {
  const [eq, setEq] = useState<EquipmentId>("pullup-bar");
  const current = equipment.find((e) => e.id === eq)!;
  return (
    <div className="fixed inset-0 z-[60] mx-auto flex max-w-md flex-col overflow-y-auto bg-background">
      <div className="relative h-[46dvh] shrink-0">
        <ClientOnly fallback={<Fallback />}>
          <Suspense fallback={<Fallback />}><StreetView park={park} /></Suspense>
        </ClientOnly>
        <button onClick={onClose} aria-label="Back to map" className="absolute left-3 top-[max(0.75rem,env(safe-area-inset-top))] grid size-10 place-items-center rounded-full bg-card/90 shadow-lg backdrop-blur">
          <ArrowLeft className="size-5" />
        </button>
      </div>
      <div className="flex items-center gap-3 px-5 pt-4">
        <Thumb url={photo} className="size-14 shrink-0 rounded-lg" />
        <div className="min-w-0">
          <h2 className="truncate text-lg font-extrabold">{park.name}</h2>
          <p className="truncate text-xs text-muted-foreground">{park.address}</p>
        </div>
      </div>
      <p className="px-5 pt-4 text-xs font-semibold uppercase tracking-[0.15em] text-primary">Pick the equipment</p>
      <div className="grid grid-cols-3 gap-2 px-5 pt-2">
        {equipment.map((e) => (
          <button key={e.id} onClick={() => setEq(e.id)} className={`rounded-xl border px-2 py-3 text-sm font-bold ${eq === e.id ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card"}`}>
            {e.name}
          </button>
        ))}
      </div>
      <p className="px-5 pt-3 text-sm text-muted-foreground">{current.description}</p>
      <ul className="space-y-2 px-5 pb-8 pt-3">
        {current.skills.map((slug) => {
          const s = getSkill(slug);
          if (!s) return null;
          return (
            <li key={slug}>
              <Link to="/skills/$slug" params={{ slug }} className="flex items-center gap-3 rounded-xl border border-border bg-card p-2">
                <img src={techniqueVideos[slug]?.rightPoster} alt="" className="size-14 rounded-lg object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="font-bold">{s.name}</p>
                  <p className="line-clamp-1 text-xs text-muted-foreground">{s.tagline}</p>
                </div>
                <span className="pr-2 text-xs font-bold text-primary">Learn →</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
