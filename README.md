# Sicilia 2026 planner

Aplicación web estática para planificar y usar sobre el terreno un viaje por Sicilia.

## Qué incluye

- **Vista Planner** (pre-viaje): resumen, bases, planning por día, logística y mapa.
- **Vista Día** (operativa): navegación por jornadas, mapa y bloques accionables para uso móvil.
- **Mapa interactivo Leaflet** con filtros por tipo, prioridad, zona y búsqueda textual.
- **Listado de puntos** con salto a mapa/Google Maps.
- **Soporte offline básico** mediante Service Worker (cuando se sirve por HTTP/HTTPS).
- **Modo impresión / PDF** para exportar el planning.

---

## Revisión funcional del desarrollo actual (sin cambios de arquitectura)

### Fortalezas detectadas

1. **Separación clara de capas**
   - Datos en `data/`.
   - Estado + render + acciones + utilidades en `src/`.
   - Arranque unificado en `app.js`.

2. **Doble modo de uso bien resuelto**
   - Flujo de preparación (`planning`).
   - Flujo en viaje (`operational`) con selección contextual del día actual.

3. **UX práctica para viaje real**
   - Filtros combinados para reducir ruido.
   - Sección de logística crítica y resumen operativo.
   - Botón de “Hoy” y navegación por días.

4. **Degradación razonable**
   - Fallback cuando falla el mapa.
   - App utilizable sin backend.

### Riesgos o deuda técnica observada

- Dependencia de CDN externa (Leaflet y Google Fonts): con conectividad pobre, pueden degradar estilos/mapa.
- Dataset embebido en JS: muy cómodo para despliegue estático, pero menos trazable que una canalización de datos formal.
- Versión cacheada del módulo principal (`app.js?v=7`): correcta, pero conviene disciplina al versionar para evitar confusión de caché.

> Nota: esta revisión se limita al contenido presente en este repositorio y no incluye el archivo externo `sicilia_2026_planning_ajustado_para_codex.md` porque no está disponible aquí.

---

## Estructura del proyecto

```text
.
├── index.html            # Estructura de la app y carga de scripts/estilos
├── styles.css            # Estilos globales, responsive e impresión
├── app.js                # Bootstrap: estado inicial, render y eventos
├── sw.js                 # Service Worker para offline básico
├── data/
│   ├── trip.js           # Itinerario por días, bases, métricas y logística
│   └── places.js         # Puntos del mapa y metadatos para filtros
└── src/
    ├── state.js          # Estado compartido de UI
    ├── render.js         # Renderizado de vistas y componentes
    ├── actions.js        # Eventos de UI e interacciones
    ├── map.js            # Integración Leaflet y marcadores
    └── utils.js          # Utilidades de fecha, vista y helpers
```

---

## Ejecutar en local

### Opción rápida
Abrir `index.html` en el navegador.

### Opción recomendada (HTTP local)
```bash
cd /ruta/al/proyecto
python -m http.server 8080
```

Abrir `http://localhost:8080`.

---

## Publicar en GitHub Pages

1. Crear repositorio en GitHub.
2. Subir contenido:

```bash
git init -b main
git add .
git commit -m "Initial Sicily trip planner"
git remote add origin https://github.com/TU_USUARIO/TU_REPO.git
git push -u origin main
```

3. En GitHub → **Settings** → **Pages**:
   - Source: **Deploy from a branch**
   - Branch: `main`
   - Folder: `/root`

---

## Datos

- `sicilia_google_maps_places.csv`: fuente tabular original de puntos.
- `data/places.js`: versión preparada para consumo en frontend.
- `data/trip.js`: itinerario estructurado (días, bases, extras y logística).

Si actualizas datos, intenta mantener coherencia entre CSV y módulos JS para facilitar mantenimiento.
