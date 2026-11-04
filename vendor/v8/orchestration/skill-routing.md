## G0 PREVIO A TODAS LAS FASES — SKILLS AUTOINSTALABLES

V8 inicia cada equipo con la auditoría e instalación del bootstrap portable. Si alguna skill falta, buscar/instalar desde upstream oficial y revalidar ANTES de usar fallback. Alias válidos de versiones: page-cro/cro y schema-markup/schema, con verificación de capacidades. La integración 21st.dev debe intentarse y comprobarse; falta de autenticación bloquea CONNECTED, no justifica fingir uso.

Consultar references/portabilidad-instalacion-automatica.md y scripts/bootstrap-v8.mjs.

# Skill Routing — PROMPT MAESTRO V8

**Rastro obligatorio de invocación:** cada habilidad F2/F3/F4/F5/F7 deja archivo de entrada, salida, log, versión/nombre realmente utilizado y prueba integrada en el proyecto. `ai-seo` puede utilizarse como auditoría adicional en F5 si el alcance exige IA/búsqueda por voz; su ausencia no convierte un schema inventado en solución. `21st` tiene un contrato de búsqueda y decisión obligatorio en F4/F6 descrito en `rules/execution-contract.md`; 'not connected' es BLOCKED, no USED.


## Tabla de routing de skills externas

| Skill | Fase | Trigger | Input que recibe | Output que produce | Fallback si falta |
|-------|------|---------|------------------|--------------------|-------------------|
| `copywriting` | 2 | Al completar Fase 1 | Diagnóstico estratégico completo, conversión primaria, matriz de decisión, dirección visual | Propuesta de valor, hero, titulares por sección, manejo de objeciones, copy CTA, FAQ | `internal_copywriting` |
| `page-cro` | 3 | Al completar Fase 2 | Arquitectura de conversión propuesta, copy de Fase 2, dirección visual | Estructura validada, fricción eliminada, orden de secciones confirmado, posición CTA optimizada | `internal_cro_checklist` |
| `ui-ux-pro-max` | 4 | Al completar Fase 3 | Arquitectura validada por CRO, sistema visual de Fase 1, copy de Fase 2 | Jerarquía visual por sección, UX móvil, sistema de diseño, componentes justificados | `internal_ux_review` |
| `seo-audit` | 5 | Al completar Fase 4 | Contenido y estructura validados, datos del negocio | Análisis de metadata, estructura de headings, HTML semántico | `internal_seo_checklist` |
| `schema-markup` | 5 | Al completar Fase 4 (junto con seo-audit) | Datos del negocio, zona geográfica, servicios, FAQ si aplica | JSON-LD correcto: LocalBusiness o subtipo, areaServed, openingHours, FAQPage, sameAs | `internal_jsonld_builder` |
| `impeccable` | 7 | Al completar Fase 6 | Código completo, copy final, sistema visual, metadata | Lista de errores, inconsistencias, problemas UX, problemas de conversión, problemas técnicos | Filtro interno de 22 preguntas |

---

## Reglas de routing

### 1. V8 es el único árbitro
V8 decide cuándo invocar cada skill. El usuario no puede alterar el orden de invocación. Una skill invocada fuera de su fase es un error de orquestación.

### 2. Las skills no se auto-invocan
Las skills externas no se ejecutan automáticamente. V8 las llama explícitamente cuando la fase anterior está completa y las condiciones de entrada están satisfechas.

### 3. Evaluación previa a la invocación
Antes de invocar cualquier skill, V8 debe:
1. Confirmar que la fase anterior está completa
2. Verificar que el input requerido está disponible y es de calidad suficiente
3. Comprobar que la skill está disponible
4. Si no está disponible → protocolo DEPENDENCY_MISSING

### 4. Skills en paralelo
`seo-audit` y `schema-markup` se invocan en paralelo en la Fase 5, ya que son independientes entre sí y ambas requieren el mismo input.

### 5. Protocolo DEPENDENCY_MISSING solo tras instalación fallida

