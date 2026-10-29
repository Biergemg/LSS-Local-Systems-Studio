# Crítica independiente V9.2 - LSS (localhost:3200)

Method: ⚠️ DEGRADED: single-context (no se lanzaron dos sub-agentes aislados A/B; el detector `impeccable detect` no se ejecutó; la evidencia B es una sonda Playwright propia). Modo de superficie: Persuade. Heurísticas 7 y 10 puntuadas con el criterio "n/a permitido" pero se muestran con número parcial para comparar; el total se da /40 como pidió el encargo y /32 renormalizado.

Evidencia usada: shots `w3-*` (390@2x, 1440), `anim-d/m-*`, `w3-d/m-acta-live`, y capturas propias en `critique\v92\` (`m-fold`, `d-fold`, `m-end`, `d-end`, sonda DOM). Altura de página: 14 577 px móvil (~17 pantallas), 12 103 px escritorio. 0 imágenes, 0 formularios, 8 enlaces a WhatsApp, 0 elementos táctiles < 44 px (medido), único texto < 13 px: "LOCAL SYSTEMS STUDIO" (12 px, #B4B4B4) en el logotipo.

---

## 1. Nielsen

### Móvil: 29/40 (Bueno bajo; 72 %)
| # | Heurística | Pts | Evidencia |
|---|---|---|---|
| 1 | Estado del sistema | 3 | Barra de progreso verde superior, barra fija de WhatsApp, `w3-390-cambio`. El menú hamburguesa no indica sección activa (no hay "estás aquí" en móvil; en escritorio sí lo hay, `w3-1440-cambio`). |
| 2 | Lenguaje del usuario | 3 | Casi todo en español llano. Fuga: "Presencia Resuelta", "CLS", "WCAG 2.2 AA", "axe-core" en la tarjeta (`w3-m-acta-live`) son jerga para un dueño de negocio de servicios. |
| 3 | Control y libertad | 3 | Anclas y acordeones; sin trampas. Sin "volver arriba" en una página de 14 577 px. |
| 4 | Consistencia | 3 | Sistema de corchetes/cuadrado verde sólido. Rompe: la tarjeta Lighthouse usa fondo blanco puro + borde verde izquierdo grueso, un patrón distinto al resto y con tipografía de menor contraste (`w3-390-entrega`). |
| 5 | Prevención de errores | 3 | Un solo canal (WhatsApp con mensaje prellenado); no hay formulario que fallar. Pero "se abre WhatsApp" depende de que la app exista; sin alternativa visible salvo el correo al pie. |
| 6 | Reconocimiento | 3 | CTA siempre visible (barra inferior). Ocho CTAs de WhatsApp con 6 etiquetas distintas ("Quiero ver qué cambiarían en mi negocio", "Revisar mi negocio por WhatsApp", "Quiero mi primera revisión", "Quiero mis tres observaciones"...): el usuario debe decidir si son lo mismo. |
| 7 | Flexibilidad | 2 | Sin atajos; aceptable en Persuade. |
| 8 | Estética y minimalismo | 3 | Limpio, pero largo y repetitivo (ver §3). Cinco bloques pesan lo mismo; la jerarquía entre "prueba", "oferta" y "proceso" es plana. |
| 9 | Recuperación de errores | 2 | No verificable más allá del enlace de WhatsApp. No hay fallback si falla. |
| 10 | Ayuda y documentación | 3 | FAQ de 10 preguntas con acordeón (`w3-390-preguntas`); la pregunta de precio ("¿Tiene costo la primera revisión?") está en la última posición. |
| **Total** | | **28-29/40** | Puntuación asignada: **29/40**. Renormalizado sin 7 y 10: 24/32 = 75 % (Bueno). |

### Escritorio: 30/40 (75 %, Bueno)
| # | Heurística | Pts | Evidencia |
|---|---|---|---|
| 1 | Estado | 4 | Nav con subrayado verde de sección activa + barra de progreso (`w3-1440-prueba`, `-oferta`). Lo mejor ejecutado. |
| 2 | Lenguaje | 3 | Igual que móvil. |
| 3 | Control | 3 | Nav de 5 enlaces + CTA, siempre visible. |
| 4 | Consistencia | 3 | El gráfico de corchetes de "La prueba" y del contacto sobresale del contenedor (borde derecho x≈1366 vs. contenedor 1296; `w3-1440-prueba`, `d-end`) y no se alinea con la rejilla del resto. |
| 5 | Prevención | 3 | Igual. |
| 6 | Reconocimiento | 3 | Igual: demasiadas variantes de CTA. |
| 7 | Flexibilidad | 2 | n/a razonable. |
| 8 | Estética | 3 | Titulares grandes con aire real; pero secciones de titular enorme + columna de texto desplazada abajo-derecha (`w3-1440-oferta`, `-presupuesto`) dejan huecos blancos sin función (zona derecha superior vacía). |
| 9 | Errores | 2 | Igual. |
| 10 | Ayuda | 4 | FAQ en dos columnas, escaneable (`w3-1440-preguntas`). Justo en escritorio sí funciona. |
| **Total** | | **30/40** | Renormalizado sin 7 y 10: 24/32 = 75 %. |

Lectura: el sitio es correcto y disciplinado; no es memorable. 70-75 % es la banda "no hay errores graves, tampoco hay una idea".

---

## 2. Problemas

### P1 (corregir antes de mostrar a un cliente que paga premium)
**P1-1. La tarjeta "Lo aplicamos a esta misma página" rompe la identidad y se hunde visualmente (móvil y escritorio).**
Evidencia: `w3-390-entrega`, `w3-d-acta-live`. Fondo blanco #FBFBF9 sobre papel #F1F1EE, borde verde izquierdo de ~12 px, etiquetas grises ligeras y cifras grandes de Space Grotesk. Es la única "caja" de la página con ese tratamiento; compite con el "Acta de entrega" al lado, que tiene el mismo peso pero es un formato vacío. Corrección: pasar a una tabla de líneas finas sobre el papel (sin relleno blanco), cifras alineadas a la derecha, y bajar el encabezado a nivel de metadato. Ver §5.

**P1-2. "2.7 s" se parte en dos líneas en móvil.** `w3-m-acta-live` y `w3-390-entrega`: el "2.7" y la "s" quedan en dos renglones, con la fila más alta que las demás. Defecto de pulido que contradice exactamente el mensaje de calidad. Corrección: `white-space: nowrap` en el valor y reducir la etiqueta ("Carga principal, simulada") o apilar etiqueta/valor en móvil.

**P1-3. Hero móvil: la pieza visual queda bajo el pliegue y la animación no se ve en la primera pantalla.** `w3-390-hero` / `m-fold`: en 844 px de alto, el visor muestra eyebrow, H1, subtítulo, CTA, enlace y nota; el gráfico solo asoma 2 etiquetas ("ENCUENTRA", "ENTIENDE"). En `anim-m-500` y `anim-m-1300/2100/3600` la secuencia ocurre abajo; quien no haga scroll en los primeros 2 s nunca ve la construcción. Es decorativo y no cuesta, pero tampoco vende: gasta ~40 % de la altura del hero móvil para un diagrama abstracto. Corrección: en móvil, o bien subirlo a ≤ 220 px de alto entre H1 y CTA, o bien quitarlo del hero y llevarlo a la sección de "La prueba".

**P1-4. El titular del hero promete lo que la página no demuestra.** "Que quien te encuentre entienda por qué tu trabajo vale lo que cobras." es buen concepto, pero la web no tiene un solo ejemplo visual de un negocio mejorado, ni un solo número de un cliente, ni una cara. El visitante pasa de la promesa al diagrama de tres palabras y a la entrega. Es honesto (no hay casos, no se inventan), pero entonces la prueba tiene que ser la propia pieza. Hoy la "prueba" es la tarjeta Lighthouse, que es la parte más débil. Ver §3 y §5.

### P2
**P2-1. Animación del hero: la línea cruza la etiqueta "ESCRIBE".** `w3-1440-hero`, `anim-m-3600`: el conector vertical verde desciende hasta y a través de la etiqueta (la "I/B" queda cortada por la línea) y el nodo sobresale por debajo. Debe terminar en el borde superior de la etiqueta o desviarse.
**P2-2. La animación tarda 3 s en completarse y deja la zona vacía al inicio.** `anim-d-500` muestra una columna entera de 520 px sin contenido durante ≥ 0.5 s (solo ticks y el pie), `anim-d-1300` solo esquinas, `anim-d-2100` una etiqueta. Si el visitante lee en 2 s, ve un hueco. Corrección: estado final visible desde el primer fotograma y animar solo el trazo de unión (≤ 800 ms), o respetar `prefers-reduced-motion` (no verificado: BLOCKED).
**P2-3. "A distancia" aparece tres veces en el mismo bloque del hero** (rótulo interno "A DISTANCIA", pie "PRIMERA VISITA DIGITAL, A DISTANCIA", y el subtítulo "Trabajamos a distancia"). Más en eyebrow de prueba y párrafo ("todo parte de lo que tu negocio muestra en Internet"). Es la tesis, pero repetida deja de ser una.
**P2-4. Ocho CTAs a WhatsApp con seis redacciones** (ver Nielsen 6). Unificar a dos: principal ("Pedir mi Primera Visita Digital") y barra fija.
**P2-5. Pre-pliegue de oferta: tarjetas 03/04 y 02 con fondo gris (#999-#B8B8B8)** en `w3-390-oferta` y `w3-1440-oferta`. No sé si es una animación a medio completar o el estado real; si es estado real, el gris plano no está en la paleta y el contraste de texto sobre él sería bajo. BLOCKED (no pude inspeccionar el estado final; mis capturas de scroll no llegaron a esa sección).
**P2-6. Texto de apoyo muy tenue**: "Revisión a distancia, sin costo: tres observaciones concretas. Se abre WhatsApp con tu mensaje listo." (`w3-1440-hero`) es 13 px gris sobre negro, justo la frase que quita el miedo al costo, y es la más pequeña del hero. Subir a 16 px y #D0D0D0.
**P2-7. Pie de CTA pegado**: en el contacto, la nota "WhatsApp abre una conversación con LSS..." queda a ~8 px bajo el botón (`w3-390-contacto`, `d-end`). Añadir 16 px.
**P2-8. Gráfico de corchetes del contacto y de "La prueba" sobresale del contenedor** (x≈1366) y en contacto el corchete verde se cruza con el de esquina (`d-end`, 1280-1296/383). Alinear a la columna derecha de 1296.

### P3
- P3-1. Eyebrow del hero en dos líneas con interletraje amplio en escritorio y móvil ("PARA NEGOCIOS DE SERVICIOS QUE VENDEN POR CITA O COTIZACIÓN") compite con el H1; acortar a "NEGOCIOS DE SERVICIOS QUE VENDEN POR CITA".
- P3-2. Logotipo: "LOCAL SYSTEMS STUDIO" a 12 px / #B4B4B4 es el único texto bajo 13 px; legible pero marginal.
- P3-3. En escritorio el H1 del contacto (≈ 110 px) es más grande que el H1 del hero (≈ 65 px). La jerarquía global se invierte: el último titular grita más que el primero.
- P3-4. Falta "volver arriba" y estado activo en el menú móvil.
- P3-5. Footer: redes "Instagram / Facebook" sin ningún contenido que mostrar (no verifico si los perfiles existen: BLOCKED).

---

## 3. Hero, ritmo y narrativa

### Hero
- **Composición (escritorio)**: izquierda copy, derecha diagrama; es el patrón "split hero" tal cual. Fuerte tipografía, buen H1 de cuatro líneas, un único CTA verde y un enlace secundario. Se lee en 3 s y el CTA está visible. Pero el 40 % derecho se gasta en un diagrama de tres rótulos sin información, que además comparte semántica con el logotipo (corchetes) y repite "a distancia". Resultado: seguro, elegante, intercambiable con cualquier agencia que use una retícula y esquinas.
- **Legibilidad**: H1 blanco sobre #0B0B0B excelente; subtítulo gris claro suficiente; nota inferior débil (P2-6).
- **Primera pantalla móvil**: título, subtítulo, CTA y enlace caben; excelente que el CTA esté a 940-1050 px@2x (≈ 470-525 css) dentro del pliegue. Defecto: el diagrama ocupa lo que sigue y el menú pesa 60 px más que necesario. Aprobado salvo P1-3.
- **Animación**: los cuatro fotogramas muestran una secuencia razonable (esquinas → ENCUENTRA → ENTIENDE → ESCRIBE → medidor "A DISTANCIA"), 3.6 s; el mensaje "encuentra → entiende → escribe" coincide con la tesis. Pero (a) el estado vacío inicial (`anim-d-500`) es un hueco, (b) la línea atraviesa ESCRIBE, (c) en móvil está fuera del pliegue y se pierde. Calificación: correcta, no distintiva; no la quitaría, la reduciría.

### Ritmo narrativo (ink/paper)
Hero (tinta) → Cambio (papel) → Prueba (tinta) → Oferta (papel) → Proceso (tinta) → Entrega (papel) → Presupuesto (tinta) → Preguntas (papel) → Contacto (tinta). La alternancia es regular, quizá demasiado: **nueve bloques de peso casi idéntico** con la misma estructura (eyebrow + titular grande + párrafo + lista de 3-5 elementos). Sin pausa de ritmo (una cifra grande, una cita, una imagen de un resultado) la lectura se vuelve plana hacia la mitad (Oferta→Proceso→Entrega→Presupuesto).

Repeticiones:
1. "Primera Visita Digital / tres observaciones / revisión a distancia" aparece en hero, "La prueba", "Proceso 01", FAQ y contacto (≥ 5 veces).
2. "Un proceso que puedes revisar" (Proceso) y "La prueba se hace contigo" (Entrega) cubren la misma idea (verificabilidad): son dos secciones para un mismo argumento.
3. "Cambio" (3 momentos: Instagram/Google/WhatsApp) y "Prueba" (3 puntos: encuentra/entiende/escribe) son la misma tríada con otros verbos.
4. Presupuesto repite "claro / antes de empezar" que ya prometen Oferta y Entrega.

Secciones que no venden:
- **Entrega ("La prueba se hace contigo")**: el "Acta de entrega" es un formato vacío con casillas sin marcar; muestra un compromiso pero no un resultado. Es la sección más larga y la que menos mueve a pagar.
- **Presupuesto**: sin cifras ni rangos (comprensible), así que es una lista de "lo que mueve el costo" que un comprador premium lee como evasiva.
- **Proceso**: legítima pero genérica (cinco pasos).
Secciones que sí venden: Cambio (reconoce el dolor: "Ya te recomendaron. Ahora toca que puedan comprobar por qué.") y Prueba (el titular "Abre tu negocio como si nunca hubieras oído hablar de él." es lo mejor de la página).

---

## 4. ¿La web demuestra una calidad por la que se pagaría un precio premium?

**Puntuación: 6 / 10.**

Por qué no más: es disciplinada, rápida, tiene una tipografía firme y una voz clara y honesta; por eso pasa de "plantilla" (4) a "agencia seria" (6). Pero un propietario que paga premium compra criterio visible, y aquí el criterio está en el texto, no en lo que se ve: no hay ni una sola imagen, ni un ejemplo, ni una demostración visual de "antes/después" (y no deben inventarse). La identidad (cero radios/sombras, 90°/45°, verde solo como indicador) está cumplida al pie de la letra, lo cual da coherencia, no encanto. Los defectos pequeños (2.7 s partido, línea cruzando ESCRIBE, gráfico sobresaliendo) son lo que un comprador de diseño nota en 10 s y lo que decide si cree el discurso de calidad.

**Qué falta para +2 (8/10), sin inventar nada:**
1. Mostrar **el propio trabajo** de LSS como prueba, no una tabla de métricas: una simulación a escala de lo que "vería quien busca", construida con el mismo sistema (ficha de Google ficticia con datos explícitamente de ejemplo marcada como "Ejemplo ilustrativo") es ficción; en su lugar, mostrar **la Primera Visita Digital en sí**: un documento tipo "Tres observaciones" con la estructura real (observación, captura/dónde, qué cambiaríamos) y campos en blanco marcados como formato. Eso es un entregable concreto y no inventa un cliente.
2. Un mismo CTA, una misma frase de oferta, menos pantallas (reducir 9 a 6-7 bloques; fusionar Proceso+Entrega y quitar Presupuesto como sección, dejándolo como 2 líneas en la FAQ).
3. Un momento de gran escala tipográfica a mitad de la página (una frase en 120 px sobre tinta) para romper la monotonía de eyebrow+titular+lista.
4. Cerrar los defectos de pulido P1-2, P2-1, P2-7, P2-8.
5. Reducir/cuidar el movimiento: una sola animación que se vea completa en el primer pliegue.

---

## 5. Riesgos de lo mostrado: tarjeta "Lo aplicamos a esta misma página"

Contenido (`w3-d-acta-live`, `w3-m-acta-live`): Accesibilidad 100, Buenas prácticas 100, SEO 100, **Rendimiento 93**, **Carga del contenido principal (simulada) 2.7 s**, CLS 0, Errores WCAG 2.2 AA 0, y pie: "Medido el 29 de octubre de 2026 sobre la versión de revisión: Lighthouse 12.8.2 (móvil, simulado; rendimiento y carga son la mediana de 5 corridas) y axe-core con WCAG 2.2 AA. Se vuelve a medir sobre la versión publicada."

**Ayuda** (credibilidad):
- Muestra números que no son todos 100: el 93 y el 2.7 s son una señal de honestidad; un 100 completo sería sospechoso.
- Fecha, versión de herramienta, método (mediana de 5) y la salvedad "se vuelve a medir" son nivel de rigor poco común. Para un comprador técnico (o un contratista de otro rubro que investiga), eso es una prueba de autodisciplina.
- Es la única evidencia verificable de la página; sin ella no habría ninguna.

**Perjudica** (y creo que perjudica más de lo que ayuda):
1. **Un 2.7 s de LCP "simulada" a un lector que no sabe qué es LCP significa "2.7 segundos de carga"**; el estándar de referencia es ≤ 2.5 s para "bueno". Para una web que se vende como "veloz" y premium, publicar una cifra que cae justo fuera del umbral recomendado por Google invita a la objeción más fácil: "tu propia web no pasa". La salvedad "simulada" la explica a un técnico, no al dueño.
2. **Rendimiento 93 en una página estática sin una sola imagen**: cualquier lector que sepa algo pensará que una página sin fotos debería dar 98-100. Plantea la pregunta "¿qué tanto pesa?" en lugar de responderla.
3. **Tres 100 + 93 + 0 + 0 es lenguaje de autoelogio con jerga** (CLS, axe-core, WCAG 2.2 AA). A un dueño de negocio le dice "una auditoría técnica", no "mi cliente me encuentra más". El mensaje de LSS ("ayudar a que te encuentren y te escriban") no es el que mide la tarjeta.
4. **Medir una versión "de revisión" y decir "se vuelve a medir sobre la publicada"** deja la prueba condicionada: hoy la cifra no está demostrada sobre lo que el visitante ve. Eso es honesto pero debilita el titular "Lo aplicamos a esta misma página".
5. **El título "Lo aplicamos a esta misma página" + etiqueta "MEDIDO"** afirma una práctica ("aplicamos") con una tabla; el lector no ve qué se aplicó. Es un tablero, no un método.
6. **Visual y de posición**: encaja mal en la sección de entrega (compite con el Acta) y rompe el sistema visual (P1-1); en móvil el valor "2.7 s" se parte, justo en la cifra más delicada.
7. **Vida útil**: una cifra fechada caduca. Si en seis semanas el sitio publicado da 88, la tarjeta se vuelve un pasivo; si no se actualiza automáticamente, mejor retirar las cifras de rendimiento.

**Recomendación**: conservar Accesibilidad/SEO/Buenas prácticas/WCAG como una sola línea ("Medido el 29/10/2026: accesibilidad, SEO y buenas prácticas 100; 0 errores WCAG 2.2 AA") y **mover rendimiento y carga fuera de la tarjeta** hasta que el sitio publicado alcance ≥ 95 y LCP ≤ 2.5 s; o mostrarlos con una frase en lenguaje llano ("carga en menos de 3 s en un móvil de gama media con conexión lenta simulada"). Si se mantienen, que sea con la misma fecha y con el enlace/informe descargable de Lighthouse (inexistente hoy: BLOCKED). Veredicto: **como está, perjudica ligeramente (-)**; aislada y recortada, ayudaría.

---

## 6. BLOCKED (no pude verificar)
- BLOCKED: estados finales de las tarjetas 02-04 de "Qué recibes" y el bloque "Si tu web ya funciona, la conservamos" (mis capturas con scroll programático no llegaron al contenido; los `shots` entregados las muestran a medio revelar o grises).
- BLOCKED: parte inferior de Presupuesto (después de "Si sumas el plan mensual...") y los dos H3 finales ("Si comparas...", "Lo que viene después...").
- BLOCKED: `prefers-reduced-motion`, enfoque por teclado, lector de pantalla, contraste exacto medido por píxel (se infirió de las capturas).
- BLOCKED: apertura real de WhatsApp con mensaje prellenado y número +52 833 326 3389; existencia de los perfiles de Instagram/Facebook.
- BLOCKED: las cifras de Lighthouse de la tarjeta (no re-medí; solo juzgo su presentación).
- BLOCKED: menú móvil abierto (no lo capturé).
- BLOCKED: detector determinista de impeccable, doble sub-agente (ejecución degradada, ver encabezado).
- Nota de método: mis capturas `m-slice*.png` de página completa salieron en blanco por las animaciones de revelado al hacer fullPage; no son evidencia de defecto del sitio.

## Resumen final (10 líneas)
1. Nielsen: móvil 29/40, escritorio 30/40 (ambos "Bueno", sin errores graves y sin idea memorable).
2. Calidad global para precio premium: 6/10; +2 exige mostrar el entregable real (Primera Visita Digital) y recortar repeticiones.
3. Mejor pieza: el titular "Abre tu negocio como si nunca hubieras oído hablar de él" y el estado activo del menú en escritorio.
4. P1: la tarjeta Lighthouse rompe el sistema visual y "2.7 s" se parte en dos líneas en móvil.
5. P1: el hero móvil deja el diagrama bajo el pliegue y la animación se pierde; en escritorio es un split hero estándar.
6. P2: la línea del conector cruza la etiqueta "ESCRIBE"; la animación arranca con un hueco de ~1 s; el gráfico de "La prueba"/contacto sobresale del contenedor.
7. Narrativa: nueve bloques idénticos en estructura; "Primera Visita Digital / a distancia" se repite ≥ 5 veces; Proceso y Entrega dicen lo mismo; Presupuesto no vende.
8. Ocho CTAs a WhatsApp con seis redacciones: unificar.
9. Riesgo: la tarjeta de Lighthouse con 93 y 2.7 s (fuera del umbral de 2.5 s) invita la objeción "tu web no pasa su propio estándar"; recomiendo conservarla solo con las cifras 100/WCAG hasta mejorar rendimiento.
10. No pude verificar tarjetas 02-04 de Oferta, final de Presupuesto, reduced-motion, teclado ni el enlace real de WhatsApp (BLOCKED); ejecución degradada sin sub-agentes ni detector.
