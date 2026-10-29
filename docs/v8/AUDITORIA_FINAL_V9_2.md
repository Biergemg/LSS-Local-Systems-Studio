# Auditoría final adversarial y refinamiento — V9.2 (2026-10-29)

Base: `3dd9271` (V9.1). Rama `v8/private-landing`. Sin push, merge ni despliegue. Este documento **no declara V8 completo**: separa PASS, FAIL y BLOCKED con la evidencia de cada uno.

## 1. Matriz de las seis skills

Leyenda: PASS = verificado con ejecución propia · PARCIAL = verificado en parte · FAIL = incumple y se corrigió o queda abierto · BLOCKED = no verificable aquí.

### 1.1 copywriting (Fase 2)
| Requisito original | Resultado | Evidencia |
|---|---|---|
| Propuesta de valor específica; hero con titular, subtitular y CTA | PASS | `qa4.mjs` (hero, CTA en primera pantalla); captura `w3-1440-hero.png`, `w3-390-hero.png` |
| Sin frases vacías de agencia, sin métricas ni testimonios inventados | PASS | `qa4.mjs` «sin frases prohibidas, precios, testimonios ni marcas ficticias» (19 patrones) |
| CTA primario y secundario coherentes | **FAIL → corregido** | La crítica independiente contó 5 etiquetas para la misma acción. Ahora: «Quiero mi Primera Visita Digital» (hero, método, entrega), «Ver si encaja con mi negocio» (oferta), «Quiero mis tres observaciones» (cierre), «Revisar mi negocio» (menú y barra móvil). «Conocer las pruebas de entrega» prometía información y abría WhatsApp: eliminada |
| FAQ con objeciones reales | PASS | 10 preguntas (garantía, web existente, titularidad, costo, plazo, tareas del cliente, distancia, costo de la revisión); `qa4.mjs` FAQ visible = JSON-LD |
| Repetición de ideas entre secciones | **FAIL → corregido** | La crítica contó las mismas 4 ideas en 5 secciones. «Preguntas del cliente» y «Oferta» se fusionaron; la lista del hero (duplicaba la prueba) se retiró; 1 389 → 1 242 palabras visibles en `<main>` |
| Prueba del titular con lectores reales | BLOCKED | Requiere 5 propietarios reales (test de 5 segundos). El titular de tres relativos queda como hipótesis a probar |

### 1.2 cro / page-cro (Fase 3)
| Requisito | Resultado | Evidencia |
|---|---|---|
| Orden de secciones y fricción | PASS tras corrección | 10 → 9 secciones; ritmo tinta/papel alterno estricto (hero tinta, creencia papel, método tinta, oferta papel, proceso tinta, entrega papel, presupuesto tinta, FAQ papel, cierre tinta) |
| CTA principal temprano | PASS | `qa4.mjs` móvil: CTA del hero dentro de 844 px de alto |
| CTA duplicado en primera pantalla móvil | **FAIL → corregido** | Hero + barra fija mostraban dos botones verdes. Ahora la barra se retira mientras el CTA del hero está visible (`qa4.mjs` «CTA del hero en la primera pantalla y sin barra duplicada») |
| Objeción principal antes del CTA final | PARCIAL → mejorado | Distancia (hero, método, FAQ) y precio (presupuesto) preceden al cierre. Faltaba criterio económico: se añadió «Lo que mueve el costo» (5 factores) sin cifras |
| Conversión real, A/B, mapas de calor | BLOCKED | Sin tráfico; Meta Pixel/analítica desactivados por entorno |

### 1.3 ui-ux-pro-max (Fase 4)
| Requisito | Resultado | Evidencia |
|---|---|---|
| Búsqueda de sistema de diseño ejecutada | PASS | `docs/v8/ui-ux-pro-max-search.txt` (Python 3.12) |
| Accesibilidad CRÍTICA: contraste, foco, teclado | PASS | axe-core WCAG 2.2 AA: 0 violaciones en `/`, `/privacidad`, `/terminos` a 390 y 1440 (`qa4-result.txt`); Lighthouse A11y 100; foco no tapado por la barra |
| Objetivos táctiles ≥ 44 px | PASS | `qa4.mjs` a 320/390/768/1440 |
| Movimiento reducido | PASS (criterio endurecido) | Antes: se miraba un solo elemento. Ahora: **cero** animaciones en ejecución en toda la página con `prefers-reduced-motion` |
| Tipografía legible en móvil | **FAIL → corregido** | Había etiquetas de 11–12 px en mayúsculas (eyebrows, «Formato», figcaption, tabla). Nuevo criterio: ningún texto HTML visible < 13 px (excepto el lockup del logotipo) |
| Un sistema, no una colección | PASS | Cero radios, degradados y sombras, incluidos pseudo-elementos (criterio nuevo) |
| Dispositivos reales iOS/Android, lectores de pantalla | BLOCKED | Solo emulación Chrome |

