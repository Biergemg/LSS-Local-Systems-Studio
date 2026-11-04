## G0 — DEPENDENCIAS PORTABLES: PREPARACIÓN OBLIGATORIA

Antes de aplicar fallbacks, el agente debe ejecutar el protocolo de references/portabilidad-instalacion-automatica.md y scripts/bootstrap-v8.mjs: buscar fuentes oficiales, instalar skills faltantes y verificar que funcionen. El fallback solo corresponde después de un intento fallido documentado; no convierte ausencia en PASS. La instalación/configuración de 21st MCP también se intenta, pero requiere cuenta para CONNECTED; de otro modo AUTH_REQUIRED / G0 BLOCKED.

No ejecutar instaladores arbitrarios, no consumir créditos, no modificar otros proyectos y no reiniciar agentes con trabajo activo.

# Enforcement — PROMPT MAESTRO V8

**Precedencia:** `rules/execution-contract.md` impone artefactos, inventario de componentes, test de estados, log de ejecución de cada skill y auditoría real. La prueba es requisito de salida; mencionar una herramienta, un componente o un consejo no es ejecución. Ejecutar `scripts/verify-delivery.mjs` al terminar; bloquea proyectos con gates faltantes, interacción simulada o 21st sin autenticación/evaluación. 


## Lógica de enforcement por skill

---

### `copywriting` (Fase 2)

**Trigger exacto:** Fase 1 completada. Diagnóstico estratégico, matriz de decisión y dirección visual disponibles.

**Qué valida:**
- Que la propuesta de valor sea específica al negocio (no genérica de agencia)
- Que el hero comunique: qué se vende, para quién, qué acción tomar
- Que el copy no contenga claims sin evidencia
- Que los titulares hablen en beneficios comprensibles
- Que el FAQ responda objeciones reales, no preguntas decorativas
- Que el tono sea coherente con el nicho y la matriz de decisión

**Qué pasa si falla:**
- Si el copy es genérico → V8 rechaza y solicita reescritura específica
- Si hay claims no verificables → V8 elimina o reemplaza por narrativa de estructura
- Si el tono es incoherente con el nicho → V8 ajusta antes de pasar a Fase 3

**Protocolo de corrección:**
1. Identificar cada elemento fallido
2. Reescribir con base en los datos reales de la ficha del negocio
3. Si no hay datos suficientes → usar placeholder explícito `[PLACEHOLDER: descripción]`
4. Validar que el copy corregido supera el filtro antes de continuar

**Fallback si DEPENDENCY_MISSING:**
```
[DEPENDENCY_MISSING: copywriting]
Fallback activado: internal_copywriting
Validación omitida: revisión especializada de copy por skill externa
Acción: V8 genera copy directamente con las reglas del PDF sección 18
Registro en sección L: copy generado sin skill copywriting
```

---

### `page-cro` (Fase 3)

**Trigger exacto:** Fase 2 completada. Copy completo disponible por sección.

**Qué valida:**
- Que la oferta se entienda en menos de 5 segundos
- Que el CTA principal aparezca lo bastante pronto (antes del primer scroll completo)
- Que no haya fricción innecesaria en el camino a la conversión
- Que el orden de secciones siga lógica comercial, no estética
- Que la objeción principal esté resuelta antes del CTA final
- Que cada sección tenga función de captar, convencer o convertir

**Qué pasa si falla:**
- Si una sección no ayuda a vender → V8 la elimina o la fusiona
- Si el CTA aparece demasiado tarde → V8 reposiciona
- Si hay fricción de conversión → V8 simplifica el camino

**Protocolo de corrección:**
1. Listar cada elemento de fricción o sección sin función
2. Para cada uno: eliminar, simplificar o reposicionar
3. Confirmar que la arquitectura resultante supera la validación de 5 segundos

**Fallback si DEPENDENCY_MISSING:**
```
[DEPENDENCY_MISSING: page-cro]
Fallback activado: internal_cro_checklist
Validación omitida: análisis especializado de conversión
Acción: V8 ejecuta checklist de 5 puntos CRO internamente
Registro en sección L: CRO ejecutado sin skill page-cro
```

---

### `ui-ux-pro-max` (Fase 4)

**Trigger exacto:** Fase 3 completada. Arquitectura de conversión validada disponible.

**Qué valida:**
- Que la jerarquía visual de cada sección sea intencional (el ojo sabe adónde ir)
- Que la experiencia móvil sea real (no solo responsive, sino mobile-first en diseño)
- Que cada componente visual tenga función comercial justificada
- Que no haya elementos decorativos que añadan peso sin valor
- Que el sistema visual sea coherente de inicio a fin

**Qué pasa si falla:**
- Si un componente es puro adorno → se elimina
- Si la jerarquía visual es confusa → se reordena
- Si el móvil es descuidado → se rediseña con prioridad móvil

**Protocolo de corrección:**
1. Por cada elemento fallido: eliminar o rediseñar
2. Verificar que móvil funciona en 375px sin scroll horizontal
3. Verificar que el hero es legible en carga temprana

**Fallback si DEPENDENCY_MISSING:**
```
[DEPENDENCY_MISSING: ui-ux-pro-max]
Fallback activado: internal_ux_review
Validación omitida: análisis especializado de UX/UI
Acción: V8 ejecuta revisión visual interna con criterios del PDF secciones 9-15
Registro en sección L: UX/UI ejecutado sin skill ui-ux-pro-max
```

