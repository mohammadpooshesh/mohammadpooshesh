<div align="center">
  <img src="assets/header.svg" alt="Mohammad Pooshesh — AI Engineer · GeoAI · RAG · Knowledge Graphs · MCP" width="100%"/>
</div>

<p align="center">
  <a href="https://mohammadpooshesh.github.io/"><img src="https://img.shields.io/badge/Website-mohammadpooshesh.github.io-2783DE?style=flat-square&logo=googlechrome&logoColor=white" alt="Website"/></a>
  <a href="mailto:mohammad.pooshesh@gmail.com"><img src="https://img.shields.io/badge/Email-contact-E56458?style=flat-square&logo=gmail&logoColor=white" alt="Email"/></a>
  <a href="https://www.linkedin.com/in/mohammadpooshesh/"><img src="https://img.shields.io/badge/LinkedIn-mohammadpooshesh-0A66C2?style=flat-square&logo=linkedin&logoColor=white" alt="LinkedIn"/></a>
  <a href="https://twitter.com/mohammadpu6"><img src="https://img.shields.io/badge/X-@mohammadpu6-14171A?style=flat-square&logo=x&logoColor=white" alt="X"/></a>
</p>

<p align="center">
  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=17&pause=1200&color=5E9FE8&center=true&vCenter=true&width=640&lines=Building+AI+that+understands+maps.;RAG+%C2%B7+Knowledge+Graphs+%C2%B7+MCP+%C2%B7+Agent+Tools;GeoLab+%C2%B7+GeoForge+%C2%B7+GeoExplain+%E2%80%94+GIS+in+your+browser.;PostGIS+is+my+happy+place." alt="Typing intro"/>
</p>

## `$ whoami --verbose`

```yaml
name: Mohammad Pooshesh
role: AI Engineer — GeoAI
mission: making AI spatially aware
current_focus:
  - RAG pipelines over geospatial knowledge
  - Knowledge Graphs
  - MCP servers & agent tools
previously:
  - Backend engineering (Python · Django · PostgreSQL/PostGIS)
  - Computer Vision (OpenCV · YOLO · Raspberry Pi)
architecture: clean, always
coordinates: [31.8974, 54.3569]   # Yazd
crs: EPSG:4326
```

## Skill layers

<p align="center">
  <img src="https://skillicons.dev/icons?i=py,django,postgres,mongodb,redis,docker,linux,nginx,git,opencv,raspberrypi,flutter,html,css,js&perline=8" alt="Tech stack"/>
</p>

| Layer              | Stack                                      |
| ------------------ | ------------------------------------------ |
| `L0 · GeoAI`       | RAG · Knowledge Graphs · MCP · Agent Tools |
| `L1 · Geospatial`  | PostGIS · GeoServer · Map Tiles · MBTiles  |
| `L2 · Backend`     | Python · Django · Clean Architecture       |
| `L3 · Data`        | PostgreSQL · MongoDB · Redis               |
| `L4 · Vision`      | OpenCV · YOLO · Raspberry Pi               |
| `L5 · Ops`         | Docker · Linux · Nginx · Git               |
| `L6 · Frontend`    | HTML · CSS · JS · Django Templates         |

## GeoAI pipeline

```text
geodata ──▶ PostGIS ──▶ embeddings ──▶ vector index
                                            │
 agents ◀── MCP tools ◀── RAG ◀── knowledge graph
```

- **RAG over geodata** — retrieval grounded in PostGIS + vector search, not vibes
- **Knowledge graphs** — places, entities, and relations that LLMs can actually reason over
- **MCP servers & agent tools** — giving AI agents real GIS superpowers

## Flagship builds

<table>
<tr>
<td width="50%" valign="top">

### ⬡ GeoLab

**Interactive GIS geometry laboratory** — what *regex101* is for regular expressions, GeoLab is for geospatial operations. Draw shapes on a real map, pick an operation, drag a slider — and watch the result update **live**. No Run button, no server, no install.

- **Live preview** — every edit recomputes the result instantly
- **Animation engine** — Buffer, Rotate, Scale & more rendered as scrubbable timeline frames
- **~30 operations** — from Union & Clip to Voronoi, TIN, hulls and grids
- **Code generator** — ready-to-copy equivalents in Turf.js, Shapely & PostGIS
- **Web Worker powered** — heavy geometry off the main thread, UI never freezes

`React` `TypeScript` `MapLibre GL` `Turf.js` `Vite`

<p>
  <a href="https://github.com/mohammadpooshesh/GeoLab"><img src="https://img.shields.io/badge/Open_GeoLab_→-5E9FE8?style=for-the-badge&logo=github&logoColor=0d1117" alt="Open GeoLab"/></a>
  <img src="https://img.shields.io/github/stars/mohammadpooshesh/GeoLab?style=for-the-badge&labelColor=0d1117&color=5E9FE8" alt="GeoLab stars"/>
</p>

</td>
<td width="50%" valign="top">

### ◈ GeoForge

**The VS Code for GeoJSON** — a professional GeoJSON IDE that runs entirely in the browser: a Monaco code editor, an interactive MapLibre map, and a VS Code-style feature explorer, all in real-time **bidirectional sync**. 100% client-side, no accounts.

