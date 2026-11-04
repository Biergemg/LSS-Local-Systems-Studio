# V8 — Contrato obligatorio de AEO/GEO, SEO y búsqueda por voz — F5

No aparece un negocio en ChatGPT, Gemini o Google Assistant por instalar una skill o añadir Speakable. Para TODOS los clientes, F5 ejecuta por separado seo-audit, ai-seo y schema. Cada una produce su propio artefacto y log, y sus cambios deben verse en la web construida.

## Orden de ejecución

1. G0: confirmar siete skills presentes, tres skills SEO con SHA256 idéntico al paquete vendorizado de V8, y archivo de integridad correcto.
2. SEO Audit: comprobar robots.txt, sitemap, canonical, HTTP, HTML rastreable, datos del negocio, headings y zonas/servicios reales. Guardar URL, salida, fecha y evidencia.
3. AI SEO: investigar al menos cinco consultas comerciales conversacionales, una explícitamente oral. Cada entrada tiene intención, idioma, mercado, URL de destino, archivo fuente de contenido, hash SHA256 y evidencia. Incorporar respuestas verificables en contenido visible, no texto artificial.
4. Schema: comprobar JSON-LD con el contenido visible y fuentes oficiales; no inventar direcciones, reseñas, horarios, clientes ni resultados.
5. Registrar al menos dos consultas fechadas en buscadores/asistentes, con proveedor, consulta literal, resultado y evidencia. Un resultado NOT_MENTIONED es válido. Sin acceso real, BLOCKED, nunca simular citas.
6. Obtener línea base de Search Console o documentar NO_DATA con evidencia fechada. No inventar posiciones.
7. Reconciliar cambios: copia del contenido, SEO, Schema y respuesta de IA deben apuntar al mismo servicio/URL. Ejecutar QA y documentar.
8. Cerrar F5 y G5 solo con salida de scripts/verify-delivery.mjs status PASS. Esto verifica estructura y archivos, no garantiza clasificación ni convierte un log escrito por IA en evidencia independiente.

## Campos obligatorios en V8_DELIVERY_EVIDENCE.json

seoVisibility.version = v8-aeo-geo/1
seoVisibility.technicalAudit = {status:PASS, checkedAt:ISO, checkedUrl:URL, evidence:archivo}
seoVisibility.queryMap = 5+ entradas {query, intent, language, market, targetUrl, sourceFile, sourceSha256, evidence}
seoVisibility.assistantProbes = 2+ entradas {provider, query, observed:MENTIONED|NOT_MENTIONED, checkedAt:ISO, evidence}
seoVisibility.baseline = {status:MEASURED|NO_DATA, checkedAt:ISO, evidence}
seoVisibility.schemaReview = {status:PASS, checkedAt:ISO, evidence}

Cada una de las tres entradas en skills (seo-audit, ai-seo, schema) necesita:
status EXECUTED, installedName, source, executedAt, skillFileSha256, artifact y executionLog.
El hash debe coincidir exactamente con vendor/marketing-skills/<skill>/SKILL.md del Prompt Maestro.

## Protección
- No prometer recomendaciones, apariciones por voz, mejoras garantizadas ni posiciones que no se observaron.
- Speakable y llms.txt no acreditan por sí solos posicionamiento.
- No declarar ficha Google Business Profile si el negocio no es elegible.
- 21st.dev F4/F6 requiere búsqueda/comparación, no uso obligado de componentes con licencias desconocidas.
- Documentar incertidumbre; cualquier falta de ejecución o artefacto mantiene F5/G5 en BLOCKED.
