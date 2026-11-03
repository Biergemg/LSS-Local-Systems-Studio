# G7 — Disposición de hallazgos y diseño de experimentos (2026-11-03)

Revisión independiente: evidence/G7-independent-review.md (agente de contexto nuevo, sin acceso al razonamiento del autor; la independencia no es criptográficamente verificable y es de IA, no humana). Veredicto del revisor: BLOCKED_BY_DATA.

## Disposición de hallazgos
| ID | Sev. | Disposición | Verificación |
|---|---|---|---|
| C-1 sin razón para confiar en LSS | Crítico | PARCIAL. Se declara con honestidad que LSS es nuevo y sin casos (hero micro); se re-mide y fecha el bloque Lighthouse con la etiqueta "es lo que hicimos con nuestra propia página". NO resuelto: nombre/rostro del responsable y ciudad (requiere decisión del titular). | content.ts HERO.micro, EVIDENCE.measuredMeta; qa run3 |
| Bloque Lighthouse del 29-oct (G4) | Crítico | RESUELTO. Remedido 3-nov: móvil 95/100/100/100 en producción (89 en la compilación local), escritorio 100/100/100/100, CLS 0, axe 0. | docs/v8/qa-offer/lighthouse-local.json, run3/report.json |
| C-2 muestra visual gratuita sin costear | Crítico | RESUELTO. Retirada de PPV, PROCESS y FAQ. | grep "dirección visual" sin resultados |
| C-3 experimento sin umbrales | Crítico | RESUELTO en diseño (abajo). La ejecución requiere al titular. | esta sección |
| A-1 H1 gramatical y sin sustantivo | Alto | RESUELTO. Nuevo H1 nombra web, perfil de Google y WhatsApp. | QA h1 |
| A-2 nombre "Primera Visita" confuso | Alto | MITIGADO: el nombre se mantiene (ya está en términos y materiales); se aclara en el primer párrafo que es revisión a distancia. A medir. | PPV.body |
| A-3 promesas operativas | Alto | RESUELTO. "hasta quien responde" y "formulario contratado" retirados; "reclamar" retirado; la verificación del perfil la decide Google; acta con pasa/no pasa/depende de tercero. | content.ts |
| A-4 alcance contradictorio, Opción 1 ausente | Alto | RESUELTO. Bloque "Si ya tienes web" con ambas rutas. | OFFER.existing |
| A-5 terceros contradictorios | Alto | RESUELTO. Una sola postura: a nombre del cliente, costo anual informado antes de empezar. Requiere confirmación del titular (CLM-10). | OFFER.excludes/details |
| A-6 precio anclado a marketplaces | Alto | ACEPTADO. Se retira el precio fijo; rango de prueba y experimento. | G3, G5 |
| A-7 diferenciación replicable | Alto | ACEPTADO como límite: diferenciación PROPOSED, sin lenguaje de exclusividad. | G2 |
| M-1 tabla comparativa acusatoria | Medio | RESUELTO. Reformulada como preguntas que el comprador puede hacer a cualquier proveedor. | EXPECTATIONS.compare |
| M-2 aforismos | Medio | RESUELTO en 4 de 5 (closings, PPV.title, PROCESS.title). | content.ts |
| M-3 etiquetas de CTA y ancla | Medio | RESUELTO. Una etiqueta; ancla secundaria → #entrega (acta). | QA ctas |
| M-4 qué pasa después del clic | Medio | NO resuelto: requiere compromiso de plazo de respuesta del titular. | G8 pendiente |
| M-5 seguimiento correctivo | Medio | RESUELTO: se difiere a la propuesta, sin prometer duración. | PROCESS.steps |
| M-6 "cualquier país" | Medio | RESUELTO: "cualquier ciudad de México". | content.ts |
| M-7 100 % remoto sin aprobación | Medio | NO resuelto: decisión del titular (CLM-5 PROPOSAL). | G8 pendiente |
| Economía: costo/h, CAC, abandono, capacidad, ≈7 clientes | Alto | RESUELTO en G5: $400/h, P50 con abandono, CAC con propuesta, capacidad 12-15, equilibrio recalculado (8.7). | G5 |
| Disenso: más documentos que conversaciones | — | ACEPTADO. El siguiente paso es el experimento, no otro gate. | esta sección |
| Estructura: no se fusionó ninguna sección | — | DECISIÓN: se mantiene el orden Hero → situación → Primera Visita → alcance → proceso → acta → presupuesto → preguntas/CTA. Sin datos de comportamiento para fusionar; se mide con GA4 (contact_intent, scroll) antes de recortar. | — |

## Experimento 1 — Disposición a pagar y precio (60 días)
Hipótesis: al menos un dueño de negocio de servicios paga un anticipo por Presencia Resuelta entre $9,800 y $14,500 tras una Primera Visita.
Diseño: ofrecer la Primera Visita a 30 dueños calificados (no familiares ni contactos que compran por cortesía); registrar fuente, giro y objeciones literales. En cada propuesta presentar alternadamente $9,800 y $14,500 (mismo alcance) y Corrección a $6,900 como entrada.
Métricas: visitas ofrecidas → conversaciones de propuesta → precios dichos → anticipos cobrados (≥ 50 % del proyecto).
Umbrales previos: ≥ 10 conversaciones de propuesta; ≥ 6 precios dichos (3 por brazo); ≥ 1 anticipo.
Guardas: horas por Primera Visita ≤ 3; horas totales de venta por cliente ≤ 6.
Regla de decisión: 0 anticipos tras 15 propuestas → bajar precio o cambiar producto/segmento; ≥ 2 anticipos al brazo alto → mantener ≈ $14,500; anticipos solo al brazo bajo → precio ≈ $9,800 y revisar viabilidad con el escenario downside de G5 (negativo): el negocio no existe a ese precio sin recortar horas.

## Experimento 2 — Plan mensual y horas reales
Hipótesis: los clientes del proyecto contratan el seguimiento a $1,990 o $2,490 y el soporte real no supera 4 h/mes.
Diseño: ofrecer el plan con alcance escrito a cada cliente que acepte propuesta; registrar horas reales de entrega (tope 26) y de soporte durante 3 meses en los primeros 3 clientes.
Métricas: tasa de aceptación del plan por precio; horas de entrega; horas de soporte mensual; abandono antes del mes 6.
Guardas: calidad (puntos "pasa" del acta ≥ 90 %); sin garantías ni créditos otorgados.
Regla de decisión: soporte > 5.3 h a $2,490 (o > 4.05 h a $1,990) o entrega > 32 h → rediseñar alcance o subir precio; aceptación del plan < 1 de 3 clientes → vender solo proyecto y reconsiderar la continuidad.

## Experimento 3 (opcional) — Mensaje
Hipótesis: el titular con nombres concretos ("web, perfil de Google y WhatsApp") genera más solicitudes que el anterior.
Método: comparación antes/después con GA4 (contact_intent) solo con volumen suficiente; no se infiere causalidad con menos de 100 visitas por periodo.
