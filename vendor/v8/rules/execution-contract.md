# V8 — contrato obligatorio de ejecución real y QA verificable

Vigencia: 2026-10-30. Identidad pública: **V8**. No se permite bifurcar el método por cliente.
Fuente canónica: el directorio Skill-Sitios-Web/prompt-maestro-v8-orchestrator; las instalaciones y ZIP son reproducciones verificadas de su mismo contenido. Un cliente recibe una configuración creativa única, NO una versión distinta del método.

## Precedencia y bloqueo

Leer este contrato antes de las fases 1–9. **Palabras como "hecho", "listo", "premium", "21st integrado" o "QA PASS" no prueban ejecución.**
Todo elemento vendido/propuesto requiere una entrada en el inventario de componentes; cada elemento interactivo requiere al menos una prueba real de interacción con resultado y evidencia. Los elementos estáticos requieren verificación visual de navegador. Se debe identificar dónde aparecen y qué objetivo resuelven.
Un acta narrada sin artefactos de ejecución resulta BLOQUEADA. Los fallbacks y N/A nunca pueden disfrazarse de PASS. Los requisitos no aplicables necesitan motivo verificable.
En proyectos se ejecuta \`node scripts/verify-delivery.mjs --project <ruta> --evidence <ruta-json>\`; exit 0 autoriza declarar **QA verificable** solo en el alcance evaluado. Exit distinto de cero: **NO PUBLICABLE**. Esto NO sustituye aprobación de titular, test externo de sistemas de terceros ni garantiza ventas.
La validación compara evidencia con artefactos y logs reales, pero un fichero creado por la propia IA puede ser falsificado; para máxima confianza un revisor independiente debe repetir pruebas y confirmar screenshots. **NUNCA asegurar verificabilidad criptográfica de operaciones externas si solo existe registro autodeclarado.**

## Enlace obligatorio entre fases

1. F1 diagnóstico: brief firmado por quien autoriza, fuentes de hechos/claims, servicios, buyer, prueba de competencia (3 competidores y 2 referencias o bloqueo documentado), matriz y 2 conceptos. Evidencia material.
2. F2 copywriting: registrar el archivo de la skill consultada, fecha, versión y material aplicado. Tabla afirmación→fuente; copy hero, secciones, microcopy, FAQ, CTA; cero métricas o reseñas inventadas.
3. F3 CRO: revisión diferenciada de F2; mapa de intención→sección→CTA, test de claridad con evidencia humana si se afirma "5 s comprobados". Si solo es autoevaluación, etiquetar HIPÓTESIS.
4. F4 arte y UX: seis keyframes = hero/firma/CTA final x móvil+escritorio; tokens, licencia de assets, estados foco/touch/loading/reduced-motion, mapa de componentes y funcionalidad. Registrar selección 21st.
5. F5 SEO/AEO/GEO/Schema: **invocar tres skills reales** `seo-audit`, `ai-seo` y `schema` sobre los mismos hechos y piezas visibles. Entregar metadata e indexabilidad, una cartera de consultas en lenguaje natural y preguntas por voz con intención comercial, mapa consulta → página/fragmento real → prueba, una línea base de indexación/visibilidad, al menos dos comprobaciones fechadas en buscadores/asistentes con sus respuestas registradas y marcado schema coincidente con contenido visible. Distinguir *optimización ejecutada* de *recomendación/posición conseguida* (no garantizable). Falta de evidencia de la ejecución de una de las tres skills = G5/F5 BLOQUEADO, nunca sustituir por un informe genérico ni por `Speakable`/`llms.txt`.
6. F6 implementación: rutas/recursos reales, code completo, compilación/typecheck/lint, servidor local/preview, enlace CTA y recepción funcional, manejo de errores y accesibilidad.
7. F7 QA independiente: navegador real a 320, 390, 768, 1440; screenshots hero/experiencia/CTA/footer; console y network; tabs/teclado, accesibilidad, enlaces, CTA, reduced-motion, contraste y métricas reales. Ninguna imagen generada es evidencia de funcionamiento.
8. F8 defectos: lista de P0/P1/P2, correcciones puntuales con prueba repetida sobre mismo flujo y viewport. P0/P1 abiertos = NO PUBLICABLE. Si cambia componente o CSS, repetir capturas relevantes.
9. F9 entrega: artefactos A–L, ART_DIRECTION.md, QA_EVIDENCE.md, inventario, licencias, límites, propiedad de cuentas, changelog y rollback. Ningún deploy sin autorización real del titular.

Los gates G0–G9 siguen reglas de quality-gates-2026.md. G0 solo acredita que se investigó e intentó preparar dependencias; 21st requiere prueba separada de autenticación y uso. El transporte directo de solo lectura puede reemplazar búsquedas fallidas del plugin, pero debe registrar su conexión y resultados observados; NUNCA confundir CONNECTED_DIRECT con plugin Claude autenticado.

## Contrato de pruebas de todos los elementos

El archivo JSON de evidencia debe contener (ver templates/delivery-evidence.example.json):
- \`phases\`: 1..9, una entrada por fase, con evidencia verificable y estado.
- \`gates\`: G0..G9, estado, evidencia y causa de N/A o BLOQUEADO.
- \`components\`: **inventario de todas las piezas UI incluidas**, con ID único, código/ruta, propósito, estados y prueba de render en navegador; cada pieza interactiva añade interacción verificable y su resultado. Cualquier elemento ausente se agrega antes de aprobar.
- \`journeys\`: flujos de conversión críticos probados desde entrada hasta destino real; para formulario, constancia de recepción (no solo respuesta 200 de demo); para WhatsApp, URL válida y apertura, NO afirmar mensaje recibido si no ocurrió.
- \`screenshots\`: cada ancho 320/390/768/1440 y región hero/firma/CTA/footer debe existir, ser archivo no vacío y provenir de navegador; test de contenido y accesibilidad por separado.
- \`commands\`: typecheck/lint/build/browser/axe/SEO con comando, log de salida, exit real, tiempo y commit/código evaluado; N/A justificado para stacks no aplicables; nunca inventar métricas Lighthouse.
- \`thirdParty21st\`: registrar estado de auth 21st real, búsquedas y candidatos con sus URLs y evidencia, pieza elegida o causa comprobable para descartarla; licencia y dependencias por cada pieza efectivamente instalada. **21st NO es cosmético**: se obliga a buscar/evaluar antes de F4/F6; no se obliga a usar código externo cuando sería peor.
- \`assets\`: fuentes, derechos de uso, registro y créditos.
- \`issues\`: severidad, estado, enlace a evidencia de corrección y re-test.
- \`approval\`: autorización verificable de publicación (no basta "usuario pidió web" si no autorizó deploy).

**Revisión cruzada:**
- Los elementos UI deben usar el mismo mapa de oferta y CTA aprobado en CRO. Los cambios UX invalidan tests de interacción afectados.
- Animaciones no pueden ocultar contenido o romper enlace; preferir CSS y reduced-motion; Motion/GSAP no simultáneamente en mismo elemento.
- SEO/Schema debe reflejar copy publicado; cambiar copy puede requerir revalidar JSON-LD y metadata.
- 21st se evalúa contra tokens y accesibilidad; instalar un bloque no equivale a integrarlo.
- No validar solo una landing demo y declarar todo el sistema WaaS/automaciones entregado. Las integraciones externas requieren test extremo a extremo y credenciales del cliente autorizado.

## 21st.dev obligatorio como paso verificable, no como proveedor obligado

1. Verificar conexión real al endpoint oficial/documentación; el plugin instalado pero "Needs authentication" es **AUTH_REQUIRED**, NO usable.
2. Conectado: ejecutar búsqueda para el tipo de componente; registrar consulta exacta, 2+ candidatos, autor, URL, licencia y dependencias; compararlos contra diseño original. Elegir integrar/adaptar o rechazar con motivos y test.
3. Si auth o cuota bloquea, dejar \`thirdParty21st.status=BLOCKED\`, con prueba del bloqueo y alternativa original. **No declarar "21st ejecutado"** ni V8 COMPLETO; se puede entregar prototipo/básico con la limitación explícita. Ninguna credencial/compra se inventa.
4. Si se integra código 21st: fijar origen/versión, comprobar licencia y funcionamiento a 320/390/768/1440, teclado, responsive, consola y rendimiento. El autor no sustituye QA.
5. La comprobación final debe tratar como error que un sitio alegue "21st usado" sin rastro de búsqueda, selección y componente verificado.

## Congelamiento y distribución

Cada entrega registra SHA256 de la versión maestra mediante \`scripts/verify-integrity.mjs\`. La copia que Claude ejecuta debe pasar ese verificador. No mezclar archivos antiguos/actuales ni instalar ZIP históricos.
Archivos previos y PDFs son solo archivo histórico; fuente operativa única = carpeta maestra. Actualizaciones: editar UNA vez en maestra → auditar/verificar → regenerar lock → sincronizar instalado → producir ZIP portable actualizado con ese lock. Nunca modificar por separado la copia activa o el ZIP.
