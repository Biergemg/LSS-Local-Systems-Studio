# G14 — Activación controlada de Google Analytics 4 en LSS

**Fecha:** 30 de octubre de 2026 (México).
**Negocio:** LSS — Local Systems Studio.
**Sitio:** https://www.lsslocalsystemsstudio.com
**Propiedad GA4:** 561632900.
**ID público:** G-0DJ220E3ZL.
**Cliente interno LSS CORE:** lss_internal_2026.
**Repositorio:** Biergemg/LSS-Local-Systems-Studio (main despliega Vercel).

## Arquitectura
- ID público versionado como fallback en lib/analytics.ts; una variable NEXT_PUBLIC_GA_MEASUREMENT_ID permite sustitución explícita. No se versionan tokens ni secretos.
- Solo una etiqueta gtag.js y una inicialización, sin GTM.
- Consentimiento previo obligatorio y retirable, con publicidad denegada, sin Google Signals ni personalización.
- Preferencia nueva lss-tracking-consent-v2: una autorización anterior a Meta no autoriza GA4.
- Eventos whatsapp_click, phone_click y form_submit (solo si existen enlaces/formularios): sección, sin teléfono ni texto personal. Clic no es mensaje recibido.
- Medición mejorada automática desactivada en GA4; retención de eventos y usuarios 14 meses verificada en consola.
- Search Console: dominio verificado, sitemap aceptado, API lectura 200.
- LSS CORE: propiedad GA4 561632900 seleccionada, Data API lectura 200, Search Console lectura 200 y cifrado/renovación OAuth probados.
- Aviso de privacidad fechado el 30 de octubre de 2026.

## Gate preproducción
- TypeScript: PASS; ESLint: PASS; compilación Next.js 16.2.4: PASS.
- Regresión completa: 69 PASS / 0 FAIL; 320, 390, 768 y 1440 px, SEO, accesibilidad, contacto y teclado.
- Consentimiento con llamadas interceptadas: PASS (prueba lógica, no prueba real de red).
- Consentimiento anterior de Meta: 2 PASS; no autoriza GA4 y rechazo persiste.
- Axe WCAG 2.2 AA: 0 violaciones detectadas a 390 y 1440 px; sin scroll horizontal.
- Transporte a Google real: 5 PASS; nada antes de aceptar, gtag 200, page_view y whatsapp_click reales, carga sin número ni mensaje. Eventos GA4 pueden enviarse agrupados en el cuerpo POST.
- Se corrigieron 6 regresiones iniciales de objetivos táctiles/foco; verificación repetida sin fallos.
- Sin push ni despliegue durante la fase de pruebas.

## Gate producción
PENDIENTE antes del push: corroborar rama/estado de Git y preparar cambio aislado.
PENDIENTE después del push: comprobar el dominio público, la carga condicionada y un evento real; confirmar recepción en Analytics.

## Fuera de alcance
WhatsApp/YCloud, leads recibidos y ventas, servidor público de LSS CORE y onboarding de clientes externos siguen pendientes. Revocación real OAuth no ejecutada por diseño.
