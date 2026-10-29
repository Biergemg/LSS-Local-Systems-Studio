# impeccable `critique` — proceso completo (2026-10-29)

Proceso según `~/.codex/skills/impeccable/reference/critique.md` (impeccable v3.8.0). Objetivo: la landing privada en http://localhost:3200 (worktree `lss-web-v8`).

## Assessment A — revisión de dirección de diseño (subagente independiente, sin ver el detector)
Revisó las capturas `v7-*` (8 de 1440 px y 1 de 390 px; no vio las demás de 390 ni la página viva). Resultado literal resumido:

- **Veredicto:** «plantilla bien ejecutada, no autoría». Sin tells clásicos (degradados, tarjetas redondeadas, glass), pero estructura repetida: eyebrow + titular enorme + párrafo a la derecha en cada sección; wireframe del hero genérico.
- **Nielsen: 28/40** (lenguaje 4; consistencia 2; flexibilidad 2; recuperación de errores 2 «no evaluable»).
- **Fortalezas:** copy específico y comprobable; identidad respetada (cero curvas/sombras/degradados); «Acta de entrega» como objeto de interfaz.
- **P1:** ritmo/composición monótonos; ausencia de un artefacto propio que sirva de portafolio (wireframe genérico); jerarquía de CTA con tres etiquetas distintas.
- **P2:** verde usado más allá de «indicador»; ausencia de precio (decisión comercial vigente).
- **Veredicto honesto:** «todavía no es pieza de portafolio de nivel estudio premium»; con las correcciones estimó ~34/40.

### Observaciones del revisor que NO se aceptan (con motivo)
- «El CTA primario lleva a un formulario»: no existe formulario; todos los CTA abren WhatsApp. La etiqueta se unificó igualmente.
- «Precio ausente»: precios y garantías no están aprobados para publicación (matriz H de la oferta V6); se mantiene.
- «Falta WhatsApp en el hero de escritorio»: el CTA primario del hero y el botón del menú abren WhatsApp; se añadió el microcopy «Se abre WhatsApp…» para hacerlo explícito.

## Assessment B — detector + navegador
- `detect.mjs --json app components`: **0 hallazgos** tras los cambios (antes: 1 aviso *overused-font* sobre Space Grotesk y la línea `Arial` del estado «antes» de la demo, ya eliminada).
- Escaneo de URL renderizada y overlay en navegador: **no ejecutados** (el detector pide `puppeteer`, no instalado; no se instala sin autorización). Evidencia visual alternativa: capturas Playwright + revisión manual.

## Síntesis y correcciones aplicadas (P1/P2)
| Hallazgo | Corrección |
|---|---|
| Wireframe genérico en el hero | Sustituido por `FlowMark`: la geometría real del logotipo (corchetes + línea de señal) con los tres puntos de la Primera Visita (01/02/03) trazados sobre el recorrido |
| Ritmo monótono | «Creencia» ahora en filas con nombres de canal a gran escala; «Oferta» en rejilla asimétrica (7/5/5/7) con titulares de dos escalas; titulares limitados a 3 líneas (`.display` máx. 60 px, 22ch); marca monumental en «La prueba» y en el cierre |
| Verde sobrecargado | Eyebrows e índices pasan a blanco/gris con marcador cuadrado verde; el verde queda para CTA, señal, nodos y barra de progreso |
| Etiquetas de CTA | Barra móvil «Revisar mi negocio por WhatsApp» = botón del menú; hero y cierre conservan el verbo del copy V6; microcopy explícito |
| Franja clara bajo el nav | `scroll-padding-top` = alto exacto del nav |
| Marco verde cortado | Marca totalmente visible (`right: 4%`) |
| Foco tapado por la barra móvil | `scroll-margin-block: 80px` en elementos focables (prueba automática incluida) |

## No resuelto
- Sigue siendo una landing tipográfica y de diagramas: sin fotografía real, casos ni capturas de trabajo propio (no existen y no se inventan). Es el mayor techo de «valor percibido» y debe cerrarse con material real.
- Nielsen 28/40 es el puntaje del revisor **antes** de las correcciones; no se re-puntuó tras ellas (sería autoevaluación). Pendiente: segunda pasada independiente y revisión humana del titular.
