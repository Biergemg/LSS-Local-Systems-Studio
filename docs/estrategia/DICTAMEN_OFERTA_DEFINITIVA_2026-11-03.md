# LSS — Dictamen de la oferta definitiva (2026-11-03)

Estado: la landing queda implementada con la oferta corregida; la oferta como producto vendible con precio queda BLOCKED_BY_DATA (decisiones del titular y demanda sin validar). Trazabilidad completa en .offer-os (G0–G8) y revisión independiente en G7.

## A. Diagnóstico de la oferta anterior
Funcionaba: alcance acotado (sin agenda, asistente ni garantías), Primera Visita Digital gratuita como puerta de entrada, CTA veraz (WhatsApp/correo, sin formulario simulado), acta de entrega, páginas legales, medición con consentimiento.
No funcionaba: titular aspiracional sin sustantivo ("que entiendan por qué vale lo que cobras"); los entregables reales estaban ocultos en un desplegable; "¿por qué confiar?" hablaba del negocio del cliente y no de LSS; promesas no respaldadas ("probada hasta quien responde", "formulario contratado", "reclamar" el perfil); muestra visual gratuita no costeada; terceros descritos de tres maneras; tabla comparativa que atribuía carencias a las webs baratas; "cualquier país" sin análisis; bloque de Lighthouse con fecha vencida.
Dejaba de venderse como insignia: la "Recepción Digital" (agenda, recordatorios, anticipos, asistente) del dictamen del 30-oct. No existe agente por cliente, agenda, anticipos ni WhatsApp de cliente probado.
Corrección de un error propio: el primer borrador subió el precio de prueba 48 % sin evidencia nueva; se retiró.

## B. Cliente prioritario
Dueño de un negocio de servicios por cita o cotización, cuyos clientes llegan por recomendación, Instagram y WhatsApp y cuya información pública está dispersa. Foco de prospección sugerido (no público): belleza/estética no médica y servicios técnicos a domicilio (menor riesgo de datos sensibles). Sin exclusividad sectorial declarada. Excluidos: giros con datos de salud sin contrato específico, quien exige ventas o posiciones garantizadas, tiendas en línea complejas. Fuerza de la evidencia: inferencia (sin entrevistas ni compras).

## C. Problema comercial central
Quien recibe una recomendación comprueba al negocio antes de escribirle; si web, Google y contacto están dispersos o no coinciden, tiene que averiguar por su cuenta. (INFERENCIA; no hay estadística propia.) El dueño no sabe qué falla ni quién lo arreglará de punta a punta.

## D. Propuesta de valor (una idea)
"Tu web, tu perfil de Google y tu WhatsApp, probados en un teléfono antes de entregártelos." Mecanismo: Primera Visita Digital → propuesta escrita → construcción → prueba en vivo con acta → cuentas a nombre del cliente.

## E. Arquitectura de la oferta
Una oferta principal con dos alcances y un plan opcional.
- Corrección (si ya tiene web): Google coherente, contacto probado, medición, acta.
- Presencia Resuelta (proyecto): sitio móvil hasta 5 páginas + lo anterior + titularidad.
- Seguimiento mensual opcional: reporte con fuente, correcciones y cambios menores.
No incluye: garantía de clientes/ventas/posiciones, anuncios, fotografía, tienda en línea, agenda, cobros, asistente automático. Dominio, alojamiento y correo: a nombre del cliente, costo anual aproximado informado antes de empezar.

## F. Precio y condiciones (NO publicados; rango de prueba hipotético)
Corrección $6,900; Presencia Resuelta $9,800 vs $14,500 (prueba A/B en conversaciones); seguimiento $1,990 vs $2,490 mensual; sin IVA. Condiciones recomendadas: anticipo 50 %, una ronda de revisión por página, sin mínimo público.
Economía por cliente a 12 meses (supuestos, $400/h, sin tráfico): P50 +$3,880; downside −$11,940; upside +$24,540. El P50 es delgado. Viable solo si la entrega ≤ 26 h, el soporte ≤ 3–4 h/mes, el precio de instalación ≥ ≈ $12,000 y el abandono antes del mes 6 ≤ ≈ 40 %. Equilibrio de soporte: 5.3 h a $2,490. ≈ 8.7 clientes de plan cubren $8,000 de fijos supuestos. Capacidad realista: 12–15 clientes de plan por persona.
Historial: $15,000 / $4,500 / $7,500 / piloto $7,500 + $2,500×2 (propuestas anteriores) y $9,800 / $2,490 (30-oct) no están aprobados; no se conservan ni se rechazan: se prueban.

