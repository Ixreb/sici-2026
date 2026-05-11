import { state, isVisited } from "./state.js";
import {
  escapeHtml,
  badgeClass,
  paceBadgeClass,
  getDirectionsUrl,
  uniqueValues,
  getTodayDayId,
} from "./utils.js";

let placesRef = [];
let daysRef = [];
let basesRef = [];
let additionsRef = [];
let criticalRef = [];
let metricsRef = {};
let fuelRef = {};
let tripRef = {};

const els = {};

export function initRender(refs) {
  placesRef = refs.places;
  daysRef = refs.days;
  basesRef = refs.bases;
  additionsRef = refs.additions;
  criticalRef = refs.critical;
  metricsRef = refs.metrics;
  fuelRef = refs.fuel;
  tripRef = refs.trip;

  els.statsGrid = document.getElementById("statsGrid");
  els.baseGrid = document.getElementById("baseGrid");
  els.dayList = document.getElementById("dayList");
  els.dayDetail = document.getElementById("dayDetail");
  els.additionList = document.getElementById("additionList");
  els.criticalLogistics = document.getElementById("criticalLogistics");
  els.journeySummary = document.getElementById("journeySummary");
  els.placeList = document.getElementById("placeList");
  els.placeCount = document.getElementById("placeCount");
  els.typeFilter = document.getElementById("typeFilter");
  els.priorityFilter = document.getElementById("priorityFilter");
  els.zoneFilter = document.getElementById("zoneFilter");
  els.searchInput = document.getElementById("searchInput");
  els.showDescartados = document.getElementById("showDescartados");
  els.sideTabButtons = Array.from(document.querySelectorAll("[data-side-tab]"));
  els.sideTabPanels = Array.from(document.querySelectorAll("[data-tab-panel]"));

  els.searchInput.value = state.search;
  if (els.showDescartados) els.showDescartados.checked = state.showDescartados;

  els.opDayTitle = document.getElementById("opDayTitle");
  els.opSummary = document.getElementById("opSummary");
  els.opPlanContent = document.getElementById("opPlanContent");
  els.opPointsContent = document.getElementById("opPointsContent");
  els.opMoreContent = document.getElementById("opMoreContent");
  els.opPrevDay = document.getElementById("opPrevDay");
  els.opNextDay = document.getElementById("opNextDay");
  els.todayButton = document.getElementById("todayButton");
  els.viewSwitchButtons = Array.from(document.querySelectorAll("[data-view]"));
  els.opTabButtons = Array.from(document.querySelectorAll(".op-tab"));
  els.opTabContents = Array.from(document.querySelectorAll(".op-tab-content"));
}

export function renderViewSwitch() {
  els.viewSwitchButtons.forEach((btn) => {
    const active = btn.dataset.view === state.viewMode;
    btn.classList.toggle("is-active", active);
    btn.setAttribute("aria-selected", active ? "true" : "false");
  });
  document.body.classList.toggle("view-planning", state.viewMode === "planning");
  document.body.classList.toggle("view-operational", state.viewMode === "operational");
}

export function renderTodayButton() {
  if (!els.todayButton) return;
  const todayId = getTodayDayId(daysRef, tripRef);
  els.todayButton.classList.toggle("is-hidden", todayId === null);
  els.todayButton.disabled = todayId === null;
}

export function renderOpTabs() {
  els.opTabButtons.forEach((btn) => {
    const active = btn.dataset.opTab === state.opTab;
    btn.classList.toggle("is-active", active);
    btn.setAttribute("aria-selected", active ? "true" : "false");
  });
  els.opTabContents.forEach((panel) => {
    const active = panel.dataset.opContent === state.opTab;
    panel.hidden = !active;
  });
}

