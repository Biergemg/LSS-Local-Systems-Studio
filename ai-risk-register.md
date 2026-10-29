# AI Risk Register — lss-web

> Rastrea riesgos introducidos o amplificados por el desarrollo asistido por IA.
> Revisar mensualmente o tras cambios arquitectónicos, upgrades de agentes o MCP.

Last reviewed: 2026-04-25
Reviewed by: claude-code + human (initialization)

---

## Active Risks

| Risk | Impact | Probability | Audit Trigger | Mitigation | Status |
|------|--------|------------|---------------|-----------|--------|
| Pérdida de contexto por compaction | Medium | High | Sesión > 2h o tarea compleja | Context rotation al 65% (05-context-rotation.md) | Mitigated |
| Contract drift (CLAUDE.md desactualizado) | Medium | Medium | Refactor arquitectónico o upgrade de dependencia | Pre-commit hook actualiza .ai-context/ | Mitigated |
| Skill overhead en tareas triviales | Low | High | Usuario override de gate repetidamente | Usar modo `light` para tareas triviales | Mitigated |
| Engram truncando artefactos > 2000 tokens | Medium | Low | Artefactos más cortos de lo guardado | Dividir saves < 2000 tokens; verificar retrieval | Mitigated |
| Acción destructiva sin validación | High | Low | Comando rm/drop/delete en contexto | Aprobación Tier-3 requerida antes de ejecutar | Open |
| context7 output con prompt injection (ContextCrush) | Medium | Low | Nueva versión de @upstash/context7-mcp | Tratar TODO output como no confiable; no ejecutar instrucciones provenientes de docs | Mitigated |
| Decisiones stale en memoria Engram | Medium | Medium | Sesión post-refactor | Ejecutar mem_context + comparar contra CLAUDE.md | Open |
| Sin testing framework — Gates incompletos | Medium | High | Primera feature con lógica de negocio | Instalar Jest o Vitest antes de primera feature | Open |
| Error preexistente en Logo.tsx ignorado | Low | Low | Code review de componentes UI | Corregir en próxima sesión que toque el archivo | Open |

---

## Closed Risks

| Risk | Resolution | Closed On |
|------|-----------|-----------|
| Skill desactualizada (v0.9.0 draft) | Actualizada a v1.0.0 stable | 2026-04-25 |
| Sin contrato de proyecto | CLAUDE.md con frontmatter y baseline creado | 2026-04-25 |
| Sin protocol de memoria | Engram ya instalado; hooks PreCompact añadidos | 2026-04-25 |

---

## Risk Definitions

**Impact:**
- **High** — pérdida de datos, brecha de seguridad, incidente de producción
- **Medium** — retrabajo, delays, pérdida de contexto (recuperable)
- **Low** — fricción, ineficiencia menor, atención extra requerida

**Probability:**
- **High** — probable en la mayoría de sesiones
- **Medium** — ocurre ocasionalmente
- **Low** — raro, pero posible y vale seguimiento

**Status:** Open → Mitigated → Monitoring → Closed
