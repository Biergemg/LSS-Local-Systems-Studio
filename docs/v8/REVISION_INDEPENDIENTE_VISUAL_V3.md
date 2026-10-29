# LSS WEB V8 — REVISIÓN VISUAL INDEPENDIENTE DE V3
**Fecha:** 2026-10-29
**Revisor:** externo al implementador; evidencia por capturas de pantalla V3 y reporte QA existente.
**Estado:** NO APROBADA todavía para publicación; mantener `v8/private-landing` y conservar los commits.

## Evidencia inspeccionada
- `v3-1440-hero.png` / `v3-390-hero.png`
- `v3-1440-ppv-atelier.png` / `v3-390-ppv-atelier.png` / `v3-1440-ppv-pigmento.png`
- `v3-1440-oferta.png` / `v3-390-oferta.png` / `v3-1440-cambio.png` / `v3-1440-proceso.png`
- `QA_EVIDENCE.md`, `PREMIUM_PERCEPTION_REVIEW.md`.
No se inspeccionó animación en vivo ni teléfonos físicos; no transformar esa limitación en PASS.

## Fortalezas demostradas
- Hero muestra una composición editorial del producto ficticio Casa Arroyo, superior al panel de texto V6.
- Identidad LSS reconocible (tinta/verde/papel), jerarquía, tipografía y CTA claros.
- PPV toma nombre/ciudad/servicio y presenta un ejemplo visual etiquetado.
- QA automático reportado: 46/46, axe 0 violaciones, Lighthouse móvil Perf 92–94 (LCP lab 3.0 s), escritorio 100.

## Hallazgos de diseño (prioridad crítica comercial)
**P1 — Demo uniforme y genérica:** las direcciones Atelier/Pigmento/Noche conservan prácticamente la misma composición, distinta paleta. Personalización por texto/colores no equivale a diseño de autor para cada sector. La PPV debe permitir experimentar **tres tratamientos compositivos realmente distintos** (tipografía, retícula, densidad, contenido de oferta, orden de información, tratamiento de imaginería), donde cada uno se sienta adecuado a un negocio real de servicios y no sea simple re-skin.

**P1 — Demostración visual insuficiente:** en v3-1440-ppv-atelier y pigmento, el elemento visual principal es una inicial y formas geométricas. Eso no muestra aún un resultado aspiracional comparable a sitios de estudios premium. Evaluar imágenes originales de demostración o elementos visuales profesionales y legalmente usables; diferenciar claramente la pieza editorial conceptual de fotografía/instalaciones/credenciales reales inexistentes. No inventar evidencias.

**P1 — Casillas vacías:** los recuadros «Tu fotografía real», «Tu credencial», «Una reseña verificada» indican qué se podría poner, pero hacen que el diseño se perciba como plantilla sin terminar. En demo conceptual, representarlos como zonas de ejemplo estilizadas o permitir aportación voluntaria de recursos propios; no fabricar reseñas ni testimonios. Eliminar casillas vacías del momento estelar.

**P1 — Valor visual llega tarde en móvil:** v3-390-hero muestra un titular y párrafo extensos más dos CTA antes del preview de Casa Arroyo. La muestra queda muy abajo del primer viewport. Incorporar un elemento visual fuerte en el primer viewport móvil y reducir el peso de lectura previa, sin esconder oferta/CTA.

**P2 — Mismo símbolo repetido en secciones:** el motivo geométrico/letra de la marca ficticia se reutiliza y homogeneiza el portafolio, reduciendo amplitud perceptible del estudio. Diferentes proyectos ficticios deberían exhibir lenguajes diferentes, claramente rotulados como propuestas conceptuales.

**P2 — Secciones de oferta/proceso dependen mayormente de tipografía y numerales:** correctas, pero la percepción de estudio premium depende de exhibir trabajos visuales, no solo de describir proceso. Introducir resultados demostrativos con función comercial sin aumentar carga por decoración.

## Requisitos V8 todavía incumplidos
- 21st.dev MCP sin autenticación ni búsquedas reales: **NO PASS**, aunque el diseño propio sea válido.
- `impeccable` completo: `critique` y escaneo renderizado no ejecutados; detector solo parcial.
- Lighthouse móvil LCP 3.0 s en laboratorio, objetivo interno <=2.5 s; perfilado del elemento y fuente pendiente.
- Revisión en teléfonos físicos y recepción real de WhatsApp no verificadas.
- Privacidad/términos son borradores noindex: necesitan datos y revisión legal previa a publicar.

## Gate para próxima ronda
1. El titular inicia sesión personalmente en la pestaña de 21st.dev abierta en su propia PC; callback se gestiona solo localmente, sin compartir códigos en chat.
2. Conectar MCP, ejecutar búsquedas reales, comparar componentes y licencias. No importar kits masivos ni pagar sin permiso.
3. Implementar **mejora material de la PPV**, no tres paletas de una composición única. Ver capturas antes/después de móvil y escritorio.
4. Ajustar hero móvil para que el preview comunique valor visual antes.
5. Completar `impeccable` visual de verdad; QA en navegador; perf y pruebas.
6. Entregar URL privada y capturas para aprobación humana. Nada de push, merge, deploy o cambios a `lss-web` original.

**Conclusión:** excelente avance técnico y mejor dirección editorial, pero la PPV aún no demuestra suficientemente la aspiración central «así quisiera que se viera mi empresa». El éxito de V8 depende de elevar el resultado visible, no de repetir pruebas ya aprobadas.
