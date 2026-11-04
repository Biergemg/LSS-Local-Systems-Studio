# INTEGRACIÓN REQUERIDA POR EL BOOTSTRAP V8 (24 OCT 2026)

**Control estricto de F4/F6:** efectuar y documentar búsqueda real cuando `21st` esté autenticado. Si el plugin de Claude señala Needs authentication, validar el transporte de solo lectura de V8 mediante `node scripts/21st-direct.mjs --check` y buscar con `--search "hero diseño"`; esto usa la credencial privada del equipo sin imprimirla y NO descarga componentes ni consume créditos de generación. Un plugin sin login y transporte directo con conexión válida se documenta como DIRECT_READ_ONLY_MCP (no confundir con plugin conectado). Si ambos fallan, BLOCKED.  comparar al menos 2 candidatos con fuente y licencia, decidir adoptar/adaptar/rechazar en función del buyer y UX, y demostrar QA en navegador del elegido. La instalación no equivale a conexión: si la salida del cliente dice `Needs authentication`, registrar `AUTH_REQUIRED`/`BLOCKED` y **NO afirmar integración ni V8 COMPLETO**. Ver `rules/execution-contract.md`. La consulta a 21st no obliga a gastar créditos ni a incluir código externo.


El agente debe intentar instalar el plugin/MCP oficial 21st y sus skills Explore, Build y Review antes de F1. La autenticación no puede simularse; si falta, reportar AUTH_REQUIRED y mantener G0 BLOCKED. No generar contenido pago ni consumir créditos sin permiso. Ver references/portabilidad-instalacion-automatica.md. Fuente: https://21st.dev/mcp y https://github.com/21st-dev/claude-code-plugin.

# V8 — Investigación de las capturas; 21st MCP y herramientas actuales
Fecha 2026-10-23. Investigado en documentación primaria.

## Interpretación de capturas
- Captura "Paso 3 Conectas 21st Dev": se refiere a **21st.dev** (biblioteca y marketplace de componentes UI, efectos, templates y MCP para agentes). No es plataforma capaz de certificar por sí sola una web premium ni un agente que garantiza producción.
- Captura GitHub `asgeirtj/system_prompts_leaks/Anthropic`: repositorio externo con presuntas transcripciones de prompts de Claude Design/Code. No es documentación oficial, no tiene autoridad operativa y no se copiarán ni instalarán prompts filtrados. Para V8, usar recursos públicos oficiales de agentes y UI, auditando licencias.

## 21st.dev — actualidad
- **Magic MCP pasó a llamarse 21st MCP.** Paquete `@21st-dev/magic` es proxy de compatibilidad; no usar como instalación nueva. Fuente https://github.com/21st-dev/magic-mcp
- Servidor oficial https://21st.dev/api/mcp; guía https://21st.dev/mcp. CLI `npm i -g @21st-dev/cli`; `21st login`; `npx @21st-dev/cli install-skill`. No ejecutar logins/instalaciones/consumo de créditos sin aprobación del propietario.
- Búsqueda anunciada libre; plan gratis incluye **2 obtenciones del código diarias**, generación con IA puede consumir créditos/plan. Ver límites vigentes en cuenta antes de operar.
- Buscar snippets y bloques como **inspiración inspeccionable**, comparar licencia, accesibilidad, mantenimiento, tamaño de bundles, dependencia y autor. Reutilizar pieza adaptada al token system; nunca instalar un kit entero sin revisión.
- Falta de cuenta/21st no bloquea la construcción: diseñar componentes originales con primitives CSS/HTML/Radix. En entrega consignar qué componentes vinieron de dónde.

## Evaluación comparativa y deduplicación
| Objetivo | Herramienta primaria | No confundir con |
|---|---|---|
| Dirección de arte y layout | Criterio creativo + `ui-ux-pro-max` | 21st (solo catálogo) |
| Elementos accesibles | HTML propio / shadcn/ui + Radix | Efectos genéricos de marketplace |
| Microinteracciones React | Motion (antes Framer Motion), `motion/react` | GSAP para cada hover |
| Storytelling/scroll complejo | GSAP + ScrollTrigger, si hay justificación | Motion ocupando mismo elemento |
| 3D interactivo significativo | Three.js / React Three Fiber bajo presupuesto | WebGL decorativo |
| Scroll | Scroll nativo; Lenis solo si probado necesario | Desactivar scroll/móvil |
| Prueba real | Playwright screenshots, interacciones, axe, Lighthouse | Auto-reporte de una skill |
| SEO contenido/metadata | `seo-audit` | `schema-markup` (JSON-LD) |
| Redacción vs estructura | `copywriting` vs `page-cro` / alias `cro` | Usar ambos para lo mismo |
| Crítica editorial | `impeccable` | Prueba de navegador independiente |

**Elegir un motor de animación por proyecto**: CSS para simple, Motion para React UI, GSAP para timelines/scroll complejo. Motion y GSAP juntos solo cuando cumplen trabajos aislados y se documenta el motivo. Usar una sola biblioteca de componentes/registry como insumo dominante; diseñar variantes originales.
Fuentes: https://21st.dev/mcp ; https://github.com/21st-dev/magic-mcp ; https://motion.dev/docs/react ; https://gsap.com/docs/v3/ ; https://playwright.dev/docs/screenshots ; https://www.w3.org/TR/WCAG22/ .
