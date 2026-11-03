# G7 — Revisión independiente adversarial (2026-11-03)

Alcance leído: G0–G6, `data/content.ts` (numeración de línea citada), `components/sections/OfferSection.tsx`, `Hero.tsx`, `git diff origin/main -- data components`, `app/servicios/presencia-digital/page.tsx` y `app/terminos/page.tsx` (grep), dictamen del 30-oct. No se ejecutó nada, no se verificaron fuentes web de nuevo.

Qué cambió realmente frente a lo publicado (diff): titular del hero, meta description, microcopy del hero, título/intro de OfferSection, bloque "Incluye / No incluye" (nuevo), subtítulo "Las cuatro preguntas…", párrafo de continuidad y 2 FAQ nuevas. Es decir: la "reingeniería de la oferta" en la landing es **un reordenamiento de copy**; el producto, la prueba de confianza y el precio siguen siendo los mismos. No hay ningún cambio que resuelva el problema central (ver C-1).

---

## Hallazgos

### CRÍTICOS

**C-1. No hay ninguna razón verificable para confiar en LSS; la página responde "¿por qué confiar?" sobre el cliente del cliente, no sobre LSS.**
- `content.ts:110` grupo 02 "¿Por qué confiar?" → "Fotografías, experiencia y credenciales auténticas…" son los activos del negocio del comprador, no de LSS. El comprador escéptico pregunta por LSS y no recibe respuesta.
- Único "proof" de LSS: `content.ts:151-161` puntajes Lighthouse de la propia página. Un dueño de salón no compra por Lighthouse 100/93; es prueba de que LSS hizo bien SU sitio, no de que entregará el del comprador. Además G4 CLM-1 dice "solo se publica el valor re-medido", pero `content.ts:152` publica "Medido el 29 de octubre… en la versión de revisión" (5 días de antigüedad, otra versión) y `:161` "Se vuelve a medir al publicar". Esa es una contradicción G4 vs. copy: o se remide antes de publicar y se cambia la fecha, o se quita el bloque.
- Sin nombre ni rostro del operador en `content.ts` (footer/`FOOTER.blurb`, `CONTACT.location: 'México / remoto'`). El diferenciador declarado en G2 ("un solo responsable humano") **no aparece nombrado** en la página. Un desconocido que "responde personalmente" (`:199`) sin nombre es, para el escéptico, anónimo.
- Recomendación: (a) nombre y una línea de quién es el responsable, en hero o bajo la oferta; (b) sustituir el bloque Lighthouse por una muestra concreta y abierta: el propio sitio de LSS como "caso de laboratorio" explícitamente etiquetado ("Esto es lo que hicimos con nuestra propia página; aún no tenemos clientes externos"); la honestidad de ser nuevo es la única prueba disponible y es mejor que esconderla; (c) remedir y fechar o retirar.
- Texto alternativo (bajo el CTA del hero): "LSS es un estudio de una sola persona, [Nombre], en Tampico. Aún no publicamos casos de clientes porque estamos abriendo cupo; por eso la primera revisión no cuesta y el alcance va por escrito antes de pagar."  (Requiere que el titular confirme los datos entre corchetes; ver CLM-5.)

**C-2. Trabajo gratuito no costeado: "dirección visual" previa a contratar.**
- `content.ts:86` (PPV.sample): "preparamos una primera dirección visual con tu marca para que veas el enfoque antes de contratar"; `:129` "una muestra visual y un recorrido propuesto" ; `:214` FAQ.
- G5 solo cuenta 3 h por Primera Visita ($1,050) y CAC $3,500 (≈3.3 visitas por cierre). La muestra visual (diseño especulativo) no aparece en ninguna hora, ni en CAC, ni en capacidad. Con 30 % de cierre, cada cliente carga además las muestras de los que no cierran. Si la muestra toma 3 h, el CAC base sube de $3,500 a ≥$5,600 y la contribución base de $24,240 a ~$22,100; en downside (cierre 17.5 %) el efecto es peor. Además es trabajo especulativo regalable a un competidor más barato.
- Recomendación: retirar la muestra visual de la landing hasta que el titular defina cupo, horas y precio, o condicionarla a haber aceptado la propuesta/anticipo. Texto alternativo (`PPV.sample`): eliminar la frase. (`PROCESS.steps[1]`): "Te presentamos la propuesta: alcance, calendario e inversión total."

