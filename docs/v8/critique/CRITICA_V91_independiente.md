# Crítica independiente V9.1 — landing LSS (http://localhost:3200)

Método: revisión de diseño individual en un solo contexto. DEGRADED: no se ejecutó el detector `impeccable detect` ni los dos subagentes aislados (Assessment A/B). Sí hubo inspección en navegador real con Playwright/Chrome. El servidor respondió HTTP 200. Capturas propias en `critique/` (d-full, m-full, d-t00..09, m-t00..09, m-menu, d-focus, d-hover); capturas previas en `shots/w1-*`.

Medidas objetivas tomadas en vivo (no opinión): 1 h1, 0 imágenes, 7 SVG, 0 elementos con radio, 0 sombras, 0 errores de consola, lang es-MX, `prefers-reduced-motion` declarado, 77 animaciones activas tras la carga, ningún texto bajo 5.5:1 de contraste, ningún objetivo táctil menor de 44 px. Altura de página: 12 712 px en escritorio y 15 834 px en móvil; unas 1 450 palabras. Fondos de sección alternados: #0B0B0B, #F1F1EE (off-white) y #111111 en 10 secciones. Textos de 11-12 px: eyebrows, «WEB ECONÓMICA / PRESENCIA RESUELTA», «FORMATO», «LOCAL SYSTEMS STUDIO».

---

## 1. Puntuación Nielsen

Las heurísticas 7 y 10 casi no aplican a una landing (modo Persuade). Se puntúan igual para dar /40 y abajo se da el total renormalizado /32 sin ellas.

| # | Heurística | Escritorio | Móvil | Justificación / evidencia |
|---|---|---|---|---|
| 1 | Visibilidad del estado | 3 | 2 | Barra de progreso verde en el header y foco verde visible (d-focus.png). El menú nunca marca la sección actual (todas las w1-1440-* muestran la misma nav). En móvil la barra fija inferior (~90 px, 11 % del alto) tapa contenido en cada pantalla (w1-390-oferta, w1-390-cambio) y no hay indicación de «dónde voy» en 15 800 px. |
| 2 | Lenguaje del mundo real | 3 | 3 | Español claro, orientado al dueño («¿Cómo pido precio?»). Resta: «Presencia Resuelta», «Acta de entrega», «Titularidad», «Propiedades de Google» son jerga propia sin definir (w1-1440-oferta, w1-1440-entrega). |
| 3 | Control y libertad | 3 | 3 | El menú móvil se cierra con X (m-menu.png), hay anclas y FAQ plegable. Sin trampas. |
| 4 | Consistencia y estándares | 3 | 3 | Tokens muy coherentes (cero radios y sombras, mismo eyebrow, mismos filetes). Resta: la misma acción tiene 5 etiquetas («Revisar mi negocio», «Quiero ver qué cambiarían en mi negocio», «Conocer las pruebas de entrega», «Quiero mis tres observaciones», «Revisar mi negocio por WhatsApp»). |
| 5 | Prevención de errores | 3 | 3 | Sin formularios; el CTA avisa «Se abre WhatsApp con tu mensaje listo» (w1-1440-hero). |
| 6 | Reconocimiento vs recuerdo | 3 | 3 | Todo visible, numeración 01-05, CTA siempre presente. |
| 7 | Flexibilidad y eficiencia | 2 | 2 | Nav de 5 enlaces + CTA; en móvil la barra de WhatsApp es un acelerador útil, pero no hay salto por sección ni resumen: el recorrido es solo scroll. |
| 8 | Estética y minimalismo | 2 | 2 | Estética disciplinada pero cuantitativamente excesiva: 10 secciones, 1 450 palabras, 6 secciones seguidas con la misma gramática «H2 + lista numerada con filetes». Cuatro secciones repiten las mismas cuatro ideas (ver P1-2). |
| 9 | Recuperación de errores | 2 | 2 | No hay estados de error visibles; si WhatsApp no abre, el correo solo aparece en la última sección (d-t09). El CTA no ofrece alternativa. |
| 10 | Ayuda y documentación | 3 | 3 | FAQ de 10 preguntas pertinentes (w1-1440-preguntas) y detalle técnico plegable (d-t04). |
| | **Total /40** | **27** | **26** | Banda «Aceptable alto». Renormalizado sin 7 y 10: escritorio 23/32 (72 %), móvil 22/32 (69 %). |

