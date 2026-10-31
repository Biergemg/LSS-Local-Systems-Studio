# LSS — Ejecución F5: SEO Audit + AI SEO (AEO/GEO/voz) + Schema
Fecha: 31 de octubre de 2026. Fuente: Prompt Maestro V8 canónico con 7 skills fijadas por SHA-256.
Sitio: https://www.lsslocalsystemsstudio.com
**Estado técnico:** implementación de F5 comprobada en local. **Estado de apariciones por IA:** evidencia insuficiente. No declarar V8 completo por estas pruebas.

## Fuente de las tres skills realmente consultadas y aplicada al código
- seo-audit, versión 2.2.2: orden rastreo/indexación → técnico → on-page → contenido → autoridad. Se revisaron robots, sitemap, canonicals, HTML visible, enlaces internos, responsive y rendimiento.
- ai-seo, versión 2.12.0: cartera de consultas de intención de contratación, contenido que responde preguntas reales, extractabilidad y medición de visibilidad sin confundir citas, recomendaciones o resultados de venta.
- schema, versión 2.0.2: JSON-LD que coincida con lo visible, tipos adecuados a las páginas y revisión de elegibilidad oficial.

## Problemas detectados y correcciones reales
1. La portada no tenía una URL específica para resolver la contratación de web, Google y WhatsApp. Se implementó /servicios/presencia-digital con seis preguntas y sus respuestas, un CTA verificable y cobertura remota explícita sin inventar oficinas.
2. Se añadieron enlaces desde la portada y el pie; la nueva ruta quedó en sitemap.xml con canonical propio, sin noindex.
3. Los esquemas Organization y WebSite quedan globales. FAQPage dejó de insertarse en todas las páginas y solo permanece en la portada, donde las FAQ son visibles. **Google retiró los resultados enriquecidos FAQ en mayo de 2026:** este marcado es semántico, no una promesa de rich results.
4. La nueva URL expone un Service JSON-LD con provider real y BreadcrumbList; no incluye reseñas, aggregateRating, direcciones inventadas, precios ni horarios inexistentes.
5. Lighthouse identificó un rol ARIA incompatible en el aviso de consentimiento. Se cambió el elemento HTML, preservando las decisiones de privacidad. Accesibilidad Lighthouse subió de 99 a 100 en la nueva ruta.

## Cartera de consultas (hipótesis de demanda, NO volúmenes medidos)
| Consulta conversacional | URL/fragmento de respuesta |
|---|---|
| ¿Quién hace páginas web profesionales para negocios de servicios? | /servicios/presencia-digital#quien-hace-paginas-web |
| ¿Cómo mejoro mi presencia en Google sin pagar anuncios? | /servicios/presencia-digital#mejorar-google |
| ¿Cómo conecto mi página web a WhatsApp? | /servicios/presencia-digital#web-whatsapp |
| ¿Qué hago si ya tengo página web? | /servicios/presencia-digital#ya-tengo-sitio |
| ¿Hay agencia web para negocios en Tampico, Ciudad Madero o Altamira? | /servicios/presencia-digital#tampico-ciudad-madero-altamira |
| ¿Cómo consigue mi negocio que lo encuentren en búsquedas por voz y asistentes de IA? | /servicios/presencia-digital#voz-asistentes |

Todas las respuestas son texto HTML rastreable, no texto oculto ni contenido inventado para un bot. Su código y pruebas se registran en evidence/aeo-2026-10-31/.

## Dos chequeos diferenciados de búsqueda — alcance limitado
- Google Search: la consulta pública automatizada fue bloqueada; NO se obtuvo una observación válida de posiciones.
- Bing Search: consulta "mejorar presencia en Google y WhatsApp para un negocio Ciudad Madero": LSS no se observó en la página recuperada. Esto NO demuestra que no se encuentre en ninguna página/país/personalización.
- DuckDuckGo: devolvió HTTP 202 en esta sesión; se considera inconclusivo hasta descartar la protección automatizada.
- **No se consultaron mediante sesión real las respuestas de Gemini, ChatGPT, Siri o Perplexity.** No afirmar que mencionan, recomiendan o no recomiendan LSS.
- Search Console: dominio previamente verificado, pero **sin extracción nueva de impresiones/consultas en esta ejecución**. La línea base cuantitativa permanece NO VERIFICADA. Publicar e indexar nuevas URLs no genera tráfico garantizado.

## 21st.dev
El transporte MCP de solo lectura confirmó autenticación y ejecutó una búsqueda de componentes "professional service editorial FAQ comparison design accessible", sin consumir descargas/créditos. Se mantuvo código propio porque ya se adapta a la identidad editorial de LSS; no se incorporó código externo sin licencia comprobada.

## QA reproducible en el equipo
- Next.js 16.2.4: tsc, ESLint y build PASS; ruta /servicios/presencia-digital prerenderizada.
- Playwright Chrome: 49/49 PASS, anchuras 320/390/768/1440, sin overflow, H1 único, 6 respuestas, navegación, contacto, canonical, sitemap y JSON-LD. axe 0 violaciones en 390 y 1440.
- 12 capturas de navegador (en el proyecto de QA; dos ejemplos versionados aquí).
- Lighthouse 12.8.2 local: móvil Performance 97, Accessibility 100, Best Practices 100, SEO 100; LCP 2.6 s, CLS 0. Escritorio 100/100/100/100, LCP 0.5 s. No son métricas de campo p75.
- Evidencia versionada: docs/v8/evidence/aeo-2026-10-31/browser-qa.json, lighthouse.json, search-probes.json y capturas.

## Límites y gate de publicación
**NO certificar 100 % V8** por esta tarea: la línea base de Search Console y las respuestas de asistentes de IA no se comprobaron, el LCP móvil de laboratorio superó por 0.1 s el umbral objetivo y la auditoría V8 completa con evidencias de nueve fases sigue sin expediente integral. La revisión visual y las 49 pruebas de navegador sí son evidencia de implementación F5, no resultados comerciales.
No existe schema especial para garantizar Google AI Overviews. Referencias oficiales:
- https://developers.google.com/search/docs/appearance/ai-features
- https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
- https://developers.google.com/search/updates