**C-3. El experimento de pago que valida el modelo no tiene umbrales, y G5 depende de supuestos sin fuente.**
- G1 "Willingness to pay: UNVALIDATED… se resuelve con el experimento de pago de G7" — G7 es esta revisión; no existe documento de diseño del experimento en `evidence/` (G6 solo describe el flujo de una venta). Sin umbral de éxito/fracaso (nº de visitas, cierres, cobro de anticipo), el "READY_TO_TEST" no se puede falsar. Ver veredicto.

### ALTOS

**A-1. Titular con error gramatical y sin sustantivo del producto.**
- `content.ts:53`: "Que la persona **que** te recomendaron te encuentre…". Literalmente, "la persona que te recomendaron" = la persona a quien recomendaron (a ti). Lo que se quiere decir es "la persona **a quien** te recomendaron". Error en el H1; lo detectará cualquier lector cuidadoso y es lo primero que se ve.
- Además el H1 describe un resultado deseado, no qué se vende. "Sitio web" aparece recién en el subtítulo (`:54`). En 5 segundos: qué se vende (sí, en el subtítulo), qué se recibe (parcial), por qué confiar (no), siguiente paso (sí, botón). 2 de 4.
- Alternativa exacta (H1): "Tu web, tu ficha de Google y tu WhatsApp, revisados y probados en un teléfono antes de entregártelos."
  Subtítulo: "Para negocios de servicios que reciben clientes por recomendación. Hacemos o corregimos el sitio, la información en Google y la ruta de contacto. Todo a distancia, con las cuentas a tu nombre."
  Si se prefiere conservar el ángulo "recomendado": "Cuando alguien a quien le hablaron de ti te busca, que encuentre una web clara, datos correctos en Google y un WhatsApp que sí contesta."

**A-2. "Primera Visita Digital" no es una visita; el nombre fuerza una explicación.**
- `content.ts:77-80,205`: se dedica un párrafo (`remote`, FAQ "¿Tienen que ir a mi negocio?") a corregir lo que el nombre sugiere. Fricción de comprensión generada por la propia marca. Alternativa: "Revisión gratuita de tu presencia (3 observaciones)". Bajo (cosmético) si el titular ya tiene el nombre en materiales; alto si se mide.

**A-3. Promesas operativas que el registro del producto no respalda (SRC-F).**
- `:101` "Una ruta de contacto (WhatsApp, teléfono o correo) probada **hasta quien responde**" y `:111` "el formulario contratado, probados y conectados a quien responde". SRC-F: "NO probada: … WhatsApp de cliente". El contacto del sitio propio de LSS se probó (G19 email); WhatsApp de un cliente y "formulario contratado" no existen como capacidad. "Hasta quien responde" implica verificar que una persona humana responda, lo cual LSS no controla (es el cliente). Corregir a lo que sí puede probarse: "el enlace de WhatsApp abre el número correcto y el correo de prueba llega a la bandeja pactada".
  Alternativa: "Una ruta de contacto (enlace de WhatsApp, teléfono o correo) con prueba de que el mensaje llega al número o bandeja que acordamos."
- `:100,148,207` Perfil de Empresa: no hay API de Business Profile (SRC-F). La revisión será manual con acceso delegado: aceptable, pero el copy `:173` "si tu perfil de Google existe, hay que corregirlo o reclamarlo" promete reclamar; la verificación la decide Google (video, llamada, retrasos, suspensiones) y LSS no controla el plazo. Falta el límite: "la verificación del perfil la decide Google".
- `:102` "Search Console y Analytics configurados en cuentas a tu nombre": lo probado es el sitio propio (CLM-2). Para un cliente depende de acceso DNS al dominio y de consentimiento/aviso de privacidad; no hay nada de eso en el alcance. Dependencia no mencionada = riesgo de entrega y de horas (ver F-3).
- `:140` "Una función incluida que no pasa la prueba no se da por entregada." Es de facto una garantía de funcionamiento sin plazo ni remedio ni excepciones (caída de Google/WhatsApp, cambios de terceros). G4 dice guaranteePolicy: NONE. Redefinir: criterio de aceptación enumerado, y la acta lista "pasa / no pasa / depende de tercero".

