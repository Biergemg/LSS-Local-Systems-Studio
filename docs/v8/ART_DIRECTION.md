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
