import { state, isVisited } from "./state.js";
import { escapeHtml, getDirectionsUrl, getGoogleMapsUrl, markerColor } from "./utils.js";
import { getFilteredPlaces } from "./render.js";

let map = null;
let markerLayer = null;
let routeLayer = null;
let basesRef = [];
let placesRef = [];
let daysRef = [];

export function initMap({ bases, places, days }) {
  basesRef = bases;
  placesRef = places;
  daysRef = days;

  const mapEl = document.getElementById("map");
  const fallback = document.getElementById("mapFallback");
  if (typeof L === "undefined" || !mapEl) {
    if (fallback) fallback.hidden = false;
    return;
  }

  map = L.map("map", { zoomControl: true, scrollWheelZoom: true });
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 18,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  markerLayer = L.layerGroup().addTo(map);
  routeLayer = L.layerGroup().addTo(map);
  renderRoute();
  renderMarkers(getFilteredPlaces());
}

export function refreshMap() {
  if (!map) return;
  renderMarkers(getFilteredPlaces());
}

export function focusRoute() {
  if (!map) return;
  const route = basesRef.map((b) => [b.lat, b.lng]);
  if (!route.length) return;
  map.fitBounds(route, { padding: [36, 36] });
  pulseMap();
}

export function invalidateMapSize() {
  if (map) setTimeout(() => map.invalidateSize(), 30);
}

export function placeMapInSlot(slotId) {
  const slot = document.getElementById(slotId);
  const mapEl = document.getElementById("map");
  if (!slot || !mapEl) return;
  if (mapEl.parentNode !== slot) {
    slot.appendChild(mapEl);
  }
  setTimeout(() => {
    if (map) map.invalidateSize();
  }, 50);
}

export function focusPlace(placeId) {
  if (!map) return;
  let place = placesRef.find((p) => p.id === placeId);
  if (!place) return;
  if (!place._marker) {
    refreshMap();
    place = placesRef.find((p) => p.id === placeId);
    if (!place || !place._marker) return;
  }
  map.setView([place.lat, place.lng], 13, { animate: true });
  place._marker.openPopup();
  pulseMap();
}

export function focusBase(baseId) {
  if (!map) return;
  const base = basesRef.find((b) => b.id === baseId);
  if (!base || !base._marker) return;
  map.setView([base.lat, base.lng], 9, { animate: true });
  base._marker.openPopup();
  pulseMap();
}

export function pulseMap() {
  const inOp = document.body.classList.contains("view-operational");
  const target = inOp
    ? document.querySelector(".op-map-section")
    : document.querySelector(".sticky-panel");
  if (!target) return;
  target.classList.remove("flash-panel");
  void target.offsetWidth;
  target.classList.add("flash-panel");
  setTimeout(() => target.classList.remove("flash-panel"), 900);
}

export function focusDay(dayId) {
  if (!map) return;
  const day = daysRef.find((d) => d.id === dayId);
  if (!day) return;
  const dayPlaces = placesRef.filter((p) => p.dia === dayId && !p.descartar);
  if (dayPlaces.length === 0) return;
  const bounds = L.latLngBounds(dayPlaces.map((p) => [p.lat, p.lng]));
  map.fitBounds(bounds, { padding: [40, 40], maxZoom: 11 });
}

function renderRoute() {
  if (!map || !routeLayer) return;
  routeLayer.clearLayers();
  const route = basesRef.map((b) => [b.lat, b.lng]);
  L.polyline(route, { color: "#cf6b2d", weight: 4, opacity: 0.8, dashArray: "8 10" }).addTo(routeLayer);
  basesRef.forEach((base) => {
    const marker = L.circleMarker([base.lat, base.lng], {
      radius: 8,
      color: "#fff8ef",
      weight: 2,
      fillColor: "#cf6b2d",
      fillOpacity: 0.95,
    })
      .bindPopup(`<div class="popup-title">${escapeHtml(base.area)}</div><div class="popup-meta">${escapeHtml(base.range)}<br>${base.nights} noches</div>`)
      .addTo(routeLayer);
    base._marker = marker;
  });
  map.fitBounds(route, { padding: [28, 28] });
}

function renderMarkers(filteredPlaces) {
  if (!map || !markerLayer) return;
  markerLayer.clearLayers();
  const selectedDay = daysRef.find((d) => d.id === state.selectedDayId);
  const dayPlaceIds = selectedDay?.focusPlaceIds ? new Set(selectedDay.focusPlaceIds) : new Set();

  filteredPlaces.forEach((place) => {
    const highlighted = dayPlaceIds.has(place.id);
    const visited = isVisited(place.id);
    const marker = L.circleMarker([place.lat, place.lng], {
      radius: highlighted ? 10 : 6,
      color: visited ? "#5e6a67" : "#fff8ef",
      weight: highlighted ? 2.5 : 1.5,
      fillColor: visited ? "#5e6a67" : markerColor(place.prioridad),
      fillOpacity: highlighted ? 1 : visited ? 0.55 : 0.86,
    })
      .bindPopup(buildPopup(place, visited))
      .addTo(markerLayer);
    place._marker = marker;
  });

  if (filteredPlaces.length) {
    const bounds = L.latLngBounds(filteredPlaces.map((p) => [p.lat, p.lng]));
    map.fitBounds(bounds, { padding: [34, 34], maxZoom: state.selectedDayId ? 11 : 8 });
  }
}

function buildPopup(place, visited) {
  const info = [];
  if (place.horario) info.push(`<div class="popup-row"><span class="popup-row-label">Horario</span><span>${escapeHtml(place.horario)}</span></div>`);
  if (place.precio) info.push(`<div class="popup-row"><span class="popup-row-label">Precio</span><span>${escapeHtml(place.precio)}</span></div>`);
  if (place.nota) info.push(`<div class="popup-row popup-row-note"><span>${escapeHtml(place.nota)}</span></div>`);

  return `
    <div class="popup-title">${escapeHtml(place.name)}</div>
    <div class="popup-meta">
      ${escapeHtml(place.tipo)} · ${escapeHtml(place.zona)}${place.dia ? ` · día ${place.dia}` : ""}
    </div>
    ${info.length ? `<div class="popup-info">${info.join("")}</div>` : ""}
    <div class="popup-actions">
      <a class="popup-action popup-action-primary" href="${escapeHtml(getGoogleMapsUrl(place))}" target="_blank" rel="noopener noreferrer">Ver en Google Maps</a>
      <a class="popup-action" href="${escapeHtml(getDirectionsUrl(place))}" target="_blank" rel="noopener noreferrer">Cómo llegar</a>
      <button class="popup-action js-toggle-visit" data-place-id="${escapeHtml(place.id)}" type="button">
        ${visited ? "✓ Visitado" : "Marcar visitado"}
      </button>
    </div>
  `;
}
