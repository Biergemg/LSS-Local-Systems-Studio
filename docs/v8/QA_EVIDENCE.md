# QA_EVIDENCE — ronda 3 (2026-10-29): «Plano de registro» — DEFINITIVA

Pruebas automáticas ≠ aprobación humana de dirección creativa. Esta ronda **no** está aprobada para publicar.

## Resultados reales (`qa3-result.txt`, `lighthouse.json`, `impeccable-detect.json`, `ui-ux-pro-max-search.txt`)
- `tsc --noEmit` 0 · `eslint` 0 · `next build` OK (6 rutas estáticas: /, /privacidad, /terminos, robots, sitemap, _not-found).
- **Playwright (Chrome estable): 47 PASS / 0 FAIL.** Cubre: sin scroll horizontal a 320/390/768/1440; consola limpia; objetivos táctiles ≥44 px; marca decorativa sin tapar texto; 8 enlaces WhatsApp al número correcto; anclas; mailto; Instagram/Facebook; `noopener`; rutas 200; SEO (title ≤60, description 120–160, 1 H1, canonical, OG); JSON-LD válido (ProfessionalService, WebSite, FAQPage; sin horario, dirección, valoraciones ni precio) y 9 FAQ visibles = 9 en JSON-LD; sin frases prohibidas, precios, testimonios ni marcas ficticias; máximo 2 familias tipográficas; **cero radios y cero degradados** (identidad); barra WhatsApp retirada ante cada CTA propio y sin tapar el foco; escritorio sin flotante (CTA fijo en el menú); teclado (saltar al contenido, menú móvil con 5 enlaces + CTA, Escape y foco, FAQ); reduced-motion (estado final, sin animación); **axe WCAG 2.2 A/AA: 0 violaciones** en /, /privacidad y /terminos a 390 y 1440.
- **Lighthouse 12.8.2 (laboratorio simulado):** escritorio 100/100/100/100, LCP 0.6 s, CLS 0, TBT 0. **Móvil: Perf 96, A11y 100, BP 100, SEO 100, LCP 2.6 s (objetivo ≤2.5 s: NO alcanzado por 0.1 s), CLS 0, TBT 130 ms.** Sin throttling el LCP es 0.2 s (`lhreal.mjs`). Datos de campo: N/D. Experimentos descartados: `font-display: optional` (sin mejora), `experimental.inlineCss` (empeoró a Perf 86; revertido). Mejoró al eliminar la tercera familia tipográfica (3.0 → 2.6 s).
- **impeccable v3.8.0:** `critique` ejecutado (Assessment A por subagente independiente + Assessment B detector) — ver `IMPECCABLE_CRITIQUE.md`. `detect.mjs` → 0 hallazgos. Escaneo de URL/overlay: no ejecutado (requiere puppeteer, no instalado).
- **ui-ux-pro-max:** `search.py` ejecutado (Python 3.12, ruta completa) — `ui-ux-pro-max-search.txt`.
- **seo-audit / schema / copywriting / cro:** aplicados (ver sección «Skills» en `V8_ENTREGA_A_L.md`); validados por las pruebas anteriores (metadatos, JSON-LD, frases prohibidas, secuencia V6).
- Revisión visual independiente externa previa: `REVISION_INDEPENDIENTE_VISUAL_V3.md` (sobre la ronda 2; su hallazgo de «demo uniforme» quedó superado por la retirada de la demo).

## Defectos encontrados y corregidos en esta ronda
P1 foco de teclado tapado por la barra móvil (FAQ) → `scroll-margin-block`; P1 wireframe genérico (crítica A) → `FlowMark`; P1 ritmo monótono → filas/rejilla asimétrica/titulares ≤3 líneas; P1 CTA con etiquetas inconsistentes → barra = menú, microcopy explícito; P2 verde sobrecargado → señal; P2 marca decorativa tapando texto (390 y 1440) → marca en flujo en móvil, lateral sin solape en escritorio (prueba automática); P2 franja clara bajo el nav; P2 marco cortado; P2 `.display` pegado al párrafo (evidencia y cierre); P2 inlineCss empeora rendimiento → revertido.

