# Flujo de Orquestación — PROMPT MAESTRO V8

**Antes del primer paso:** verificar lock de integridad y coherencia con la versión activa. Confirmar **7/7 skills** (`ai-seo` incluida) y una única versión vendorizada. En F5 ejecutar SEO Audit, AI SEO/AEO/GEO/voz y Schema por separado. Bloquear F9 si falta evidencia de cualquier invocación, implementación o comprobación. Leer `rules/execution-contract.md`. **Cada fase produce evidencias comprobables**. El paso F4/F6 incluye evaluación documentada de 21st.dev, no solo mención. La Fase 9 NO entrega como final si el validador `scripts/verify-delivery.mjs` no retorna 0. Evitar que cada cliente use una revisión distinta de la skill.


## G0 — DEPENDENCIAS PORTABLES: PREPARACIÓN OBLIGATORIA

Antes de aplicar fallbacks, el agente debe ejecutar el protocolo de references/portabilidad-instalacion-automatica.md y scripts/bootstrap-v8.mjs: buscar fuentes oficiales, instalar skills faltantes y verificar que funcionen. El fallback solo corresponde después de un intento fallido documentado; no convierte ausencia en PASS. La instalación/configuración de 21st MCP también se intenta, pero requiere cuenta para CONNECTED; de otro modo AUTH_REQUIRED / G0 BLOCKED.

No ejecutar instaladores arbitrarios, no consumir créditos, no modificar otros proyectos y no reiniciar agentes con trabajo activo.

## Diagrama de fases

```
INPUT: business_brief + conversion_goal
         │
         ▼
┌─────────────────────────────────────────┐
│  FASE 1: DIAGNÓSTICO ESTRATÉGICO        │
│  Skill externa: ninguna                 │
│  Ejecutor: V8 directo                   │
│  Output: análisis + matriz + infra +    │
│          dirección visual               │
└─────────────────┬───────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────┐
│  FASE 2: COPY                           │
│  Skill externa: copywriting             │
│  Input: diagnóstico completo de Fase 1  │
│  Output: propuesta de valor, hero,      │
│          titulares, objeciones, CTA,    │
│          FAQ                            │
└─────────────────┬───────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────┐
│  FASE 3: CRO                            │
│  Skill externa: page-cro                │
│  Input: arquitectura + copy Fase 2      │
│  Output: estructura validada,           │
│          fricción eliminada, orden      │
│          de secciones confirmado        │
└─────────────────┬───────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────┐
│  FASE 4: UX/UI                          │
│  Skill externa: ui-ux-pro-max           │
│  Input: arquitectura CRO + copy +       │
│         sistema visual Fase 1           │
│  Output: jerarquía visual, UX móvil,   │
│          componentes justificados,      │
│          sistema de diseño              │
└─────────────────┬───────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────┐
│  FASE 5: SEO LOCAL                      │
│  Skills externas: seo-audit +           │
│                   schema-markup         │
│  Input: contenido validado + negocio    │
│  Output: metadata, headings, JSON-LD,  │
│          Open Graph, canonical          │
└─────────────────┬───────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────┐
│  FASE 6: CONSTRUCCIÓN                   │
│  Skill externa: ninguna                 │
│  Ejecutor: V8 directo                   │
│  Input: todo lo anterior consolidado    │
│  Output: código completo ejecutable     │
└─────────────────┬───────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────┐
│  FASE 7: QA FINAL                       │
│  Skill externa: impeccable              │
│  Input: código + copy + sistema visual  │
│  Output: lista de errores,              │
│          inconsistencias y problemas    │
└─────────────────┬───────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────┐
│  FASE 8: CORRECCIÓN OBLIGATORIA         │
│  Skill externa: ninguna                 │
│  Ejecutor: V8 directo                   │
│  Regla: TODO lo detectado se corrige.   │
│         Sin excepciones.                │
└─────────────────┬───────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────┐
│  FASE 9: ENTREGA FINAL A-L              │
│  Skill externa: ninguna                 │
│  Output: 12 bloques estructurados en    │
│          orden exacto                   │
└─────────────────────────────────────────┘
         │
         ▼
OUTPUT: A. Diagnóstico estratégico
        B. Matriz de decisión
        C. Infraestructura + justificación
        D. Dirección visual
        E. Arquitectura de conversión
        F. Copy completo
        G. Sistema visual detallado
        H. Código completo
        I. Metadata SEO + JSON-LD
        J. Propuesta WaaS
        K. Versión austera
        L. Supuestos y huecos
```

## Invariantes del flujo

- Las fases se ejecutan en orden estricto 1→9
- Ninguna fase puede comenzar sin que la anterior esté completa
- Las skills externas se invocan ÚNICAMENTE en su fase designada
- V8 decide cuándo y cómo invocar cada skill — no el usuario
- Una skill disponible pero invocada en la fase incorrecta = error
- El flujo nunca se detiene por una dependencia faltante (ver DEPENDENCY_MISSING en SKILL.md)

## Condiciones de salida de cada fase

| Fase | Condición de salida |
|------|---------------------|
| 1 | Diagnóstico + matriz + infra elegida + dirección visual definidos |
| 2 | Copy completo por sección (hero, cuerpo, CTA, FAQ) |
| 3 | Arquitectura validada, fricción identificada, orden de secciones confirmado |
| 4 | Sistema UX/UI completo con componentes justificados |
| 5 | Metadata completa + JSON-LD correcto y específico |
| 6 | Código ejecutable completo según infraestructura elegida |
| 7 | Lista exhaustiva de problemas detectados (puede ser vacía si todo está bien) |
| 8 | Todos los problemas de Fase 7 corregidos |
| 9 | 12 bloques A-L entregados en orden |

## Checkpoints transversales V8 2026 — dentro de las nueve fases

- Fase 1 = G0/G1 discovery, competencia, 2 conceptos creativos y elección de infraestructura real.
- Fases 2–3 = G1 mensaje, objeciones, CTA y CRO evaluados.
- Fase 4 = G2/G3 keyframes reales, dirección artística, firma visual/funcional y licencia de componentes.
- Fase 5 = SEO y schema a partir de datos reales.
- Fase 6 = G4 compilar + servir, estados funcionales, responsive.
- Fase 7 = G5/G6/G7 capturas, crítica externa, interacción, accesibilidad, rendimiento y SEO.
- Fase 8 = G8 corregir P0/P1 y volver a ejecutar pruebas. Sin navegador = BLOCKED, no PASS.
- Fase 9 = G9 A–L + ART_DIRECTION.md + QA_EVIDENCE.md + capturas + limitaciones y rollback.

La ausencia de una skill optativa permite fallback; **ausencia de evidencia indispensable de QA impide declararlo listo para publicar**.
