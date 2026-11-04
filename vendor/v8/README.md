# PROMPT MAESTRO V8 ORCHESTRATOR

## ÚNICA FUENTE OPERATIVA Y GATES OBLIGATORIOS

**AI SEO ES OBLIGATORIA:** Séptima capacidad exigida junto a Copywriting, CRO, UX/UI, SEO Audit, Schema e Impeccable. Las siete quedan fijadas por SHA256 en `vendor/marketing-skills` (AI SEO, SEO Audit, Schema) y `vendor/locked-skills` (Copywriting, CRO, UX/UI, Impeccable), con licencias conservadas. `node scripts/sync-marketing-skills.mjs --check --target claude` bloquea cualquier divergencia, y `--install` sincroniza/archiva. Cada entrega exige evidencia de ejecución diferenciada, incluido un mapa de consultas conversacionales y dos sondeos fechados; ver `rules/aeo-geo-evidence.md`. Nunca basta con instalarla.

La carpeta actual es la fuente canónica. Los ZIP y copias de `~/.claude/skills` son **réplicas verificadas**, no productos separados. Ver `rules/execution-contract.md`.

- `node scripts/verify-integrity.mjs --verify`: compara hashes de **todos** los archivos de la skill contra el lock.
- `node scripts/bootstrap-v8.mjs --check --target claude`: comprueba siete capacidades obligatorias y 21st. Si el plugin pide iniciar sesión, prueba el transporte propio de **solo lectura**; la clave permanece en la carpeta privada del usuario y nunca entra al ZIP.
- `node scripts/21st-direct.mjs --check` y `node scripts/21st-direct.mjs --search "servicios editoriales"`: conexión y consulta reales sin gastar obtenciones, pagos ni créditos de generación.
- `node scripts/sync-v8.mjs --check --target claude`: detecta diferencias con la copia instalada.
- `node scripts/sync-v8.mjs --sync --target claude`: sincroniza la copia de Claude, conservando la anterior fuera de las carpetas de skills activas.
- `node scripts/verify-delivery.mjs --project <ruta> --evidence <ruta>/V8_DELIVERY_EVIDENCE.json --mode production`: verifica gates, habilidades, componentes, flujos, capturas, accesibilidad, compilación, 21st y autorización. Sin exit 0 no hay sitio PUBLICABLE.
- `node scripts/test-v8.mjs`: regresiones del validador y rechazo de evidencia ausente o falsa.

**Nota:** los documentos PDF antiguos son históricos, no prompts ejecutables; la única skill activa debe estar sincronizada y pasar el lock.


Sistema de adquisición local premium. Skill orquestadora para Claude Code.

## Qué hace

Construye sistemas web de adquisición local premium coordinando 6 skills especializadas en un flujo de 9 fases con enforcement estricto. No genera landing pages genéricas. Produce activos digitales ejecutables, comercialmente útiles y estructurados como WaaS.

## Estructura

```
prompt-maestro-v8-orchestrator/
├── SKILL.md                    ← Skill principal (punto de entrada)
├── manifest.yaml               ← Definición de la skill para Claude Code
├── orchestration/
│   ├── flow.md                 ← Diagrama y lógica del flujo de 9 fases
│   └── skill-routing.md        ← Tabla de routing + fallbacks por skill
├── rules/
│   ├── enforcement.md          ← Enforcement por skill + protocolos de corrección
│   └── guardrails.md           ← Prohibiciones + jerarquía de prioridades + filtro de calidad
├── templates/
│   ├── input_schema.json       ← Schema del business brief
│   └── output_schema.json      ← Schema de los 12 bloques de entrega A-L
└── examples/
    ├── example_input.md        ← Ejemplo: Clínica Dental Madrid
    └── example_output.md       ← Output completo del ejemplo
```

## PORTABILIDAD: AUTOINSTALACIÓN OBLIGATORIA ANTES DE F1

La skill contiene scripts/bootstrap-v8.mjs y references/portabilidad-instalacion-automatica.md. Al trasladarla a Windows, macOS o Linux, el agente debe detectar, buscar, descargar, instalar y verificar automáticamente las seis skills requeridas y la integración 21st.dev cuando el entorno lo permita; no basta declarar DEPENDENCY_MISSING.

