const STORAGE_KEYS = {
  selectedDay: "sicilia-selected-day",
  visited: "sicilia-visited",
  showDescartados: "sicilia-show-descartados",
  sideTab: "sicilia-side-tab",
};

function readJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (raw == null) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // localStorage might be disabled (private mode, etc.) — silently ignore.
  }
}

export const state = {
  selectedDayId: readJson(STORAGE_KEYS.selectedDay, 1),
  activeSideTab: readJson(STORAGE_KEYS.sideTab, "map"),
  visited: new Set(readJson(STORAGE_KEYS.visited, [])),
  showDescartados: readJson(STORAGE_KEYS.showDescartados, false),
  search: "",
  type: "all",
  priority: "all",
  zone: "all",
};

export function persistSelectedDay() {
  writeJson(STORAGE_KEYS.selectedDay, state.selectedDayId);
}

export function persistSideTab() {
  writeJson(STORAGE_KEYS.sideTab, state.activeSideTab);
}

export function persistVisited() {
  writeJson(STORAGE_KEYS.visited, [...state.visited]);
}

export function persistShowDescartados() {
  writeJson(STORAGE_KEYS.showDescartados, state.showDescartados);
}

export function toggleVisited(placeId) {
  if (state.visited.has(placeId)) state.visited.delete(placeId);
  else state.visited.add(placeId);
  persistVisited();
}

export function isVisited(placeId) {
  return state.visited.has(placeId);
}