Lectura: la usabilidad es sana. El problema no es usabilidad sino que la página gasta su calidad en ser correcta, no en persuadir con prueba de oficio.

---

## 2. Problemas priorizados

### P0
Ninguno de usabilidad ni técnico (sin errores de consola, contraste y tamaños táctiles correctos, reduced-motion presente). El problema más grave es de propuesta y se clasifica como P1-1.

### P1

**P1-1. La web no contiene ni una sola prueba verificable del oficio de LSS.**
- Evidencia: toda la secuencia w1-1440-*; 0 imágenes, 0 mediciones, 0 artefactos reales.
- Por qué importa: el cliente premium decide por evidencia. La página afirma («comprobamos», «pruebas reales») pero no muestra ninguna, ni siquiera de LSS sobre sí misma.
- Corrección sobria, sin casos inventados: publicar la medición real de esta misma página (LCP, CLS, peso, validación de datos estructurados, captura móvil con fecha) en un bloque «Esta página, medida» de 4 cifras con fecha y fuente. Añadir un ejemplo del formato de «tres observaciones» redactado sobre la propia LSS y marcado «aplicado a LSS». Es verdad, no demo ficticia.

**P1-2. Repetición estructural: las mismas ideas aparecen en 5 lugares.**
- Evidencia: hero (lista «encuentra / entiende / te escribe», w1-1440-hero); prueba (tres columnas «Lo que la persona encuentra / entiende / cómo puede escribirte», d-t02); preguntas-cliente (4 preguntas, w1-1440-preguntas-cliente); oferta (los mismos 4 conceptos en tarjetas, d-t04); entrega (checklist, w1-1440-entrega).
- Por qué importa: se pierde la sensación de avance, parece relleno y desmiente la voz de «claridad» que vende LSS.
- Corrección: fusionar preguntas-cliente y oferta en una sola sección (las 4 preguntas como cabeceras y lo que se entrega debajo, una frase por ítem) y eliminar la tríada duplicada de prueba. Objetivo: de 10 a 7 secciones y de ~1 450 a ~900 palabras.

**P1-3. Móvil: la primera pantalla no tiene contrapeso visual y el diagrama del hero queda truncado bajo la barra fija.**
- Evidencia: w1-390-hero.png (todo texto; el diagrama aparece cortado por la barra) y m-t00.png. Hay dos botones verdes a la vez (CTA del hero y barra fija) con textos distintos.
- Corrección: en móvil, versión compacta del marco (máx. ~140 px) entre eyebrow y titular, o eliminarlo. Ocultar la barra fija mientras el CTA del hero esté en pantalla (IntersectionObserver) y unificar la etiqueta.

**P1-4. Sin criterio económico en una página que debe sostener precio premium.**
- Evidencia: w1-1440-presupuesto («El precio depende de lo que realmente hay que construir»).
- Por qué importa: sin cifra, rango, «desde» ni criterio, el dueño no puede autoseleccionarse. El comparativo «web económica vs Presencia Resuelta» (acierto real) termina sin conclusión numérica.
- Corrección: no inventar tarifas (decisión del titular), pero declarar qué factores mueven el costo, plazo de cotización tras la primera visita y para quién no es el servicio.

### P2

**P2-1. «Cambio»: tres nombres de plataformas ajenas como evento tipográfico principal** (Instagram / Google / WhatsApp a ~90 px; w1-1440-cambio, d-t01). Es lo más llamativo de la sección y no vende nada propio; el texto útil queda a 16 px gris a la derecha con media fila vacía. Corrección: la frase útil pasa a titular de fila y el nombre de la plataforma a eyebrow.

**P2-2. Todos los H2 tienen casi el mismo tamaño y 3 líneas** (cambio, preguntas-cliente, oferta, proceso, presupuesto, preguntas). Ritmo tipográfico plano; solo «prueba» y «contacto» escalan. Corrección: dos escalas (H2 estándar 44-48 px, máximo 2 líneas; H2 de clímax solo en prueba y contacto) y titulares más cortos.

