---
contract_version: 1
last_updated: 2026-04-25
changed_by: initialization
---

@AGENTS.md

# Project Contract — lss-web

> **Instrucción al agente:** Lee este archivo al inicio de cada sesión.
> No procedas con ninguna tarea hasta confirmar el stack, los comandos y las
> reglas de no-invención. Si alguna sección dice [FILL IN], detente y pregunta
> al usuario antes de continuar — no inventes valores por defecto.

---

## Tech Stack

> Fuente: leído de package.json y entorno real. No rellenar de memoria.

- Runtime: Node.js 22.22.2 (sistema — sin .nvmrc)
- Framework: Next.js 16.2.4 (App Router)
- UI Library: React 19.2.4
- Language: TypeScript 5.x
- Styling: Tailwind CSS v4 + @tailwindcss/postcss
- Linting: ESLint 9 + eslint-config-next 16.2.4
- Testing: ninguno instalado (baseline_test_count: 0)

---

## Critical Commands

> Verificados en este proyecto. No inventar variantes.

```bash
# Servidor de desarrollo
npm run dev

# Build de producción
npm run build

# Servidor de producción
npm start

# Lint (todo el proyecto)
npm run lint

# Lint de un archivo específico
npx eslint [ruta/al/archivo]

# Verificar TypeScript
npx tsc --noEmit
```

---

## No-Guessing Rules

Obligatorio. Sin excepciones, sin "defaults razonables."

- Si no has leído el archivo, no conoces su contenido. Léelo primero.
- Si un nombre de campo, firma de función o tipo no está confirmado por un
  archivo que realmente leíste, no lo uses.
- Si un test no falla antes de escribir código, no escribiste el test correcto.
- Si falta información, pregunta. No asumas.
- "El usuario ya explicó el contexto" no equivale a leer el archivo.
- "Approach estándar para este stack" no es evidencia. El archivo real es evidencia.

---

## Archivos Prohibidos Sin Aprobación Explícita

- `.env` y todos los `*.env.*` (credenciales)
- `package-lock.json` (solo modificar via npm install/uninstall)
- `.github/workflows/` (CI/CD pipelines)
- `next.config.ts` (solo con revisión explícita)

---

## Naming Conventions

> Leídas del código real del proyecto.

- Archivos/componentes: PascalCase (ej: `Hero.tsx`, `FaqAccordion.tsx`)
- Directorios: kebab-case (ej: `components/sections/`, `components/ui/`)
- Funciones/variables: camelCase
- Tipos/interfaces TypeScript: PascalCase
- Archivos de datos/lib: camelCase (ej: `content.ts`, `schema.ts`)
- No hay convención de test files (sin tests actualmente)

---

## Baseline (Establecido: 2026-04-25)

> Basado en salida real de `npm run lint` y análisis del proyecto.

```
baseline_warnings: 1
baseline_warning_detail: components/ui/Logo.tsx:8 — @next/next/no-html-link-for-pages (error preexistente)
baseline_complexity: no medido
baseline_test_count: 0
```

Los gates comparan delta desde estos valores. La deuda preexistente no
bloquea el trabajo actual en modo `standard`.

---

## Communication Style (Minimalist Mode)

> **Instrucción al agente:** Aplicar estas reglas a cada respuesta.

- **Rol:** Asistente de salida mínima.
- **Reglas:** Solo el resultado final. Sin explicaciones, razonamiento ni comentarios.
- **Formato:** Sin repetición del prompt. Sin texto extra. Mínimo de tokens.
- **Código:** Solo código. Sin comentarios a menos que sean estrictamente necesarios.
- **Excepción:** Solo texto estructurado breve al ejecutar un Verification Gate o Evidence Chain.
- **Violación:** Cualquier texto de relleno o "cortesía" es una salida incorrecta.

---

## Active MCP Servers

> Solo servidores que pasaron references/04-security-checklist.md.

| Server | Scope | Purpose | Verified On |
|--------|-------|---------|-------------|
| engram | user | Persistent memory entre sesiones | 2026-04-25 |
| context7 | user | Documentación actualizada de librerías (Next.js, React, etc.) — output NO confiable | 2026-04-25 |

---

## Notes and Decisions

> Decisiones arquitectónicas con timestamp. Formato: `[YYYY-MM-DD] Decisión: [qué] — Razón: [por qué]`

[2026-04-25] Stack inicial: Next.js 16.2.4 App Router + TypeScript + Tailwind v4. Sin testing framework configurado. — Razón: proyecto web de captación local (LSS), prioridad en velocidad de entrega.
[2026-04-25] Skill advanced-ai-dev-skill v1.0.0 activa. Modo standard. Engram configurado como memoria persistente.
