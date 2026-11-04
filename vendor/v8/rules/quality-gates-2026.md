# V8 — Gates verificables (complementan las fases 1–9)

**Regla F5/G5 nueva:** AI SEO es obligatoria para TODOS los proyectos. Los tres artefactos (`seo-audit`, `ai-seo`, `schema`) deben ser diferentes y tener log, contenido implementado y pruebas. `seoVisibility` requiere al menos 5 preguntas comerciales conversacionales con URLs y código del cliente, dos búsquedas de respuesta registradas y baseline indexación. Las respuestas negativas son evidencia válida; fingir citas es un incumplimiento. **G0** requiere siete skills y versiones vendorizadas verificadas.

**Requisito automático:** antes de F9 y de publicar, `node scripts/verify-delivery.mjs --project <ruta> --evidence <ruta>/V8_DELIVERY_EVIDENCE.json --mode production` debe finalizar con código 0. Para cada fase/gate y componente, conservar archivo de evidencia y test ejecutado; no basta un texto de aprobación. Ver `rules/execution-contract.md`. El inventario debe comprender los archivos de componentes y páginas realmente construidos. La evaluación 21st.dev se registra con consulta, candidatos y resultado; falta de autenticación bloquea declarar V8 COMPLETO.

No crean una V9. Son criterios obligatorios dentro de las fases de V8. No afirmar calidad que no se haya probado.

G0 — **Fuente y alcance**: brief, activos, propietario de la marca, propiedad intelectual, datos/claims verificables, permiso para modificar/publicar, costos. Si falta info crítica, un placeholder o un producto inexistente => no publicar.
G1 — **Conversión** (F1–F3): objetivo primario medible, buyer real, una acción principal, propuesta diferenciadora y objeciones. Microcopy de formularios/error/éxito.
G2 — **Arte** (F1/F4): dos territorios distintos, referencias verificadas, tres keyframes, firma visual y funcional; sistema de tokens y composición móvil. Si no hay captura o diseño verificable => BLOQUEADO visual.
G3 — **Componentes y licencias** (F4/F6): elegir librerías sin solapes; licencias por componente/fotos/tipografías; ninguna instalación o generación paga sin aprobación.
G4 — **Construcción ejecutable** (F6): npm build/TypeScript/lint y smoke tests según stack; servir local real; nada de “código completo” no compilado.
G5 — **Revisión visual independiente** (F7): capturar 320/390/768/1440 en navegador real (o informar que no fue posible), crítico hero, mid-scroll, CTA, overlays; criticar y corregir.
G6 — **Experiencia funcional** (F7): enlaces reales, WA correcto, envío del formulario realmente recibido o marcado “demo”, navegación teclado, no overlap, fallback sin efectos, reduced-motion, 404.
G7 — **Performance/SEO/A11y** (F7): LCP/INP/CLS con fuente y percentil cuando haya RUM; Lighthouse, axe y audit SEO. Registrar N/D si no se midió; nunca PASS estimado.
G8 — **Cierre** (F8): defectos P0/P1 corregidos y reprobados; P2 documentados si fuera de alcance; no es válido “todo corregido” sin verificación.
G9 — **Handoff / publicable** (F9): evidence pack, URLs, repos/versiones, changelog, rollback, licencia, edición, guía, métricas y límites, consentimiento de publicación. No publicar sin consentimiento explícito.

## Gate status
- PASS: evidencia adjunta con fecha, versión, comando/captura y resultado.
- FAIL: prueba realizada y falló; mantener bloqueo.
- BLOCKED: no hubo acceso/herramienta/dato, sin suponer éxito.
- N/A: no aplica y se justifica.

La ausencia de 21st autenticado **no bloquea un prototipo** con componentes originales, pero **sí bloquea afirmar V8 COMPLETO**, ya que falta la evaluación externa exigida; se consigna `AUTH_REQUIRED`. La ausencia de Motion o GSAP no bloquea si CSS nativo es superior. La ausencia de validación visual o funcional **bloquea aprobar producción**, aunque se entregue prototipo honesto.
No comprar servicios, registrar, instalar plugins con costo, adquirir dominios o publicar sin permiso.
A-L se conserva. Añadir el expediente de evidencia bajo H (enlace/código), G (keyframes y criterio) y L (status gates).