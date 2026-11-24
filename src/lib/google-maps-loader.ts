let loading: Promise<typeof google.maps> | null = null;

declare global {
  interface Window {
    __calisthicMapsReady?: () => void;
    google?: typeof google;
  }
}

/** Loads the Maps JavaScript API once, in the browser only. */
export function loadGoogleMaps(): Promise<typeof google.maps> {
  if (typeof window === "undefined") return Promise.reject(new Error("browser only"));
  if (window.google?.maps?.Map) return Promise.resolve(window.google.maps);
  if (loading) return loading;
  const key = import.meta.env["VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_BROWSER_KEY"] as string | undefined;
  const channel = import.meta.env["VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_TRACKING_ID"] as string | undefined;
  loading = new Promise((resolve, reject) => {
    if (!key) return reject(new Error("Map key missing"));
    window.__calisthicMapsReady = () => resolve(window.google!.maps);
    const s = document.createElement("script");
    s.src = `https://maps.googleapis.com/maps/api/js?key=${key}&loading=async&callback=__calisthicMapsReady&language=en&region=BG&channel=${channel ?? ""}`;
    s.async = true;
    s.onerror = () => { loading = null; reject(new Error("Map failed to load")); };
    document.head.appendChild(s);
  });
  return loading;
}
