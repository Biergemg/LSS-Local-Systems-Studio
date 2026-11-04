# F5c — Schema ejecutado por separado

Origen V8 `vendor/marketing-skills/schema`, upstream coreyhaines31/marketingskills, versión 2.0.2.

Entrada: lib/schema.ts, JSON-LD del servicio, FAQ visible y datos verificables de LSS. Operación: parseo de JSON-LD renderizado, contraste de nombre/URL/contacto/área de atención, IDs de Organization/WebSite/Service, BreadcrumbList y paridad de FAQPage con las preguntas visibles.

Hallazgo: ProfessionalService está deprecado según la fuente oficial https://schema.org/ProfessionalService y representa un negocio local físico sin dirección disponible. Se usa Organization para el estudio remoto y Service en su página correspondiente; no se inventa domicilio para satisfacer un validador. Referencia: https://developers.google.com/search/docs/appearance/structured-data/organization .

Corrección: lib/schema.ts. Retest: parseo en las cuatro rutas y comparación FAQ/schema; no incluir ratings, reseñas, precios ni horarios sin datos. El markup semántico de FAQ no equivale a un resultado enriquecido ni garantiza recomendaciones de IA.

Límite: validación de parseo/coherencia propia; no se afirma haber superado una prueba externa de Google Rich Results o Schema.org Validator si no se ejecutó.