```
IF skill NOT available AFTER bootstrap installation attempt:
  1. Emitir: [DEPENDENCY_MISSING: nombre-skill]
  2. Documentar: qué validación se omitió
  3. Ejecutar: fallback interno correspondiente
  4. Continuar: flujo no se detiene
  5. Registrar en sección L (Supuestos): qué se hizo con fallback
```

---

## Fallbacks internos

### `internal_copywriting`
V8 genera el copy directamente aplicando las reglas del PDF:
- Propuesta de valor: específica, sin frases de agencia
- Hero: headline claro + subheadline de apoyo + CTA visible
- Titulares: beneficio concreto por sección
- Objeciones: identificadas en Fase 1, respondidas antes del CTA final
- FAQ: objeciones reales del cliente típico del nicho

### `internal_cro_checklist`
V8 valida manualmente:
- ¿La oferta se entiende en 5 segundos?
- ¿El CTA aparece antes del primer scroll?
- ¿El orden de secciones sigue la lógica: problema → solución → confianza → acción?
- ¿Hay elementos que añaden fricción sin añadir valor?

### `internal_ux_review`
V8 revisa:
- Jerarquía visual: ¿el ojo del usuario sabe adónde ir en cada sección?
- Móvil primero: ¿cada sección funciona bien en pantalla de 375px?
- Componentes: ¿cada uno tiene función comercial justificada?
- Spacing: ¿el aire es suficiente para no saturar?

### `internal_seo_checklist`
V8 implementa directamente:
- Title: [Servicio] en [Ciudad] | [Nombre negocio] (máx 60 caracteres)
- Meta description: acción + beneficio + zona (máx 155 caracteres)
- H1: único, describe el servicio y la zona
- Estructura de headings: H1 → H2 → H3 lógica
- HTML semántico: `<main>`, `<section>`, `<nav>`, `<footer>`, `<article>` correctos

### `internal_jsonld_builder`
V8 genera JSON-LD con:
- Tipo más específico disponible (LocalBusiness, DentalClinic, LegalService, etc.)
- name, description, url, telephone, address
- areaServed, geo si hay coordenadas
- openingHours si hay datos
- sameAs si hay redes
- FAQPage si hay FAQ
- Placeholders explícitos para datos faltantes

### Fallback de `impeccable`
V8 ejecuta el filtro de 22 preguntas definido en SKILL.md y corrige todo lo que falla.

## Deduplicación y routing actualizado, sin fases adicionales

- **copywriting** (F2) = mensaje; **page-cro** o alias funcional **cro** (F3) = recorrido/arquitectura de conversión, no redacta dos veces.
- **ui-ux-pro-max** (F4) = sistema visual y UX; **21st MCP** opcional F4/F6 = buscar componentes/inspiración licenciosos, NO reemplaza dirección de arte.
- **Motion** o **GSAP** se elige como motor primario en F4 y se integra F6. CSS nativo antes. No animar dos veces el mismo DOM con ambas.
- **seo-audit** (F5) = diagnóstico de rastreo/indexación, arquitectura SEO, metadatos y SEO local; **ai-seo** (F5) = consultas conversacionales/voz, respuestas verificables, citas e investigación de visibilidad en Google/Gemini/ChatGPT sin prometer menciones; **schema-markup** o **schema** (F5) = JSON-LD que corresponda al contenido público. Cada una debe producir su **propia salida, log y evidencia** y converger en el mismo mapa de URLs y copy; no se permite reemplazar ai-seo por `Speakable` ni por dos informes SEO genéricos.
- **impeccable** (F7) = crítica y pulido; **Playwright + axe + Lighthouse** (F7) = evidencia externa de funcionamiento y rendimiento. Son complementarios, no duplicados.
- Configurar 21st MCP y sus skills cuando sea posible; sin credenciales registrar AUTH_REQUIRED/G0 BLOCKED, seguir con diseño propio sin suponer generación.
- Toda herramienta paga/instalación con costo exige autorización y comprobación de licencia.