## G. Confianza y reducción de riesgo
Sin garantías ni casos inventados. Se usa: alcance y "No incluye" visibles, propuesta con inversión total antes de pagar, acta con pasa/no pasa/depende de tercero, cuentas a nombre del cliente, medición propia fechada con la etiqueta "es nuestra propia página", y la declaración honesta "estudio pequeño y nuevo, sin casos todavía". Garantía económica: NONE (la modelada del 30-oct no está aprobada).

## H. Diferenciación (límite)
Ventaja de ejecución y transparencia (prueba en teléfono, acta, titularidad, un responsable, alcance escrito). Es replicable y está PROPOSED, no SUPPORTED; el competidor con casos reales, presencia local o garantía la supera hasta que LSS tenga casos.

## I. Embudo
Hero (qué se recibe + CTA) → situación → Primera Visita (mecanismo y puerta gratuita) → qué recibes / no incluye → proceso → acta y medición propia → presupuesto, comparación por preguntas y plan → preguntas → CTA final. Una acción: WhatsApp (o correo) con mensaje prellenado. Fricciones conocidas: texto prellenado con "___" en móvil; no hay compromiso de plazo de respuesta publicado; ningún dato de volumen de visitas todavía.
Brunson/Hormozi: solo como lista de verificación (orden narrativo; reducción de esfuerzo y riesgo percibido); no se montó embudo de varios pasos porque el ticket se cierra por conversación.

## J. Copy comercial
El copy definitivo está en data/content.ts (commit de esta rama). Titular: "Tu web, tu perfil de Google y tu WhatsApp, probados en un teléfono antes de entregártelos." Subtítulo: "Para negocios de servicios que reciben clientes por recomendación. Hacemos o corregimos tu sitio, tus datos en Google y tu ruta de contacto, y te mostramos que funcionan. Todo a distancia, con las cuentas a tu nombre." CTA: "Quiero mi Primera Visita Digital".

## K. Matriz de trazabilidad (afirmaciones publicadas)
| Afirmación publicada | Clasificación | Respaldo |
|---|---|---|
| Hasta cinco páginas, Google coherente, contacto probado, acta, titularidad | PROPOSAL | G3; descripción de servicio, sin precio |
| Search Console y Analytics en cuentas del cliente | PROPOSAL | capacidad probada solo en el sitio propio (CLM-2, SRC-F) |
| Primera Visita Digital: tres observaciones, sin costo | PROPOSAL | términos publicados; cupo por definir (CLM-4) |
| Todo a distancia, en cualquier ciudad de México | PROPOSAL | CLM-5, decisión del titular pendiente |
| LSS es un estudio pequeño y nuevo, sin casos | FACT | CLM-9 (SRC-F) |
| Métricas Lighthouse/axe de la página propia | FACT | CLM-1; lighthouse-local.json; qa-offer/run3 |
| Dominio/alojamiento/correo a nombre del cliente | PROPOSAL | CLM-10, decisión del titular pendiente |
| La verificación del perfil la decide Google | FACT (política de Google; sin cita primaria en esta evidencia) | conservador; límite agregado al copy |
| Las personas recomendadas comprueban al negocio antes de escribir | INFERENCE | no publicada como cifra |
| Nada de precios, garantías, casos, testimonios, ROI, posiciones | — | G4 riesgoLimits |

## L. Dictamen de riesgos
Sin confirmar: demanda y disposición a pagar (UNVALIDATED); precio; horas reales; abandono; tasa de cierre; cupo de Primeras Visitas; modalidad 100 % remota (CLM-5); nombre y ciudad del responsable; tráfico; mínimos contractuales; anticipo y proceso de cobro; régimen fiscal.
No publicar: precios, "garantía", "valor total de $X", cifras de INEGI, estudios clínicos de recordatorios, exclusividad sectorial, cupos, escasez, comparaciones nominales, agenda/asistente/anticipos.
Riesgo más fuerte de fracaso: que los dueños no paguen una prima sobre una web barata y que el plan mensual (lo menos validado) sostenga el modelo.
Corrección de datos: la cifra de INEGI de 26.2 % del dictamen del 30-oct no se confirma; no se usa.
Veredicto: BLOCKED_BY_DATA. Para READY_TO_TEST faltan decisiones del titular (modalidad, cupo, plazo de respuesta, anticipo, nombre del responsable) y ejecutar el experimento de G7.
