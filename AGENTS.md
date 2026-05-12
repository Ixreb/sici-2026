# AGENTS.md

## Contexto del proyecto
Este repositorio contiene una **web estática** (sin backend ni build step) para planificar un viaje a Sicilia en 2026.

## Objetivo cuando trabajes aquí
- Priorizar cambios simples y trazables.
- Mantener la app 100% funcional abriendo `index.html` o sirviéndola por HTTP local.
- Evitar introducir tooling innecesario (frameworks, bundlers, dependencias npm) salvo petición explícita.

## Estructura y responsabilidades
- `index.html`: estructura de vistas (planning y operativa) y carga de assets.
- `styles.css`: diseño visual responsive y estilos de impresión.
- `app.js`: orquestación de arranque.
- `src/`: lógica de estado, render, acciones, utilidades y mapa.
- `data/`: dataset curado del viaje (`trip.js`, `places.js`).
- `sw.js`: service worker para soporte offline básico.

## Convenciones técnicas
- Usar JavaScript modular ES (`type="module"`) sin transpilación.
- Mantener el estado centralizado en `src/state.js`; evitar estado global adicional.
- En cambios de UI, separar:
  - datos (`data/*.js`),
  - lógica (`src/*.js`),
  - presentación (`styles.css`, `index.html`).
- Evitar duplicar lógica entre vista planning y vista operativa.

## Revisión funcional mínima tras cambios
1. Abrir la app y verificar:
   - cambio entre vistas Planner/Día,
   - listado de días y detalle,
   - filtros y listado de puntos,
   - render del mapa Leaflet.
2. Verificar modo impresión (`Imprimir / guardar PDF`).
3. Verificar que no se rompe la carga local `file://` y HTTP local.

## Criterios de calidad
- No romper accesibilidad básica (labels, roles, navegación por botones).
- Mantener textos en español consistentes con el tono del proyecto.
- Si se añaden campos de datos, documentarlos en `README.md`.