## 21st.dev — BLOQUEADO
El MCP `plugin:21st:21st` sigue sin autenticar (solo expone `authenticate`/`complete_authentication`). Se abrió la URL OAuth; 21st pide iniciar sesión (GitHub/Google/correo) y esas credenciales no las ingresa el agente. **Acción concreta del titular:** iniciar sesión él mismo en la pestaña de Chrome abierta (o autorizar la URL que devuelve `authenticate`); si la redirección a `localhost` falla, pegar la URL completa de la barra de direcciones. Sin eso no hay búsqueda ni evaluación de componentes; **no se importó ni evaluó ningún componente y no se atribuye resultado alguno a 21st.dev.** Plan gratis: 2 obtenciones de código/día; sin créditos pagados.

## Privacidad y términos
`/privacidad` y `/terminos`: borradores `noindex` con hechos verificables (sin formularios, sin cookies propias, WhatsApp/Instagram/Facebook externos, Pixel solo si se activa). Faltan razón social/responsable, domicilio y revisión legal.

## Limitaciones y bloqueos reales para publicar
1. Aprobación humana de la dirección creativa y de la crítica independiente (28/40 antes de correcciones; sin segunda pasada).
2. 21st.dev BLOQUEADO (acción del titular).
3. LCP móvil de laboratorio 2.6 s (>2.5 s); sin datos de campo.
4. Sin fotografía real ni casos aprobados (no se simulan).
5. Privacidad/términos sin datos legales ni revisión.
6. Sin pruebas en iOS/Android físicos; recepción real de WhatsApp no probada (no se envían mensajes).
7. Precio, garantía y plan mensual no aprobados (fuera del contenido por decisión).
8. Meta Pixel/analítica: solo si se configura y autoriza (variable de entorno; hoy inactiva).

---
## Rondas 1–2 (históricas)

# QA_EVIDENCE — ronda 2 (2026-10-29): dirección creativa premium

Resultados reales (`qa2-result.txt`, `lighthouse.json`, `impeccable-detect.json`):

- tsc 0 · eslint 0 · next build OK (6 rutas estáticas, incl. /privacidad y /terminos).
- Batería Playwright (Chrome estable): **46 PASS / 0 FAIL**. Cubre: sin scroll horizontal a 320/390/768/1440; consola limpia; objetivos táctiles ≥44 px; 8 enlaces WhatsApp con el número correcto; anclas; mailto; redes; noopener; rutas 200; SEO (title 55, description 152, 1 H1); sin fórmulas defensivas ni precios/garantías en el texto visible; demo (datos reflejados, transición, 3 direcciones, enlace WhatsApp con datos, Enter sin envío, volver al punto de partida); barra WhatsApp retirada ante los CTA propios y sin tapar el foco de teclado; escritorio sin flotante; teclado/menú/Escape/FAQ; reduced-motion; axe WCAG 2.2 A/AA **0 violaciones** en /, /privacidad y /terminos a 390 y 1440.
- Lighthouse 12.8.2 (lab simulado). Escritorio 100/100/100/100, LCP 0.6 s. **Móvil: Perf 92–94 según corrida, A11y 100, BP 100, SEO 100, CLS 0, TBT 90–120 ms, LCP 3.0 s — no cumple el objetivo ≤2.5 s en laboratorio.** Sin throttling el LCP es 0.3 s (`lhreal.mjs`). Un experimento con `font-display: optional` no lo mejoró y se revirtió. Datos de campo: N/D.
- impeccable v3.8.0 `detect.mjs` sobre app/ y components/: 1 aviso (*overused-font*): Space Grotesk, tipografía de marca conservada a propósito; la línea `Arial` es el estado «antes» ficticio de la demo. El escaneo de URL renderizada no se ejecutó (requiere puppeteer, no instalado). La crítica visual `critique` de impeccable **no se ejecutó**.
- ui-ux-pro-max: `search.py` ejecutado con éxito (Python 3.12), resultados en `ui-ux-pro-max-search.txt` (design-system, landing, ux, typography).
- Referencias competitivas: `COMPETITIVE_REFERENCES.md` (3 URL con fecha; análisis a partir de texto).
- Percepción premium: `PREMIUM_PERCEPTION_REVIEW.md` (autoevaluación, no independiente).

