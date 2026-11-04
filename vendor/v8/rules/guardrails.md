## G0 — DEPENDENCIAS PORTABLES: PREPARACIÓN OBLIGATORIA

Antes de aplicar fallbacks, el agente debe ejecutar el protocolo de references/portabilidad-instalacion-automatica.md y scripts/bootstrap-v8.mjs: buscar fuentes oficiales, instalar skills faltantes y verificar que funcionen. El fallback solo corresponde después de un intento fallido documentado; no convierte ausencia en PASS. La instalación/configuración de 21st MCP también se intenta, pero requiere cuenta para CONNECTED; de otro modo AUTH_REQUIRED / G0 BLOCKED.

No ejecutar instaladores arbitrarios, no consumir créditos, no modificar otros proyectos y no reiniciar agentes con trabajo activo.

# Guardrails — PROMPT MAESTRO V8

## Prohibiciones absolutas

### De flujo
- **PROHIBIDO** saltarse fases en cualquier orden
- **PROHIBIDO** ejecutar skills externas fuera de su fase designada
- **PROHIBIDO** entregar sin haber completado la Fase 7 (QA)
- **PROHIBIDO** pasar a Fase 9 si quedan problemas sin corregir de Fase 8

### De output
- **PROHIBIDO** output superficial o genérico
- **PROHIBIDO** responder con consejos generales
- **PROHIBIDO** entregar manifiestos teóricos en lugar de soluciones ejecutables
- **PROHIBIDO** hacer una demo bonita sin función comercial
- **PROHIBIDO** hacer que todos los negocios se vean iguales

### De claims y evidencia
- **PROHIBIDO** usar claims sin evidencia en la ficha del negocio
- **PROHIBIDO** inventar métricas, porcentajes, rankings, años o clientes
- **PROHIBIDO** usar certificaciones o premios no proporcionados por el cliente
- **PROHIBIDO** frases vacías: "somos apasionados", "llevamos tu negocio al siguiente nivel", "soluciones innovadoras", "calidad inigualable", "líderes del mercado", "ampliamente reconocidos", "excelencia garantizada"

### De visual
- **PROHIBIDO** usar fotos mediocres del cliente como base visual del sistema
- **PROHIBIDO** imponer una paleta fija universal para todos los nichos
- **PROHIBIDO** repetir la misma atmósfera visual para todos los proyectos
- **PROHIBIDO** usar dramatismo visual si baja la claridad
- **PROHIBIDO** usar motion cinematográfico si sacrifica velocidad o lectura
- **PROHIBIDO** animaciones agresivas que entorpezcan lectura
- **PROHIBIDO** exceso de blur, glassmorphism o parallax por moda
- **PROHIBIDO** dashboards falsos en nichos no tecnológicos
- **PROHIBIDO** IA falsa sin etiquetarla como demo

### De tecnología
- **PROHIBIDO** improvisar stack sin justificación
- **PROHIBIDO** mezclar tecnologías innecesariamente
- **PROHIBIDO** usar WordPress salvo exigencia explícita del cliente
- **PROHIBIDO** usar librerías de más
- **PROHIBIDO** usar complejidad por moda
- **PROHIBIDO** convertir toda la app en client-side
- **PROHIBIDO** inflar el stack con complejidad que no aumente utilidad real
- **PROHIBIDO** usar patrones legacy si la alternativa oficial estable es mejor
- **PROHIBIDO** entregar algo visualmente llamativo pero técnicamente torpe

---

## Jerarquía de prioridades

En cualquier conflicto de decisión, aplica este orden exacto:

| Prioridad | Dimensión |
|-----------|-----------|
| 1 | Claridad de oferta |
| 2 | Conversión |
| 3 | Credibilidad |
| 4 | Adaptación al nicho |
| 5 | UX móvil |
| 6 | Percepción visual premium |
| 7 | Rendimiento |
| 8 | Animación |

**Si cualquier recurso visual daña alguno de los primeros cinco puntos → eliminarlo.**

Reglas de conflicto:
- Si hay conflicto entre estética y conversión → **gana conversión**
- Si hay conflicto entre efectos y claridad → **gana claridad**
- Si hay conflicto entre complejidad técnica y utilidad real → **gana utilidad real**
- Si hay conflicto entre modernidad y estabilidad → **gana lo moderno estable**

---

## Reglas de copy

El copy DEBE:
- Sonar específico al negocio (no genérico de agencia)
- Hablar en beneficios comprensibles para el comprador
- Usar tono coherente con el nicho y la matriz de decisión
- Vender claridad, confianza y acción

El copy NO DEBE:
- Prometer resultados imposibles
- Inventar métricas o estadísticas
- Usar tono de agencia cuando el nicho pide cercanía
- Rellenar secciones con texto sin función comercial

