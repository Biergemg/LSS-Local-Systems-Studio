# V8 — Stack, pruebas y evidencia 2026

## Selección por infraestructura real
A. HTML demo premium: página realmente abrible, JS contenido, CSS moderno con grid, container queries, `clamp()`, media queries y estados accesibles. No pretender que la demo es app en producción.
B. Next.js App Router, TypeScript strict, RSC por defecto; Motion o GSAP **solo si se justifica**; Tailwind o CSS Modules, tokens de diseño, Radix/shadcn selectivos, metadata y data/SEO. Verificar versión exacta vigente por fecha.
C. Astro con islands para contenido y narrativas editoriales ligeras; puede ser tan premium como Next, no confundir menor JS con menor estética.
D. Si existe CMS/plataforma real (Shopify, Webflow, WordPress): **integrar en la existente** según sus capacidades y permisos, sin reconstruir un storefront en Next artificialmente. La prohibición original absoluta de WordPress no corresponde si cliente ya lo usa.
No hace falta que todo proyecto tenga blog ni WooCommerce. Si el encargo demanda sitio multipágina, hacer IA de páginas en vez de forzar una landing única. Separar data/content, assets, UI y comportamiento.

## Componentes
1. HTML/CSS semánticos; 2. Primitivas accesibles; 3. 21st.dev solo investigación e integración de pieza autorizada auditada; 4. componente original de estudio. Licencia por pieza y asset.
- Motion: https://motion.dev/docs/react
- GSAP: https://gsap.com/docs/v3/ revisar licencia de caso de uso
- 21st MCP: https://21st.dev/mcp; **no** consumir créditos sin aprobación
- Playwright: https://playwright.dev/docs/screenshots

## Presupuesto técnico de producción
- Core Web Vitals en datos de campo p75: LCP ≤2.5 s, INP ≤200 ms, CLS ≤0.1. Estos son objetivos de Google, **no métricas garantizadas** ni equivalentes a Lighthouse lab. Fuente https://developers.google.com/search/docs/appearance/core-web-vitals
- Presupuesto JS en cliente desde baseline y bundle analyser: toda dependencia añadida debe tener justificación y prueba; evitar hidratar toda la página.
- WCAG 2.2 AA objetivo; axe automatable + recorrido manual keyboard, focus, contraste, errores, screen reader donde sea posible.
- Responsive: screenshots 320x720, 390x844, 768x1024, 1440x900. Control de scroll horizontal, clipping, orden tab, sticky overlays, CTA e interacción firma.
- QA: build/typecheck/lint, console y network, prueba de formularios (real/dummy declarado), enlaces internos, botón WhatsApp/call si aplica, schema sin datos falsos, títulos/canonical.
- Enlaces y tracking verdaderos. Cuando no hay cuenta de analítica ni formularios conectados, NO afirmar “conversión instrumentada”: etiquetar pendiente/bloqueado.
- Seguridad/licencias: claves fuera de fuente, activos legales, no bibliotecas nuevas con licencias opacas o dependencias no auditadas.

## Salidas verificables
`ART_DIRECTION.md` + `QA_EVIDENCE.md` + `screenshots/` + build manifest + issues de severidad P0/P1/P2. Declarar PASS solo con evidencia fechada; BLOCKED si no hay navegador/acceso o se necesita acción del cliente. No publicar ni comprar sin autorización.
