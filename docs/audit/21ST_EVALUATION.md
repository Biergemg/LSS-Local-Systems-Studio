# 21st.dev — EVALUATED_NOT_SELECTED

Consulta real mediante transporte canónico de solo lectura: `21st-direct.mjs --check` devolvió CONNECTED_DIRECT; el cliente Codex no acredita plugin autenticado. Tres búsquedas reales cubrieron hero/tipografía/navegación e índice/transiciones/microinteracción/móvil. Cero recuperaciones de código de pago y cero créditos consumidos por esta tarea.

Dos candidatos contrastados en las páginas oficiales el 3-nov-2026:

| Candidato | Autor, URL y licencia | Dependencias comprobables | Operación observada |
|---|---|---|---|
| Editorial service list | Waqar H. Syed, @ibrandify; https://docs.21st.dev/@ibrandify/components/editorial-service-list ; MIT | React y Tailwind declarados por la página; el ejemplo importa un componente cliente y estado Props/State. Dependencias internas completas no expuestas sin recuperar fuente. | Preview real: clic expande Brand strategy; Enter vuelve a colapsar; capturas y árbol accesible guardados. |
| Directional text button | Waqar H. Syed, @ibrandify; https://21st.dev/@ibrandify/components/directional-text-button ; MIT | React y Tailwind; ejemplo cliente con estados de showcase. Dependencias internas completas no verificadas. | Página, preview y enlace Explore the project observados; captura y markup de uso guardados. |

| Dimensión | Contra el índice propio de LSS | Contra el CTA propio de LSS |
|---|---|---|
| Originalidad e identidad | El acordeón usa otra tipografía, texto y composición; LSS ya tiene índice con su acento y numerales. | Flecha diagonal/underline requieren adaptación; no demuestran mejora de identidad. |
| Composición y calidad perceptible | Su composición es coherente, pero esconder descripción añade un paso al breve índice actual. | La animación es distinta, no una mejora probada de claridad. |
| Interacción | La expansión funciona; LSS permite pedir propuesta contextual en una acción. | El CTA LSS ya tiene hover, pressed, focus y enlace nativo. |
| Accesibilidad | Botón expandido/colapsado y Enter observados; no se ejecutó una auditoría axe completa del candidato. | No hay evidencia de superioridad sobre el enlace nativo probado en LSS. |
| Rendimiento | Sin medición comparable de bundle, no se afirma que sea más lento ni más rápido. LSS no necesita estado cliente para sus filas. | Sin benchmark del componente completo; añadirlo no demuestra ahorro. |
| Móvil | No se certificó toda la matriz del componente externo; LSS sí tiene regresión propia. | No se certificó móvil del componente externo. |
| Mantenibilidad | El componente server actual consume los datos de servicios; sustituirlo exige adaptar estado y propósito. | CSS propio evita un componente cliente adicional sin beneficio demostrado. |
| Licencia | MIT mostrada en fuente oficial. No se copia código. | MIT mostrada en fuente oficial. No se copia código. |

Decisión de ambos: EVALUATED_NOT_SELECTED. No hay mejora sustantiva demostrada que justifique reemplazar la implementación de marca. Las limitaciones del código no recuperado y de sus mediciones se conservan; no se les atribuye un PASS funcional universal. La búsqueda autenticada no se confunde con autenticación del plugin.