**P2-3. Etiquetas de 11-12 px en mayúsculas con tracking** en todos los eyebrows, y «WEB ECONÓMICA / PRESENCIA RESUELTA» repetidas en cada fila de la tabla (d-t07, w1-1440-presupuesto). Ruido ilegible para dueños de 40-60 años. Corrección: nombres una sola vez como cabecera de columna a 13-14 px.

**P2-4. Hero escritorio: marco dentro de marco** (ticks exteriores y soportes interiores no alineados, w1-1440-hero). Parece error de alineación. Las etiquetas 01/02/03 del diagrama no se conectan visualmente con las filas 01/02/03 de la lista. Corrección: un solo marco; conectar con línea a 90° cada etiqueta con su fila, o quitar las etiquetas.

**P2-5. Titular del hero con tres relativos encadenados** («Que quien te encuentre entienda por qué tu trabajo vale lo que cobras»). Exige relectura. Corrección: probar variantes más directas, p. ej. «Que quien te encuentre entienda por qué cobras lo que cobras», con 5 lectores reales.

**P2-6. Glifo de corchetes decorativo sin función.** En móvil flota solo encima del eyebrow en «prueba» y «contacto» (w1-390-prueba, w1-390-contacto), ~200 px de vacío. En escritorio ocupa la columna derecha con un gran vacío debajo (d-t02, d-t09). Corrección: quitarlo en móvil; en escritorio usarlo solo si señala algo.

**P2-7. Aire muerto excesivo en móvil:** ~150 CSS px antes de cada eyebrow × 10 secciones (w1-390-cambio, w1-390-presupuesto). Corrección: 72-88 px en móvil.

### P3
- P3-1. Nav sin estado activo de sección (todas las w1-1440-*).
- P3-2. Contacto: contenido sangrado a x=200 mientras los ticks y la rejilla están en x=144 (w1-1440-contacto); borde izquierdo inconsistente.
- P3-3. Hero: microtexto a 13 px gris, y el enlace «Ver cómo comprobamos la entrega» pesa casi como el CTA (w1-1440-hero).
- P3-4. #111 contra #0B0B0B es casi imperceptible y parece error de render. El off-white #F1F1EE es una decisión de identidad que debe confirmarse (el brief fija fondo #0B0B0B).
- P3-5. Las comillas «» en Space Grotesk bold se ven como `<<` y son toscas (w1-1440-entrega).
- P3-6. Pie en 12-13 px gris: contraste correcto pero pequeño (d-t09).

---

## 3. Hero y ritmo narrativo

**Hero escritorio (w1-1440-hero).** El esqueleto es el hero dividido clásico (copia a la izquierda, objeto a la derecha, lista bajo el objeto), que la guía de Persuade cita como plantilla aunque el mundo visual sea propio. Lo salva el lenguaje de corchetes, que es identidad y no adorno, y un titular de 64 px muy legible en cuatro líneas, con jerarquía clara: titular, CTA verde, subtexto. El CTA queda en la primera pantalla y el verde está bien dosificado como señal. Debilidades: P2-4 (doble marco, etiquetas desconectadas), P2-5 (sintaxis), y el diagrama es abstracto: no demuestra algo que solo este producto pueda probar. La lista 01/02/03 duplica la sección prueba. Animación: se detectan 77 animaciones al cargar, pero su calidad NO se puede juzgar sin verla (BLOCKED, ver §5).

**Hero móvil (w1-390-hero, m-t00).** Legibilidad excelente (titular grande, CTA a ancho completo, buen interlineado). Eyebrow, titular, párrafo, CTA y microtexto caben en la primera pantalla; el diagrama queda mordido por la barra fija y hay doble CTA verde (P1-3). Fallo narrativo: no hay nada que mirar; es un documento de texto con un botón.

