# PROMPT MAESTRO V8 — TRASLADAR A OTRA COMPUTADORA

## Qué copiar

Copiar íntegra esta carpeta `prompt-maestro-v8-orchestrator`. Mantener su estructura de `SKILL.md`, `manifest.yaml`, `references/`, `orchestration/`, `rules/`, `scripts/`, `templates/` y `examples/`.

No copiar credenciales, claves, cookies, otras carpetas de skills de la PC anterior ni cachés de proyectos.

## Dónde colocarla

- **Claude Code (cuenta local del equipo nuevo):** `~/.claude/skills/prompt-maestro-v8-orchestrator/`.
- **Codex:** `~/.codex/skills/prompt-maestro-v8-orchestrator/` o el directorio de skills que indique su versión.
- **Portable por proyecto:** colocarla en el directorio de skills compatible con el agente y su versión, dentro del proyecto autorizado.

Si Claude/Codex está abierto, reiniciarlo para que descubra la skill (no cerrar sesiones activas de terceros).

## Instrucción inicial para el agente

"Usa la skill PROMPT MAESTRO V8. Antes de comenzar Fase 1, ejecuta G0: lee references/portabilidad-instalacion-automatica.md y ejecuta scripts/bootstrap-v8.mjs en modo diagnóstico, instalación y verificación para tu agente y esta computadora. Investiga fuentes oficiales, instala todas las seis skills faltantes, intenta habilitar las skills/MCP de 21st.dev, comprueba las dependencias necesarias del proyecto y deja evidencia de todo. No declares PASS si falta autenticación, instalación o prueba. Después aplica las nueve fases de V8 sin alterar proyectos vecinos".

## Ejecución automática

El agente ejecutará (si Node.js y Git están disponibles):

```shell
node scripts/bootstrap-v8.mjs --check --target auto
node scripts/bootstrap-v8.mjs --install --target auto
node scripts/bootstrap-v8.mjs --check --target auto
```

Si faltan Node, Git o Python, el agente debe primero gestionar la instalación desde fuentes oficiales, priorizando instalaciones de usuario que no requieran permisos elevados. Cuando las instalaciones o inicios de sesión requieran autenticación, cuenta, aceptación de términos, derechos de administrador o servicios con costo, tendrá que registrar ese bloqueo y solicitar esa intervención mínima específica.

No es necesario reinstalar las skills existentes y comprobadas.

## Pruebas y seguridad

`--check` no modifica archivos. `--install` busca desde tres upstreams oficiales preseleccionados, verifica el nombre SKILL.md y copia solo skills que faltan, sin sobrescribir otras. Intenta instalar los plugins 21st oficiales sin consumir créditos. El agente debe comprobar versiones/licencias y archivos ejecutables antes de utilizarlos.

Después de instalar nuevas skills, reiniciar/recargar Claude o Codex cuando corresponda. Una carpeta instalada no acredita que el agente ya la haya activado.

La skill NO autoriza por sí misma despliegues, compras, conexiones a cuentas externas o uso de créditos 21st. Esas acciones requieren autorización separada.

Versión de instalación portable: 2026-10-30. **Solo instalar el ZIP canónico vigente**, no los ZIP antiguos. En cada equipo ejecutar `node scripts/verify-integrity.mjs --verify` antes de usar la skill y `node scripts/sync-v8.mjs --check --target claude` para detectar divergencias. Toda entrega de sitio exige `node scripts/verify-delivery.mjs --project <ruta> --evidence <ruta>/V8_DELIVERY_EVIDENCE.json --mode production` con salida PASS y autorización real. Si no existe evidencia, no está listo. El plugin 21st necesita sesión autenticada; no simular el estado. El método sigue llamándose **V8**, no V9.
