# Revisión independiente del candidato

El expediente exige reporte de otro revisor con sourceCommit exacto, operaciones realmente repetidas, hallazgos, límites y status. Se entrega código, contrato V8 vendorizado y tests reproducibles. Una entrada BLOCKED no se cambia a PASS al generar JSON.

El ensamblador admite `.audit-private/independent-review.json` local o la variable del repositorio `V8_INDEPENDENT_REVIEW_JSON`. Rechaza un sourceCommit distinto del HEAD. No añade una nueva fecha a una revisión histórica. El informe técnico puede ser público solo tras retirar información privada; credenciales, datos de otros proyectos y la misión privada no se suben.

En CI los harness de tests/independent, escritos por el revisor, se ejecutan de nuevo y producen logs, cobertura y capturas en el propio runner. scripts/replay-independent.mjs conserva intacta la revisión original recibida por variable, exige su SHA y cobertura actuales y adjunta operaciones reales nuevas atribuidas a GitHub Actions. No necesita logs de la laptop ni cambia la fecha, hallazgos o autorización del revisor. Si falta la revisión fuente, el resultado sigue BLOCKED aunque las pruebas de replay pasen. La variable es un acta revisable; no se afirma autoría criptográficamente demostrada. La custodia manual del propietario sigue siendo necesaria.
