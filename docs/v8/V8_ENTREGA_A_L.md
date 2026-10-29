# V8 — Entrega A–L (ronda 3, 2026-10-29)

**A. Diagnóstico.** Negocio: LSS (estudio de web + Google + WhatsApp) vende «Presencia Resuelta» a negocios de servicios locales que venden por cita o cotización (México). Objeción principal: «¿por qué pagar si tengo redes?». Mecanismo de confianza real: método comprobable (Primera Visita, acta de entrega); no hay casos ni testimonios aprobados.
**B. Matriz.** Urgencia media · sensibilidad al precio alta · autoridad alta · cercanía media · teatralidad baja · complejidad media-alta → tono directo, densidad media, mucha explicación, cero escasez/cifras.
**C. Infraestructura.** B (Next.js 16 / React 19 / TS / Tailwind v4 existentes), evolucionada sin reconstruir. Conversión primaria: WhatsApp (nombre, ciudad, servicio). Secundaria: leer «La prueba».
**D. Dirección visual.** «Plano de registro» (ver `ART_DIRECTION.md`): identidad real de LSS, diagramas como imagen.
**E. Arquitectura de conversión.** Hero → Creencia (¿por qué si tengo redes?) → Método/Primera Visita → 4 preguntas del cliente → Oferta → Proceso → Entrega comprobada → Presupuesto/continuidad → FAQ → Cierre. CTA WhatsApp en menú, hero, método, oferta, entrega, cierre y barra móvil.
**F. Copy.** `data/content.ts` (fuente V6 refinada; sin precios/garantías/casos). Anti-IA: sin «siguiente nivel», «no es solo…», «sin fricción», «soluciones innovadoras», antítesis ni defensivas (prueba automática).
**G. Sistema visual.** `ART_DIRECTION.md`, `app/globals.css`, keyframes en `screenshots/v9-*`.
**H. Código.** Worktree `lss-web-v8`, rama `v8/private-landing`; vista privada `http://localhost:3200` (`next start`). QA: `QA_EVIDENCE.md`, `qa3.mjs`.
**I. SEO + JSON-LD.** Title «LSS | Web, Google y contacto para negocios de servicios» (55), description 148, canonical `/`, OG/Twitter, `robots.ts`, `sitemap.ts`; JSON-LD ProfessionalService + WebSite + FAQPage sin horario, dirección, valoraciones ni precios. FAQPage solo como semántica de contenido visible (Google retiró el rich result).
**J. Propuesta WaaS.** Mantenimiento mensual separado de la instalación (revisión de contenido, presencia local, funcionamiento de contactos, informe); upsells: fotografía, páginas adicionales; fase 2: medición GA4/Search Console con autorización. Sin precio publicado hasta aprobar costeo.
**K. Versión austera.** 80 % del impacto: hero + método + oferta + proceso + cierre (sin presupuesto/FAQ/preguntas del cliente); quita ~40 % del scroll.
**L. Supuestos, gates y estado.** Supuestos: sin fotos/casos propios; número de WhatsApp y correo de `data/content.ts` verificados por el titular en rondas previas. Gates: G0 PASS · G1 PASS · G2 PASS parcial (3 referencias con URL/fecha, 2 territorios, keyframes; sin 2.ª referencia de excelencia visual analizada en color/animación) · G3 PASS (sin dependencias nuevas; 21st **BLOCKED**) · G4 PASS · G5 PASS técnico + crítica independiente 28/40 previa a correcciones, **sin aprobación humana** · G6 PASS (enlaces; recepción real no probada) · G7 PARCIAL (LCP móvil lab 2.6 s; campo N/D) · G8 PASS para P0/P1 encontrados · G9 **NO publicable** (ver bloqueos en `QA_EVIDENCE.md`).

## Skills (evidencia real)
| Skill | Evidencia |
|---|---|
| copywriting | Invocada; copy V6 refinado; auditoría anti-IA automática (frases prohibidas) |
| cro / page-cro | Invocada; secuencia V6 «¿por qué pagar? → ¿qué cambia? → ¿cómo sé? → ¿qué recibo? → ¿cómo se prueba? → ¿cuánto? → ¿qué conservo? → ¿qué hago?»; CTA en primer viewport móvil (captura `v9-390-hero.png`) |
| ui-ux-pro-max | `search.py` ejecutado con Python 3.12 (`ui-ux-pro-max-search.txt`) |
| seo-audit | Invocada; título, description, H1 único, canonical, OG, robots/sitemap verificados por Playwright |
| schema / schema-markup | Invocada; JSON-LD verificable y coincidente con el contenido visible |
| impeccable | `critique` completo (A subagente independiente + B detector) — `IMPECCABLE_CRITIQUE.md`; escaneo de URL no ejecutado |
| 21st.dev | **BLOCKED** (OAuth del titular pendiente) |

---
**Actualización 2026-10-29 (V9.2):** el estado de gates y las matrices de esta entrega quedan **superadas** por `AUDITORIA_FINAL_V9_2.md` (matriz de las seis skills con PASS/FAIL/BLOCKED, 69 pruebas con criterios corregidos, dos críticas independientes, LCP con mediciones reproducibles). V8 **no** se declara completo.
