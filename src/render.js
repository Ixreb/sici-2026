import { state, isVisited } from "./state.js";
import {
  escapeHtml,
  badgeClass,
  paceBadgeClass,
  getDirectionsUrl,
  getGoogleMapsUrl,
  uniqueValues,
  getTodayDayId,
  typeIcon,
  resolveAgendaPlace,
} from "./utils.js";

let placesRef = [];
let daysRef = [];
let basesRef = [];
let additionsRef = [];
let criticalRef = [];
let pendingRef = [];
let tipsRef = [];
let staysRef = [];
let carRef = null;
let flightsRef = null;
let phonesRef = [];
let budgetRef = {};
let foodTipsRef = [];
let foodZonesRef = [];
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
  pendingRef = refs.pending || [];
  tipsRef = refs.tips || [];
  staysRef = refs.stays || [];
  carRef = refs.car || null;
  flightsRef = refs.flights || null;
  phonesRef = refs.phones || [];
  budgetRef = refs.budget || {};
  foodTipsRef = refs.foodTips || [];
  foodZonesRef = refs.foodZones || [];
  metricsRef = refs.metrics;
  fuelRef = refs.fuel;
  tripRef = refs.trip;

  els.statsGrid = document.getElementById("statsGrid");
  els.baseGrid = document.getElementById("baseGrid");
  els.dayList = document.getElementById("dayList");
  els.dayDetail = document.getElementById("dayDetail");
  els.additionList = document.getElementById("additionList");
  els.criticalLogistics = document.getElementById("criticalLogistics");
  els.pendingTasks = document.getElementById("pendingTasks");
  els.tipsSection = document.getElementById("tipsSection");
  els.staysSection = document.getElementById("staysSection");
  els.phonesSection = document.getElementById("phonesSection");
  els.printFoodSection = document.getElementById("printFoodSection");
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
  els.opComidaContent = document.getElementById("opComidaContent");
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

  // Disabled state based on the day actually shown (day), so it stays consistent
  // with the prev/next handlers even when selectedDayId is null.
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
  renderOpComida(day);
}