**Ritmo de toda la página.** Orden: hero (oscuro) → cambio (claro) → prueba (oscuro, segundo «hero» enorme) → preguntas-cliente (claro) → oferta (#111) → proceso (oscuro) → entrega (claro) → presupuesto (#111) → FAQ (claro) → contacto (oscuro, tercer «hero»). Alterna color bien, pero la gramática de contenido no alterna: seis secciones son «eyebrow + H2 + lista numerada con filetes». Hay ritmo cromático, no narrativo.
- Se repiten: preguntas-cliente, oferta y entrega (las mismas cuatro preocupaciones); lista del hero y tríada de prueba.
- Bonitas pero poco útiles: «cambio» con palabras gigantes de plataformas (P2-1); el glifo de corchetes decorativo (P2-6); el diagrama del hero.
- No venden por sí solas: «oferta» (introduce un nombre de producto, «Presencia Resuelta», que nadie conoce, explicado con generalidades) y «proceso» (5 pasos de texto sin duración ni responsable).
- Sí venden: «prueba» (promesa concreta: tres observaciones, a distancia, sin costo), el comparativo de presupuesto (la comparación honesta es lo más diferenciador de la página), «entrega» con el acta (artefacto tangible, la idea más premium del sitio) y la FAQ.
- Orden sugerido: hero → problema (cambio, abreviado) → Primera Visita Digital → acta de entrega + medición de la propia página → comparativo y presupuesto → proceso breve → FAQ → contacto. Unos 7 bloques.

---

## 4. ¿Demuestra la web calidad por la que un propietario pagaría un precio premium?

**Puntuación: 6/10.** Por encima del promedio de agencias locales (tokens estrictos, tipografía solvente, sin clichés de IA, contraste y táctiles correctos, copy honesto), pero por debajo de «premium» porque la calidad se afirma y no se prueba, y la composición es de plantilla repetida.

Razonamiento: quien paga premium compra criterio y certeza. La web entrega criterio de redacción (honestidad sobre precios, comparativo, acta de entrega) y rigor de sistema visual; no entrega certeza: no hay un solo artefacto real, ni cifra, ni muestra de entrega, y la primera impresión en móvil es texto sobre negro. Además la longitud y la repetición contradicen el mensaje de «claridad»: una agencia que vende orden publica cinco secciones que dicen lo mismo. El diseño es sobrio sin ser memorable: ninguna pantalla se recuerda al cerrar la pestaña, salvo quizá el acta de entrega.

**Para subir 2 puntos (a 8) falta exactamente:**
1. Un artefacto real de LSS sobre sí misma (medición propia con fecha y fuente más un ejemplo de «tres observaciones» aplicado a LSS) que convierta «comprobamos» en algo visible (P1-1).
2. Pasar de 10 a ~7 secciones y de ~1 450 a ~900 palabras eliminando repeticiones (P1-2), y alternar gramáticas (una tipo tabla, una tipo acta, una narrativa) en vez de seis listas.
3. Resolver la primera pantalla móvil: contrapeso visual compacto y barra fija que no compita con el CTA (P1-3).
4. Criterio económico explícito sin inventar tarifas (P1-4).
5. Jerarquía tipográfica de dos escalas, eyebrows de al menos 13 px y un solo marco en el hero (P2-2, P2-3, P2-4).

Llegar a 9-10 exigiría clientes reales, resultados medidos reales y trabajo real mostrado; hoy no existen y no deben inventarse.

---

## 5. BLOCKED / no verificado

- **Animación en vivo: BLOCKED.** Solo vi capturas estáticas y que existen 77 animaciones. No pude juzgar timing, easing, suavidad ni si el hero «dibuja» el recorrido verde. En algunas tiles aparece contenido a media opacidad (p. ej. m-t04, «Si tu web ya funciona…»), lo que sugiere reveals por scroll; no confirmado si ocultan contenido con carga lenta.
- **Dispositivos reales (iOS Safari, Android, OLED, safe-area): BLOCKED.** Solo emulación Chrome 390×844.
- **Lectores de pantalla y orden de foco completo: BLOCKED.** Solo comprobé el foco visible en la nav.
- **Rendimiento en red real y CWV de producción: BLOCKED.** Solo localhost.
- **WhatsApp:** no se pulsó el CTA; destino y mensaje prellenado no verificados.
- **Detector `impeccable detect` y overlay:** no ejecutados (ver encabezado).
- **Percepción real de propietarios: BLOCKED.** El 6/10 es juicio experto, no prueba con usuarios. Se recomienda un test de 5 segundos con 5 dueños de negocios de servicios.