### 1.4 seo-audit (Fase 5)
| Requisito | Resultado | Evidencia |
|---|---|---|
| Title ≤ 60, description 120–160, canonical, H1 único | PASS | `qa4.mjs` |
| Jerarquía de encabezados | PASS (criterio nuevo) | Sin saltos de nivel |
| Open Graph con imagen social | **FAIL → corregido** | `og-image.png` existente: tipografía de sistema (no la de marca), «Studio» recortado en el borde derecho y mensaje antiguo. Rehecha con Space Grotesk/Inter Tight, titular y marca; `qa4.mjs` comprueba que responde 200 y mide 1200×630 |
| robots y sitemap | PASS | `/robots.txt`, `/sitemap.xml` 200; privacidad y términos en noindex (borradores) |
| Higiene | corregido | 5 SVG de plantilla sin uso eliminados de `public/` |
| Indexación real, Search Console, posición | BLOCKED | El dominio no está publicado; no se promete ranking |

### 1.5 schema / schema-markup (Fase 5)
| Requisito | Resultado | Evidencia |
|---|---|---|
| JSON-LD con el subtipo más preciso, sin datos inventados | PASS | `ProfessionalService` + `WebSite` + `FAQPage`; sin horario, dirección, precio ni valoraciones (`qa4.mjs`) |
| `areaServed`, `sameAs`, teléfono | PASS | País México, Instagram y Facebook, +52 833 326 3389 |
| FAQPage = FAQ visible | PASS | 10 = 10 |
| Rich result de FAQ | Aclaración | La skill indica que Google retiró los resultados enriquecidos de FAQ; el marcado se conserva como semántica del contenido visible, sin prometer apariencia en Google |
| `openingHours`, LocalBusiness físico | No aplica | Servicio remoto, sin local ni horario aprobados |
| Rich Results Test / Schema.org Validator | BLOCKED | Exigen una URL pública; la validación fue estructural local (JSON válido, tipos y propiedades esperados) |

### 1.6 impeccable (Fase 7)
| Requisito | Resultado | Evidencia |
|---|---|---|
| `detect` sobre el código | PASS | `impeccable-detect-v92.json` = `[]` sobre `app` y `components` (v3.8.0, lanzador `sh`) |
| `critique` independiente de la V9.1 actual (móvil y escritorio) | PASS con degradación | `critique/CRITICA_V91_independiente.md`: **27/40 escritorio, 26/40 móvil**; premium 6/10. Degradado: un revisor, sin Assessment A/B aislados |
| Segunda crítica independiente tras la primera ronda de correcciones | PASS con degradación | `critique/CRITICA_V92_independiente.md`: **29/40 móvil, 30/40 escritorio**; premium **6/10**. Sus hallazgos P1/P2 se corrigieron en una segunda ronda (§3, ronda 2). Las cifras 29/30 son de la versión intermedia, **no** se re-puntuó la final (sería autoevaluación) |
| Escaneo de URL / overlay en vivo | BLOCKED | Requiere puppeteer (no instalado; no se instaló) |
| Aprobación humana de la dirección creativa | BLOCKED | Pendiente del titular |
| Filtro interno de 22 preguntas | PARCIAL | Ver `V8_ENTREGA_A_L.md`; las preguntas 1, 5, 13, 21, 22 pasan a «con evidencia» en esta ronda |

### 1.7 21st.dev (herramienta adicional del encargo)
**BLOCKED.** Se volvió a llamar a `mcp__plugin_21st_21st__authenticate`: devuelve de nuevo la URL de autorización OAuth (Clerk) y solo expone `authenticate` y `complete_authentication`. No hay búsquedas, ni componentes recuperados, ni uso declarado.
Paso exacto del titular: abrir la URL que devuelve `authenticate` en el navegador con la cuenta de 21st.dev y aceptar el permiso; si el navegador muestra error de conexión en `localhost:41954/callback`, copiar la URL completa de la barra de direcciones y pasarla a `complete_authentication`. Plan gratuito: 2 recuperaciones de código al día; no se contratan créditos.

## 2. Criterios de QA inconsistentes encontrados y corregidos