---

### `seo-audit` (Fase 5)

**Trigger exacto:** Fase 4 completada. Contenido y estructura de secciones definitivos.

**Qué valida:**
- Title específico con servicio + ciudad (máx 60 caracteres)
- Meta description con acción + beneficio + zona (máx 155 caracteres)
- H1 único y descriptivo
- Estructura de headings jerárquica y lógica
- HTML semántico correcto
- Imágenes con alt text útil
- Sin buzzwords huecos

**Qué pasa si falla:**
- Metadata genérica → reescribir con datos reales del negocio
- Headings incorrectos → corregir jerarquía
- HTML no semántico → refactorizar

**Protocolo de corrección:**
1. Identificar cada elemento de SEO incorrecto
2. Corregir usando datos de la ficha del negocio
3. Si no hay datos → usar placeholder explícito

**Fallback si DEPENDENCY_MISSING:**
```
[DEPENDENCY_MISSING: seo-audit]
Fallback activado: internal_seo_checklist
Validación omitida: auditoría SEO especializada
Acción: V8 implementa SEO directamente según PDF sección 17
Registro en sección L: SEO implementado sin skill seo-audit
```

---

### `schema-markup` (Fase 5, paralela a seo-audit)

**Trigger exacto:** Mismo que seo-audit. Se ejecutan en paralelo.

**Qué valida:**
- JSON-LD con el subtipo Schema más preciso disponible
- Campos obligatorios presentes: name, description, url, telephone, address
- areaServed si hay zona geográfica definida
- openingHours si hay horarios
- sameAs si hay redes sociales
- FAQPage si hay FAQ en el sitio
- Sin datos inventados

**Qué pasa si falla:**
- JSON-LD incorrecto → corregir sintaxis y datos
- Tipo Schema genérico → usar subtipo más específico disponible
- Datos inventados → reemplazar por placeholders explícitos

**Protocolo de corrección:**
1. Validar JSON-LD en schema.org/validator
2. Corregir tipo y datos
3. Verificar que placeholders son explícitos y editables

**Fallback si DEPENDENCY_MISSING:**
```
[DEPENDENCY_MISSING: schema-markup]
Fallback activado: internal_jsonld_builder
Validación omitida: generación especializada de schema markup
Acción: V8 genera JSON-LD manualmente según PDF sección 17
Registro en sección L: Schema markup generado sin skill schema-markup
```

---

### `impeccable` (Fase 7)

**Trigger exacto:** Fase 6 completada. Código ejecutable disponible.

**Qué valida:**
- Errores en el código (sintaxis, imports rotos, assets inexistentes)
- Inconsistencias entre copy y diseño
- Problemas UX (móvil, contraste, tamaño de botones, legibilidad)
- Problemas de conversión (CTA poco visible, fricción no eliminada)
- Problemas técnicos (rendimiento, accesibilidad, SEO técnico)
- Elementos bonitos pero inútiles
- Claims inflados o no verificables

**Qué pasa si falla:**
- Cualquier problema detectado → entra en Fase 8 para corrección obligatoria
- No hay problemas opcionales
- No hay "lo dejo para después"

**Protocolo de corrección (Fase 8):**
1. Listar TODOS los problemas detectados
2. Asignar corrección a cada uno
3. Implementar correcciones
4. Re-ejecutar filtro de 22 preguntas internamente
5. Solo si todo pasa → continuar a Fase 9

**Fallback si DEPENDENCY_MISSING:**
```
[DEPENDENCY_MISSING: impeccable]
Fallback activado: filtro interno de 22 preguntas (SKILL.md Fase 7)
Validación omitida: QA especializado por skill impeccable
Acción: V8 ejecuta las 22 preguntas del filtro final y corrige todo lo que falla
Registro en sección L: QA ejecutado sin skill impeccable — filtro interno aplicado
```

---

## Reglas generales de enforcement

### Autocorrección de V8
Si V8 detecta que está intentando saltarse una fase o una regla:
1. Detener la acción incorrecta
2. Volver a la última fase completada correctamente
3. Retomar el flujo desde ese punto
4. No ocultar el error — documentarlo en sección L si afecta el output

### Orden de prioridades en conflictos de enforcement
1. Claridad de oferta
2. Conversión
3. Credibilidad
4. Adaptación al nicho
5. UX móvil
6. Percepción visual premium
7. Rendimiento
8. Animación

Si una decisión de enforcement sacrifica un elemento de mayor prioridad en favor de uno de menor prioridad → la decisión es incorrecta y debe revertirse.

## Enforcement V8 — actualizado en octubre 2026

Gates G0–G9 en rules/quality-gates-2026.md. Una skill opcional faltante no bloquea el prototipo. La falta de navegador, de capturas de móvil/escritorio, del CTA realmente probado, de compilación, de validación de activos, o de permisos sí **bloquea la declaración de aptitud de producción**. Impeccable no sustituye Lighthouse/axe/Playwright ni revisión visual independiente. Resolver defectos P0/P1 y repetir test; P2 debe tener riesgo y justificación por escrito. No auto declarar aprobaciones.