## 21st.dev
**BLOQUEADO.** Se abrió la URL OAuth en el navegador y 21st exige iniciar sesión (GitHub, Google o correo); esas credenciales no se ingresan en nombre del titular. Sin la sesión no hay herramientas de búsqueda, así que **no se importó ningún componente de 21st.dev**. La dirección de arte actual es propia (HTML/CSS/SVG). Plan gratuito: 2 obtenciones de código/día; no se consumen créditos.

## Privacidad y términos
`/privacidad` y `/terminos` existen como **borrador noindex** que afirma solo hechos verificables del sitio (sin formularios; demo local; WhatsApp externo; Pixel solo si se activa). Antes de publicar faltan: razón social/responsable, domicilio y revisión legal; no se inventaron.

## Limitaciones
LCP móvil en laboratorio 3.0 s; revisión visual del propio implementador; sin pruebas en iOS/Android reales; sin fotografía real ni casos; sin datos de campo; 21st.dev pendiente.

---
## Ronda 1 (histórico)

# QA_EVIDENCE — 2026-10-29

Entorno: worktree `lss-web-v8` (rama local `v8/private-landing`), `next build` + `next start -p 3200`. Navegador: Chrome estable del equipo vía Playwright. Lighthouse 12.8.2 (lab, simulado).

## 1. Preservación (Fase 0)
Rama `v8/private-landing` creada desde `c64f1b9`; primer commit `snapshot` incorpora los 8 archivos modificados y los 9 sin seguimiento de `lss-web`. El directorio original `lss-web` **no se tocó** (sigue con sus cambios sin commit, sin reset ni clean).

## 2. Skills realmente invocadas (Skill tool)
| Skill | Uso real |
|---|---|
| `copywriting` | Cargada; se aplicaron sus reglas (claridad, especificidad, CTA con resultado, sin exclamaciones) al copy V6 → `data/content.ts` |
| `cro` (equivalente verificado de `page-cro`) | Cargada; orden de secciones, CTA en primer viewport móvil (verificado en captura 390×844), objeción de precio resuelta antes del CTA final (sección «Presupuesto», comparar mismo alcance) |
| `ui-ux-pro-max` | Cargada; se aplicaron sus prioridades (accesibilidad, táctil ≥44 px, contraste, mobile-first). **No se ejecutó `search.py`**: la invocación falló por la ruta con espacios y se omitió; no se generó MASTER.md |
| `seo-audit` | Cargada; revisión aplicada con Playwright (title 55, description 153, canonical, 1 H1, robots/sitemap añadidos) |
| `schema` (equivalente de `schema-markup`) | Cargada; JSON-LD reducido a datos verificables; aviso: Google retiró los resultados enriquecidos de FAQ, se mantiene `FAQPage` solo como semántica de contenido visible |
| `impeccable` v3.8.0 (Apache-2.0, copia local en `~/.codex/skills/impeccable`, la misma de `tienda-shopify-premium-v4/integrations`) | **Ejecutado su detector local** `scripts/detect.mjs` (sin red): 2 hallazgos «side-tab accent border» → corregidos → 0 hallazgos. **No se ejecutó** `context.mjs`/`critique` (exige crear PRODUCT.md en el repo y subagentes) ni se descargó el binario: la crítica visual la hizo el revisor sobre capturas |

## 3. Resultados de QA (`qa-result.txt`, `lighthouse.json`)
- `tsc --noEmit` 0 · `eslint` 0 · `next build` OK (1 ruta estática + robots + sitemap).
- Playwright 320/390/768/1440: sin scroll horizontal, consola sin errores/avisos, objetivos táctiles ≥44 px.
- Enlaces: anclas internas existen; 8 enlaces WhatsApp al número correcto con texto; `mailto` correcto; Instagram/Facebook responden 200; `target=_blank` con `noopener`.
- Demo PPV: usa los datos escritos, alterna antes/después, el enlace de WhatsApp lleva los datos, Enter no dispara POST.
- Teclado: primer Tab = «Saltar al contenido»; menú móvil abre con Enter, Escape cierra y devuelve el foco; FAQ expande.
- `prefers-reduced-motion`: animación `none`.
- axe-core (WCAG 2.2 A/AA) 390 y 1440: **0 violaciones**.
- Lighthouse móvil: Perf 95, A11y 100, BP 100, SEO 100, **LCP 2.7 s (lab simulado; objetivo ≤2.5 s NO alcanzado en lab)**, CLS 0, TBT 120 ms. Escritorio: 100/100/100/100, LCP 0.6 s. Datos de campo (p75): **N/D**.
- Revisión visual manual de capturas 390 y 1440: hero, PPV, proceso, presupuesto, evidencia.