**A-4. Contradicción de alcance: "incluye sitio" vs. "si ya tienes web, la conservamos" y Opción 1 de G3 ausente.**
- `:99` entregable 1 = sitio de hasta cinco páginas. `:118-119` "Si tu web ya funciona, la conservamos." G3 diseña tres opciones (Corrección $6,900 / Presencia Resuelta $14,500 / +Seguimiento) pero la landing presenta una sola, sin la variante de corrección. El comprador con web existente no sabe qué compra y no ve un precio de entrada menor; el producto más fácil de vender (corrección) es invisible.
- Recomendación: dos líneas en OfferSection: "Si ya tienes web: corregimos Google, el contacto y la medición, sin rehacer el sitio. Si no: sitio nuevo de hasta cinco páginas, más lo anterior."

**A-5. Terceros: ¿se incluyen o no? Dos textos dicen cosas distintas, y chocan con "sin extras obligatorios".**
- `:106` "Dominio, alojamiento y correo se definen en la propuesta" vs `:116` "se incluyen cuando la propuesta lo indica" vs G3 "los paga el cliente directamente; no están en el precio" vs `:168` "Nada aparece después como un 'extra obligatorio' sin explicar". Un costo recurrente obligatorio (dominio/hosting/correo) que el cliente paga a un tercero es un "extra obligatorio"; solo está "explicado". El escéptico lo leerá como letra chica. Decidir y escribir una sola postura: "Dominio, alojamiento y correo los contratas tú a tu nombre; te decimos el costo anual aproximado antes de empezar."

**A-6. Márgenes: el precio de prueba está anclado a cotizaciones C/D de marketplaces, y el razonamiento se invierte.**
- G3: "un posicionamiento premium no se defiende por debajo del promedio" → fija $14,500, justo debajo del "promedio $15–18 mil" (SRC-B, solo se leyó el extracto del buscador, nunca la página, grado C/D). El dictamen del 30-oct usaba "$7,000–$15,000" para la misma categoría; el promedio cambió de fuente a fuente (un día de diferencia) y el precio subió 48 % ($9,800→$14,500) por mover el ancla, no por costo ni por demanda. Eso es anclaje, no evidencia.
- SRC-C (grado D, vendedor interesado, Appy Pie) coloca paquetes desde $4,800; G1 "Tabla de alternativas" incluye $4,800–$14,800 para web de plantilla. A $14,500 LSS está en el extremo alto de la plantilla y no tiene "agencia" detrás; el comprador compara contra $5–8 mil. La diferencia (Google + contacto + acta) no tiene precio de mercado: es la hipótesis CLM-7, sin probar.
- Inconsistencia: $2,990/mes está en el extremo bajo de "$3,000–$10,000" de SRC-A, pero SRC-A es mantenimiento web (WordPress, respaldos, seguridad), no "reporte mensual con fuente + correcciones + cambios menores"; no hay evidencia de que el segmento de micronegocios pague $2,990/mes (≈ $35,880/año por un servicio que no genera ventas garantizadas). Probablemente el abandono será mayor al modelado. La propia SRC-A (ítem "WordPress ~$2,000/mes") y Appy Pie ($500–1,000 constructores) sugieren un piso de disposición más bajo.

**A-7. Competidor: ventaja replicable, confesada por el propio G2/G1.**
- G1 ("Es ventaja de ejecución, replicable por un integrador competente") y G2 ("Ninguna es exclusiva"). Un competidor con la capacidad de LSS puede: (a) ofrecer "acta de entrega" (es una hoja de checklist y capturas); (b) prometer titularidad de cuentas (es estándar y legalmente exigible); (c) regalar un diagnóstico más largo; (d) mostrar casos reales. LSS no puede contrarrestar (d).

### MEDIOS

**M-1. Tabla comparativa "Web económica" vs. "Presencia Resuelta" (`:178-188`) es un hombre de paja no sustanciado.**
- `:181-184`: "Contacto: Un botón o formulario publicado"; "Entrega: Publicación y archivos". Atribuye a toda web económica carencias que no se han verificado (G1: "Pocos muestran la prueba…" es inferencia de G1 sin muestreo). Un competidor que sí entregue guía y accesos hará quedar a LSS como engañosa. Además G4 prohíbe comparaciones con competidores; aquí es genérica, pero la afirmación sobre su contenido sigue sin respaldo.
- Recomendación: reformular como lista de "qué incluye un alcance completo" y que el lector pregunte a quien cotice: "Pregunta a cualquier proveedor: ¿quién prueba el contacto? ¿a nombre de quién quedan las cuentas?" Menos acusatorio, más verificable.