Ejecutar desde la raíz de V8: node scripts/bootstrap-v8.mjs --check --target auto; node scripts/bootstrap-v8.mjs --install --target auto; node scripts/bootstrap-v8.mjs --check --target auto. Los paquetes de UI/testing del proyecto se instalan SOLO cuando la arquitectura los requiere.

Falta de cuenta, token, derechos, red o consentimiento para costo permite AUTH_REQUIRED / BLOCKED documentado, NO un falso PASS. La instalación de 21st MCP es exigible como intento, pero consumir créditos/componentes es opcional. No afectar otros proyectos ni sesiones activas.

## Cómo usar

1. Completa un business brief siguiendo `templates/input_schema.json`
2. Invoca la skill con `/prompt-maestro-v8-orchestrator` en Claude Code
3. V8 ejecuta las 9 fases en orden estricto
4. Recibes los 12 bloques A-L en la entrega final

## Skills externas requeridas

| Skill | Fase | Función |
|-------|------|---------|
| `copywriting` | 2 | Propuesta de valor, hero, titulares, objeciones, CTA, FAQ |
| `page-cro` | 3 | Validación de arquitectura, fricción, claridad en 5 segundos |
| `ui-ux-pro-max` | 4 | Jerarquía visual, UX móvil, componentes justificados |
| `seo-audit` | 5 | Metadata, estructura semántica, headings |
| `schema-markup` | 5 | JSON-LD LocalBusiness o subtipo específico |
| `impeccable` | 7 | QA final — errores, inconsistencias, problemas UX y conversión |

Si falta una skill, V8 debe intentar primero su instalación y verificarla. Solo un bloqueo técnico justificado permite fallback interno con G0 BLOCKED.

## Output garantizado

```
A. Diagnóstico estratégico
B. Matriz de decisión
C. Infraestructura + justificación
D. Dirección visual
E. Arquitectura de conversión
F. Copy completo por sección
G. Sistema visual detallado
H. Código ejecutable completo
I. Metadata SEO + JSON-LD
J. Propuesta WaaS
K. Versión austera
L. Supuestos y huecos detectados
```

## Reglas que V8 nunca rompe

- Jerarquía de prioridades: claridad > conversión > credibilidad > nicho > UX móvil > visual > rendimiento > animación
- Prohibido saltarse fases
- Prohibido entregar sin pasar por QA (Fase 7)
- Prohibido claims sin evidencia
- Prohibido fotos mediocres como base visual
- Prohibido que el flujo se detenga por dependencia faltante

## ACTUALIZACIÓN V8 — 23 OCT 2026 (MISMO NOMBRE, SIN V9)

- Se añadió una capa creativa de **estudio/agencia premium**: dos conceptos de diseño, tres keyframes desktop/móvil, firma visual distintiva y una firma interactiva que funciona.
- 21st.dev es biblioteca/MCP **opcional** de componentes (su antiguo Magic MCP se llama 21st MCP). No genera automáticamente un sitio inigualable. Buscar primero, auditar código/licencias antes de integrar; créditos pagados requieren autorización.
- Se aplicó deduplicación: ui-ux-pro-max dirige UX/arte; 21st busca componentes; Motion hace microinteracciones; GSAP solo secuencias complejas; impeccable critica; Playwright/Lighthouse/axe aportan evidencia. No apilar estas herramientas por moda.
- Se conserva el sistema de **9 fases y entregables A–L**; ahora G0–G9 son checkpoints dentro de ellas. La ausencia de navegador o tests mantiene **BLOCKED** la aprobación para publicación.
- Se aceptan plataformas existentes (Shopify, WordPress, Webflow) y sitios multipágina cuando la operación lo requiera.
- Entregables adicionales por proyecto: ART_DIRECTION.md, QA_EVIDENCE.md, capturas hero/experiencia/footer en 390px y 1440px y registro de licencias.
- **Archivo base**: SKILL.md, referencias y schemas. El PDF inicial V8 se mantiene como documento histórico y no sustituye al skill operable.
- **Copia de respaldo**: carpeta hermana BACKUP_V8_PRE_ACTUALIZACION_2026-10-23.
- **Comprobar coherencia**: node scripts/audit-v8.mjs

Fuentes: https://21st.dev/mcp | https://github.com/21st-dev/magic-mcp | https://motion.dev/docs/react | https://gsap.com/docs/v3/ | https://developers.google.com/search/docs/appearance/core-web-vitals