- **Bidirectional editing** — type code → map updates; draw on the map → code updates
- **20+ geometry tools** — Buffer, Union, Simplify, Hulls… all inside a Web Worker
- **Built for scale** — virtualized explorer stays smooth with 50,000+ features
- **Real-time validation** — unclosed rings, non-WGS84 coords, duplicate IDs & more
- **Pro workflow** — property grid, filter expressions, 200-step undo, auto-save

`React` `TypeScript` `Monaco` `MapLibre GL` `Turf.js`

<p>
  <a href="https://github.com/mohammadpooshesh/GeoForge"><img src="https://img.shields.io/badge/Open_GeoForge_→-4FB9C9?style=for-the-badge&logo=github&logoColor=0d1117" alt="Open GeoForge"/></a>
  <img src="https://img.shields.io/github/stars/mohammadpooshesh/GeoForge?style=for-the-badge&labelColor=0d1117&color=4FB9C9" alt="GeoForge stars"/>
</p>

</td>
</tr>
<tr>
<td colspan="2" valign="top">

### ⬢ GeoExplain

**Understand spatial SQL visually** — *regex101 for PostGIS*. Draw a geometry (or import GeoJSON), pick a function like `ST_Buffer`, and watch a **step-by-step animation** of exactly what it does to your geometry — alongside live parameters, before/after stats and generated code. Pure client-side visualizer — no real SQL executed. **[Try the live demo →](https://mohammadpooshesh.github.io/GeoExplain/)**

- **30 PostGIS functions** — geometry, measurement, processing, analysis & validation (`ST_Buffer` → `ST_MakeValid`)
- **Step-by-step animations** — buffers grow, unions dissolve, splits pull apart; scrub the timeline both ways
- **4-way code generator** — equivalent PostGIS, Turf.js, Shapely & GDAL/OGR, generated live
- **Zero-dependency engine** — its own computational-geometry core (signed distance fields + marching squares); React is the only runtime library
- **Compare mode** — draggable Before | After curtain, GeoJSON import, SVG / PNG export

`React` `TypeScript` `SVG` `esbuild`

<p>
  <a href="https://mohammadpooshesh.github.io/GeoExplain/"><img src="https://img.shields.io/badge/Live_demo_→-BF8EDA?style=for-the-badge&logo=googlechrome&logoColor=0d1117" alt="GeoExplain live demo"/></a>
  <a href="https://github.com/mohammadpooshesh/GeoExplain"><img src="https://img.shields.io/badge/Open_GeoExplain_→-BF8EDA?style=for-the-badge&logo=github&logoColor=0d1117" alt="Open GeoExplain"/></a>
  <img src="https://img.shields.io/github/stars/mohammadpooshesh/GeoExplain?style=for-the-badge&labelColor=0d1117&color=BF8EDA" alt="GeoExplain stars"/>
</p>

</td>
</tr>
</table>

## More projects

|     | Project                                                                            | What it is                                                                      | Stack                    |
| :-: | ---------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | ------------------------ |
| <img src="https://cdn.simpleicons.org/flutter/5E9FE8" width="18" alt="Flutter"/> | **[karnama](https://github.com/mohammadpooshesh/karnama)**                         | Time tracker — cross-platform desktop app built with Flutter                    | `Flutter` `Desktop`      |
| <img src="https://cdn.simpleicons.org/docker/5E9FE8" width="18" alt="Docker"/>   | **[map-tile-downloader](https://github.com/mohammadpooshesh/map-tile-downloader)** | Docker image for downloading map tiles in PNG & MBTiles formats                 | `Docker` `GIS` `MBTiles` |
| <img src="https://cdn.simpleicons.org/python/5E9FE8" width="18" alt="Python"/>   | **[DomainHunter](https://github.com/mohammadpooshesh/DomainHunter)**               | Professional Domain OSINT framework — collects publicly available domain intel  | `Python` `OSINT`         |
| <img src="https://cdn.simpleicons.org/javascript/#F7DF1E" width="18" alt="Javascript"/>   | **[ai-atlas](https://github.com/mohammadpooshesh/ai-atlas)** | Interactive, fully client-side 3D atlas of 60 AI algorithms — live simulations, math, code & quizzes · | `JavaScript` `WebGL` `PWA` |

## Telemetry

<p align="center">
  <img src="https://ghchart.rshah.org/5e9fe8/mohammadpooshesh" alt="Contribution heatmap" width="100%"/>
</p>

<p align="center">
  <img src="https://streak-stats.demolab.com?user=mohammadpooshesh&theme=github-dark-blue&hide_border=true&background=0d1117&ring=5E9FE8&fire=DE9255&currStreakLabel=5E9FE8" alt="Contribution streak"/>
</p>

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/mohammadpooshesh/mohammadpooshesh/output/github-snake-dark.svg"/>
  <img alt="Contribution snake" src="https://raw.githubusercontent.com/mohammadpooshesh/mohammadpooshesh/output/github-snake.svg"/>
</picture>

## Recent transmissions

<!--START_SECTION:activity-->
<!--END_SECTION:activity-->

<sub>Auto-updated every 6 hours by GitHub Actions.</sub>

---

<p align="center">
  <sub>This profile auto-updates via GitHub Actions · rendered in <code>EPSG:4326</code></sub>
</p>
