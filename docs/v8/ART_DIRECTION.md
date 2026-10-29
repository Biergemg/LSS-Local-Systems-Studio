# ART_DIRECTION — ronda 3 «Plano de registro» (2026-10-29) — DEFINITIVA

Sustituye a las rondas 1 y 2 (abajo, históricas). Corrección estratégica del titular: la web de LSS es su propio proyecto premium; no hay demos, simuladores ni marcas ficticias.

## Por qué cambió
Las rondas 1–2 se alejaron del sistema de diseño real de LSS (`LSS Design System/README.md`): papel cálido, píldoras, brillos y serif no son LSS. LSS es «ingeniería, no agencia»: negro técnico, blanco estructural, verde señal solo como indicador, 90°/45°, cero curvas, cero degradados, cero sombras, diagramas como imagen.

## Territorios (Fase 1)
- **A — «Plano de registro» (elegido).** El logotipo (corchetes de encuadre + línea de señal) es el sistema: encuadres, numeración 01/02/03, diagramas de recorrido, filas y reglas de 1 px. Se deriva del insight del comprador: *«quiere comprobar, no que le prometan»*. Imagen = diagrama.
- **B — «Fotografía de oficio».** Imagen de instalaciones y trabajos reales. Descartado por ahora: LSS no tiene material propio ni casos aprobados y no se simulan; queda como evolución cuando existan.

## Firmas
- **Visual:** encuadre de cuatro esquinas + línea de señal (geometría exacta del logotipo) a escala monumental y como marco.
- **Funcional:** la propia estructura: recorrido numerado 01–03 (Primera Visita) que se traza en el hero y se repite en la metodología; «Acta de entrega» como formato de comprobación. No hay simuladores.

## Sistema
Tokens: `#0B0B0B`/`#111`, blanco, grises AA (`#B4B4B4` 9.6:1, `#8F8F8F` 5.9:1), verde `#00FF88`, papel frío neutro `#F1F1EE` (solo para ritmo en 4 capítulos). Tipografía: Space Grotesk 700 (display) + Inter Tight 400/700 (lectura); sin tercera familia. Cuadrícula de 8 px, reglas 1 px, radios 0.
Ritmo: tinta → papel → tinta → papel → tinta → papel → tinta → papel → tinta. Hero, método y cierre usan escala mega; creencia, oferta y presupuesto usan composiciones distintas (filas, rejilla 7/5/5/7, tabla).
Movimiento (CSS, un solo motor): trazado de la línea de señal en el hero (1.8 s, lineal), revelado por scroll y barra de progreso con `animation-timeline` (mejora progresiva), línea del proceso que se dibuja. `prefers-reduced-motion` → estado final inmediato (verificado).
Recursos: ningún asset de terceros; SVG propio en `FlowMark.tsx`, `Mark.tsx`, `Corners.tsx`. Fotografía: ninguna (no existe material propio ni aprobado).

## Keyframes reales (`docs/v8/screenshots/`)
Hero: `v9-1440-hero.png`, `v9-390-hero.png` · Firma/método: `v9-1440-prueba.png`, `v9-390-prueba.png` · Cierre: `v9-1440-contacto.png`, `v9-390-contacto.png`. Resto de secciones: `v9-{390,1440}-*.png`. Comparación: `before-*` (web original), `v3-*` (ronda 2 con demo).

## Descartado y retirado (historial en Git: `439badc`)
Demo interactiva PPV (`PpvDemo`), marcas ficticias (Casa Arroyo), direcciones Atelier/Noche/Pigmento, ilustración generativa repetida (`BrandArt`), serif Instrument Serif, papel cálido, botones redondeados, brillos radiales, sombras. La Primera Visita queda como metodología explicada (3 observaciones), no como aplicación.

## 21st.dev
BLOQUEADO (ver QA_EVIDENCE). No se importó nada; la dirección es propia.

---
## Rondas 1–2 (históricas)

# ART_DIRECTION — ronda 2 «Estudio editorial» (2026-10-29)

Sustituye a la ronda 1 (abajo, histórico).