| # | Criterio | Defecto | Corrección | Repetido |
|---|---|---|---|---|
| 1 | Tipografía | Título «máximo 2 familias» pero la condición era `<= 3`, y contaba todos los nodos (incluidos `head`, `script`) | Dos pruebas: familias en **texto visible** ≤ 2 y familias de **fuentes web cargadas** ≤ 2 (excluye el fallback de ajuste de `next/font`) | PASS: Inter Tight + Space Grotesk |
| 2 | Identidad | Solo `radio` y `degradado` sobre elementos; no `box-shadow`, `text-shadow` ni pseudo-elementos | Revisa `::before`/`::after` y sombras | PASS: 0 |
| 3 | Movimiento reducido | Miraba solo el primer `.reveal` y `.flow-signal` | `document.getAnimations()` en ejecución = 0 en toda la página | PASS |
| 4 | Consola limpia | Solo `error`/`warning` de consola | Suma respuestas HTTP ≥ 400 y peticiones fallidas | PASS |
| 5 | Tamaño de texto | No existía (la propia crítica halló 11–12 px) | Ningún texto visible < 13 px | FAIL inicial (12 px) → corregido → PASS |
| 6 | Marcadores rotos | No existía | Detecta `undefined`, `NaN`, `__X__`, `[object` | Detectó `__PERF__` antes de rellenarlo; una primera regex con `/i` daba falsos positivos y se corrigió |
| 7 | OG | Solo comprobaba que existiera `og:title` | La imagen responde 200 y mide 1200×630 | PASS |
| 8 | Estructura | No existía | Jerarquía de encabezados sin saltos; 9 secciones; densidad ≤ 1 250 palabras | PASS |
| 9 | Primera pantalla móvil | No existía | CTA visible, barra retirada, diagrama asoma ≥ 120 px | FAIL (diagrama tapado) → corregido → PASS |
| 10 | Navegación | No existía | La sección activa se marca | PASS |

Resultado de la suite endurecida (final): **69 PASS / 0 FAIL** (`qa4-result.txt`). Los 54 de antes eran una suite más laxa; no se usan como prueba de cierre.

## 3. Cambios visuales y editoriales ejecutados (cada uno ligado a un hallazgo)

| Hallazgo (crítica independiente) | Cambio | Antes → después |
|---|---|---|
| P1-2 repetición | Fusión «preguntas del cliente» + «oferta»: las cuatro preguntas son los titulares de los cuatro grupos; se retira la lista 01/02/03 del hero | 10 → 9 secciones; 1 450 → ~1 200 palabras en `<main>` |
| P1-3 primera pantalla móvil | Barra de WhatsApp oculta mientras el CTA del hero está visible; diagrama más cerca del texto (espacio 48 → 28 px y sin marco extra) | Doble botón verde y diagrama tapado → un CTA y diagrama visible |
| P2-4 marco dentro de marco; etiquetas desconectadas | Se retiraron las cuatro esquinas del hero; las etiquetas del diagrama dicen ENCUENTRA · ENTIENDE · ESCRIBE (el recorrido ya no depende de una lista aparte) | |
| P2-1 palabras de plataformas gigantes | La frase útil es el titular de cada fila; la plataforma pasa a etiqueta | «INSTAGRAM» a 90 px → «Ven tus novedades.» |
| P1-1 sin prueba verificable | Tarjeta «Medición de esta página»: Accesibilidad 100, Buenas prácticas 100, SEO 100, Rendimiento 93, CLS 0, errores WCAG 0; con fecha, versión de herramienta, mediana de 5 corridas y nota de re-medición. **Decisión a revisar por el titular:** la ronda 1 incluía también «carga 2.7 s»; la segunda crítica señaló que un 2.7 s fuera del umbral de 2.5 s invita a «tu web no pasa su propio estándar» y que «LCP» es jerga. Se retiró de la tarjeta; sigue documentado en §6 y en este informe. Si se prefiere mostrarla, es una línea en `data/content.ts` | |
| P1-4 sin criterio económico | «Lo que mueve el costo» (5 factores) y aviso de que la propuesta llega tras la Primera Visita Digital. Sin cifras: precios no aprobados | |
| P2-3 etiquetas diminutas, tabla redundante | Eyebrows 13 px; las etiquetas «Web económica / Presencia Resuelta» pasan a cabecera de columna en escritorio | |
| P2-6 corchetes decorativos | La marca decorativa solo se muestra en escritorio (columna libre), no en móvil | ~200 px de vacío menos |
| P2-7 aire muerto | Relleno de sección móvil 88 → 72 px | |
| P3-1 navegación sin estado | Enlace activo con subrayado verde (IntersectionObserver; solo secciones del menú) | |
| P3-4 #111 casi imperceptible | Eliminado: ritmo tinta/papel estricto | |
| P3-5 comillas « » toscas | Comillas tipográficas “ ” | |
| CTA con 5 etiquetas | Unificadas (ver 1.1) | |
| OG desalineado | Nueva imagen de marca 1200×630 | |