export function renderOperational() {
  const day = daysRef.find((d) => d.id === state.selectedDayId) || daysRef[0];
  if (!day) return;

  const todayId = getTodayDayId(daysRef, tripRef);
  const isToday = todayId === day.id;
  const metrics = metricsRef[day.id] || { driveKm: 0, walkKm: 0, peajeEuro: 0 };

  els.opDayTitle.innerHTML = `
    <p class="op-day-kicker">${isToday ? "Hoy · " : ""}Día ${day.id} · ${escapeHtml(day.date)}</p>
    <h2 class="op-day-name">${escapeHtml(day.title)}</h2>
    <p class="op-day-summary">${escapeHtml(day.summary)}</p>
  `;

  els.opPrevDay.disabled = day.id === daysRef[0].id;
  els.opNextDay.disabled = day.id === daysRef[daysRef.length - 1].id;

  els.opSummary.innerHTML = `
    <span class="op-chip op-chip-pace ${paceBadgeClass(day.pace)}">${escapeHtml(day.pace)}</span>
    <span class="op-chip"><strong>Base:</strong> ${escapeHtml(day.base)}</span>
    <span class="op-chip"><strong>Coche:</strong> ~${metrics.driveKm} km</span>
    <span class="op-chip"><strong>A pie:</strong> ~${metrics.walkKm} km</span>
    ${metrics.peajeEuro ? `<span class="op-chip op-chip-warn"><strong>Peajes:</strong> ~${metrics.peajeEuro} €</span>` : ""}
  `;

  renderOpPlan(day);
  renderOpPoints(day);
  renderOpMore(day);
}

function renderOpPlan(day) {
  const list = (items) => `
    <ul class="op-list">
      ${items.map((i) => `<li>${escapeHtml(i)}</li>`).join("")}
    </ul>
  `;

  els.opPlanContent.innerHTML = `
    <article class="op-card">
      <h3>Mañana</h3>
      ${list(day.morning)}
    </article>
    <article class="op-card">
      <h3>Tarde / cierre</h3>
      ${list(day.afternoon)}
    </article>
    <article class="op-card">
      <h3>Imprescindible hoy</h3>
      ${list(day.mustDo)}
    </article>
    ${day.optional && day.optional.length ? `
      <article class="op-card">
        <h3>Si vais bien</h3>
        ${list(day.optional)}
      </article>
    ` : ""}
    <article class="op-card op-card-soft">
      <h3>Notas</h3>
      <ul class="op-list">
        ${day.notes.map((n) => `<li>${escapeHtml(n)}</li>`).join("")}
      </ul>
    </article>
    <article class="op-card op-card-soft">
      <h3>Parking</h3>
      <p>${escapeHtml(day.parking)}</p>
    </article>
    <article class="op-card op-card-soft">
      <h3>Reservas / revisar</h3>
      <p>${escapeHtml(day.booking)}</p>
    </article>
    <article class="op-card op-card-soft">
      <h3>Plan B</h3>
      <p>${escapeHtml(day.planB)}</p>
    </article>
  `;
}

