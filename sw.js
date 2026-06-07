// Service Worker for offline trip planner.
// Strategy:
//   - App shell (HTML/CSS/JS): network-first with cache fallback. Lets
//     edits propagate without forcing the user to unregister the SW.
//   - Map tiles: cache-first (heavy, immutable enough, prioritize speed
//     and offline).

const APP_CACHE = "sicilia-app-v15";
const TILE_CACHE = "sicilia-tiles-v1";

const APP_ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./data/places.js",
  "./data/trip.js",
  "./data/tips.js",
  "./src/state.js",
  "./src/utils.js",
  "./src/render.js",
  "./src/map.js",
  "./src/actions.js",
  "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css",
  "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(APP_CACHE).then((cache) => cache.addAll(APP_ASSETS).catch(() => {}))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((k) => k !== APP_CACHE && k !== TILE_CACHE)
          .map((k) => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);
  const isTile = url.hostname.includes("tile.openstreetmap.org");

  if (isTile) {
    // Tiles: cache-first (offline-friendly, fast on revisit).
    event.respondWith(
      caches.match(req).then((cached) => {
        if (cached) return cached;
        return fetch(req).then((resp) => {
          if (resp && resp.status === 200) {
            const clone = resp.clone();
            caches.open(TILE_CACHE).then((c) => c.put(req, clone)).catch(() => {});
          }
          return resp;
        });
      })
    );
    return;
  }

  // App shell: network-first, fallback to cache when offline.
  // This way edits to data/trip.js, src/*, etc. propagate on the next reload
  // without users having to manually unregister the worker.
  event.respondWith(
    fetch(req)
      .then((resp) => {
        if (resp && resp.status === 200 && (resp.type === "basic" || resp.type === "cors")) {
          const clone = resp.clone();
          caches.open(APP_CACHE).then((c) => c.put(req, clone)).catch(() => {});
        }
        return resp;
      })
      .catch(() => caches.match(req))
  );
});