## 4. 21st.dev (Fase 2)
- Plugin MCP `plugin:21st:21st` instalado pero **sin autenticar**. Se generó la URL OAuth (se entregó al titular); sin autorización no se expone ninguna herramienta de búsqueda (comprobado con ToolSearch).
- Componentes investigados/seleccionados/importados: **ninguno** (no se simulan). Estado: **BLOQUEADO**.
- Acción necesaria: autorizar la URL OAuth o pegar la URL de retorno. Búsqueda libre, 2 obtenciones de código/día en plan gratis; no se consumen créditos ni pagos sin tu aprobación.
- El diseño usa HTML/CSS propio; si el titular autoriza, puede compararse para hero, demo PPV y CTA.

## 5. Defectos encontrados y corregidos
P1: enlace del logo de 32 px de alto (táctil) → 44 px. P1: description 163 caracteres → 153. P1: LCP retrasado por animación del texto del hero → eliminada. P2: 2 «side-tab» (impeccable) → eliminados. P2: gris `#6E6E6E` sin contraste → `#B4B4B4`. P2: etiqueta «solo con prueba real» repetida ×5 → una vez. Error ESLint preexistente (`<a href="/">` en Logo) → `Link`.

## 6. Filtro de 22 criterios V8
1 sí (H1 comunica el beneficio) · 2 sí · 3 sí (marca oscura heredada + papel) · 4 sí · 5 sí (capturas 320–768) · 6 sí (CTA en primer viewport móvil) · 7 sí · 8 eliminado badge duplicado · 9 sin claims numéricos, sin precios/garantías · 10 sí · 11 sin frases prohibidas · 12 WhatsApp dominante · 13 objeción precio/web existente antes del CTA final · 14 FAQ de objeciones reales · 15 JSON-LD verificable · 16 sí · 17 cada componente tiene función (ver ART_DIRECTION) · 18 17 px móvil · 19 contrastes AA (axe 0) · 20 ≥44 px verificado · 21 Perf móvil 95 / LCP 2.7 s lab (limitación) · 22 contenido en `data/content.ts`.

## 7. Estado de gates G0–G9
G0 PASS · G1 PASS · G2 PARCIAL (territorios y 3 keyframes, sin 2 referencias reales ni 3 competidores auditados con URL/fecha: **BLOCKED por tiempo, no ejecutado**) · G3 PASS (sin dependencias; 21st BLOCKED) · G4 PASS · G5 PASS con revisión del propio implementador (**no independiente**) · G6 PASS (WhatsApp con número correcto; recepción real no probable sin enviar mensajes) · G7 PARCIAL (LCP lab 2.7 s; campo N/D) · G8 PASS para P0/P1 encontrados · G9 **NO publicable**: requiere aprobación del titular, 21st opcional, privacidad/términos reales (el sitio no tiene páginas de privacidad), cuenta de analítica y Pixel solo con consentimiento.

## 8. Limitaciones
No hay páginas de privacidad/términos (el copy V6 las menciona); LCP móvil lab 2.7 s; sin auditoría de 3 competidores; sin pruebas en iOS/Android reales; demo PPV es conceptual; funcionalidades del sitio anterior ver `V8_DELIVERY_NOTES` en el informe final.

---
**Actualización 2026-10-29 (V9.2):** la suite `qa3.mjs` (54 pruebas) tenía criterios laxos (p. ej. «máximo 2 familias» con condición `<= 3`). Se sustituye por `qa-scripts/qa4.mjs` (69 pruebas, resultado en `qa4-result.txt`). Detalle de criterios corregidos: `AUDITORIA_FINAL_V9_2.md` §2.
