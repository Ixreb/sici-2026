# Sicilia 2026 planner

Mini web estática para preparar y consultar el viaje:

- ruta por bases
- planning por días
- mapa con chinchetas
- filtros por tipo, zona y prioridad
- vista imprimible / PDF

## Abrir en local

Opción rápida:

1. Abrir [index.html](/D:/xampp/htdocs/sicilia/index.html) en el navegador.

Opción más fiable si prefieres servirlo por HTTP:

```powershell
cd D:\xampp\htdocs\sicilia
python -m http.server 8080
```

Después abrir `http://localhost:8080`.

## Publicarlo en GitHub Pages

1. Crear un repositorio vacío en GitHub.
2. En local, desde esta carpeta:

```powershell
git init -b main
git add .
git commit -m "Initial Sicily trip planner"
git remote add origin https://github.com/TU_USUARIO/TU_REPO.git
git push -u origin main
```

3. En GitHub:
   - `Settings`
   - `Pages`
   - `Deploy from a branch`
   - Rama `main`
   - Carpeta `/root`
4. Esperar a que GitHub publique la web.

Como es una web estática sin build, GitHub Pages la sirve tal cual.