**M-2. Frases que podrían ser de mil agencias o son aforismos de relleno.**
- `:114` "No hace falta fingir una empresa más grande. Hace falta mostrar mejor la que ya existe." (aforismo; "fingir" insinúa que el comprador finge).
- `:73` "Tres piezas que cuentan la misma historia."
- `:78` "Abre tu negocio como si nunca hubieras oído hablar de él." (frase de ingenio que no informa).
- `:134,126` "Sabes qué estamos haciendo y qué recibes al final." (promesa vacía de proceso; toda agencia la dice).
- `:99` y `:109` repiten "servicios explicados con las palabras de quien los busca" casi literal (duplicación visible en la misma sección, OfferSection.tsx muestra la lista y luego las cuatro preguntas).
- No hay clichés prohibidos tipo "transformamos"/"siguiente nivel"/"nosotros nos encargamos de todo" ni garantías ni escasez ni cifras inventadas. Eso se cumple. Pero el tono es de pieza editorial, no de "qué compro, cuánto trabajo me cuesta, qué pasa mañana".

**M-3. CTA: cuatro etiquetas para la misma acción y una que no coincide con el destino.**
- `NAV_CTA` "Revisar mi negocio" (`:49`), hero/PPV/evidencia "Quiero mi Primera Visita Digital", CTA final "Quiero mis tres observaciones" (`:198`), OfferSection "Ver si encaja con mi negocio" (`:121`). Todas abren el mismo WhatsApp. "Ver si encaja" suena a pasivo (revisión de compatibilidad) pero produce el mismo envío de datos; una etiqueta, un destino.
- Hero secundario "Ver cómo comprobamos la entrega" (`Hero.tsx:15`) enlaza a `#proceso` (`ProcessSection`), pero la prueba/acta está en la sección `EVIDENCE`, no verificada en este review como `#prueba`: `id="prueba"` pertenece a `PpvSection.tsx:6` (la Primera Visita), no al acta. El enlace lleva a un lugar razonable, pero ni "proceso" ni "prueba" es la sección del acta de entrega. Verificar y apuntar al ancla correcta.

**M-4. El paso siguiente después del click no está descrito.**
- `:57,199` "Se abre WhatsApp con tu mensaje listo" pero no se dice cuándo se responde, qué se recibe (¿un PDF? ¿capturas por chat?), ni que los datos del mensaje se piden en un formato `___` (`WA_DEFAULT_TEXT`) que el visitante debe completar a mano en el celular; en móvil es fricción. Falta: "Respondemos en un día hábil con 3 observaciones y capturas." (Solo si el titular puede cumplirlo; G6 reconoce que 3 h/visita es el cuello de botella y no hay cupo definido.)

**M-5. Entregable "seguimiento correctivo definido" no tiene definición.**
- `:132` "entrega y seguimiento correctivo definido" ¿cuántos días? ¿qué cubre? G3 Opción 2 no incluye ningún soporte posterior; el texto sugiere sí. O se define (p.ej. 15 días de correcciones de lo entregado) y se costea (G5 no lo trae), o se elimina.

**M-6. "Desde cualquier ciudad o país" (`:80,197,205`) abre alcance no analizado.**
- Facturación a extranjeros, IVA, Meta/WhatsApp número extranjero, giros legales distintos, soporte en otras zonas horarias: nada en G5/G4. G0 define comprador en México. Recomendación: "en cualquier ciudad de México".
- Contrario a G6: la página de servicios sí nombra Tampico/Madero/Altamira (`presencia-digital/page.tsx:81`), la home no. Pierde la señal local más barata de confianza ("estudio en Tampico") y es incoherente entre páginas.

**M-7. "Todo a distancia / 100 % a distancia" publicado sin decisión del titular.**
- G4 CLM-5: "PROPOSAL… el titular no ha confirmado… pregunta abierta". Está en producción desde el 29-oct (`:205`, `:197`, footer `:218`). Si algún cliente pide visita presencial, ya se prometió lo contrario. Resolver antes de la prueba.

### BAJOS