function renderOpPoints(day) {
  const dayPlaces = day.focusPlaceIds
    .map((id) => placesRef.find((p) => p.id === id))
    .filter(Boolean);

  if (dayPlaces.length === 0) {
    els.opPointsContent.innerHTML = `<div class="empty-state">Sin puntos asignados a este día.</div>`;
    return;
  }

  els.opPointsContent.innerHTML = dayPlaces
    .map((p) => {
      const visited = isVisited(p.id);
      return `
        <article class="op-point ${visited ? "is-visited" : ""}">
          <div class="op-point-head">
            <div class="op-point-title">
              <strong>${escapeHtml(p.name)}</strong>
              <span class="op-point-meta">${escapeHtml(p.tipo)} · ${escapeHtml(p.zona)}</span>
            </div>
            <button class="op-point-check js-toggle-visit" type="button" data-place-id="${escapeHtml(p.id)}" aria-pressed="${visited}" title="${visited ? "Marcar no visitado" : "Marcar visitado"}">
              ${visited ? "✓" : "○"}
            </button>
          </div>
          ${p.nota ? `<p class="op-point-note">${escapeHtml(p.nota)}</p>` : ""}
          <div class="op-point-actions">
            <button class="op-link js-focus-place" type="button" data-place-id="${escapeHtml(p.id)}">Ver en mapa</button>
            <a class="op-link" href="${escapeHtml(getDirectionsUrl(p))}" target="_blank" rel="noopener noreferrer">Cómo llegar</a>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderOpMore(day) {
  const totals = getJourneyTotals();
  els.opMoreContent.innerHTML = `
    <article class="op-card">
      <h3>Bases del viaje</h3>
      <div class="op-bases">
        ${basesRef
          .map(
            (b) => `
              <div class="op-base">
                <strong>${escapeHtml(b.area)}</strong>
                <span>${escapeHtml(b.range)} · ${b.nights} ${b.nights === 1 ? "noche" : "noches"}</span>
                <p>${escapeHtml(b.reason)}</p>
              </div>
            `
          )
          .join("")}
      </div>
    </article>
    <article class="op-card">
      <h3>Reservas críticas y alertas</h3>
      <ul class="op-list">
        ${criticalRef.map((c) => `<li><strong>${escapeHtml(c.title)}:</strong> ${escapeHtml(c.body)}</li>`).join("")}
      </ul>
    </article>
    <article class="op-card">
      <h3>Refuerzos sugeridos</h3>
      <ul class="op-list">
        ${additionsRef.map((a) => `<li><strong>${escapeHtml(a.name)}:</strong> ${escapeHtml(a.why)}</li>`).join("")}
      </ul>
    </article>
    <article class="op-card op-card-soft">
      <h3>Totales orientativos</h3>
      <p><strong>~${totals.driveKm} km</strong> en coche · <strong>~${totals.walkKm} km</strong> a pie</p>
      <p>Gasolina (Fiat 500): ~${totals.fuelCostEuro} € · Peajes opcionales: ~${totals.peajeEuro} €</p>
      <p class="op-card-fineprint">No incluye parking, ferries ni teleféricos.</p>
    </article>
  `;
}

export function populateFilters() {
  const activeTypes = uniqueValues(placesRef.filter((p) => !p.descartar).map((p) => p.tipo));
  const activeZones = uniqueValues(placesRef.filter((p) => !p.descartar).map((p) => p.zona));
  fill(els.typeFilter, ["all", ...activeTypes], "Todos");
  fill(els.priorityFilter, ["all", "Imprescindible", "Secundario", "Revisar"], "Todas");
  fill(els.zoneFilter, ["all", ...activeZones], "Todas");
}

function fill(select, options, allLabel) {
  select.innerHTML = options
    .map((opt) => `<option value="${escapeHtml(opt)}">${escapeHtml(opt === "all" ? allLabel : opt)}</option>`)
    .join("");
}

export function renderSideTabs() {
  els.sideTabButtons.forEach((btn) => {
    const active = btn.dataset.sideTab === state.activeSideTab;
    btn.classList.toggle("is-active", active);
    btn.setAttribute("aria-selected", active ? "true" : "false");
  });
  els.sideTabPanels.forEach((panel) => {
    const active = panel.dataset.tabPanel === state.activeSideTab;
    panel.classList.toggle("is-active", active);
    panel.hidden = !active;
  });
}

export function renderStats() {
  const active = placesRef.filter((p) => !p.descartar);
  const mustSee = active.filter((p) => p.prioridad === "Imprescindible").length;
  const secondary = active.filter((p) => p.prioridad === "Secundario").length;
  const visited = [...state.visited].filter((id) => placesRef.find((p) => p.id === id)).length;

  const stats = [
    { value: `${tripRef.totalDays}`, label: "días de viaje" },
    { value: `${basesRef.length}`, label: "bases" },
    { value: `${mustSee}`, label: "imprescindibles" },
    { value: `${secondary}`, label: "secundarios útiles" },
    { value: `${visited}`, label: "marcados como visitados" },
    { value: "Trapani", label: "base equilibrada del noroeste" },
  ];

  els.statsGrid.innerHTML = stats
    .map((s) => `<article class="stat-card"><strong>${escapeHtml(s.value)}</strong><span>${escapeHtml(s.label)}</span></article>`)
    .join("");
}

export function renderBases() {
  els.baseGrid.innerHTML = basesRef
    .map(
      (b) => `
        <article class="base-card">
          <div class="base-meta">
            <strong>${escapeHtml(b.area)}</strong>
            <span class="badge badge-medium">${b.nights} ${b.nights === 1 ? "noche" : "noches"}</span>
          </div>
          <p><strong>${escapeHtml(b.range)}</strong></p>
          <p>${escapeHtml(b.reason)}</p>
          <div class="base-actions">
            <button class="mini-button js-focus-base" type="button" data-base-id="${escapeHtml(b.id)}">Ver base en mapa</button>
          </div>
        </article>
      `
    )
    .join("");
}

export function renderDayList() {
  els.dayList.innerHTML = daysRef
    .map((d) => {
      const activeClass = state.selectedDayId === d.id ? "is-active" : "";
      const dayPlaceCount = placesRef.filter((p) => p.dia === d.id && !p.descartar).length;
      const visitedCount = placesRef.filter((p) => p.dia === d.id && isVisited(p.id)).length;
      return `
        <article class="day-card ${activeClass}" data-day-id="${d.id}">
          <div class="day-topline">
            <span>Día ${d.id} · ${escapeHtml(d.date)}</span>
            <span class="badge ${paceBadgeClass(d.pace)}">${escapeHtml(d.pace)}</span>
          </div>
          <h3>${escapeHtml(d.title)}</h3>
          <p>${escapeHtml(d.summary)}</p>
          <div class="day-submeta">
            <span>${escapeHtml(d.base)}</span>
            <span>${escapeHtml(d.drive)}</span>
            ${dayPlaceCount ? `<span>${visitedCount}/${dayPlaceCount} visitados</span>` : ""}
          </div>
          <div class="day-tags">
            ${d.tags.map((t) => `<span class="badge badge-type">${escapeHtml(t)}</span>`).join("")}
          </div>
        </article>
      `;
    })
    .join("");
}

export function renderDayDetail() {
  const day = daysRef.find((d) => d.id === state.selectedDayId);
  els.dayDetail.classList.toggle("is-selected", !!day);
  els.dayDetail.scrollTop = 0;

  if (!day) {
    renderOverview();
    return;
  }

  const dayPlaces = day.focusPlaceIds
    .map((id) => placesRef.find((p) => p.id === id))
    .filter(Boolean);

  const placeButtons = dayPlaces.length
    ? dayPlaces
        .map((p) => {
          const visited = isVisited(p.id);
          return `
            <button class="badge badge-type js-focus-place ${visited ? "badge-visited" : ""}" type="button" data-place-id="${escapeHtml(p.id)}">
              ${visited ? "✓ " : ""}${escapeHtml(p.name)}
            </button>
          `;
        })
        .join("")
    : `<span class="badge badge-type">Sin puntos fijos</span>`;

  const metrics = metricsRef[day.id] || { driveKm: 0, walkKm: 0, peajeEuro: 0 };
  const quickFacts = [
    { label: "Ritmo", value: day.pace },
    { label: "Base", value: day.base },
    { label: "Conducción", value: day.drive },
    { label: "Km en coche", value: `~${metrics.driveKm} km` },
    { label: "Km a pie", value: `~${metrics.walkKm} km` },
    metrics.peajeEuro ? { label: "Peajes (si A20/A18)", value: `~${metrics.peajeEuro} €` } : { label: "Peajes", value: "0 €" },
  ];

  els.dayDetail.innerHTML = `
    <div class="detail-header">
      <div>
        <p class="section-kicker">Día ${day.id} · ${escapeHtml(day.date)}</p>
        <h2 class="detail-title">${escapeHtml(day.title)}</h2>
        <p class="detail-subtitle">${escapeHtml(day.summary)}</p>
      </div>
      <div class="detail-tags">
        <span class="badge ${paceBadgeClass(day.pace)}">${escapeHtml(day.pace)}</span>
        <span class="badge badge-high">${escapeHtml(day.base)}</span>
      </div>
    </div>
    <div class="fact-grid">
      ${quickFacts.map((f) => `<article class="fact-card"><span class="fact-label">${escapeHtml(f.label)}</span><strong>${escapeHtml(f.value)}</strong></article>`).join("")}
    </div>
    <div class="detail-toolbar">
      <button class="mini-button js-focus-day-map" type="button" data-day-id="${day.id}">Centrar día en mapa</button>
      <button class="mini-button js-open-tab" type="button" data-tab="places">Ver puntos del día</button>
      <button class="mini-button js-open-tab" type="button" data-tab="extras">Ver extras</button>
    </div>
    <div class="detail-grid">
      <section class="detail-section">
        <h3>Mañana</h3>
        ${renderAgendaList(day.morning, day)}
      </section>
      <section class="detail-section">
        <h3>Tarde / cierre</h3>
        ${renderAgendaList(day.afternoon, day)}
      </section>
      <section class="detail-section">
        <h3>Imprescindible hoy</h3>
        ${renderAgendaList(day.mustDo, day)}
      </section>
      <section class="detail-section">
        <h3>Si vais bien</h3>
        ${renderAgendaList(day.optional, day)}
      </section>
      <section class="detail-section detail-section-wide">
        <h3>Logística y alertas</h3>
        <ul>
          ${day.notes.map((n) => `<li>${escapeHtml(n)}</li>`).join("")}
          <li><strong>Parking:</strong> ${escapeHtml(day.parking)}</li>
          <li><strong>Reservas / revisión previa:</strong> ${escapeHtml(day.booking)}</li>
        </ul>
      </section>
      <section class="detail-section detail-section-wide">
        <h3>Plan B</h3>
        <p class="detail-copy">${escapeHtml(day.planB)}</p>
      </section>
      <section class="detail-section detail-section-wide">
        <h3>Puntos del día (clic = marcar visitado)</h3>
        <div class="detail-chip-list">
          ${placeButtons}
        </div>
      </section>
    </div>
  `;
}

function renderOverview() {
  const totals = getJourneyTotals();
  els.dayDetail.innerHTML = `
    <div class="detail-header">
      <div>
        <p class="section-kicker">Resumen de ruta</p>
        <h2 class="detail-title">Estructura general del viaje</h2>
        <p class="detail-subtitle">
          Viaje circular equilibrado: cultura fuerte por la mañana, mar cuando se pueda
          y cambios de base contenidos.
        </p>
      </div>
    </div>
    <div class="fact-grid">
      <article class="fact-card">
        <span class="fact-label">Bases</span>
        <strong>5 paradas</strong>
        <p>Siracusa, Agrigento, Trapani, Palermo y Giardini Naxos.</p>
      </article>
      <article class="fact-card">
        <span class="fact-label">Coche</span>
        <strong>~${totals.driveKm} km</strong>
        <p>Estimación de conducción acumulada.</p>
      </article>
      <article class="fact-card">
        <span class="fact-label">Gasolina (Fiat 500)</span>
        <strong>~${totals.fuelCostEuro} €</strong>
        <p>${fuelRef.litersPer100Km} L/100 km · ${fuelRef.pricePerLiter.toFixed(2)} €/L.</p>
      </article>
      <article class="fact-card">
        <span class="fact-label">Peajes (opcionales)</span>
        <strong>~${totals.peajeEuro} €</strong>
        <p>Solo A18 y A20 (Messina). Evitables casi en su totalidad.</p>
      </article>
    </div>
    <div class="detail-toolbar">
      <button class="mini-button js-open-tab" type="button" data-tab="map">Abrir mapa</button>
      <button class="mini-button js-open-tab" type="button" data-tab="places">Ver puntos</button>
      <button class="mini-button js-open-tab" type="button" data-tab="extras">Ver extras</button>
    </div>
    <div class="detail-grid">
      <section class="detail-section">
        <h3>Cambios clave vs. el primer borrador</h3>
        <ul>
          <li>Villa Romana del Casale entra el día 5 (UNESCO, estaba ignorada).</li>
          <li>Selinunte sustituye al baño en Scala dei Turchi el día 6 (Scala está cerrada).</li>
          <li>Cappella Palatina pasa a obligatoria + Cappuccini se incorpora a Palermo.</li>
          <li>Tindari + Laguna Marinello rompe el día 12 (Palermo → Giardini).</li>
          <li>Etna Norte (Piano Provenzana) recomendado sobre Etna Sur.</li>
          <li>Salinas: Marsala mejor que Trapani; añade Mozia.</li>
        </ul>
      </section>
      <section class="detail-section">
        <h3>Días sensibles</h3>
        <ul>
          <li>24 junio: Ragusa + Modica + Casale + traslado. Modica debe ser rápida.</li>
          <li>1 julio: 4-5 h de coche. Tindari es la parada que justifica el trayecto.</li>
          <li>2 julio: Etna sensato + Taormina. No exprimir.</li>
        </ul>
      </section>
      <section class="detail-section">
        <h3>Alertas operativas</h3>
        <ul>
          <li>Parking claro en Ortigia, Palermo y Taormina es crítico.</li>
          <li>Cappella Palatina y Villa del Casale conviene reservar online.</li>
          <li>Ferry de Favignana también.</li>
          <li>Monreale cierra al mediodía: encajar bien la hora.</li>
        </ul>
      </section>
      <section class="detail-section">
        <h3>Antes de cerrar reservas</h3>
        <ul>
          <li>Alojamientos con parking fiable o concertado.</li>
          <li>Decidir Etna Norte vs Sur.</li>
          <li>Comprobar acceso real de Scala dei Turchi y Vendicari la semana del viaje.</li>
        </ul>
      </section>
    </div>
  `;
}

function renderAgendaList(items, day) {
  return `
    <ul class="detail-list">
      ${items
        .map((item) => `
          <li class="detail-line">
            <span class="detail-line-text">${escapeHtml(item)}</span>
          </li>
        `)
        .join("")}
    </ul>
  `;
}

export function renderAdditions() {
  els.additionList.innerHTML = additionsRef
    .map(
      (a) => `
        <article class="addition-card">
          <div class="base-meta">
            <strong>${escapeHtml(a.name)}</strong>
            <span class="badge badge-type">${escapeHtml(a.type)}</span>
          </div>
          <p>${escapeHtml(a.why)}</p>
        </article>
      `
    )
    .join("");
}

export function renderJourneySummary() {
  const totals = getJourneyTotals();
  els.journeySummary.innerHTML = `
    <div class="fact-grid">
      <article class="fact-card">
        <span class="fact-label">Km en coche</span>
        <strong>~${totals.driveKm} km</strong>
        <p>Traslados entre bases + movimientos diarios.</p>
      </article>
      <article class="fact-card">
        <span class="fact-label">Km a pie</span>
        <strong>~${totals.walkKm} km</strong>
        <p>Estimación sumando cascos, yacimientos y paseos costeros.</p>
      </article>
      <article class="fact-card">
        <span class="fact-label">Gasolina (Fiat 500)</span>
        <strong>~${totals.fuelCostEuro} €</strong>
        <p>${totals.fuelLiters} L estimados a ${fuelRef.pricePerLiter.toFixed(2)} €/L.</p>
      </article>
      <article class="fact-card">
        <span class="fact-label">Peajes (si usáis A20/A18)</span>
        <strong>~${totals.peajeEuro} €</strong>
        <p>Evitables tirando por carreteras secundarias en los días 12 y 14.</p>
      </article>
    </div>
    <p class="summary-note">
      No incluido: parking diario (15-25 € en Palermo y Taormina), ferry de Favignana (~25-35 €/persona ida y vuelta),
      teleférico de Erice y excursiones del Etna. Cifras orientativas.
    </p>
  `;
}

export function renderCriticalLogistics() {
  els.criticalLogistics.innerHTML = `
    <div class="critical-grid">
      ${criticalRef
        .map(
          (item) => `
            <article class="critical-card">
              <div class="base-meta">
                <strong>${escapeHtml(item.title)}</strong>
                <span class="badge ${item.priority === "Alta" ? "badge-low" : "badge-medium"}">${escapeHtml(item.priority)}</span>
              </div>
              <p class="critical-type">${escapeHtml(item.type)}</p>
              <p>${escapeHtml(item.body)}</p>
            </article>
          `
        )
        .join("")}
    </div>
  `;
}

export function renderPlaces() {
  const filtered = getFilteredPlaces();
  els.placeCount.textContent = `${filtered.length} puntos visibles`;

  if (!filtered.length) {
    els.placeList.innerHTML = `<div class="empty-state">No hay resultados con los filtros actuales.</div>`;
    return;
  }

  els.placeList.innerHTML = filtered
    .map((place) => {
      const visited = isVisited(place.id);
      return `
        <article class="place-card ${visited ? "is-visited" : ""}">
          <div class="place-header">
            <h3>${escapeHtml(place.name)}</h3>
            <button class="place-check js-toggle-visit" type="button" data-place-id="${escapeHtml(place.id)}" aria-pressed="${visited}" title="${visited ? "Visitado" : "Marcar visitado"}">
              ${visited ? "✓" : "○"}
            </button>
          </div>
          ${place.nota ? `<p class="place-note">${escapeHtml(place.nota)}</p>` : ""}
          <div class="place-meta">
            <span class="badge ${badgeClass(place.prioridad)}">${escapeHtml(place.prioridad)}</span>
            <span class="badge badge-type">${escapeHtml(place.tipo)}</span>
            <span class="badge badge-type">${escapeHtml(place.zona)}</span>
            ${place.dia ? `<span class="badge badge-type">Día ${place.dia}</span>` : ""}
          </div>
          <div class="place-actions">
            <button class="text-button js-focus-place" type="button" data-place-id="${escapeHtml(place.id)}">Ver en el mapa</button>
            <a class="text-link" href="${escapeHtml(getDirectionsUrl(place))}" target="_blank" rel="noopener noreferrer">Cómo llegar</a>
          </div>
        </article>
      `;
    })
    .join("");
}

function getFilteredPlaces() {
  const selectedDay = daysRef.find((d) => d.id === state.selectedDayId);
  return placesRef.filter((place) => {
    if (place.descartar && !state.showDescartados) return false;
    if (state.search) {
      const haystack = `${place.name} ${place.address || ""} ${place.zona} ${place.tipo}`.toLowerCase();
      if (!haystack.includes(state.search.toLowerCase())) return false;
    }
    if (state.type !== "all" && place.tipo !== state.type) return false;
    if (state.priority !== "all" && place.prioridad !== state.priority) return false;
    if (state.zone !== "all" && place.zona !== state.zone) return false;
    if (selectedDay && selectedDay.focusPlaceIds && selectedDay.focusPlaceIds.length) {
      const inDay = selectedDay.focusPlaceIds.includes(place.id);
      const inZone = selectedDay.focusZones.includes(place.zona);
      if (!inDay && !inZone) return false;
    }
    return true;
  });
}

function getJourneyTotals() {
  const totals = Object.values(metricsRef).reduce(
    (acc, item) => {
      acc.driveKm += item.driveKm;
      acc.walkKm += item.walkKm;
      acc.peajeEuro += item.peajeEuro || 0;
      return acc;
    },
    { driveKm: 0, walkKm: 0, peajeEuro: 0 }
  );
  const fuelLiters = (totals.driveKm * fuelRef.litersPer100Km) / 100;
  const fuelCostEuro = fuelLiters * fuelRef.pricePerLiter;
  return {
    ...totals,
    fuelLiters: Math.round(fuelLiters),
    fuelCostEuro: Math.round(fuelCostEuro),
  };
}