### Ronda 2 — hallazgos de la segunda crítica independiente
| Hallazgo | Cambio |
|---|---|
| P1 Tarjeta de mediciones rompía el sistema (fondo blanco, borde verde grueso) y «2.7 s» se partía en móvil | Tabla de líneas finas sobre el papel, valores en una sola línea, título «Medición de esta página», la tarjeta sube a la columna del texto |
| P1 Dos veces la misma plantilla de lista; ninguna pieza tangible del servicio | La Primera Visita Digital se muestra ahora como su **entregable**: el formato «Tres observaciones» (las tres lentes ya existentes, cada una con campos *Qué se ve · Captura con fecha · Qué cambiaríamos* en blanco y marcado «Formato»). No es una demo ni un cliente ficticio: es la estructura real del documento |
| P2 El conector verde cruzaba la etiqueta ESCRIBE | La etiqueta pasa a la izquierda del nodo; no hay cruce |
| P2 «A distancia» tres veces en el mismo bloque | El pie del diagrama ahora dice solo «Primera Visita Digital»; la cota «A DISTANCIA» queda como única repetición visual |
| P2 CTA con 6 redacciones | Unificadas (§1.1) |
| P2 Estado gris de las tarjetas de «Qué recibes» | Era una revelación por scroll a medias. Nueva prueba automática: todas las revelaciones por scroll llegan a opacidad 1 al situarlas en pantalla (390 y 1440) |
| P2 Microtexto del hero a 13 px gris | 15 px y tono secundario claro |
| P2 Nota del cierre pegada al botón | +16 px |
| P2 La marca decorativa sobresalía de la rejilla | Alineada al borde derecho del contenedor; en el cierre se desplaza para no chocar con las esquinas |
| P3 Jerarquía invertida (cierre mayor que el hero) | Titular del hero 64 → 68 px; titulares monumentales 112 → 96 px |
| P3 Eyebrow del hero largo | «Negocios de servicios que venden por cita o cotización» |

**No ejecutado, con motivo:** (a) primera pantalla móvil con el diagrama completo: ponerlo antes del CTA lo empuja bajo el pliegue; se prioriza el CTA (el diagrama asoma ≥ 120 px, verificado por prueba). La animación ocurre al cargar y en móvil se ve parcialmente; la alternativa (animar al entrar en pantalla, ligada al scroll) cambia la naturaleza de la secuencia y queda como decisión de diseño del titular. (b) Fusionar Proceso+Entrega y retirar Presupuesto como sección: la crítica lo propone, pero Presupuesto responde la objeción principal de precio; sería una decisión comercial, no un hallazgo visual. (c) Un momento tipográfico de gran escala a mitad de página: pendiente.

No se modificó: titular del hero (copy canónico V6; se propone prueba con lectores reales), animación (misma secuencia), identidad, Primera Visita Digital ni el trabajo 100 % remoto.

## 4. Análisis competitivo visual (capturas reales, 2026-10-29)

Archivos: `competitors/*-d-hero.png`, `*-m-hero.png`, `*-d-scroll.png`, datos de estilos en el texto siguiente.

| Referencia | Qué se observó (visual, no solo texto) | Lectura para LSS |
|---|---|---|
| **BASIC/DEPT** | Una sola familia (SctoGroteskA), titular condensado en mayúsculas dentro de una «ventana» de cliente sobre vídeo a sangre; 35 animaciones activas; botón «Watch reel» circular; banner de cookies que tapa el borde inferior. En móvil el titular **se recorta por los lados** («OKIN’ HAS … OME») | Su prestigio viene del trabajo real mostrado. LSS no tiene casos y no los inventa: lo sustituye con una prueba medida de sí misma. Se confirma el criterio «un titular dominante y nada que compita». Defecto a evitar y ya cubierto por prueba: recorte horizontal en móvil |
| **Pentagram** | Una familia (Plain), fotografía de proyecto a sangre, una frase interactiva «We design [X] for [Y]», cero animaciones, nav blanca mínima; panel de cookies sobre el contenido | Premium por contención: una idea, sin adornos. LSS ya comparte la contención; le falta la fotografía de trabajo que no existe |
| **Geowiza** (competidor directo) | Cuatro familias, 786 elementos con radio, foto de stock de volcán, botón naranja redondeado, cifras «300+ / 20+», widget de chat + botón de WhatsApp + banner de cookies sobre el hero | Contraste directo: dos familias, cero radios, ningún widget, un solo CTA. La diferencia visual es real; la diferencia de **credenciales** (cifras, reseñas) es la que LSS no puede igualar sin evidencia |