- **B-1.** `content.ts:5` comentario dice que "los límites contractuales viven en la propuesta" pero la web publica ahora un bloque "No incluye" contractual; el comentario del encabezado está desactualizado (confunde a quien mantenga el archivo).
- **B-2.** El eyebrow del hero `:52` ("Negocios de servicios que venden por cita o cotización") es bueno para filtrar; no es un hallazgo, solo asegurar que no se suavice.
- **B-3.** `tsconfig.tsbuildinfo` aparece modificado en `git status`; no debe entrar en el commit.
- **B-4.** Secciones: sobra una (o se funden) entre `BELIEF`, `PPV` y `EVIDENCE`; las tres son "así se ve la prueba" con distinto relleno. Falta: una sección de "Quién eres/quiénes somos" (C-1) y una línea honesta de "para quién NO es" (G0 lo define: sin datos sensibles, sin quien exige ventas garantizadas), que hoy solo vive en G0/G6 y no en la página.

---

## Revisión de fuentes G1 (¿las citas respaldan lo afirmado?)

| Fuente | Problema |
|---|---|
| SRC-A (Cronoshare mantenimiento) | Grado C correcto, pero G3 usa "$3,000–$10,000 típico" como ancla de un servicio de reporte+correcciones, que no es mantenimiento técnico. El propio G1 admite "inconsistencia interna en precios anuales" y tarifa por hora "$400–$800 (en el texto $400–$600)": no se usa para validar el costo de $350/h del titular, que queda **por debajo** de lo que el mercado dice cobrar por hora. |
| SRC-B (diseño web empresas) | "No se abrió la página completa": el promedio $15–18 mil que fija el precio del paquete proviene de un extracto de buscador. Para una decisión de precio, esto es insuficiente; el dictamen previo daba $7–15k. |
| SRC-C (Appy Pie) | Fuente comercial interesada; el rango $4,800–$14,800 no es "web de plantilla" en abstracto sino los paquetes de ese proveedor. |
| SRC-D (INEGI) | G1 afirma que la cifra "26.2 %" del dictamen "NO pude confirmar" y que "INEGI reemplazó cifras tras correcciones", apoyándose en "un artículo de 2026" con 26.4 %. La afirmación de reemplazo no tiene cita; podría ser distinto año/universo (2023 vs 2024). Bien que no se use en copy; mal que se dé como "corrección" sin fuente primaria. |
| SRC-E (SuperSummary de Hormozi) | Resumen de segunda mano de libros no leídos; sirve de checklist, no de evidencia. G1 lo reconoce. Riesgo de sesgo: se adopta el marco y se evalúa la oferta con él (circular). |
| SRC-F (registro interno) | Respalda capacidad **sobre el sitio propio**, no entrega a un tercero. G2 lo dice, pero "capacidad probada" se redacta en `:104,147,148` como capacidad general. |
| Mercado | G1 admite: cero conversaciones de venta, cero entrevistas. Toda la tabla de "alternativas" son precios anunciados, no pagados. |

## Revisión de G5 (director financiero)

Aritmética verificada: Base 7,700 + 14,940 + 3,500 = 26,140; 50,380 − 26,140 = 24,240 ✓. Downside 10,500 + 5,310 + 6,000 = 21,810; 18,770 − 21,810 = −3,040 ✓. Upside 20,640; 29,740 ✓. G3: 7,700 + 14,940 = 22,640 ✓. Punto de equilibrio 2,990 − 370 = 2,620 / 350 = 7.5 h ✓. La aritmética no falla; los supuestos sí:

1. **Costo de hora $350 = costo de oportunidad, no efectivo, y debajo del mercado ($400–800, SRC-A).** El "margen" se mide contra un salario implícito; el flujo de caja real es ingresos − herramientas − impuestos. Con 22 h por $14,500 = $659/h bruto antes de IVA/ISR/comisiones; después de impuestos el neto por hora cae probablemente a ~$450–500 si las horas son 22. Con 30 h (downside) ~ $330.
2. **22 h para sitio (5 páginas) + copywriting + Google + contacto + GSC/GA4 + acta + tiempo de coordinación con un cliente no técnico** es optimista; G5 no desglosa. Supuestos omitidos: propuesta/contrato (≥2 h), onboarding, esperar materiales, revisiones sin límite escrito ("cambios menores definidos" no existen en el copy), videollamada de prueba, verificación de Perfil de Google, DNS. Sin tope de rondas de revisión el modelo no es defendible.
3. **Pago inicial:** G5 "Conclusión" dice "pago inicial antes de construir"; la landing y G6 no lo mencionan, y el registro dice que NO existen anticipos como producto. Cobro y contrato son "fuera del sitio" (G6): sin proceso de cobro verificado no hay control de riesgo de impago.
4. **CAC:** solo tiempo de Primera Visita (3 h). Omite tiempo de propuesta personalizada, seguimiento a no-respondientes, la muestra visual (C-2), la prospección activa (el motor de venta es reactivo: ¿cómo llegan los visitantes? G6 no dice canal de adquisición, tráfico ni presupuesto). Con tráfico desconocido el CAC no es 3.3 visitas por cliente sino ∞ hasta que haya visitas; la capacidad de 25–30 clientes es irrelevante si no entran leads.
5. **Capacidad:** "≈25–30 clientes con plan" (supuesto del dictamen) con soporte medio de 2.5 h/mes por cliente = 62–75 h/mes solo de soporte, sin proyectos nuevos, ventas ni fijos. A 25 clientes con 22 h de entrega cada uno en el primer año, otras 550 h. No cabe en una persona sin degradar la calidad prometida ("respondemos personalmente").
6. **Abandono:** el downside asume salida en mes 3; el comportamiento típico de un servicio de $2,990/mes que "no garantiza clientes" es abandonar al notar que no hay ventas atribuibles. No hay curva de retención ni probabilidad; el Base asume 12 meses completos en el 100 % de los clientes. El escenario "Base" es en realidad el optimista. La mezcla realista (p. ej. 40 % abandona en meses 3–6) probablemente sea de contribución cercana a cero o negativa.
7. **Umbral "≈7 clientes cubren fijos" (G5 Capacidad):** contribución mensual del plan = 2,990 − 1,245 = 1,745; 8,000/1,745 = 4.6 clientes; 7 clientes parece derivar de otra cuenta no mostrada (¿incluye amortización del proyecto?). No es reproducible. Además $8,000/mes de fijos es "supuesto" (¿sale del bolsillo del titular?).
8. **Escenario de descuento:** $9,800 aparece como "descuento" pero es el piso del dictamen original; si el mercado no paga $14,500 (probable, ver A-6), el caso real es el downside, no un descuento ocasional. Hay que modelar $9,800 y $6,900 sin abandono para saber si el negocio existe a ese precio.
9. **Opción 1 ($6,900, 10 h = $690/h):** margen aparente alto, pero 10 h para auditar Google, contacto, GSC/GA4 y acta, y corregir una web ajena (de calidad desconocida), es el supuesto más frágil: el trabajo de terceros mal hecho se hereda.
10. **Riesgo no cuantificado:** costo de soporte por incidentes de terceros (cambio de política de WhatsApp/Meta, suspensión de perfil, caída de hosting), responsabilidad legal por dominios/cuentas del cliente y datos personales (aviso de privacidad, LFPDPPP para formularios y GA4). Cero costo/seguro previsto.

**Veredicto financiero:** con los supuestos tal como están, el Base no es defendible; es el escenario menos probable. El modelo solo dice que, si todo sale bien, ganas ~$24k por cliente en 12 meses. Falta el escenario P50 con abandono, retraso de materiales y tráfico real.

## Defensa de los precios de prueba frente al G1

- **$14,500 / $6,900 / $2,990:** ninguno se deriva de costo + margen objetivo ni de disposición a pagar; derivan de un ancla de marketplace (C/D). Frente a la tabla de alternativas: web $4.8–14.8k (SRC-C), agencia $8–24k (SRC-B). $14,500 es defendible **solo si** el comprador entiende y valora Google + acta + titularidad, que es CLM-7 (HYPOTHESIS). Por eso debe probarse con rango y no con un número único (p. ej. mostrar $9,800 a un grupo y $14,500 a otro en conversaciones reales, o ofrecer Corrección a $6,900 como entrada).
- **Mensualidad $2,990:** el punto débil. Un dueño de negocio pequeño comparará con el constructor de $500–1,000/mes (SRC-C) o con cero. El valor percibido (un reporte) es bajo. Probar $1,490–1,990 antes de $2,990, o venderlo como paquete de horas medido.
- Los precios no son defendibles como "de mercado"; son consistentes con el rango de mercado pero eso es lo mismo que ser indistinguible de una agencia.

---

## Revisión de sesgos del autor

