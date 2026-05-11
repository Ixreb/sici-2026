import {
  state,
  persistSelectedDay,
  persistSideTab,
  persistShowDescartados,
  toggleVisited,
} from "./state.js";
import {
  renderSideTabs,
  renderStats,
  renderDayList,
  renderDayDetail,
  renderPlaces,
} from "./render.js";
import { refreshMap, invalidateMapSize, focusPlace, focusBase, focusDay } from "./map.js";

const els = {};

export function bindEvents() {
  els.sideTabButtons = Array.from(document.querySelectorAll("[data-side-tab]"));
  els.searchInput = document.getElementById("searchInput");
  els.typeFilter = document.getElementById("typeFilter");
  els.priorityFilter = document.getElementById("priorityFilter");
  els.zoneFilter = document.getElementById("zoneFilter");
  els.showDescartados = document.getElementById("showDescartados");
  els.printButton = document.getElementById("printButton");
  els.overviewButton = document.getElementById("overviewButton");
  els.dayList = document.getElementById("dayList");
  els.mapPanel = document.querySelector(".sticky-panel");

  els.sideTabButtons.forEach((btn) => {
    btn.addEventListener("click", () => setActiveSideTab(btn.dataset.sideTab, { scroll: window.innerWidth <= 1120 }));
  });

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

  els.dayList.addEventListener("click", (e) => {
    const card = e.target.closest("[data-day-id]");
    if (!card) return;
    const dayId = Number.parseInt(card.dataset.dayId, 10);
    state.selectedDayId = dayId;
    persistSelectedDay();
    renderDayList();
    renderDayDetail();
    renderPlaces();
    refreshMap();
    if (window.innerWidth <= 1120) {
      requestAnimationFrame(() => document.getElementById("dayDetail").scrollIntoView({ behavior: "smooth", block: "start" }));
    }
  });

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
      refreshMap();
      return;
    }
    const placeButton = e.target.closest(".js-focus-place");
    if (placeButton) {
      setActiveSideTab("map", { scroll: true });
      focusPlace(placeButton.dataset.placeId);
      return;
    }
  });

  els.printButton.addEventListener("click", () => window.print());
  els.overviewButton.addEventListener("click", () => {
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
  });
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
