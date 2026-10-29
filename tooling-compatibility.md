# Tooling Compatibility — lss-web

> Mapa per-proyecto de qué agentes de IA están en uso, qué capacidades están
> activas, y qué fallbacks están en efecto.

Last updated: 2026-04-25
Updated by: claude-code (initialization)

---

## Active Agents

| Agent | Version | Role | Configuration | Support Level |
|-------|---------|------|---------------|---------------|
| Claude Code | latest (claude-sonnet-4-6) | Desarrollo principal | ~/.claude/skills/ + ~/.claude/settings.json | Complete |

---

## Capability Status

| Capability | Available | Configuration | Fallback Active |
|------------|-----------|---------------|-----------------|
| Persistent memory (Engram) | yes | ~/.claude/settings.json → mcpServers.engram | Native memory fallback |
| MCP servers | yes | ~/.claude/settings.json | N/A |
| Hooks (automated) | yes (parcial) | ~/.claude/settings.json → hooks | Manual checkpoints si hook falla |
| Subagent dispatch | yes | Via Agent tool en Claude Code | Manual review checklist |
| Skill auto-loading | yes | ~/.claude/skills/advanced-ai-dev-skill/ | Manual @-mention si no carga |
| Native memory | yes | ~/.claude/projects/…/memory/ | CLAUDE.md + HANDOVER.md |

---

## Active MCP Servers

| Server | Transport | Scope | Verified | Permissions |
|--------|-----------|-------|----------|-------------|
| engram | stdio | user | 2026-04-25 | mem_save, mem_context, mem_search, mem_session_summary |
| context7 | stdio | user | 2026-04-25 | resolve_library_id, get_library_docs — output NO confiable (ContextCrush) |

---

## Known Conflicts and Limitations

- Engram trunca silenciosamente artefactos > ~2000 tokens — dividir antes de guardar
- El hook SessionStart de superpowers puede conflictuar con el hook de HANDOVER si ambos generan output largo — monitoreado
- Sin testing framework configurado — Gates 1 y 2 no pueden verificar tests hasta que se instale uno

---

## Degraded Mode Declaration

**Sin degradación activa.** Todas las capacidades principales disponibles.
Nota: hooks parcialmente activos (SessionStart tiene dos comandos, PreCompact añadido).

---

## Onboarding for New Team Members

1. Instalar Claude Code
2. Instalar Engram: `brew install gentleman-programming/tap/engram` (macOS) o descargar binario para Linux
3. Configurar Engram MCP en `~/.claude/settings.json` (ver configuración actual del repositorio)
4. Leer CLAUDE.md — ya está en la raíz del repo
5. Ejecutar `npm install` para dependencias del proyecto
6. Ejecutar `npm run lint` — debe mostrar 1 error preexistente en Logo.tsx (no bloquea)

Known issues en primer setup: ninguno documentado aún.
