const STORAGE_KEYS = {
  selectedDay: "sicilia-selected-day",
  visited: "sicilia-visited",
  showDescartados: "sicilia-show-descartados",
  sideTab: "sicilia-side-tab",
  viewMode: "sicilia-view-mode",
  opTab: "sicilia-op-tab",
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

// Whitelist accepted values for enum-like state pulled from localStorage:
// if a previous app version persisted a now-invalid value, we must reset.
const VALID_VIEW_MODES = ["planning", "operational", "comida"];
const VALID_OP_TABS = ["plan", "points", "more"];
const VALID_SIDE_TABS = ["map", "places", "extras"];

function pickValid(raw, allowed, fallback) {
  return allowed.includes(raw) ? raw : fallback;
}

const rawViewMode = readJson(STORAGE_KEYS.viewMode, null);
const rawOpTab = readJson(STORAGE_KEYS.opTab, "plan");
const rawSideTab = readJson(STORAGE_KEYS.sideTab, "map");

export const state = {
  selectedDayId: readJson(STORAGE_KEYS.selectedDay, 1),
  activeSideTab: pickValid(rawSideTab, VALID_SIDE_TABS, "map"),
  visited: new Set(readJson(STORAGE_KEYS.visited, [])),
  showDescartados: readJson(STORAGE_KEYS.showDescartados, false),
  // null kept on purpose so app.js auto-detects on first load
  viewMode: rawViewMode === null ? null : pickValid(rawViewMode, VALID_VIEW_MODES, null),
  opTab: pickValid(rawOpTab, VALID_OP_TABS, "plan"),
  search: "",
  type: "all",
  priority: "all",
  zone: "all",
};

export function persistViewMode() {
  writeJson(STORAGE_KEYS.viewMode, state.viewMode);
}

export function persistOpTab() {
  writeJson(STORAGE_KEYS.opTab, state.opTab);
}

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
