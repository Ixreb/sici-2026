import {
  state,
  persistSelectedDay,
  persistSideTab,
  persistShowDescartados,
  persistViewMode,
  persistOpTab,
  toggleVisited,
} from "./state.js";
import {
  renderSideTabs,
  renderStats,
  renderDayList,
  renderDayDetail,
  renderPlaces,
  renderOperational,
  renderViewSwitch,
  renderOpTabs,
  renderTodayButton,
  renderPendingTasks,
} from "./render.js";
import { refreshMap, invalidateMapSize, focusPlace, focusBase, focusDay, focusRoute, placeMapInSlot } from "./map.js";
import { getTodayDayId } from "./utils.js";

const els = {};
let daysRef = [];
let tripRef = {};

export function bindEvents({ days, trip }) {
  daysRef = days;
  tripRef = trip;

  els.sideTabButtons = Array.from(document.querySelectorAll("[data-side-tab]"));
  els.searchInput = document.getElementById("searchInput");
  els.typeFilter = document.getElementById("typeFilter");
  els.priorityFilter = document.getElementById("priorityFilter");
  els.zoneFilter = document.getElementById("zoneFilter");
  els.showDescartados = document.getElementById("showDescartados");
  els.printButton = document.getElementById("printButton");
  els.overviewButton = document.getElementById("overviewButton");
  els.dayList = document.getElementById("dayList");
  els.viewSwitchButtons = Array.from(document.querySelectorAll("[data-view]"));
  els.opTabButtons = Array.from(document.querySelectorAll(".op-tab"));
  els.opPrevDay = document.getElementById("opPrevDay");
  els.opNextDay = document.getElementById("opNextDay");
  els.todayButton = document.getElementById("todayButton");

  // Side tabs (planning view)
  els.sideTabButtons.forEach((btn) => {
    btn.addEventListener("click", () => setActiveSideTab(btn.dataset.sideTab, { scroll: window.innerWidth <= 1120 }));
  });

  // Filters (shared)
  els.searchInput.addEventListener("input", (e) => {
    state.search = e.target.value.trim();
    renderPlaces();
    refreshMap();
  });
  els.typeFilter.addEventListener("change", (e) => {
    state.type = e.target.value;
    renderPlaces();
    refreshMap();
  });
  els.priorityFilter.addEventListener("change", (e) => {
    state.priority = e.target.value;
    renderPlaces();
    refreshMap();
  });
  els.zoneFilter.addEventListener("change", (e) => {
    state.zone = e.target.value;
    renderPlaces();
    refreshMap();
  });
  if (els.showDescartados) {
    els.showDescartados.addEventListener("change", (e) => {
      state.showDescartados = e.target.checked;
      persistShowDescartados();
      renderPlaces();
      refreshMap();
    });
  }

  // Day list (planning view)
  els.dayList.addEventListener("click", (e) => {
    const card = e.target.closest("[data-day-id]");
    if (!card) return;
    selectDay(Number.parseInt(card.dataset.dayId, 10));
    if (window.innerWidth <= 1120 && state.viewMode === "planning") {
      requestAnimationFrame(() => document.getElementById("dayDetail").scrollIntoView({ behavior: "smooth", block: "start" }));
    }
  });

  // View switch
  els.viewSwitchButtons.forEach((btn) => {
    btn.addEventListener("click", () => setViewMode(btn.dataset.view));
  });

  // Op tabs
  els.opTabButtons.forEach((btn) => {
    btn.addEventListener("click", () => setOpTab(btn.dataset.opTab));
  });

  // Day prev/next (operational view)
  els.opPrevDay.addEventListener("click", () => {
    const idx = daysRef.findIndex((d) => d.id === state.selectedDayId);
    if (idx > 0) selectDay(daysRef[idx - 1].id);
  });
  els.opNextDay.addEventListener("click", () => {
    const idx = daysRef.findIndex((d) => d.id === state.selectedDayId);
    if (idx >= 0 && idx < daysRef.length - 1) selectDay(daysRef[idx + 1].id);
  });

  // Today button
  els.todayButton.addEventListener("click", () => {
    const todayId = getTodayDayId(daysRef, tripRef);
    if (todayId !== null) {
      setViewMode("operational");
      selectDay(todayId);
    }
  });

  // Global delegate (visit toggles, focus place, focus base, etc.)
  document.body.addEventListener("click", (e) => {
    const tabButton = e.target.closest(".js-open-tab");
    if (tabButton) {
      setActiveSideTab(tabButton.dataset.tab, { scroll: true });
      return;
    }
    const dayMapButton = e.target.closest(".js-focus-day-map");
    if (dayMapButton) {
      setActiveSideTab("map", { scroll: true });
      focusDay(Number.parseInt(dayMapButton.dataset.dayId, 10));
      return;
    }
    const baseButton = e.target.closest(".js-focus-base");
    if (baseButton) {
      setActiveSideTab("map", { scroll: true });
      focusBase(baseButton.dataset.baseId);
      return;
    }
    const visitButton = e.target.closest(".js-toggle-visit");
    if (visitButton) {
      e.stopPropagation();
      toggleVisited(visitButton.dataset.placeId);
      renderStats();
      renderDayList();
      renderDayDetail();
      renderPlaces();
      renderOperational();
      renderPendingTasks();
      refreshMap();
      return;
    }
    const placeButton = e.target.closest(".js-focus-place");
    if (placeButton) {
      if (state.viewMode === "operational") {
        const mapSection = document.querySelector(".op-map-section");
        if (mapSection) mapSection.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        setActiveSideTab("map", { scroll: true });
      }
      focusPlace(placeButton.dataset.placeId);
      return;
    }
  });

  els.printButton.addEventListener("click", () => window.print());
  els.overviewButton.addEventListener("click", () => {
    setViewMode("planning");
    state.selectedDayId = null;
    state.search = "";
    state.type = "all";
    state.priority = "all";
    state.zone = "all";
    persistSelectedDay();
    els.searchInput.value = "";
    els.typeFilter.value = "all";
    els.priorityFilter.value = "all";
    els.zoneFilter.value = "all";
    renderDayList();
    renderDayDetail();
    renderPlaces();
    refreshMap();
    setActiveSideTab("map");
    requestAnimationFrame(() => {
      const detail = document.getElementById("dayDetail");
      if (detail) detail.scrollIntoView({ behavior: "smooth", block: "start" });
      focusRoute();
    });
  });
}

