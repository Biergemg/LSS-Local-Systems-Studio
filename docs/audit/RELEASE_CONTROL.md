# Control de liberación y custodia

La ruta habitual es GitHub main → integración Git de Vercel, según el propietario y los deployments observados. Este cambio no despliega ni modifica la landing pública.

V8 critical QA exige fuente canónica íntegra, suite adversarial del verificador, guard del árbol, lint/build/TypeScript, auditoría de dependencias, escaneo de secretos y navegador. V8 delivery certification requiere artefacto certificado del mismo SHA; sin ID, autenticación, evidencias o aprobación, falla cerrado. Ningún archivo de la laptop es una dependencia de CI: V8 íntegro y las siete skills fijadas se incluyen en vendor/v8, con sus licencias y lock original. No se modifica el contrato para obtener PASS.

La rama main debe exigir ambos contextos de GitHub Actions, PR, estado actualizado y protección de administradores. La aplicación efectiva se comprueba por API y su resultado se conserva en el informe privado; este archivo por sí solo no demuestra que la regla esté activa.

Los logs reales se capturan con scripts/run-check.mjs. scripts/assemble-evidence.mjs vincula revisiones cuyos hashes de entrada aún coinciden, preserva estados/fechas y adjunta el resultado real. No transforma BLOCKED en PASS. La revisión independiente se suministra ligada a SHA. Los artefactos de CI contienen solo fuentes/salidas técnicas del sitio público; nunca credenciales, misión privada ni datos de otras sesiones. En un repositorio público no deben considerarse almacenamiento confidencial.

Custodia: un workflow_dispatch de v8-evidence-custody, iniciado por el propietario, exige autorización de producción explícita y revisión de environment v8-release-approval. Consulta la aprobación registrada por GitHub, valida el SHA del artefacto y ejecuta el verificador oficial con el guard complementario. Solo entonces carga v8-certified-evidence-SHA. La variable V8_EVIDENCE_ARTIFACT_ID apunta a ese artefacto; cambiar código invalida el SHA. No hay paso de deploy en esos workflows. Expiración 30 días: recertificar, no omitir el control.

Limitaciones conservadas: la API de GitHub acredita el deployment recibido y sus estados, no todos los permisos o métodos de promoción de Vercel. Sin sesión Vercel autenticada no se verifica esa configuración. El control normal por Git queda separado de bypasses administrativos del proveedor. Las reglas no garantizan resistencia contra un administrador que deliberadamente cambie las propias reglas.

Recuperación: bundle privado de refs recibido antes de trabajar; rama de auditoría separada. No se reescribe historial, no hay force push, reset duro ni borrado de ramas. Para descartar el candidato basta no integrarlo; producción continúa en el commit recibido. Un rollback de una publicación futura requerirá autorización y se realizará mediante commit/PR verificable.
