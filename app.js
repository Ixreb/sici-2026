import { places } from "./data/places.js";
import { trip, bases, additions, criticalLogistics, days, dayMetrics, fuelAssumptions } from "./data/trip.js";
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
} from "./src/render.js";
import { initMap } from "./src/map.js";
import { bindEvents } from "./src/actions.js";

// Validate selectedDayId after load (data may have changed)
if (state.selectedDayId !== null && !days.find((d) => d.id === state.selectedDayId)) {
  state.selectedDayId = 1;
}

initRender({
  places,
  days,
  bases,
  additions,
  critical: criticalLogistics,
  metrics: dayMetrics,
  fuel: fuelAssumptions,
  trip,
});

populateFilters();
renderSideTabs();
renderStats();
renderBases();
renderDayList();
renderDayDetail();
renderAdditions();
renderCriticalLogistics();
renderJourneySummary();
initMap({ bases, places, days });
renderPlaces();
bindEvents();

// Service Worker (offline support during the trip)
if ("serviceWorker" in navigator && location.protocol !== "file:") {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  });
}
