<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# AGENTS.md — Multi-Agent Coordination

> Define qué agente maneja qué fase, el protocolo de handoff entre fases,
> y el exit gate que cada fase debe cumplir antes de que comience la siguiente.

---

## Phase Table

| Phase | Agent / Role | Produces | Consumes | Exit Gate |
|-------|-------------|----------|----------|-----------|
| `init` | Setup agent | CLAUDE.md, baseline | — | Contrato cargado; agente conoce el stack sin necesidad de que le digan |
| `explore` | Research agent | Mapa de arquitectura, lista de dependencias | CLAUDE.md | Agente describe estructura y restricciones del proyecto correctamente |
| `propose` | Design agent | 2–3 opciones de solución con tradeoffs | Explore output | Humano selecciona opción |
| `spec` | Spec agent | Documento de especificación detallado | Selected proposal | Spec revisada y aprobada por humano |
| `design` | Design agent | Diseño técnico, definiciones de interfaz | Approved spec | Diseño revisado (sin Critical findings) |
| `tasks` | Planning agent | Lista de tareas atómicas con dependencias | Approved design | Tareas son independientemente testeables; cada una tiene un test stub |
| `apply` | Implementation agent | Código funcionando + tests | Task list | Gates 1 y 2 pasan para cada tarea |
| `verify` | Review agent | Reporte de revisión (Critical / Important / Minor / Approved) | Apply output | Sin Critical ni Important findings sin resolver |
| `archive` | Archive agent | HANDOVER.md, mem_session_summary, CLAUDE.md actualizado | Verify output | La próxima sesión puede retomar desde el archive sin re-derivación |

---

## Phase Rules

1. Cada fase produce un **artefacto concreto** antes de que comience la siguiente.
2. Ninguna fase omite su exit gate.
3. **Aprobación humana requerida en:**
   - `propose → spec` (humano selecciona el approach)
   - `spec → design` (humano aprueba la especificación)
   - `verify → archive` (humano revisa el reporte final)
4. Si un exit gate falla, la fase actual **no está completa** — volver al
   inicio de esa fase, no a la fase anterior.
5. Las fases que producen código (`apply`) deben incluir tests. Código sin
   un test en falla correspondiente no puede salir de la fase `apply`.

---

## Agent Assignment

| Phase | Assigned agent | Notes |
|-------|---------------|-------|
| init | claude-code | Completado 2026-04-25 |
| explore | claude-code | |
| propose | claude-code | |
| spec | claude-code | |
| design | claude-code | |
| tasks | claude-code | |
| apply | claude-code | |
| verify | claude-code (subagent) | Idealmente diferente al agente de apply |
| archive | claude-code | |

---

## Handoff Protocol

Al hacer handoff de una fase a la siguiente, el agente que completa debe:

1. Confirmar que el exit gate pasó (evidencia específica, no "creo que está listo")
2. Actualizar `.ai-context/session-context.md` con el evento de completión de fase
3. Actualizar HANDOVER.md con: qué se produjo, qué debe recibir la siguiente fase,
   y decisiones abiertas que el siguiente agente debe conocer
4. Ejecutar `mem_save` con un resumen de decisiones tomadas en esta fase
5. Nombrar explícitamente el artefacto producido: ruta de archivo y descripción breve

El agente receptor debe:
1. Leer HANDOVER.md antes de cualquier acción
2. Ejecutar `mem_context` para cargar historial de fases
3. Confirmar qué artefacto recibió y que está completo
4. No comenzar trabajo hasta confirmar el artefacto de entrada

---

## Escalation Protocol

Si un agente encuentra un blocker que impide completar la fase actual:

1. Detenerse — no intentar sortear el blocker unilateralmente
2. Documentar el blocker en HANDOVER.md bajo "Open Questions"
3. Escalar al humano con: qué es el blocker, qué información se necesita,
   qué opciones existen, y cuál recomienda el agente
4. No avanzar a la siguiente fase mientras esté bloqueado

---

## Active Project State

| Field | Value |
|-------|-------|
| Current phase | explore |
| Last completed phase | init |
| Last completed on | 2026-04-25 |
| Next action | Mapear arquitectura actual del proyecto lss-web |
| Blocking items | None |