function selectDay(dayId) {
  state.selectedDayId = dayId;
  persistSelectedDay();
  renderDayList();
  renderDayDetail();
  renderPlaces();
  renderOperational();
  refreshMap();
}

export function setActiveSideTab(tabId, options = {}) {
  if (!tabId) return;
  if (tabId !== state.activeSideTab) {
    state.activeSideTab = tabId;
    persistSideTab();
    renderSideTabs();
    if (tabId === "map") invalidateMapSize();
  }
  if (options.scroll) {
    const panel = document.querySelector(".sticky-panel");
    if (panel) panel.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export function setViewMode(mode) {
  if (!mode || mode === state.viewMode) {
    placeMapInActiveSlot();
    return;
  }
  state.viewMode = mode;
  persistViewMode();
  renderViewSwitch();
  // Re-render operational so the day header reflects the latest selectedDayId
  // even if it changed via overviewButton without going through selectDay.
  if (mode === "operational") {
    renderOperational();
  }
  placeMapInActiveSlot();
  // Scroll to top on view change for a clean transition
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export function setOpTab(tabId) {
  if (!tabId || tabId === state.opTab) return;
  state.opTab = tabId;
  persistOpTab();
  renderOpTabs();
}

export function placeMapInActiveSlot() {
  if (state.viewMode === "operational") {
    placeMapInSlot("mapSlotOperational");
  } else {
    placeMapInSlot("mapSlotPlanning");
  }
}