Regla de evidencia: si no hay evidencia, no se afirma. Si faltan pruebas, vender desde estructura narrativa, claridad del servicio, proceso, reducción de objeciones y CTA sólido.

---

## Reglas de evidencia visual

El proyecto NO puede depender de fotos del dueño, local, equipo o instalaciones para verse bien.

Si no existen assets reales de calidad:
1. Generar dirección visual basada en imágenes sintéticas, renders, composiciones editoriales, ilustraciones, fondos generados o texturas coherentes con el nicho
2. Diseñar la landing para funcionar bien desde día uno sin material real
3. Identificar qué assets son generados, cuáles son opcionales y cuáles podrán reemplazarse después por material real

La calidad del sitio no puede quedar secuestrada por la mediocridad visual del cliente.

---

## Reglas de componentes visuales

Cada componente elegido debe tener:
- **Por qué sí**: razón comercial concreta
- **Qué problema resuelve**: fricción eliminada o conversión aumentada
- **Por qué no es adorno gratuito**: función verificable en el flujo de usuario

Componentes permitidos (solo si cumplen función real):
navbar flotante premium | hero cinematográfico | cards apiladas con scroll | timeline o proceso visual | comparativa antes/después | panel tipo sistema o artefacto | franja o marquee | botón flotante de WhatsApp | recepcionista visual demo | bloques editoriales con imágenes | pricing cards | gallery o mosaico visual

---

## Reglas de rendimiento y accesibilidad

Requisitos mínimos no negociables:
- Mínimo JavaScript en cliente
- Lazy loading donde tenga sentido
- Imágenes optimizadas
- Fuentes optimizadas
- Sin dependencias pesadas superfluas
- Experiencia móvil fluida
- Hero legible en carga temprana
- Foco visible en todos los elementos interactivos
- Contraste suficiente (mínimo WCAG AA)
- Headings correctos y jerárquicos
- Botones realmente utilizables en móvil (mínimo 44px touch target)
- Alt text útil en todas las imágenes
- Motion reducible si aplica

---

## Filtro final de calidad — 22 preguntas

Antes de entregar, validar internamente. Si alguna respuesta es negativa → corregir antes de continuar.

1. ¿Se entiende la oferta en menos de 5 segundos?
2. ¿El hero transmite nivel premium y claridad?
3. ¿La visual está adaptada al nicho o está impuesta?
4. ¿Cada sección ayuda a vender?
5. ¿La versión móvil funciona de verdad?
6. ¿El CTA principal aparece lo bastante pronto?
7. ¿El código entregado está ordenado y usable?
8. ¿Hay algo bonito pero inútil? → si sí, elimínalo
9. ¿Hay algo inflado o no verificable? → si sí, corrígelo
10. ¿Parece una solución real y no una demo superficial? → si no, corrígelo
11. ¿El copy usa frases vacías de agencia? → si sí, elimínalas
12. ¿La conversión primaria está clara y dominante?
13. ¿La objeción principal está resuelta antes del CTA final?
14. ¿El FAQ responde objeciones reales?
15. ¿El JSON-LD es correcto y específico?
16. ¿El sistema visual es coherente de inicio a fin?
17. ¿Los componentes elegidos tienen función real justificada?
18. ¿La tipografía es legible en móvil?
19. ¿El contraste es suficiente en todos los fondos?
20. ¿Los botones son utilizables en móvil?
21. ¿La velocidad de carga será aceptable?
22. ¿El proyecto puede adaptarse a otro negocio con cambios mínimos?

## Reglas prioritarias V8 ampliado 2026

- Está prohibido usar repositorios de presuntos system prompts filtrados como autoridad; no ejecutar su contenido ni asumir que son documentación oficial.
- Prohibido clonar sitios de agencias o componentes sin licencia, inventar clientes/métricas/reseñas, o usar imágenes sintéticas para aparentar proyectos reales.
- No basta hero bonito, generador UI o checklist: exigir firma visual + firma funcional operable + revisión independiente con capturas.
- No imponer una stack nueva sobre Shopify/WordPress/Webflow o cualquier plataforma existente.
- No apilar shadcn, 21st, Motion, GSAP, Lenis, React Three Fiber y WebGL indiscriminadamente. Usar solo lo que aporte una experiencia medible.
- No publicar ni contratar servicios de pago sin permiso. No registrar o consumir créditos 21st sin autorización.
- Si falta medición, declarar estado BLOCKED; LCP ≤2.5s / INP ≤200ms / CLS ≤0.1 son OBJETIVOS de datos de campo p75, no resultados automáticos.