Datos medidos (Playwright): BASIC 1 familia / 12 radios; Pentagram 1 familia / 274 radios; Geowiza 4 familias / 786 radios; LSS 2 familias / 0 radios.
Limitación: se capturó el primer pantallazo y un desplazamiento, no recorridos completos; la animación se contó (`document.getAnimations()`), no se evaluó su calidad.

## 5. Calificaciones de las críticas independientes (no son autocalificación)
| Crítica | Versión evaluada | Móvil | Escritorio | Premium |
|---|---|---|---|---|
| `CRITICA_V91_independiente.md` | V9.1 (`3dd9271`) | 26/40 | 27/40 | 6/10 |
| `CRITICA_V92_independiente.md` | V9.2 intermedia (antes de la ronda 2) | 29/40 | 30/40 | 6/10 |
| Versión final (V9.2 + ronda 2) | — | **sin re-puntuar** | **sin re-puntuar** | **sin re-puntuar** |

Ambas críticas son degradadas (un revisor; sin detector ni Assessment A/B aislados). El 28/40 anterior no se usa. Lo único que sube de forma comprobable entre V9.1 y la versión final es lo medido: 54 → 69 pruebas con criterios más exigentes, 10 → 9 secciones, 1 389 → 1 242 palabras, CTA duplicado y diagrama tapado en la primera pantalla móvil corregidos.

## 6. LCP móvil: mediciones reproducibles

Reproducir: `node lcp.mjs 5` (Lighthouse 12.8.2, móvil simulado, `next start` local) y `node lcpobs.mjs` (CDP: CPU ×4, 150 ms RTT, 1.6 Mbit/s).

| Medición | Resultado |
|---|---|
| Línea base V9.1, mediana de 5 | LCP 2.70 s · FCP 0.91 s · rendimiento 94 · TBT 151 ms |
| Versión final, mediana de 5 | LCP 2.73 s · FCP 0.91 s · rendimiento 93 · TBT 190 ms (rango de rendimiento 92–95; en ejecuciones intermedias con la máquina ocupada hubo valores de 83–87, que no se usan) |
| Lighthouse móvil, 1 corrida, 4 categorías | rendimiento 95 · accesibilidad 100 · buenas prácticas 100 · SEO 100 · LCP 2.7 s · CLS 0 |
| Lighthouse escritorio | 100 / 100 / 100 / 100 · LCP 0.6 s |
| LCP con CPU×4 + red emulada (tiempo real, PerformanceObserver) | **1.51 s**, igual que FCP; elemento H1 |
| Lighthouse sin throttling | 0.2 s |
| Aislamiento A: sin ningún `.js` | 1.96 s (−0.7 s) |
| Aislamiento B: sin fuentes | 2.69 s (sin cambio: las fuentes no son la causa) |
| Aislamiento C: bloqueando un chunk a la vez | −0.5 s (chunk de 70 KB, runtime de React) y −0.4 s (38 KB, cliente de Next); el resto de chunks, ±0.05 s |

Conclusión: el elemento LCP es el texto del H1 y se pinta junto con el primer contenido. El 2.7 s del laboratorio simulado lo explican los dos chunks del runtime de React/Next (≈ 0.9 s del modelo), no el contenido ni la animación. Intentos sin efecto medible: `prefetch={false}` en enlaces del pie, retirar la lista y el marco del hero, `font-display: optional` (ronda anterior), `inlineCss` (empeoró a 86, revertido). **Objetivo ≤ 2.5 s en laboratorio simulado: NO alcanzado.** Bajarlo exigiría cambiar de arquitectura (HTML estático sin hidratación de React), decisión de producto que no se tomó. Campo (CrUX): N/D.

## 7. Estado
- Versión privada: `http://localhost:3200` (`next start`). Capturas comparativas: `docs/v8/screenshots/compare/`.
- **V8 no se declara completo.** Quedan abiertos: 21st.dev (autorización del titular), aprobación humana creativa, prueba del titular con 5 propietarios, dispositivos reales y recepción real en WhatsApp, validación pública del JSON-LD, datos legales de privacidad/términos, precio/garantía/fotografía/casos aprobados, LCP simulado 2.7 s.
