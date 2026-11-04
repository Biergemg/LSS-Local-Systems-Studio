# Registro de defectos y límites

Los estados definitivos y el retest del mismo SHA se registran en V8_DELIVERY_EVIDENCE.json. Cambiar código por sí solo no cierra una fila.

| ID / prioridad | Reproducción y causa | Corrección y regresión |
|---|---|---|
| H01 / P1 | Verificador oficial production sin expediente, exit 2. | Expediente único generado desde registros reales; permanece bloqueado mientras falten obligaciones/aprobación. |
| H02 / P1 | Hero 320x568 CTA bottom621, aviso top453.8; a360 solapamiento parcial. | Composición móvil compacta; test cinco puntos, teclado y reduced-motion en once viewports. Revisión independiente a320 bottom440/aviso449.8 y a360 bottom432.8/aviso537.4 en implementación inicial. Repetir final. |
| H03 / P1 | Hash SEO histórico no acredita contenido actual. | Nuevo mapa de consultas, HTTP/schema/canonical/sitemap y hashes actuales. Dos observaciones negativas y GSC NO_DATA explícito. |
| H04 / P1 | Main sin reglas obligatorias en inspección inicial. | Dos checks requeridos ligados a GitHub Actions, protección de administradores, PR y entorno manual propietario. Ejecución final de CI y Vercel administrativo pendientes de verificar. |
| H05 / P1 | Documentos históricos fragmentados, sin certificado por commit. | Registry único con inputs completos, comandos reales y snapshot. No reutilizar PASS histórico. |
| H06 / P3 | Helper Meta y tipos sin consumidores, nueve keyframes sin uso, comentario de demo inexistente. | Retiro acotado; build/lint y suite funcional. Sin tocar otros worktrees. |
| SEC01 / P1 | Next recibido con avisos críticos/altos de dependencia. No se afirma explotación. | Actualizar Next/eslint-config a16.4.5; npm audit omit-dev sin vulnerabilidades. Retest build, rutas, consentimiento y CSP. |
| PRIV01 / P2 | Legales sin preferencias; permiso anterior no ligado a conjunto de proveedores. | Botón de preferencias en legales y clave por IDs actuales; prueba persistencia/revocación/clave antigua/storage fallido. |
| NAV01 / P2 | Menú móvil desaparece sin JS. | Enlaces noscript; teclado/Escape/anclas y rotación. |
| A11Y01 / P2 | Foco bajo aviso en landscape y texto aumentado. | Medición aviso y recuperación de foco; prueba pantalla baja, 200% de cada tamaño computado y recorrido Tab. |
| A11Y02 / P2 | Revisión independiente: titulares de Statement y marca se recortan al200%. | Reflujo/min-width y navegación medida; test de rangos de texto de todos los h1/h2/h3. Retest final requerido. |
| A11Y03 / P2 | Correos de legales desbordan al200%; sinJS el header ampliado cubre un enlace de respaldo. | Permitir corte de texto legal y header sticky sinJS; pruebas de las cuatro rutas ampliadas y de exposición del enlace. |
| CI01 / P1 | Revisión independiente: custodia exigía éxito del run que dependía de custodia. | Cadena del mismo run; autenticar éxito de jobs previos, sin ciclo. Prueba roja privada, regresión API stub. |
| CI02 / P1 | Revisor adversarial: archivo independiente inexistente aceptado; cobertura de entrada incompleta permitía reasignación. | Guard comprueba archivo+hash+operaciones, cobertura completa de inputs; pruebas negativas. No se modifica V8 canónico. |
| V8V01 / P1 | Seis fixtures inválidos aceptados por verificador oficial en copia sintética. | Evidencia roja preservada; guard complementario endurece árbol/revisión/custodia. Integridad V8 intacta. Defectos de validador no se disfrazan de QA del sitio. |
| DEV01 / P2 | npm audit completo:20 moderadas en herramientas de desarrollo (glob/minimatch), cero altas/críticas. | No se ejecuta actualización forzada que rompa lint. No afecta dependencias de producción auditadas; riesgo de herramientas documentado, pendiente revisión del propietario. |
| INFRA01 / P1 | Sin sesión administrativa Vercel no se verifican configuración Git, branch ni bypasses. | No implementado/verificado a nivel proveedor. La afirmación de bloqueo integral permanece prohibida. |
| ENV01 / P1 | Sincronizador oficial no pudo sustituir carpeta global UI/UX bloqueada. | Se usa copia canónica para la ejecución; instalación global divergente permanece bloqueada hasta sincronización oficial satisfactoria. |

Límites: axe sin violaciones no acredita todo WCAG. No hubo mensaje WhatsApp enviado/recibido, datos RUM/p75, informe Search Console autenticado ni validación externa Rich Results. No se ocultan estos límites ni se convierten en N/A para conseguir PASS.

Escáner final:16 alertas correspondían exclusivamente a hashes SHA256 calculados de scripts/tests cuyos nombres contienen «api». Se conserva el resultado rojo y se añade una excepción AND restringida a los JSON de registro y a la línea exacta ruta→64 hex; no se excluyen archivos completos ni credenciales. Repetición: cero alertas. El único hallazgo histórico inspeccionado era un nombre de localStorage, no una credencial; no se reescribe historial.