1. **Costo hundido / continuidad:** el hilo conserva el nombre "Presencia Resuelta", "Primera Visita Digital", "acta de entrega", "tres observaciones" de V6 (29-oct) a pesar de que el mandato era "reingeniería definitiva". El diff muestra que los cambios de oferta son 11 líneas en OfferSection y el hero; el diseño completo, la secuencia de secciones y la estructura (BELIEF, PPV, EVIDENCE, EXPECTATIONS) permanecen. G0 enumera "decisiones previas recuperadas" que luego G3 sigue pero reescalado ($9,800→$14,500).
2. **Confirmación:** G1 "Lectura de oportunidad (inferencia)" concluye diferenciación posible tras buscar precios y se declara "Hipótesis: mostrar la prueba y la titularidad es diferenciador". No se buscaron competidores que ya lo hacen (agencias locales de Tampico sí hay; "no se encontraron precios publicados" no equivale a "no lo hacen"). No se buscó evidencia en contra (p. ej. dueños que digan que la web no les sirve).
3. **Autoevaluación como prueba:** los 100/100/100 de Lighthouse de la propia página se presentan como prueba comercial. Es una métrica de ingeniería del autor sobre su propio trabajo.
4. **Elección de objetivo:** la economía de G5 usa el escenario Base como referencia y presenta Downside y Upside como variaciones; no existe P50 ni P10 real.
5. **Optimismo de planificación:** 22 h, 2.5 h/mes de soporte, 25–30 clientes por persona, sin ninguna medición propia previa de horas de entrega de un tercero.

---

## Resumen por perspectiva

**A. Comprador escéptico ("¿por qué no una web más barata?")**
No hay precio, no hay referencia de orden de magnitud, no hay nombre, no hay caso. La respuesta honesta a "¿por qué pagar más?" es "porque probamos el contacto y te damos un acta", que el comprador no puede evaluar sin ver una muestra. La tabla `compare` le dice que la web barata no hace eso pero no se lo demuestra; el comprador tiene que creer. Un dueño que lea el H1 entiende "algo de que me encuentren", no "me venden una web + Google + contacto". Sobran sección BELIEF/aforismos; falta quién y un número de referencia (aunque sea "desde"). Publicar un "desde $X" (si el titular aprueba) o al menos "El rango más común de proyectos está entre $A y $B" convertiría una página sin ancla en una con filtro. Hoy "¿Cuánto cuesta?" (`:211`) se responde con "depende".

**B. Competidor competente**
Usaría: (1) LSS no tiene ni un cliente ni un caso; ofrecería referencias y garantía de satisfacción; (2) un solo operador = riesgo de continuidad (¿y si se enferma?; la página promete "respondemos personalmente"); (3) el "acta" es un documento, no un resultado: ofrecería además medición de llamadas; (4) precio igual o 10 % menor con visita presencial en Tampico (LSS declara que es 100 % remoto); (5) la titularidad de cuentas la ofrece cualquiera. La diferenciación de LSS es una **característica de proceso que otros pueden dar** (G2 lo admite): no es un foso.

**C. Director financiero**
Ver sección específica arriba. Resumen: aritmética correcta, supuestos optimistas, CAC incompleto, hora subvaluada, trabajo gratuito sin costo, abandono no modelado, capacidad inconsistente. Precios no defendibles hasta que haya al menos 5–10 conversaciones de precio reales.

---

## Promesas que la operación real no puede cumplir (checklist solicitado)

| Registro del producto: NO existe | ¿Aparece en el copy? |
|---|---|
| Agenda | Excluido explícitamente (`:106`). OK. |
| Anticipos | Excluido (`cobros`, `:106`); G5 sin embargo propone "pago inicial antes de construir" (esto es otro anticipo; el proceso de cobro es manual y no está definido). |
| Agente por cliente | No aparece. OK. |
| API Business Profile | No se menciona API; sí "Perfil de Empresa revisado", viable manualmente (ver A-3); "reclamarlo" depende de Google. |
| Portal remoto de cliente | No aparece, pero `:140-142` "lo abrimos contigo… a distancia" y "accesos… por escrito" son sesiones manuales; asegurar que no se prometa portal/panel. |
| WhatsApp de cliente (SRC-F: no probado) | `:101,111,142` "probada hasta quien responde" ver A-3. |

Lenguaje prohibido: no se encontró "transformamos", "siguiente nivel", "nos encargamos de todo", escasez ni cifras inventadas. "Garantía" solo aparece negada. El riesgo está en garantías implícitas (A-3, `:140`) y en comparaciones (M-1).

---

## Veredicto

**BLOCKED_BY_DATA** (con dos correcciones de copy bloqueantes antes de cualquier tráfico).

