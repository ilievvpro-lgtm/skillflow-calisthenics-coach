import { useEffect, useRef, useState } from "react";

import type { Park } from "@/data/parks";
import { loadGoogleMaps } from "@/lib/google-maps-loader";

const darkStyle: google.maps.MapTypeStyle[] = [
  { elementType: "geometry", stylers: [{ color: "#1f2026" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#9a9ba3" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#1f2026" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#2c2d35" }] },
  { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#3a3b44" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#15161b" }] },
  { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#24302a" }] },
  { featureType: "poi.business", stylers: [{ visibility: "off" }] },
  { featureType: "transit", stylers: [{ visibility: "off" }] },
];

function pin(active: boolean): google.maps.Symbol {
  return {
    path: google.maps.SymbolPath.CIRCLE,
    scale: active ? 11 : 7,
    fillColor: "#ff6a1a",
    fillOpacity: 1,
    strokeColor: active ? "#ffffff" : "#1f2026",
    strokeWeight: active ? 3 : 2,
  };
}

export function ParksMap({ parks, selectedId, onSelect }: { parks: Park[]; selectedId: string | null; onSelect: (p: Park) => void }) {
  const el = useRef<HTMLDivElement>(null);
  const map = useRef<google.maps.Map | null>(null);
  const markers = useRef(new Map<string, google.maps.Marker>());
  const onSelectRef = useRef(onSelect);
  onSelectRef.current = onSelect;
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    loadGoogleMaps()
      .then((maps) => {
        if (cancelled || !el.current) return;
        map.current = new maps.Map(el.current, {
          center: { lat: 42.6877, lng: 23.3319 },
          zoom: 12,
          styles: darkStyle,
          clickableIcons: false,
          disableDefaultUI: true,
          zoomControl: true,
          gestureHandling: "greedy",
        });
        setReady(true);
      })
      .catch((e: Error) => setError(e.message));
    return () => { cancelled = true; };
  }, []);

  // Keep markers in sync with the filtered parks.
  useEffect(() => {
    if (!ready || !map.current) return;
    const keep = new Set(parks.map((p) => p.id));
    for (const [id, m] of markers.current) if (!keep.has(id)) { m.setMap(null); markers.current.delete(id); }
    for (const p of parks) {
      if (markers.current.has(p.id)) continue;
      const m = new google.maps.Marker({ position: { lat: p.lat, lng: p.lng }, map: map.current, title: p.name, icon: pin(false) });
      m.addListener("click", () => onSelectRef.current(p));
      markers.current.set(p.id, m);
    }
    if (parks.length > 0 && parks.length < 71) {
      const b = new google.maps.LatLngBounds();
      parks.forEach((p) => b.extend({ lat: p.lat, lng: p.lng }));
      if (parks.length === 1) { map.current.setCenter(b.getCenter()); map.current.setZoom(15); }
      else map.current.fitBounds(b, 48);
    }
  }, [parks, ready]);

  useEffect(() => {
    if (!ready) return;
    for (const [id, m] of markers.current) { m.setIcon(pin(id === selectedId)); m.setZIndex(id === selectedId ? 10 : 1); }
    const sel = parks.find((p) => p.id === selectedId);
    if (sel && map.current) map.current.panTo({ lat: sel.lat, lng: sel.lng });
  }, [selectedId, ready, parks]);

  return (
    <div className="relative size-full bg-muted">
      <div ref={el} className="size-full" />
      {error && <p className="absolute inset-0 grid place-items-center p-6 text-center text-sm text-muted-foreground">The map could not load. Pull to refresh or try again later.</p>}
    </div>
  );
}

export function StreetView({ park }: { park: Park }) {
  const el = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"loading" | "ok" | "none">("loading");

  useEffect(() => {
    let cancelled = false;
    loadGoogleMaps()
      .then(async (maps) => {
        const svc = new maps.StreetViewService();
        const res = await svc
          .getPanorama({ location: { lat: park.lat, lng: park.lng }, radius: 80, preference: maps.StreetViewPreference.NEAREST })
          .catch(() => null);
        if (cancelled || !el.current) return;
        if (!res?.data.location?.pano) return setState("none");
        new maps.StreetViewPanorama(el.current, {
          pano: res.data.location.pano,
          pov: { heading: res.data.location.latLng ? maps.geometry?.spherical?.computeHeading?.(res.data.location.latLng, new maps.LatLng(park.lat, park.lng)) ?? 0 : 0, pitch: 0 },
          addressControl: false,
          fullscreenControl: false,
          motionTracking: false,
          showRoadLabels: false,
          zoomControl: false,
        });
        setState("ok");
      })
      .catch(() => !cancelled && setState("none"));
    return () => { cancelled = true; };
  }, [park]);

  return (
    <div className="relative size-full bg-muted">
      <div ref={el} className="size-full" />
      {state !== "ok" && (
        <div className="absolute inset-0 grid place-items-center p-6 text-center">
          <p className="text-sm text-muted-foreground">
            {state === "loading" ? "Walking into the park…" : "No 360° walk-through for this park yet. Pick the equipment below to see what you can train here."}
          </p>
        </div>
      )}
    </div>
  );
}
