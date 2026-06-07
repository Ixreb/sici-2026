// Service Worker for offline trip planner.
// Strategy:
//   - App shell (HTML/CSS/JS): network-first with cache fallback. Lets
//     edits propagate without forcing the user to unregister the SW.
//   - Map tiles: cache-first (heavy, immutable enough, prioritize speed
//     and offline).

const APP_CACHE = "sicilia-app-v23";
const TILE_CACHE = "sicilia-tiles-v1";

const APP_ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./data/places.js",
  "./data/trip.js",
  "./data/tips.js",
  "./data/stays.js",
  "./data/food.js",
  "./src/state.js",
  "./src/utils.js",
  "./src/render.js",
  "./src/map.js",
  "./src/actions.js",
  "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css",
  "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js",
];

self.addEventListener("install", (event) => {
  // Fetch with cache:"reload" so install never seeds the cache with a stale
  // copy from the browser HTTP cache.
  event.waitUntil(
    caches.open(APP_CACHE).then((cache) =>
      Promise.all(
        APP_ASSETS.map((url) =>
          fetch(url, { cache: "reload" })
            .then((resp) => (resp && resp.ok ? cache.put(url, resp) : null))
            .catch(() => null)
        )
      )
    )
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

  // App shell: network-first with HTTP cache BYPASSED ({cache:"no-store"}),
  // fallback to the SW cache when offline. Bypassing the browser HTTP cache is
  // what makes edits to data/trip.js, src/*, etc. always propagate on reload:
  // a plain fetch(req) could otherwise be answered from a stale HTTP cache entry.
  event.respondWith(
    fetch(req.url, { cache: "no-store" })
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