Razones:
1. **No es REJECT-RETHINK:** el alcance está bien limitado (sin agenda/IA/anticipos/garantías), el copy evita las promesas más peligrosas, el CTA es veraz (abre WhatsApp, no cobra) y el modelo no es absurdo. Una consultoría pequeña de "web + Google + contacto probado" puede existir.
2. **No es READY_TO_TEST todavía** porque: (a) la demanda y el precio están sin validar y G7 (el "experimento de pago") no existe como diseño con umbrales (C-3); (b) la economía depende de un escenario Base optimista, un CAC incompleto y de trabajo gratuito (C-2) no costeado; (c) el único elemento de confianza de LSS es una auditoría Lighthouse de su propio sitio, vencida y contradictoria con G4 (C-1); (d) el titular tiene decisiones abiertas que afectan lo ya publicado: 100 % remoto (CLM-5), cupo de Primeras Visitas (CLM-4), mínimos contractuales y pago inicial.
3. Puede pasar a READY_TO_TEST cuando se cumplan **todas**: 
   - corregir el H1 (A-1) y el bloque Lighthouse (remedir/fechar o retirar);
   - retirar la "dirección visual" gratuita o costearla (C-2);
   - corregir "probada hasta quien responde" y el formulario (A-3);
   - definir terceros (A-5) y "seguimiento correctivo" (M-5);
   - el titular aprueba por escrito: modalidad remota/presencial, cupo semanal de Primeras Visitas, respuesta en N días, pago inicial;
   - existe un diseño de experimento con umbrales: p. ej. 30 Primeras Visitas ofrecidas → ≥10 conversaciones de propuesta → ≥3 propuestas con precio dicho en voz alta → ≥1 anticipo cobrado a ≥$9,800 en 60 días; si 0 anticipos tras 15 propuestas, se baja el precio o se cambia el producto (el monto exacto es del titular, el umbral debe existir antes).

---

## Disenso (lo que el autor probablemente no querrá oír)

1. **La "reingeniería" es de copy, no de oferta.** El producto es el mismo que ayer; el precio subió 48 % sin evidencia nueva. Cambiar el ancla de $9,800 a $14,500 porque el promedio de un marketplace cambió de fuente es racionalización, no análisis. Probablemente el comprador real de micronegocios se parece más al ancla de $4,800–$9,800 que al de $15–18k.
2. **Un estudio de una persona sin un solo cliente vendiendo "confianza" es un problema de credibilidad que ninguna redacción arregla.** El texto más honesto que podría escribir es "somos nuevos, empezamos con pocos clientes y esto es lo que hicimos con nuestra propia web". Esconder eso detrás de Lighthouse es peor que declararlo.
3. **La diferenciación ("acta de entrega", titularidad, un responsable") es proceso, no valor.** Un comprador rara vez paga por un acta; paga por llamadas, citas o la tranquilidad de no pensar en ello. G2 lo dice ("replicable") y el resto del dossier lo olvida y lo trata como foso.
4. **La Primera Visita gratuita probablemente pierde dinero y regala el diagnóstico.** 3 h por visita, 30 % de cierre es un supuesto sin dato; si el cierre es 10 %, el CAC en horas es de 9 h por cliente ($3,150 solo en visitas) antes de cualquier muestra visual. Y quien recibe las tres observaciones puede contratar a un freelancer de $3,000 para ejecutarlas.
5. **El plan mensual a $2,990 es el eslabón más débil y el que sostiene el modelo.** Sin él, el proyecto de $14,500 y 22+ h no paga fijos de $8,000/mes con menos de 1 cliente por mes. Con él, depende de retención de 12 meses, que nadie ha medido. El 80 % del ingreso Base proviene de la parte menos validada.
6. **Se calcula el margen con $350/h de costo de oportunidad y se llama "contribución positiva".** Para el titular, "contribución $24,240" no es ganancia; es lo que queda tras pagarse $350/h (menos que el mercado) y antes de impuestos. Si trabaja más de 22 h, el margen se evapora.
7. **Hay más trabajo de redacción que de validación.** Ocho documentos G0–G6 y ni una conversación con un comprador. El siguiente entregable valioso no es otro gate: es hablar con 10 dueños de negocios reales y preguntarles cuánto pagaron por su última web y si les sirvió.
8. **"A distancia desde cualquier país" y "100 % remoto" son decisiones comerciales que alguien tomó sin que el titular las aprobara (CLM-5 abierto) y ya están publicadas.** Eso contradice la regla del propio dossier ("no publicar lo no aprobado").
