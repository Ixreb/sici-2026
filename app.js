import { places } from "./data/places.js";
import { trip, bases, additions, criticalLogistics, pendingTasks, days, dayMetrics, fuelAssumptions } from "./data/trip.js";
import { state } from "./src/state.js";
import {
  initRender,
  populateFilters,
  renderSideTabs,
  renderStats,
  renderBases,
  renderDayList,
  renderDayDetail,
  renderAdditions,
  renderCriticalLogistics,
  renderJourneySummary,
  renderPlaces,
  renderOperational,
  renderViewSwitch,
  renderOpTabs,
  renderTodayButton,
  renderPendingTasks,
} from "./src/render.js";
import { initMap } from "./src/map.js";
import { bindEvents, placeMapInActiveSlot } from "./src/actions.js";
import { getDefaultViewMode, getTodayDayId } from "./src/utils.js";

// Validate persisted selectedDayId still exists
if (state.selectedDayId !== null && !days.find((d) => d.id === state.selectedDayId)) {
  state.selectedDayId = 1;
}

// First-load: auto-detect view mode. Already-persisted choice wins.
if (state.viewMode === null) {
  state.viewMode = getDefaultViewMode(days, trip);
}

// Operational view is day-focused: it must never start with a null day
// (which would break the prev/next arrows). Fall back to today or day 1.
if (state.viewMode === "operational" && state.selectedDayId === null) {
  state.selectedDayId = getTodayDayId(days, trip) ?? days[0].id;
}

// If we're within trip dates AND the user hasn't manually chosen a day this session,
// surface today. We respect the persisted day if it's reasonable, but on a "first open today"
// the user expects to see today.
const todayId = getTodayDayId(days, trip);
if (todayId !== null && state.viewMode === "operational" && !sessionStorage.getItem("sicilia-session-started")) {
  state.selectedDayId = todayId;
  sessionStorage.setItem("sicilia-session-started", "1");
}

initRender({
  places,
  days,
  bases,
  additions,
  critical: criticalLogistics,
  pending: pendingTasks,
  metrics: dayMetrics,
  fuel: fuelAssumptions,
  trip,
});

renderViewSwitch();
renderTodayButton();
renderOpTabs();

populateFilters();
renderSideTabs();
renderStats();
renderBases();
renderDayList();
renderDayDetail();
renderAdditions();
renderCriticalLogistics();
renderPendingTasks();
renderJourneySummary();
renderOperational();

// Map slot must be in the visible view BEFORE Leaflet initializes.
placeMapInActiveSlot();
initMap({ bases, places, days });
renderPlaces();

bindEvents({ days, trip });

// Service Worker (offline support during the trip)
if ("serviceWorker" in navigator && location.protocol !== "file:") {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  });
}
