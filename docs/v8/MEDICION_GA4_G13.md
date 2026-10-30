# Medición GA4 en la landing (G13) — implementada, DESACTIVADA hasta tener ID real

**Estado:** código listo en `v8/private-landing`, sin ID de medición real: **no mide nada** y el sitio publicado no cambia. Sin push ni despliegue.

## Qué hace
- `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-…` (variable de entorno de Vercel, no se versiona) activa todo. Sin ID válido: no hay banner, ni Google, ni cambios en el aviso de privacidad.
- **Consentimiento previo:** nada de Google se solicita hasta «Permitir medición». Rechazar y Permitir tienen el mismo tamaño y estilo; la decisión se recuerda y se cambia desde «Preferencias de privacidad» (pie). Retirar elimina las cookies `_ga` y `_ga_*` y recarga.
- **Sin doble etiquetado:** un solo `gtag('config')`, sin GTM, y la misma lógica de consentimiento del Meta Pixel (no activo).
- **Privacidad por diseño:** Consent Mode con publicidad denegada, `allow_google_signals:false`, `allow_ad_personalization_signals:false`.
- **Eventos (solo tras permitir):** `whatsapp_click` (todos los enlaces `wa.me`), `phone_click` (`tel:`), `form_submit`; parámetro `link_location` = sección/menú/pie/barra móvil. **Hoy no existen enlaces `tel:` ni formularios**, así que solo `whatsapp_click` se emite; los otros dos quedan listos. No se envía texto de mensajes ni teléfono.
- **Clic ≠ contacto recibido:** `whatsapp_click` mide una intención. Un contacto recibido, un cliente potencial calificado o una venta **no se pueden inferir de GA4**; requieren la recepción verificada en LSS Core (WhatsApp, hoy no operativa) y, si se quiere, enviarse luego como evento aparte. No se marca `whatsapp_click` como «lead».
- **Aviso de privacidad** (`/privacidad`, §5 y §6): cuando hay ID, describe exactamente lo anterior: proveedor, consentimiento previo, cookies, eventos, qué no se envía, transferencia, 14 meses, cómo retirar.

## Verificación (con ID de PRUEBA e interceptación; NO es medición real)
`qa-scripts/ga-consent.mjs`: 28 comprobaciones PASS: 0 peticiones a Google antes de decidir y tras rechazar; una sola carga de `gtag.js` tras permitir; un único `config`; evento `whatsapp_click` con ubicación (`inicio`, `pie`) sin teléfono ni texto; enlace interno sin evento; retirada elimina cookies; aviso con las 8 afirmaciones. `axe-banner.mjs`: 0 violaciones WCAG 2.2 AA y sin desbordes a 390 y 1440 px. Regresión en modo por defecto: `qa4.mjs` 69/69, `/privacidad` sin texto de GA.

## Antes de activarlo en producción (nada de esto está hecho)
1. Propiedad GA4 real creada con `localsystemsstudio@gmail.com` (ID `G-…`) y **retención de datos de eventos en 14 meses** (el aviso lo afirma; verificarlo por API).
2. Definir `NEXT_PUBLIC_GA_MEASUREMENT_ID` en Vercel y desplegar **con autorización expresa**.
3. Actualizar la fecha del aviso de privacidad el día de publicación.
4. Verificar con la etiqueta publicada: `gtag/js` solo tras «Permitir», evento visible en GA4 *DebugView/Realtime* y en la API de datos.
