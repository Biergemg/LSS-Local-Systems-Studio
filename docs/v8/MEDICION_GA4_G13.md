# Medición GA4 de la landing — G13/G14

**Estado 30-10-2026:** Google y propiedad GA4 creados, ID público real G-0DJ220E3ZL, código de consentimiento probado localmente. Publicada mediante GitHub main y Vercel Production (commit funcional 6c9b7ba). Consentimiento y transmisión real a Google verificados, informes GA4 aún sin filas de eventos procesados al cierre.

## Funcionamiento
- ID público por defecto en lib/analytics.ts, con override de NEXT_PUBLIC_GA_MEASUREMENT_ID; GitHub main despliega Vercel automáticamente.
- Consentimiento previo (lss-tracking-consent-v2) impide Google antes de aceptar. Rechazo persistente y revocación que elimina cookies. Autorización antigua de Meta no autoriza GA4.
- Una sola etiqueta gtag.js, sin GTM; publicidad denegada, Google Signals y personalización desactivadas, GA4 medición mejorada automática desactivada.
- whatsapp_click, phone_click y form_submit miden intención, no contacto recibido ni venta. Sin número ni texto personal en eventos.
- Aviso de privacidad actualizado 30/10/2026; retención de eventos y usuarios 14 meses confirmada en Analytics.
- Search Console y GA4 vinculados a LSS CORE con lectura real HTTP 200.

## Evidencias
Véase docs/v8/G14_GA4_PRODUCTION_QA_2026-10-30.md.
Scripts: ga-consent.mjs (lógica interceptada), ga-consent-legacy.mjs (consentimiento legado), ga-real-transport.mjs (envío real a Google), axe-banner.mjs y qa4.mjs.
Los eventos personalizados de GA4 se pueden transmitir agrupados en el cuerpo de una petición POST; el QA de transporte inspecciona ese cuerpo.
