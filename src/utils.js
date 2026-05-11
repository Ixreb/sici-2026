export function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function uniqueValues(values) {
  return [...new Set(values)].sort((a, b) => a.localeCompare(b, "es"));
}

export function badgeClass(priority) {
  if (priority === "Imprescindible") return "badge-high";
  if (priority === "Revisar") return "badge-low";
  return "badge-medium";
}

export function paceBadgeClass(pace) {
  if (pace === "Suave" || pace === "Muy suave") return "badge-medium";
  if (pace === "Cargado" || pace === "Delicado") return "badge-low";
  return "badge-high";
}

export function markerColor(priority) {
  if (priority === "Imprescindible") return "#16697a";
  if (priority === "Revisar") return "#933c24";
  return "#647a58";
}

export function getDirectionsUrl(place) {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${place.lat},${place.lng}`)}`;
}

// Opens the place LISTING in Google Maps (with stars, photos, hours, reviews).
// Uses name + Sicily for disambiguation; coords as fallback for unique pins.
export function getGoogleMapsUrl(place) {
  const query = place.gmapsQuery || `${place.name}, Sicilia`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

// Returns the day id matching today's date within the trip, or null if outside.
export function getTodayDayId(days, trip, today = new Date()) {
  if (!trip || !trip.startDate) return null;
  const start = new Date(`${trip.startDate}T00:00:00`);
  const dayMs = 86400000;
  const t = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const diff = Math.floor((t - start) / dayMs);
  if (diff < 0 || diff >= days.length) return null;
  return days[diff].id;
}

export function getDefaultViewMode(days, trip) {
  if (getTodayDayId(days, trip) !== null) return "operational";
  return window.innerWidth < 900 ? "operational" : "planning";
}

// Visual identity per tipo. Used by agenda items + place cards.
export const TYPE_ICON = {
  "Ciudad": "🏛️",
  "Pueblo": "🏘️",
  "Arqueología": "🏺",
  "Playa": "🏖️",
  "Naturaleza": "🌿",
  "Mirador": "🔭",
  "Costa": "🌊",
  "Transporte": "🚠",
  "Comida": "🍽️",
  "Otro": "📍",
};

export function typeIcon(tipo) {
  return TYPE_ICON[tipo] || "📍";
}

// Resolve an agenda string ("Templo de Apolo", "Mercado de Ortigia",
// "Teatro griego", etc.) to a place from the day's pins. Returns null
// for activity items that don't map to a specific pin.
//
// Strategy: explicit aliases first, then substring matching against the
// day's focusPlaceIds (longest name first).
const AGENDA_ALIASES = {
  // Ortigia
  "lungomare": "ortigia-lungomare",
  "mercado de ortigia": "mercado-ortigia",
  "mercado": "mercado-ortigia",
  "fonte aretusa": "fonte-aretusa",
  "fuente aretusa": "fonte-aretusa",
  // Neapolis
  "teatro griego": "neapolis",
  "orecchio di dionisio": "neapolis",
  "anfiteatro romano": "neapolis",
  // Sureste
  "plemmirio": "pillirina",
  // Valle templos
  "templo de la concordia": "valle-templos",
  "templo de juno": "valle-templos",
  "templo de hercules": "valle-templos",
  "concordia": "valle-templos",
  // Selinunte
  "cochecillo electrico": "selinunte",
  // Erice
  "funivia": "trapani-erice-cableway",
  "teleferico": "trapani-erice-cableway",
  "castillo de venus": "castle-venus",
  "castello di venere": "castle-venus",
  "dulces de almendra": "erice",
  // Salinas
  "saline": "saline-marsala",
  "salinas": "saline-marsala",
  "molinos": "saline-marsala",
  // Segesta
  "templo": "segesta-templo",
  "teatro": "segesta-teatro",
  // Palermo
  "palatina": "cappella-palatina",
  "palacio normando": "cappella-palatina",
  "palazzo dei normanni": "cappella-palatina",
  "capuchinos": "catacombe-cappuccini",
  "capuccini": "catacombe-cappuccini",
  "ballaro": null,
  "capo": null,
  "quattro canti": null,
  "piazza pretoria": null,
  "martorana": null,
  "teatro massimo": null,
  // Etna
  "rifugio sapienza": "etna-sur",
  "piano provenzana": "etna-norte",
  "craters silvestri": "etna-sur",
  "crateres silvestri": "etna-sur",
};

function norm(value) {
  return String(value)
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim();
}

export function resolveAgendaPlace(text, day, places) {
  const normalized = norm(text);

  // 1) explicit aliases (null means "intentionally not a pin")
  for (const [alias, pid] of Object.entries(AGENDA_ALIASES)) {
    if (normalized.includes(alias)) {
      if (pid === null) return null;
      const hit = places.find((p) => p.id === pid);
      if (hit) return hit;
    }
  }

  // 2) match against day's pinned places by substring (longer names first)
  if (!day || !day.focusPlaceIds) return null;
  const dayPlaces = day.focusPlaceIds
    .map((id) => places.find((p) => p.id === id))
    .filter(Boolean)
    .sort((a, b) => b.name.length - a.name.length);

  for (const p of dayPlaces) {
    const pNorm = norm(p.name);
    if (normalized.includes(pNorm)) return p;
    // Simplified form (drop parenthesized suffix)
    const simple = pNorm.replace(/\(.*?\)/g, "").trim();
    if (simple.length > 3 && normalized.includes(simple)) return p;
  }

  return null;
}
