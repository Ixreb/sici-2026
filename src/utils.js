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

export function getGoogleMapsUrl(place) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${place.lat},${place.lng}`)}`;
}
