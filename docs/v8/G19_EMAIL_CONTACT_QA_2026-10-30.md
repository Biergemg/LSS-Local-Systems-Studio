# G19 — Canal alternativo de contacto por correo para LSS

Fecha: 30 de octubre de 2026.

## Motivo
El módulo de WhatsApp Cloud API, destinado a la prospección y las respuestas automáticas, fue suspendido por instrucción del titular. Se conserva el enlace manual previamente publicado. Para que la web no dependa únicamente de ese contacto, se habilitó una alternativa visible por correo, con mensaje orientativo y medición diferenciada.

## Cambio implementado
- CTA en la cabecera: opción por correo de la Primera Visita Digital.
- CTA en la sección final: opción de correo y dirección de contacto visible.
- Prefill mailto con asunto, nombre, negocio, ciudad, servicio y sitio web. Estos datos solo llegan al programa de correo del visitante; no se envían automáticamente desde el sitio ni a GA4.
- Evento email_click en GA4, condicionado al consentimiento explícito ya implementado. Envía solo link_location.
- No se introdujo formulario backend, pixel no autorizado, automatización WhatsApp, nuevo proveedor de mensajería ni servidor adicional.

## Resultado de QA
- Next.js 16.2.4 production build PASS, TypeScript PASS, ESLint de archivos modificados PASS (build con webpack en Windows para evitar limitación de symlinks Turbopack de worktree).
- Vercel Production SUCCESS para el commit 6843fea, deployment 7443111692, 30-oct-2026.
- Dominio público contiene CTA de correo y conserva robots, sitemap y legal con HTTP 200.
- Script docs/v8/qa-scripts/ga-email-transport.mjs, ejecutado desde workspace QA con Playwright: 7/7 PASS.
  1. No Google antes de consentimiento.
  2. Se carga GA4 tras consentimiento.
  3. CTA mailto visible en main.
  4. email_click generado por clic consentido.
  5. Google acepta el evento.
  6. La carga no expone email, asunto ni cuerpo del mensaje.
  7. El clic de prueba no navega fuera del sitio porque la apertura de la aplicación de correo se intercepta durante QA.
- Prueba de layout del enlace de correo en 320, 390, 768 y 1440 px: 4/4 PASS, sin scroll horizontal ni enlace invisible.
- Se envió un correo QA desde cuenta propia a contacto@lsslocalsystemsstudio.com; el servicio de Gmail de origen confirmó envío, NO recepción. DNS MX del dominio apunta a Hostinger. El buzón Gmail localsystemsstudio@gmail.com no prueba en sí mismo que el alias del dominio reciba correo.

## Criterio de entrega
**PASÓ:** publicación de URL mailto y transporte de medición sin PII.
**PENDIENTE:** observar el mensaje QA en el buzón Hostinger de destino antes de declarar email_received o lead_created.
Los clics de correo son eventos de interacción, no mensajes recibidos ni ventas.
