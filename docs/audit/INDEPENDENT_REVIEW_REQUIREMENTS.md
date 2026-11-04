# Revisión independiente del candidato

El expediente exige reporte de otro revisor con sourceCommit exacto, operaciones realmente repetidas, hallazgos, límites y status. Se entrega código, contrato V8 vendorizado y tests reproducibles. Una entrada BLOCKED no se cambia a PASS al generar JSON.

El ensamblador admite `.audit-private/independent-review.json` local o la variable del repositorio `V8_INDEPENDENT_REVIEW_JSON`. Rechaza un sourceCommit distinto del HEAD. No añade una nueva fecha a una revisión histórica. El informe técnico puede ser público solo tras retirar información privada; credenciales, datos de otros proyectos y la misión privada no se suben.
