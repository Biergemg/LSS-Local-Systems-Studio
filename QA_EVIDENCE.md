# QA reproducible del candidato LSS

No es una certificación ni autorización de publicación. El dictamen por commit y los resultados se conservan en V8_DELIVERY_EVIDENCE.json y la carpeta de auditoría privada. El workflow genera un artefacto de evidencia del mismo SHA y falla si falta el expediente certificado.

Con Node de `.nvmrc`: `npm ci`, `npm run verify:v8`, `node vendor/v8/scripts/test-v8.mjs`, `npm run lint`, `npm run build`, `npm run typecheck`, `npm run test:release-guard`. Iniciar `npm start -- --hostname 127.0.0.1 --port 3418`; instalar Chromium mediante `npx playwright install chromium` y ejecutar `npm run test:critical`. BROWSER_EXECUTABLE permite un navegador local existente; CI instala el Chromium correspondiente a la versión fijada.

La matriz cubre los once viewports solicitados, cada uno con movimiento normal y reducido. Se evalúan esquinas/centro del CTA, no solo presencia. Hay pruebas de menú repetido, Escape, foco, anclas y rotación; consentimiento/revocación; almacenamiento fallido/permiso previo; scripts y eventos con proveedores aislados; ausencia de JS; metadata/schema/axe; 404; fuentes retrasadas; texto ampliado y landscape corto. Los proveedores de analytics se interceptan en las pruebas de consentimiento para no contaminar métricas reales: esas pruebas verifican carga condicional y eventos de intención, no recepción externa de Google/Meta.

El primer intento falló en producción para 320, 360, preferencias legales y navegación sin JS. Una primera regresión obtuvo 31/32; el caso ampliado falló y se corrigió/reprobó por separado. El resultado posterior debe leerse del log del mismo commit, no de esta narración. No se borran fallos históricos para mejorar el dictamen.

No hubo envío de mensaje de WhatsApp ni recepción confirmada. No se infiere INP p75 ni Core Web Vitals de campo a partir de Lighthouse. El equivalente de reflow de zoom se prueba con anchos CSS y ampliación de texto; no se afirma haber operado el zoom de todos los navegadores/dispositivos físicos. Axe es cobertura automatizada, no certificación universal WCAG.