function renderOpPlan(day) {
  const agenda = (items) => `
    <ul class="agenda-list agenda-list-compact">
      ${items.map((item) => renderAgendaItem(item, day)).join("")}
    </ul>
  `;

  els.opPlanContent.innerHTML = `
    <article class="op-card">
      <h3>Mañana</h3>
      ${agenda(day.morning)}
    </article>
    <article class="op-card">
      <h3>Tarde / cierre</h3>
      ${agenda(day.afternoon)}
    </article>
    <article class="op-card">
      <h3>Imprescindible hoy</h3>
      ${agenda(day.mustDo)}
    </article>
    ${day.optional && day.optional.length ? `
      <article class="op-card">
        <h3>Si vais bien</h3>
        ${agenda(day.optional)}
      </article>
    ` : ""}
    ${renderOpDayStay(day)}
    <article class="op-card op-card-soft op-logistics">
      <h3>Logística del día</h3>
      <dl class="op-logistics-list">
        <dt>Notas</dt>
        <dd>
          <ul class="op-list">
            ${day.notes.map((n) => `<li>${escapeHtml(n)}</li>`).join("")}
          </ul>
        </dd>
        <dt>Parking</dt>
        <dd>${escapeHtml(day.parking)}</dd>
        <dt>Reservas / revisar</dt>
        <dd>${escapeHtml(day.booking)}</dd>
        <dt>Plan B</dt>
        <dd>${escapeHtml(day.planB)}</dd>
      </dl>
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
          ${renderInfoRows(p)}
          <div class="op-point-actions">
            <button class="op-link js-focus-place" type="button" data-place-id="${escapeHtml(p.id)}">Ver en mapa</button>
            <a class="op-link op-link-primary" href="${escapeHtml(getGoogleMapsUrl(p))}" target="_blank" rel="noopener noreferrer">Google Maps</a>
            <a class="op-link" href="${escapeHtml(getDirectionsUrl(p))}" target="_blank" rel="noopener noreferrer">Cómo llegar</a>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderOpMore(day) {
  const totals = getJourneyTotals();
  const presupuesto =
    (budgetRef.entradasPax2 || 0) +
    (budgetRef.transportePax2 || 0) +
    totals.fuelCostEuro +
    totals.peajeEuro;
  const groupedPending = {};
  pendingRef.forEach((task) => {
    if (!groupedPending[task.category]) groupedPending[task.category] = [];
    groupedPending[task.category].push(task);
  });

  els.opMoreContent.innerHTML = `
    <p class="op-section-intro">
      Información del <strong>viaje completo</strong> (no del día). Útil como referencia rápida.
    </p>
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
    ${opCollapsible("🛏️", "Alojamientos, coche y vuelos", staysListHtml())}
    ${opCollapsible("💡", "Consejos de Sicilia", tipsCompactHtml())}
    ${opCollapsible("☎️", "Teléfonos útiles", phonesHtml())}
    <article class="op-card">
      <h3>Pendientes antes del viaje</h3>
      ${Object.entries(groupedPending)
        .map(
          ([category, tasks]) => `
            <div class="op-pending-group">
              <p class="op-pending-category">${escapeHtml(category)}</p>
              <ul class="op-pending-list">
                ${tasks
                  .map((task) => {
                    const done = isVisited(task.id);
                    return `
                      <li class="op-pending-item ${done ? "is-done" : ""}">
                        <button class="op-pending-check js-toggle-visit" type="button" data-place-id="${escapeHtml(task.id)}" aria-pressed="${done}">
                          ${done ? "✓" : "○"}
                        </button>
                        <div>
                          <strong>${escapeHtml(task.title)}</strong>
                          ${task.when ? ` <span class="op-pending-when">${escapeHtml(task.when)}</span>` : ""}
                          <p>${escapeHtml(task.detail)}</p>
                        </div>
                      </li>
                    `;
                  })
                  .join("")}
              </ul>
            </div>
          `
        )
        .join("")}
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
      <h3>Totales del viaje completo</h3>
      <p><strong>~${totals.driveKm} km</strong> en coche · <strong>~${totals.walkKm} km</strong> a pie</p>
      <p>Gasolina (Fiat 500): ~${totals.fuelCostEuro} € · Peajes (solo día 12, A18): ~${totals.peajeEuro} €</p>
      <p>Presupuesto orientativo en ruta (2 pers.): <strong>~${presupuesto} €</strong> · entradas + transportes + gasolina + peajes</p>
      <p class="op-card-fineprint">Suma de los 14 días. No incluye alojamiento, comidas, parking diario ni excursiones del Etna.</p>
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
    { value: `~${getJourneyTotals().driveKm} km`, label: "de ruta en coche" },
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
            <button class="badge badge-type badge-place js-focus-place ${visited ? "badge-visited" : ""}" type="button" data-place-id="${escapeHtml(p.id)}" title="Ver en el mapa">
              <span class="badge-icon" aria-hidden="true">${typeIcon(p.tipo)}</span>
              <span>${visited ? "✓ " : ""}${escapeHtml(p.name)}</span>
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
    metrics.peajeEuro
      ? { label: "Peajes (A18 recomendado)", value: `~${metrics.peajeEuro} €` }
      : { label: "Peajes", value: "0 € · navegador off" },
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
      ${foodZonesForDay(day.id).length ? `
      <section class="detail-section detail-section-wide">
        <h3>Comer hoy · calidad-precio</h3>
        ${dayFoodZonesHtml(day)}
      </section>` : ""}
      <section class="detail-section detail-section-wide">
        <h3>Puntos del día (clic = ver en el mapa)</h3>
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
        <strong>${basesRef.length} paradas</strong>
        <p>${basesRef.map((b) => b.area.split(" ")[0].replace(/[/,]/g, "")).join(" · ")}</p>
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
        <span class="fact-label">Peajes</span>
        <strong>~${totals.peajeEuro} €</strong>
        <p>Navegador con peajes OFF. Solo el día 12 (A18) compensa activarlos.</p>
      </article>
    </div>
    <div class="detail-toolbar">
      <button class="mini-button js-open-tab" type="button" data-tab="map">Abrir mapa</button>
      <button class="mini-button js-open-tab" type="button" data-tab="places">Ver puntos</button>
      <button class="mini-button js-open-tab" type="button" data-tab="extras">Ver extras</button>
    </div>
    <div class="detail-grid">
      <section class="detail-section">
        <h3>Estructura del viaje</h3>
        <ul>
          <li>Siracusa 2 noches: Neapolis, Ortigia y el sureste (Noto, Vendicari).</li>
          <li>Ragusa 1 noche: barroco + Modica de paso, cena en Ibla iluminada.</li>
          <li>Agrigento 2 noches: Casale de paso al llegar, y dos atardeceres (Scala y Templos).</li>
          <li>Palazzo Adriano 1 noche: Selinunte de camino + Cinema Paradiso.</li>
          <li>Trapani 2 noches: Segesta+Erice de paso, Favignana, Zingaro al salir.</li>
          <li>Palermo 2 noches: Monreale, Cappella Palatina, Cappuccini.</li>
          <li>Catania 3 noches: Cefalù, Etna Norte, Taormina, Isola Bella y cierre relajado.</li>
        </ul>
      </section>
      <section class="detail-section">
        <h3>Días sensibles</h3>
        <ul>
          <li>23 junio (día 4): Ragusa + Casale de paso + Scala atardecer. El día con más coche (~260 km).</li>
          <li>24 junio (día 5): mañana de playa + Valle dei Templi al atardecer (luz dorada).</li>
          <li>25 junio (día 6): Selinunte mañana → Palazzo Adriano (Cinema Paradiso).</li>
          <li>30 junio (día 11): Palermo mañana + Cefalù + ~2 h a Catania. Día de transición largo.</li>
          <li>1 julio (día 12): Etna Norte + Taormina + Isola Bella en triángulo desde Catania.</li>
        </ul>
      </section>
      <section class="detail-section">
        <h3>Alertas operativas</h3>
        <ul>
          <li>Parking + ZTL claros en Ortigia, Ragusa Ibla y Palermo.</li>
          <li>Scala dei Turchi: compra IN SITU con pago digital (no online desde mayo 2026), 6 €, al atardecer.</li>
          <li>Cappella Palatina: reservar online en federicosecondo.org; cerrada domingos; restauración 2025-2026.</li>
          <li>Ferry Favignana + bici eléctrica: reservar online con antelación.</li>
          <li>Monreale cierra 13:00-14:00; ir a primera hora el día de Palermo.</li>
        </ul>
      </section>
      <section class="detail-section">
        <h3>Antes de cerrar reservas</h3>
        <ul>
          <li>Alojamientos con parking + pase ZTL en Ortigia y Ragusa Ibla.</li>
          <li>Ferry Liberty Lines + bici eléctrica de Favignana online.</li>
          <li>Cappella Palatina slot online (hasta 10 días antes).</li>
          <li>Hotel en Palazzo Adriano (pocas opciones, anticiparse).</li>
          <li>Verificar boletín INGV del Etna 2-3 días antes del día 12.</li>
        </ul>
      </section>
    </div>
  `;
}

function renderAgendaList(items, day) {
  return `
    <ul class="agenda-list">
      ${items.map((item) => renderAgendaItem(item, day)).join("")}
    </ul>
  `;
}

function renderAgendaItem(text, day) {
  const place = resolveAgendaPlace(text, day, placesRef);
  if (!place) {
    return `<li class="agenda-item agenda-item-text"><span class="agenda-text">${escapeHtml(text)}</span></li>`;
  }
  return `
    <li>
      <button class="agenda-item agenda-item-place js-focus-place" type="button" data-place-id="${escapeHtml(place.id)}" data-tipo="${escapeHtml(place.tipo)}" title="Ver en el mapa">
        <span class="agenda-icon" aria-hidden="true">${typeIcon(place.tipo)}</span>
        <span class="agenda-text">${escapeHtml(text)}</span>
        <span class="agenda-arrow" aria-hidden="true">→</span>
      </button>
    </li>
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
  const entradas = budgetRef.entradasPax2 || 0;
  const transporte = budgetRef.transportePax2 || 0;
  const gas = totals.fuelCostEuro;
  const peaje = totals.peajeEuro;
  const enRuta = entradas + transporte + gas + peaje;

  const vuelos = flightsRef && flightsRef.total ? flightsRef.total : 0;
  const coche = carRef && carRef.precio ? carRef.precio : 0;
  const staysConPrecio = staysRef.filter((s) => s.precio);
  const alojamiento = staysConPrecio.reduce((acc, s) => acc + s.precio, 0);
  const excursiones = budgetRef.excursionesPax2 || 0;
  const grandTotal = Math.round(vuelos + coche + alojamiento + excursiones + enRuta);
  const faltan = staysRef.length - staysConPrecio.length;

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
        <strong>~${gas} €</strong>
        <p>${totals.fuelLiters} L estimados a ${fuelRef.pricePerLiter.toFixed(2)} €/L.</p>
      </article>
      <article class="fact-card">
        <span class="fact-label">Peajes</span>
        <strong>~${peaje} €</strong>
        <p>Navegador con peajes OFF. Solo el día 12 (A18 Taormina↔Catania) compensa activarlos.</p>
      </article>
    </div>
    <div class="budget-block">
      <div class="budget-head">
        <span class="fact-label">Presupuesto del viaje · 2 personas (totales)</span>
        <strong class="budget-total">~${grandTotal.toLocaleString("es-ES")} €</strong>
      </div>
      <p class="budget-group-title">Ya reservado / pagado</p>
      <ul class="budget-lines">
        <li><span>Vuelos (Isaac + María, i/v)</span><strong>${eur(vuelos)}</strong></li>
        <li><span>Coche de alquiler (sin gasolina ni peajes)</span><strong>${eur(coche)}</strong></li>
        <li><span>Alojamiento (${staysConPrecio.length} de ${staysRef.length} bases)</span><strong>${eur(alojamiento)}</strong></li>
        ${excursiones ? `<li><span>Excursión en barco (Favignana)</span><strong>${eur(excursiones)}</strong></li>` : ""}
      </ul>
      <p class="budget-group-title">En ruta · estimado</p>
      <ul class="budget-lines">
        <li><span>Entradas (yacimientos + monumentos)</span><strong>~${entradas} €</strong></li>
        <li><span>Transportes (ferry + bici Favignana, funivias, Isola Bella)</span><strong>~${transporte} €</strong></li>
        <li><span>Gasolina (Fiat 500)</span><strong>~${gas} €</strong></li>
        <li><span>Peajes (solo día 12, A18)</span><strong>~${peaje} €</strong></li>
      </ul>
      <p class="budget-note">${faltan > 0 ? `Faltan por registrar ${faltan} alojamientos (precio aún no añadido). ` : ""}No incluye comidas ni parking diario. Importes totales de cada concepto (lo pagáis a medias).</p>
    </div>
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

// Format an amount in euros (es-ES style: comma decimals).
function eur(n) {
  return Number(n).toFixed(2).replace(".", ",") + " €";
}

// Build the accommodations + rental car list (shared by planning panel and mobile).
function staysListHtml() {
  const carHtml = carRef
    ? `
      <article class="stay-card stay-car">
        <div class="stay-head">
          <strong>🚗 ${escapeHtml(carRef.modelo)}</strong>
          <span class="badge badge-medium">Coche</span>
        </div>
        <p class="stay-meta">${escapeHtml(carRef.detalles)}</p>
        <dl class="stay-info">
          <dt>Recogida</dt><dd>${escapeHtml(carRef.recogida)}</dd>
          <dt>Devolución</dt><dd>${escapeHtml(carRef.devolucion)}</dd>
          <dt>Proveedor</dt><dd>${escapeHtml(carRef.proveedor)}</dd>
          <dt>Conductor</dt><dd>${escapeHtml(carRef.conductor)}</dd>
          ${carRef.precio ? `<dt>Precio</dt><dd>${eur(carRef.precio)} (total, sin gasolina ni peajes)</dd>` : ""}
        </dl>
        ${carRef.avisos && carRef.avisos.length ? `<ul class="stay-avisos">${carRef.avisos.map((a) => `<li>${escapeHtml(a)}</li>`).join("")}</ul>` : ""}
      </article>
    `
    : "";

  const staysHtml = staysRef
    .map((s) => {
      const dirUrl = s.direccion
        ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(s.direccion)}`
        : null;
      const tel = s.telefono ? s.telefono.replace(/\s+/g, "") : null;
      return `
        <article class="stay-card ${s.confirmado ? "" : "stay-pending"}">
          <div class="stay-head">
            <strong>${escapeHtml(s.nombre)}</strong>
            <span class="badge ${s.confirmado ? "badge-high" : "badge-low"}">${s.confirmado ? "Confirmado" : "Pendiente"}</span>
          </div>
          <p class="stay-meta">${escapeHtml(s.base)} · ${escapeHtml(s.dias)} · ${escapeHtml(s.fechas)}</p>
          <dl class="stay-info">
            ${s.precio ? `<dt>Precio</dt><dd>${eur(s.precio)} (total)</dd>` : ""}
            ${s.checkin ? `<dt>Check-in</dt><dd>${escapeHtml(s.checkin)}</dd>` : ""}
            ${s.checkout ? `<dt>Check-out</dt><dd>${escapeHtml(s.checkout)}</dd>` : ""}
            ${s.direccion ? `<dt>Dirección</dt><dd>${escapeHtml(s.direccion)}</dd>` : ""}
            ${s.telefono ? `<dt>Teléfono</dt><dd><a class="text-link" href="tel:${escapeHtml(tel)}">${escapeHtml(s.telefono)}</a></dd>` : ""}
          </dl>
          ${s.nota ? `<p class="stay-nota">${escapeHtml(s.nota)}</p>` : ""}
          ${dirUrl ? `<a class="text-link" href="${escapeHtml(dirUrl)}" target="_blank" rel="noopener noreferrer">Cómo llegar</a>` : ""}
        </article>
      `;
    })
    .join("");

  const flightsHtml =
    flightsRef && flightsRef.total
      ? `
      <article class="stay-card stay-flights">
        <div class="stay-head">
          <strong>✈️ Vuelos</strong>
          <span class="badge badge-medium">${eur(flightsRef.total)}</span>
        </div>
        <ul class="stay-flights-list">
          ${flightsRef.legs.map((l) => `<li><span>${escapeHtml(l.label)}</span><strong>${eur(l.total)}</strong></li>`).join("")}
        </ul>
        <p class="stay-nota">${escapeHtml(flightsRef.note || "Total de los vuelos de los dos (ida y vuelta). Se paga a medias.")}</p>
      </article>`
      : "";

  return carHtml + flightsHtml + staysHtml;
}

// Render accommodations + rental car (planning view).
export function renderStays() {
  if (!els.staysSection) return;
  els.staysSection.innerHTML = staysListHtml();
}

// Does an accommodation cover this day id? Parses stay.dias ("Días 1-2", "Día 3").
function stayCoversDay(stay, dayId) {
  const nums = (String(stay.dias).match(/\d+/g) || []).map(Number);
  if (!nums.length) return false;
  if (nums.length === 1) return nums[0] === dayId;
  return dayId >= nums[0] && dayId <= nums[nums.length - 1];
}

// "Dónde duermes hoy" card for the operational Plan tab.
function renderOpDayStay(day) {
  const stay = staysRef.find((s) => stayCoversDay(s, day.id));
  if (stay) {
    const dirUrl = stay.direccion
      ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(stay.direccion)}`
      : null;
    const tel = stay.telefono ? stay.telefono.replace(/\s+/g, "") : null;
    return `
      <article class="op-card op-stay-card">
        <h3>🛏️ Dónde duermes hoy</h3>
        <p class="op-stay-name">${escapeHtml(stay.nombre)}</p>
        <p class="op-stay-sub">${escapeHtml(stay.base)} · ${escapeHtml(stay.fechas)}</p>
        <dl class="op-stay-info">
          ${stay.checkin ? `<dt>Check-in</dt><dd>${escapeHtml(stay.checkin)}</dd>` : ""}
          ${stay.checkout ? `<dt>Check-out</dt><dd>${escapeHtml(stay.checkout)}</dd>` : ""}
          ${stay.direccion ? `<dt>Dirección</dt><dd>${escapeHtml(stay.direccion)}</dd>` : ""}
          ${stay.telefono ? `<dt>Teléfono</dt><dd><a href="tel:${escapeHtml(tel)}">${escapeHtml(stay.telefono)}</a></dd>` : ""}
        </dl>
        ${stay.nota ? `<p class="op-stay-nota">${escapeHtml(stay.nota)}</p>` : ""}
        ${dirUrl ? `<a class="op-link op-link-primary" href="${escapeHtml(dirUrl)}" target="_blank" rel="noopener noreferrer">Cómo llegar</a>` : ""}
      </article>
    `;
  }
  const prev = staysRef.find((s) => stayCoversDay(s, day.id - 1));
  return `
    <article class="op-card op-stay-card op-stay-card-flight">
      <h3>🛏️ Alojamiento de hoy</h3>
      <p>Hoy es día de vuelo: no hay noche de hotel.${prev ? ` Check-out de <strong>${escapeHtml(prev.nombre)}</strong> (${escapeHtml(prev.base)}) por la mañana${prev.checkout ? ` (ventana ${escapeHtml(prev.checkout)})` : ""} antes de ir al aeropuerto.` : ""}</p>
    </article>
  `;
}

// Phone directory grouped by category (shared by planning panel and mobile).
function phonesHtml() {
  const grouped = {};
  phonesRef.forEach((p) => {
    if (!grouped[p.cat]) grouped[p.cat] = [];
    grouped[p.cat].push(p);
  });
  return Object.entries(grouped)
    .map(
      ([cat, items]) => `
        <div class="phone-group">
          <p class="phone-cat">${escapeHtml(cat)}</p>
          <ul class="phone-list">
            ${items
              .map((p) => {
                const num = p.value.replace(/[^\d+]/g, "");
                const value =
                  p.tel && num
                    ? `<a class="phone-value" href="tel:${escapeHtml(num)}">${escapeHtml(p.value)}</a>`
                    : `<span class="phone-value phone-value-text">${escapeHtml(p.value)}</span>`;
                return `<li class="phone-item"><span class="phone-label">${escapeHtml(p.label)}</span>${value}</li>`;
              })
              .join("")}
          </ul>
        </div>
      `
    )
    .join("");
}

// Render the useful-phones panel (planning view).
export function renderPhones() {
  if (!els.phonesSection) return;
  els.phonesSection.innerHTML = phonesHtml();
}

// Build the "comer por zonas" content (shared by planning panel and mobile).
// One zone's rich food card (joya, platos, sitios con Maps, mercado, desayuno...).
function foodZoneCardHtml(z) {
  return `
        <article class="food-card">
          <div class="food-zone-head">
            <strong>${escapeHtml(z.zona)}</strong>
            <span class="badge badge-medium">${escapeHtml(z.dias)}</span>
          </div>
          ${z.joya ? `
            <div class="food-joya">
              <p class="food-joya-title">💎 Joya casera · gestión familiar</p>
              <p class="food-joya-name">${escapeHtml(z.joya.nombre)}${z.joya.rating ? ` · ⭐ ${escapeHtml(z.joya.rating)}` : ""}</p>
              <p class="food-joya-why">${escapeHtml(z.joya.por_que)}${z.joya.precio ? ` (${escapeHtml(z.joya.precio)})` : ""}</p>
              ${z.joya.maps ? `<a class="food-maps-link" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(z.joya.maps)}" target="_blank" rel="noopener noreferrer">📍 Ver en Google Maps</a>` : ""}
            </div>` : ""}
          ${z.platos && z.platos.length ? `
            <div class="food-block">
              <p class="food-label">Qué pedir</p>
              <ul class="food-platos">${z.platos.map((p) => `<li>${escapeHtml(p)}</li>`).join("")}</ul>
            </div>` : ""}
          ${z.sitios && z.sitios.length ? `
            <div class="food-block">
              <p class="food-label">Dónde comer / cenar · calidad-precio</p>
              <ul class="food-sitios">${z.sitios
                .map(
                  (s) => `
                    <li class="food-sitio">
                      <div class="food-sitio-top">
                        <span class="food-sitio-name">${escapeHtml(s.nombre)}</span>
                        <span class="food-sitio-precio">${escapeHtml(s.precio)}</span>
                      </div>
                      <span class="food-sitio-meta">${escapeHtml(s.tipo)}${s.rating ? ` · ⭐ ${escapeHtml(s.rating)}` : ""}</span>
                      ${s.platos && s.platos.length ? `<span class="food-sitio-platos">${s.platos.map((p) => escapeHtml(p)).join(" · ")}</span>` : s.plato ? `<span class="food-sitio-platos">${escapeHtml(s.plato)}</span>` : ""}
                      ${s.nota ? `<span class="food-sitio-nota">${escapeHtml(s.nota)}</span>` : ""}
                      ${s.maps ? `<a class="food-maps-link" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(s.maps)}" target="_blank" rel="noopener noreferrer">📍 Ver en Google Maps</a>` : ""}
                    </li>`
                )
                .join("")}</ul>
            </div>` : ""}
          ${z.mercado ? `<p class="food-line"><span>🛒 Mercado / street food:</span> ${escapeHtml(z.mercado)}</p>` : ""}
          ${z.desayuno ? `<p class="food-line"><span>☕ Desayuno:</span> ${escapeHtml(z.desayuno)}</p>` : ""}
          ${z.merienda ? `<p class="food-line"><span>🍦 Merienda:</span> ${escapeHtml(z.merienda)}</p>` : ""}
          ${z.nota ? `<p class="food-line"><span>📌 Nota:</span> ${escapeHtml(z.nota)}</p>` : ""}
          ${z.aviso ? `<p class="food-aviso">⚠️ ${escapeHtml(z.aviso)}</p>` : ""}
        </article>`;
}

// Full food guide rendered into a print-only section of the planning shell,
// so "Imprimir / guardar PDF" includes the Comida content (hidden on screen).
export function renderPrintFood() {
  if (!els.printFoodSection) return;
  const rules = foodTipsRef.length
    ? `<ul class="food-print-rules">${foodTipsRef.map((t) => `<li>${escapeHtml(t)}</li>`).join("")}</ul>`
    : "";
  els.printFoodSection.innerHTML = rules + foodZonesRef.map(foodZoneCardHtml).join("");
}

// "Comida" tab (operational Día view): dónde comer en el día seleccionado.
function renderOpComida(day) {
  if (!els.opComidaContent) return;
  let zones = foodZonesForDay(day.id);
  let note = "";
  if (!zones.length) {
    zones = foodZonesForDay(day.id - 1);
    note = "Hoy es día de vuelo: aprovecha para una última granita o arancino en Catania antes del aeropuerto.";
  }
  const intro = `<p class="op-section-intro">Dónde comer <strong>hoy</strong> (zona${zones.length > 1 ? "s" : ""} del día). Toca 📍 para abrir el sitio en Google Maps (nota, reseñas y ubicación).</p>`;
  const noteHtml = note ? `<article class="op-card"><p>${escapeHtml(note)}</p></article>` : "";
  const cards = zones.map(foodZoneCardHtml).join("");
  const tips = foodTipsRef.length
    ? `<details class="op-collapsible"><summary class="op-collapsible-summary"><span class="op-collapsible-icon" aria-hidden="true">💡</span><span>Reglas para comer bien sin pasarse</span></summary><div class="op-collapsible-body"><ul class="op-list">${foodTipsRef.map((t) => `<li>${escapeHtml(t)}</li>`).join("")}</ul></div></details>`
    : "";
  els.opComidaContent.innerHTML = intro + noteHtml + cards + tips;
}

// Food zones whose day range covers this day id (a day can touch >1 zone).
function foodZonesForDay(dayId) {
  return foodZonesRef.filter((z) => {
    const nums = (String(z.dias).match(/\d+/g) || []).map(Number);
    if (!nums.length) return false;
    if (nums.length === 1) return nums[0] === dayId;
    return dayId >= nums[0] && dayId <= nums[nums.length - 1];
  });
}

// Compact "where to eat today" content (shared by Día tab and Planner detail).
function dayFoodZonesHtml(day) {
  return foodZonesForDay(day.id)
    .map(
      (z) => `
      <div class="day-food-zone">
        <p class="day-food-zona">${escapeHtml(z.zona)}</p>
        ${z.joya ? `<p class="day-food-joya">💎 <strong>${escapeHtml(z.joya.nombre)}</strong> — ${escapeHtml(z.joya.por_que)}${z.joya.precio ? ` (${escapeHtml(z.joya.precio)})` : ""}${z.joya.maps ? ` <a class="food-maps-link" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(z.joya.maps)}" target="_blank" rel="noopener noreferrer">📍 Maps</a>` : ""}</p>` : ""}
        ${z.desayuno ? `<p class="day-food-line">☕ ${escapeHtml(z.desayuno)}</p>` : ""}
        ${z.merienda ? `<p class="day-food-line">🍦 ${escapeHtml(z.merienda)}</p>` : ""}
      </div>`
    )
    .join("");
}

// Compact tips list (flat) for the operational "Viaje" tab collapsible.
function tipsCompactHtml() {
  return tipsRef
    .map(
      (t) => `
        <div class="op-tip-block">
          <p class="op-tip-tema"><span aria-hidden="true">${escapeHtml(t.icon || "💡")}</span> ${escapeHtml(t.tema)}</p>
          <ul class="op-list">
            ${t.consejos.map((c) => `<li>${escapeHtml(c)}</li>`).join("")}
          </ul>
        </div>
      `
    )
    .join("");
}

// Generic collapsible block for the operational "Viaje" tab.
function opCollapsible(icon, title, innerHtml) {
  return `
    <details class="op-collapsible">
      <summary class="op-collapsible-summary">
        <span class="op-collapsible-icon" aria-hidden="true">${icon}</span>
        <span>${escapeHtml(title)}</span>
      </summary>
      <div class="op-collapsible-body">${innerHtml}</div>
    </details>
  `;
}

// Render the Sicily tips/recommendations as collapsible cards.
export function renderTips() {
  if (!els.tipsSection) return;
  els.tipsSection.innerHTML = tipsRef
    .map(
      (t) => `
        <details class="tip-card">
          <summary class="tip-summary">
            <span class="tip-icon" aria-hidden="true">${escapeHtml(t.icon || "💡")}</span>
            <span class="tip-tema">${escapeHtml(t.tema)}</span>
          </summary>
          <ul class="tip-list">
            ${t.consejos.map((c) => `<li>${escapeHtml(c)}</li>`).join("")}
          </ul>
        </details>
      `
    )
    .join("");
}

// Group pending tasks by category and render in planning view.
export function renderPendingTasks() {
  if (!els.pendingTasks) return;
  const grouped = {};
  pendingRef.forEach((task) => {
    if (!grouped[task.category]) grouped[task.category] = [];
    grouped[task.category].push(task);
  });

  els.pendingTasks.innerHTML = Object.entries(grouped)
    .map(
      ([category, tasks]) => `
        <article class="pending-group">
          <h3 class="pending-group-title">${escapeHtml(category)}</h3>
          <ul class="pending-list">
            ${tasks
              .map((task) => {
                const done = isVisited(task.id);
                return `
                  <li class="pending-item ${done ? "is-done" : ""}">
                    <button class="pending-check js-toggle-visit" type="button" data-place-id="${escapeHtml(task.id)}" aria-pressed="${done}" title="${done ? "Marcar pendiente" : "Marcar hecho"}">
                      ${done ? "✓" : "○"}
                    </button>
                    <div class="pending-body">
                      <div class="pending-head">
                        <strong>${escapeHtml(task.title)}</strong>
                        ${task.when ? `<span class="pending-when">${escapeHtml(task.when)}</span>` : ""}
                      </div>
                      <p class="pending-detail">${escapeHtml(task.detail)}</p>
                    </div>
                  </li>
                `;
              })
              .join("")}
          </ul>
        </article>
      `
    )
    .join("");
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
          ${renderInfoRows(place)}
          <div class="place-meta">
            <span class="badge ${badgeClass(place.prioridad)}">${escapeHtml(place.prioridad)}</span>
            <span class="badge badge-type">${escapeHtml(place.tipo)}</span>
            <span class="badge badge-type">${escapeHtml(place.zona)}</span>
            ${place.dia ? `<span class="badge badge-type">Día ${place.dia}</span>` : ""}
          </div>
          <div class="place-actions">
            <button class="text-button js-focus-place" type="button" data-place-id="${escapeHtml(place.id)}">Ver en mapa</button>
            <a class="text-link" href="${escapeHtml(getGoogleMapsUrl(place))}" target="_blank" rel="noopener noreferrer">Google Maps</a>
            <a class="text-link text-link-muted" href="${escapeHtml(getDirectionsUrl(place))}" target="_blank" rel="noopener noreferrer">Cómo llegar</a>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderInfoRows(place) {
  const rows = [];
  if (place.horario) rows.push(`<dt>Horario</dt><dd>${escapeHtml(place.horario)}</dd>`);
  if (place.precio) rows.push(`<dt>Precio</dt><dd>${escapeHtml(place.precio)}</dd>`);
  if (!rows.length) return "";
  return `<dl class="place-info">${rows.join("")}</dl>`;
}

// Shared by the place list AND the map markers (map.js imports this) so both
// views always apply identical filtering.
export function getFilteredPlaces() {
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