**Cambio y justificación.** Se conserva la identidad LSS (tinta #0B0B0B, verde #00FF88, logotipo, Space Grotesk) y se eleva su expresión:
1. Alternancia tinta/papel por capítulo: da ritmo y evita bloques oscuros monótonos.
2. Instrument Serif itálica como voz editorial (numerales, citas, arte).
3. Titulares a gran escala.
4. Hero con composición de marca ficticia («Casa Arroyo», rotulada) en lugar de un panel de texto.
5. La Prueba de la Primera Visita pasó de alternar textos a recomponer una web completa con 3 direcciones de arte (Atelier, Noche, Pigmento), transición circular y entrada escalonada; se ejecuta sola al llegar.
6. Revelado por scroll y barra de progreso solo con `animation-timeline` (mejora progresiva; desactivado con reduced-motion).
7. WhatsApp: barra inferior móvil que se retira ante otros CTA; sin flotante en escritorio (el menú lo lleva fijo).

Recomendación aplicada de ui-ux-pro-max (`ui-ux-pro-max-search.txt`): patrón *Scroll-Triggered Storytelling* con indicador de progreso y estado final legible con reduced-motion.

Recursos visuales: SVG generativo propio (`components/ui/BrandArt.tsx`); sin fotos de terceros.

---
## Ronda 1 (histórico)

# ART_DIRECTION — LSS V6 sobre V8 (2026-10-29)

Infraestructura elegida: **B (Next.js 16 / React 19 / Tailwind v4 existentes)**, evolucionando el diseño actual, sin reconstruir. Conversión primaria: **WhatsApp** (nombre, ciudad, servicio). Secundaria: leer «La prueba».

## Matriz de decisión
Urgencia media · sensibilidad al precio alta · autoridad alta · cercanía media · teatralidad baja · complejidad media-alta. Resultado: tono directo de propietario, densidad media, mucha explicación y poca decoración, sin escasez ni cifras.

## Territorios
- **A — «Expediente de la primera visita» (elegido).** Base oscura y verde LSS heredados + una hoja de papel cálido (`#F3F0E8`) que representa lo que ve un desconocido. Tipografía Space Grotesk en frase normal (sin versalitas con tracking), Inter Tight para lectura. Razón: hace visible el mecanismo (PPV) y conserva la identidad existente.
- **B — «Papel completo».** Página clara, serif editorial. Descartado: rompe la identidad actual, pierde contraste de marca y no diferencia el mecanismo.

## Firmas
- **Visual:** alternancia tinta/papel; el papel se reserva a *lo que el visitante ve* (hero-dossier, PPV, evidencia). Subrayado verde solo como marcador, números en círculo en el proceso.
- **Funcional:** **demo de la Prueba de la Primera Visita** (`components/ui/PpvDemo.tsx`): el visitante escribe nombre, ciudad y servicio; ve una vista conceptual «dispersa / ordenada» con sus datos; el botón abre WhatsApp con el mensaje ya redactado. Cliente únicamente, sin envío, etiquetada como demostración conceptual.

## Keyframes (capturas reales en `docs/v8/screenshots/`)
Hero: `after-1440-hero.png`, `after-390-hero.png` · Firma: `s-1440-prueba.png`, `s-390-prueba.png` · CTA/cierre: `after-*-full.png`. Comparación: `before-*`.

## Tokens
Tinta `#0B0B0B/#111/#181818`, texto `#fff / #B4B4B4 (9.6:1) / #8F8F8F (5.9:1)`, acento `#00FF88`, papel `#F3F0E8`, tinta sobre papel `#141414`, verde sobre papel `#006B3C (5.6:1)`. Grises anteriores (#6E6E6E, #3A3A3A) no cumplían AA y se sustituyeron.

## Movimiento
Motor único: **CSS**. Una animación de entrada (`rise`, 0.6 s) solo en el panel del hero; el texto del hero no se anima para no retrasar el LCP. `prefers-reduced-motion` la desactiva (verificado). Sin Motion, GSAP, Lenis ni WebGL.

## Componentes y licencias
HTML/CSS propios; `<details>` nativo para FAQ y alcance técnico; sin dependencias nuevas (`package.json` intacto). Fuentes: Space Grotesk e Inter Tight vía `next/font` (OFL). Sin fotos ni imágenes nuevas: nada simulado como instalaciones o clientes reales.

## 21st.dev
Ver `QA_EVIDENCE.md` §4: **BLOQUEADO — falta autorización OAuth del titular**. No se importó ningún componente de 21st.dev.

## Descartado
Casos, testimonios, métricas, precio $34,900, LSS Activo, garantía y «primer año incluido»: no aprobados para publicación (matriz H de la oferta V6). Sección de garantía omitida; el pago por hitos no se menciona. Dashboard/IA falsos: no.
