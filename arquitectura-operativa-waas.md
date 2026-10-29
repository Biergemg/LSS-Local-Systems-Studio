# Arquitectura Operativa WaaS  
## Sistema Interno para Gestionar Clientes, Pagos, Servicios, Suspensiones y Producción

---

## 1. Objetivo del sistema

Construir un sistema interno moderno para operar una agencia/WaaS de **Sistemas Web de Captación Local**.

El sistema debe permitir controlar:

- clientes;
- paquetes contratados;
- sitios activos;
- pagos únicos;
- mensualidades;
- vencimientos;
- estados de suscripción;
- renovaciones;
- suspensiones por no pago;
- reactivaciones;
- tareas operativas;
- entregables;
- tickets/cambios;
- reportes mensuales;
- CRM comercial;
- automatizaciones internas;
- historial de comunicación;
- dashboard de control.

El objetivo no es solo "guardar clientes".  
El objetivo es tener un **sistema operativo comercial** para no depender de memoria, notas sueltas, WhatsApps perdidos ni hojas de cálculo desordenadas.

---

## 2. Principio rector

```
Si no está registrado en el sistema, no existe.
Si no tiene fecha, no se puede cobrar.
Si no tiene estado, no se puede operar.
Si no tiene responsable, se va a perder.
Si no tiene razón registrada, no se puede aprender de ello.
```

> La quinta regla cubre cancelaciones, pérdidas de leads y suspensiones. Sin causa registrada, el sistema acumula datos pero no inteligencia operativa.

---

## 3. Roles del sistema

### 3.1 Admin / Owner

El dueño de la operación.

Puede:
- ver todo;
- crear clientes;
- crear paquetes;
- registrar pagos;
- suspender servicios;
- reactivar servicios;
- editar contratos;
- ver dashboard financiero;
- ver tareas;
- crear automatizaciones;
- aprobar entregables;
- marcar clientes en riesgo;
- **convertir leads en clientes** *(acción exclusiva del admin — no ocurre automáticamente).*

---

### 3.2 Operador interno

Puede:
- ver clientes asignados;
- actualizar tareas;
- cargar avances;
- responder tickets;
- subir reportes;
- revisar estado de proyecto.

No puede:
- borrar clientes;
- cambiar precios;
- cancelar suscripciones;
- modificar reglas de cobro;
- convertir leads en clientes.

---

### 3.3 Cliente

Portal limitado. Puede ver:
- su plan;
- estado del proyecto;
- pagos pendientes;
- facturas;
- entregables;
- próximos hitos;
- reportes;
- tickets enviados;
- enlaces importantes.

Puede hacer:
- pagar;
- subir información;
- aprobar entregables;
- solicitar cambios;
- ver fecha de renovación;
- descargar comprobantes.

---

## 4. Módulos principales

El sistema debe dividirse en estos módulos:

1. CRM comercial
2. Clientes
3. Paquetes y precios
4. Proyectos
5. Sitios web
6. Pagos y suscripciones
7. Vencimientos
8. Suspensión / reactivación
9. Tickets y cambios
10. Reportes mensuales
11. Automatizaciones
12. Dashboard operativo
13. Portal cliente
14. Auditoría / logs

---

## 5. CRM comercial

### 5.1 Estados del pipeline

Todo prospecto debe tener uno de estos estados:

```
lead_nuevo
diagnostico_agendado
diagnostico_realizado
propuesta_enviada
seguimiento
negociacion
ganado
perdido
no_apto
```

---

### 5.2 Datos mínimos del lead

Cada lead debe registrar:
- nombre;
- negocio;
- nicho;
- ciudad;
- teléfono;
- email;
- fuente;
- fecha de entrada;
- problema declarado;
- servicio de interés;
- presupuesto estimado;
- urgencia;
- estado;
- próxima acción;
- fecha de próxima acción;
- notas.

---

### 5.3 Fuentes permitidas

```
whatsapp
referido
facebook
instagram
google
landing
sitio_web
email
llamada
manual
otro
```

---

### 5.4 Reglas CRM

- Todo lead nuevo debe tener próxima acción registrada.
- Si no hay próxima acción, aparece como "lead en riesgo".
- Si un lead pasa más de 7 días sin movimiento, aparece en "seguimiento vencido".
- Si se marca como `no_apto`, debe registrarse razón.
- Si se marca como `perdido`, debe registrarse objeción principal y campo `lost_reason`.
- Si se marca como `ganado`, **el admin debe ejecutar manualmente la conversión a cliente**. El sistema no convierte leads automáticamente. Esto previene clientes creados sin contrato confirmado.

---

### 5.5 Regla de conversión lead → cliente

La conversión es un evento explícito que requiere:

1. Estado del lead en `ganado`.
2. Paquete seleccionado.
3. Precio acordado registrado.
4. Admin confirma la conversión.
5. Sistema crea registro en `clients` con campo `converted_from_lead_id` y `converted_at`.
6. El lead queda archivado, no eliminado.

> **Por qué importa:** si la conversión es automática, puedes crear clientes sin precio acordado, sin paquete asignado o sin pago inicial confirmado. Eso rompe la lógica financiera desde el inicio.

---

## 6. Clientes

Cuando un lead se convierte en cliente, se crea registro en `clients`.

### 6.1 Datos mínimos del cliente

- nombre legal o comercial;
- responsable principal;
- teléfono;
- email;
- ciudad;
- país;
- RFC / tax ID opcional;
- dirección fiscal opcional;
- dominio principal;
- plan contratado;
- fecha de inicio;
- `converted_from_lead_id`;
- `converted_at`;
- estado de cliente;
- estado de pago;
- estado del servicio;
- notas internas.

---

### 6.2 Estados del cliente

```
activo
onboarding
en_produccion
pendiente_pago
suspendido
cancelado
pausado
moroso
finalizado
```

### 6.3 Campo churn_reason

Todo cliente que pase a `cancelado` o `finalizado` debe registrar:

```
churn_reason: precio | competencia | no_uso | cierre_negocio | insatisfaccion | falta_de_resultados | otro
churn_notes: texto libre opcional
churn_at: fecha
```

> Sin este campo, el sistema registra que te fue pero no por qué. Eso impide detectar patrones y ajustar oferta, precios o servicio.

---

## 7. Paquetes comerciales

El sistema debe permitir configurar paquetes sin tocar código.

### 7.1 Paquetes base

```
landing_captacion
sitio_profesional_local
sistema_waas
```

---

### 7.2 Cada paquete debe tener

- nombre;
- descripción;
- precio setup;
- mensualidad;
- moneda;
- duración mínima;
- entregables incluidos;
- límites;
- **SLA de respuesta a tickets** *(ver sección 7.4)*;
- días de soporte incluidos;
- número de cambios incluidos por ciclo;
- frecuencia de reportes;
- incluye hosting: sí/no;
- incluye SEO mensual: sí/no;
- incluye automatización: sí/no;
- incluye reportes: sí/no;
- estado activo/inactivo.

---

### 7.3 Límites por paquete

**Landing de Captación**
- 1 página
- 1 oferta principal
- 1 formulario o WhatsApp
- 1 ronda de cambios por ciclo
- SEO básico
- medición básica

**Sitio Profesional Local**
- hasta 5–8 páginas
- servicios principales
- SEO local base
- integración WhatsApp/formulario
- 2 rondas de cambios por ciclo
- metadata
- Google Maps
- medición básica

**Sistema WaaS**
- sitio o landing
- mantenimiento mensual
- mejoras CRO
- SEO local mensual
- reportes
- automatizaciones simples
- soporte prioritario
- actualizaciones continuas

---

### 7.4 SLA de respuesta por paquete

Sin tiempos de respuesta definidos por contrato, los tickets no tienen consecuencia si se ignoran.

| Paquete | Respuesta inicial | Resolución estimada |
|---|---|---|
| Landing de Captación | 72 horas hábiles | 5–7 días hábiles |
| Sitio Profesional Local | 48 horas hábiles | 3–5 días hábiles |
| Sistema WaaS | 24 horas hábiles | 1–3 días hábiles |

> Estos tiempos son para cambios dentro del alcance. Tickets fuera de alcance requieren primero cotización aprobada, luego SLA aplica desde la aprobación.

---

## 8. Proyectos

Cada cliente puede tener uno o varios proyectos.

### 8.1 Estados del proyecto

```
no_iniciado
onboarding
recopilando_info
estrategia
copy
diseño
desarrollo
revision_interna
revision_cliente
ajustes
listo_para_lanzar
publicado
cerrado
pausado
```

---

### 8.2 Fases obligatorias con checklist

Cada proyecto debe tener checklist:

1. Diagnóstico
2. Onboarding
3. Recolección de información
4. Arquitectura comercial
5. Copy
6. Diseño / UX
7. Desarrollo
8. SEO base
9. Integraciones
10. QA
11. Revisión cliente
12. Ajustes
13. Publicación
14. Reporte inicial

---

### 8.3 Definición de proyecto retrasado

Un proyecto se marca como `retrasado` en el dashboard cuando cualquiera de estas condiciones se cumple:

- lleva más de **3 días** en el mismo estado sin actividad registrada;
- la fecha estimada de entrega de fase fue superada;
- el cliente lleva más de **5 días** sin responder una solicitud de aprobación o de información;
- hay una tarea asignada con fecha vencida sin completar.

> Sin esta definición, "proyectos retrasados" en el dashboard es un campo vacío o arbitrario. La métrica solo es útil si tiene criterio objetivo.

---

### 8.4 Regla crítica de publicación

No se puede marcar un proyecto como `publicado` si faltan:

- dominio confirmado;
- CTA funcional probado;
- WhatsApp / formulario probado y con destino verificado;
- metadata básica cargada;
- responsive revisado en móvil;
- pago inicial (setup) confirmado en el sistema;
- aprobación del cliente documentada **o** aprobación interna explícita con nota.

---

## 9. Sitios web

Cada sitio debe tener ficha técnica.

### 9.1 Datos del sitio

- cliente;
- dominio;
- URL de producción;
- URL de preview;
- stack;
- repositorio GitHub;
- hosting;
- proveedor DNS;
- **fecha de vencimiento del dominio** *(campo obligatorio)*;
- **fecha de vencimiento del hosting** *(campo obligatorio)*;
- fecha de lanzamiento;
- estado;
- certificado SSL;
- formularios activos;
- WhatsApp destino;
- analytics;
- search console;
- credenciales almacenadas externamente;
- notas técnicas.

> Las fechas de vencimiento de dominio y hosting son críticas. Si no están en el sistema, el cliente puede perder su dominio sin que nadie lo vea venir. El cron mensual debe alertar con 30 días de anticipación.

---

### 9.2 Estados del sitio

```
draft
preview
produccion
mantenimiento
suspendido
archivado
```

---

## 10. Pagos y suscripciones

El sistema debe integrarse con Stripe.

### 10.1 Tipos de cobro

```
setup_unico
mensualidad_recurrente
extra
renovacion
penalizacion
reactivacion
```

---

### 10.2 Estados de pago

```
pendiente
pagado
fallido
vencido
reembolsado
parcial
cancelado
en_disputa
```

---

### 10.3 Integración Stripe

Debe soportar:
- crear cliente Stripe;
- crear producto;
- crear precio único;
- crear precio recurrente;
- checkout session;
- customer portal;
- invoice;
- subscription;
- webhook;
- pago fallido;
- pago exitoso;
- cancelación;
- actualización de método de pago;
- reactivación.

---

### 10.4 Webhooks requeridos

Escuchar eventos:

```
checkout.session.completed
invoice.paid
invoice.payment_failed
invoice.upcoming              ← avisa 7 días antes del cobro (crítico para avisos preventivos)
invoice.finalized
customer.subscription.created
customer.subscription.updated
customer.subscription.deleted
customer.subscription.paused  ← necesario si usas pausa como alternativa a cancelación
payment_intent.succeeded
payment_intent.payment_failed
```

> `invoice.upcoming` e `invoice.payment_failed` son los webhooks más importantes para tu flujo de vencimientos. Sin `invoice.upcoming`, los avisos preventivos deben construirse con cron propio, lo cual es frágil. Sin `customer.subscription.paused`, no puedes ofrecer pausa como alternativa a cancelación cuando un cliente pasa por un mes difícil.

---

## 11. Reglas de vencimiento

### 11.1 Fechas críticas por cliente

Cada cliente debe tener:
- fecha de inicio;
- fecha de próximo cobro;
- fecha de vencimiento;
- días de gracia;
- fecha límite antes de suspensión;
- fecha de suspensión;
- fecha de cancelación;
- fecha de reactivación si aplica.

---

### 11.2 Días de gracia recomendados

```
Día 0:  vencimiento
Día 1:  recordatorio suave
Día 3:  segundo recordatorio
Día 5:  aviso formal de posible suspensión
Día 7:  suspensión operativa
Día 15: cancelación administrativa (requiere confirmación manual del admin)
```

---

### 11.3 Estados por atraso

```
0 días:   activo
1–2 días: pendiente_pago
3–6 días: vencido
7–14 días: suspendido
15+ días: moroso / cancelación administrativa
```

---

## 12. Política de suspensión

### 12.1 Qué se suspende

Según contrato / paquete:
- soporte;
- cambios;
- mantenimiento;
- reportes;
- automatizaciones;
- acceso a portal avanzado;
- nuevas solicitudes;
- campañas;
- integraciones;
- servicio gestionado.

---

### 12.2 Política de dominio y sitio en suspensión

El documento debe ser explícito aquí porque la ambigüedad genera conflictos con clientes.

**Regla por etapa:**

| Días de atraso | Acción sobre el sitio |
|---|---|
| 1–6 días | Sitio activo. Solo se pausa soporte y nuevas solicitudes. |
| 7–14 días | Sitio activo. Se suspenden servicios gestionados. Se notifica que el sitio puede pausarse. |
| 15+ días | Admin puede activar suspensión de sitio **solo si el contrato lo especifica explícitamente**. Requiere confirmación manual. Nunca automática. |
| 30+ días | Admin puede archivar. Se conserva el repositorio y backup por 90 días antes de eliminación definitiva. |

> Apagar un sitio es la acción de mayor impacto y mayor riesgo de disputa. Debe ser siempre una decisión consciente del admin, no un automatismo.

---

### 12.3 Suspensión suave (día 7)

- bloquear nuevas solicitudes;
- pausar mantenimiento;
- pausar reportes;
- mostrar estado `suspendido` en sistema interno;
- enviar aviso de reactivación al cliente.

---

### 12.4 Suspensión fuerte (día 15+, solo si contrato lo permite)

Requiere confirmación manual del admin:
- desactivar automatizaciones;
- retirar acceso a portal;
- pausar hosting gestionado si aplica;
- mostrar página temporal si corresponde;
- archivar proyecto.

---

## 13. Reactivación

### 13.1 Proceso

Para reactivar:
1. Pago pendiente liquidado (verificado vía webhook o manualmente).
2. Método de pago actualizado si fue el problema.
3. Admin confirma reactivación en el sistema.
4. Sistema cambia estado a `activo`.
5. Se registra evento `service_reactivated` con fecha, monto y quién confirmó.
6. Notificación automática al cliente.

---

### 13.2 Fee de reactivación

El fee de reactivación debe estar configurado por paquete como campo editable:

```
landing_captacion:        fee_reactivacion = $500 MXN (configurable)
sitio_profesional_local:  fee_reactivacion = $800 MXN (configurable)
sistema_waas:             fee_reactivacion = $1,200 MXN (configurable)
```

- El fee se cobra como `tipo: reactivacion` en el módulo de pagos.
- Se genera invoice separado antes de reactivar.
- No se reactiva hasta que el fee y los atrasos están liquidados.
- Si el admin decide eximir el fee, debe registrar nota justificando la excepción.

> Sin formalizar el fee, tiende a no cobrarse "para no complicar" y se convierte en un incentivo implícito a pagar tarde.

---

## 14. Automatizaciones

### 14.1 Automatizaciones comerciales

```
nuevo lead                              → crear registro CRM
lead sin seguimiento 48h                → alerta admin
diagnóstico agendado                    → recordatorio automático
propuesta enviada 3 días sin respuesta  → seguimiento
lead ganado                             → alerta admin para conversión manual
```

> El lead ganado no convierte automáticamente. Genera una alerta para que el admin ejecute la conversión con los datos correctos.

---

### 14.2 Automatizaciones de onboarding

```
cliente creado                 → enviar formulario onboarding
formulario completado          → crear checklist de proyecto
pago setup recibido            → habilitar inicio de producción
assets pendientes 5 días       → recordatorio al cliente
```

---

### 14.3 Automatizaciones de pago

```
invoice.paid                  → marcar pagado, reactivar si estaba suspendido
invoice.payment_failed        → marcar pendiente_pago, notificar cliente
invoice.upcoming              → aviso preventivo 7 días antes
3 días vencido                → recordatorio formal
5 días vencido                → aviso de suspensión próxima
7 días vencido                → suspensión suave + notificación
pago recibido post-suspensión → alerta admin para reactivación manual
```

---

### 14.4 Automatizaciones operativas

```
proyecto listo para revisión          → notificar cliente
cliente aprueba                       → pasar a publicación
sitio publicado                       → crear reporte inicial
cada mes (día 1)                      → generar tarea de reporte mensual
cada mes (día 25)                     → revisar vencimientos próximos
dominio vence en 30 días              → alerta admin
hosting vence en 30 días              → alerta admin
proyecto sin actividad 3 días         → marcar como retrasado en dashboard
```

---

## 15. Dashboard interno

### 15.1 Métricas principales

Mostrar en dashboard:
- clientes activos;
- clientes morosos;
- MRR (mensualidad recurrente total);
- setup revenue del mes;
- pagos vencidos (monto total y número de clientes);
- proyectos en producción;
- proyectos retrasados *(según criterio definido en sección 8.3)*;
- leads nuevos del mes;
- propuestas enviadas;
- tasa de cierre del mes;
- tickets abiertos;
- tareas vencidas;
- sitios suspendidos;
- próximos cobros (7 días);
- dominios/hostings por vencer (30 días);
- churn del mes.

---

### 15.2 Vistas obligatorias

```
Vista Ejecutiva
Vista Clientes
Vista Pagos
Vista Proyectos
Vista CRM
Vista Riesgos
Vista Tareas
Vista Soporte
```

---

## 16. Portal cliente

### 16.1 Cliente debe ver

- plan contratado;
- estado del proyecto;
- próximos pasos;
- pendientes del cliente;
- pagos pendientes;
- facturas;
- enlaces importantes;
- reportes;
- tickets;
- documentos;
- fecha próxima mensualidad.

---

### 16.2 Cliente puede hacer

- pagar;
- descargar factura;
- subir fotos;
- subir textos;
- enviar solicitud;
- aprobar entregable;
- actualizar datos;
- abrir ticket.

---

## 17. Tickets y solicitudes

### 17.1 Tipos de ticket

```
cambio_texto
cambio_imagen
error_tecnico
nuevo_servicio
soporte_pago
soporte_dominio
seo
automatizacion
otro
```

---

### 17.2 Estados

```
nuevo
en_revision
aprobado
en_proceso
requiere_info_cliente
resuelto
rechazado
fuera_de_alcance
```

---

### 17.3 Regla de alcance

Cada ticket debe clasificarse:
```
incluido
extra_cobrable
fuera_de_alcance
```

Si es `extra_cobrable`, debe generar cotización aprobada antes de ejecución. No se toca nada sin aprobación registrada.

---

### 17.4 SLA de respuesta

El SLA definido en la sección 7.4 aplica desde el momento en que el ticket se marca como `aprobado`. El tiempo en `en_revision` o `requiere_info_cliente` no cuenta contra el SLA. Esto protege al operador de tiempos perdidos esperando información del cliente.

---

## 18. Reportes mensuales

Cada cliente activo en plan mensual debe tener reporte.

### 18.1 Reporte mínimo

- periodo;
- estado del sitio;
- cambios realizados;
- tickets resueltos;
- métricas disponibles;
- leads / formularios / clicks si hay tracking;
- próximos ajustes;
- recomendaciones;
- pendientes del cliente.

---

### 18.2 Métricas recomendadas

- visitas;
- clics WhatsApp;
- llamadas;
- formularios enviados;
- fuentes de tráfico;
- páginas más vistas;
- velocidad de carga;
- errores detectados;
- conversiones disponibles.

---

## 19. Base de datos

### 19.1 Entidades principales

```
users
clients
leads
packages
subscriptions
invoices
payments
projects
websites
tasks
tickets
reports
automations
events
documents
notifications
churn_records
```

---

### 19.2 Modelo lógico

```
Lead → (conversión manual) → Client → Project → Website
Client → Subscription → Invoice → Payment
Client → Tickets
Client → Reports
Client → ChurnRecord (si cancela)
Project → Tasks
Website → Metrics
System → Events / AuditLogs
```

---

## 20. Eventos del sistema

Todo evento importante debe quedar registrado con: `event_type`, `entity_id`, `entity_type`, `triggered_by`, `timestamp`, `metadata`.

### 20.1 Eventos obligatorios

```
lead_created
lead_status_changed
lead_converted_to_client
client_created
project_created
payment_received
payment_failed
invoice_overdue
service_suspended
service_reactivated
reactivation_fee_charged
reactivation_fee_waived
subscription_cancelled
churn_recorded
ticket_created
ticket_resolved
ticket_classified_as_extra
report_generated
site_published
site_archived
domain_expiry_alert
hosting_expiry_alert
```

---

## 21. Notificaciones

### 21.1 Canales

```
email
whatsapp
dashboard
webhook
```

---

### 21.2 Notificaciones internas

- nuevo lead;
- lead ganado pendiente de conversión;
- pago fallido;
- cliente vencido;
- proyecto retrasado;
- ticket urgente;
- cliente en riesgo;
- suscripción cancelada;
- servicio suspendido;
- dominio por vencer;
- hosting por vencer.

---

### 21.3 Notificaciones al cliente

- pago recibido;
- pago fallido;
- vencimiento próximo (7 días);
- suspensión próxima (día 5);
- servicio suspendido;
- servicio reactivado;
- reporte disponible;
- ticket actualizado;
- proyecto listo para revisión;
- pendiente de su parte sin respuesta.

---

## 22. Estados críticos y acciones automáticas

| Estado | Condición | Acción |
|---|---|---|
| `pendiente_pago` | factura fallida o vencida | enviar recordatorio |
| `vencido` | 3+ días sin pago | aviso formal |
| `suspendido` | 7+ días sin pago | pausar soporte/servicio gestionado |
| `moroso` | 15+ días sin pago | revisión admin — no acción automática |
| `activo` | pago recibido | alerta admin para reactivación manual |
| `cancelado` | suscripción terminada | registrar `churn_reason`, archivar servicio |

---

## 23. Políticas comerciales internas

### 23.1 Anticipo

> No iniciar producción sin anticipo pagado y registrado en el sistema.

---

### 23.2 Publicación

> No publicar sitio final sin liquidación del setup, salvo autorización manual del admin con nota registrada.

---

### 23.3 Mensualidad

> La mensualidad cubre mantenimiento, soporte, mejoras y operación continua. No cubre rediseños completos ni cambios ilimitados. El alcance exacto está definido en el paquete.

---

### 23.4 Cambios incluidos por ciclo

| Paquete | Cambios incluidos por mes |
|---|---|
| Landing de Captación | 1 ronda de cambios |
| Sitio Profesional Local | 2 rondas de cambios |
| Sistema WaaS | Cambios menores según SLA definido |

> "Ronda de cambios" = un conjunto de ajustes enviados en una sola solicitud. Solicitudes separadas cuentan como rondas separadas. Esto debe estar en el contrato.

---

### 23.5 Cambios extra

Todo cambio fuera de alcance debe seguir este flujo sin excepción:

1. Ticket creado y clasificado como `extra_cobrable`.
2. Cotización generada en el sistema.
3. Aprobación del cliente registrada.
4. Pago o confirmación de cargo.
5. Ejecución.
6. Ticket marcado como `resuelto`.

> No ejecutar sin aprobación registrada. "Me dijo por WhatsApp" no es aprobación en el sistema.

---

## 24. Seguridad

- No guardar contraseñas en texto plano.
- Usar variables de entorno para todas las claves.
- Usar roles y permisos por módulo.
- Registrar auditoría de todas las acciones críticas.
- Proteger rutas admin con middleware.
- Separar portal cliente de dashboard admin (subdominios o rutas protegidas distintas).
- Usar HTTPS en todos los entornos.
- Validar firma de webhooks Stripe (`stripe-signature`).
- Sanitizar todos los inputs.
- Hacer backups automáticos de base de datos.
- Conservar registros archivados mínimo 90 días antes de eliminación.

---

## 25. Stack técnico recomendado

```
Frontend:        Next.js
Backend:         Next.js API routes / Server Actions
Base de datos:   PostgreSQL
ORM:             Prisma
Auth:            Clerk / Auth.js / Supabase Auth
Pagos:           Stripe
Email:           Resend
Archivos:        S3 compatible / Supabase Storage
Analytics:       Plausible / Fathom
Deploy:          Vercel
Automatizaciones: Webhooks + cron jobs (Vercel Cron o similar)
CRM interno:     Módulo propio
```

---

## 26. Cron jobs requeridos

```
Diario 08:00   → revisar pagos vencidos y actualizar estados
Diario 09:00   → enviar recordatorios programados
Diario 10:00   → revisar tareas vencidas y marcar proyectos retrasados
Diario 11:00   → revisar dominios y hostings con vencimiento en 30 días
Semanal lunes  → resumen operativo interno
Mensual día 1  → crear tareas de reporte mensual para clientes activos
Mensual día 25 → avisar próximas renovaciones del siguiente mes
```

---

## 27. MVP recomendado

### Fase 0 — Fundación (antes que todo)

Construir primero:
- auth y roles (admin / operador / cliente);
- estructura de base de datos completa con migraciones;
- variables de entorno y seguridad base.

> Sin auth y base de datos sólidos, todo lo que se construya encima tendrá que rehacerse.

---

### Fase 1 — Control básico

- clientes;
- paquetes;
- proyectos;
- pagos manuales;
- dashboard básico;
- vencimientos;
- suspensión manual;
- tareas;
- CRM simple.

---

### Fase 2 — Stripe

- checkout;
- suscripciones;
- webhooks;
- invoices;
- portal cliente Stripe;
- actualización automática de estados por webhook.

---

### Fase 3 — Portal cliente

- login cliente;
- pagos;
- facturas;
- tickets;
- reportes;
- pendientes;
- aprobación de entregables.

---

### Fase 4 — Automatizaciones

- recordatorios;
- suspensión automática suave;
- reactivación con confirmación manual;
- reportes mensuales;
- alertas internas;
- cron jobs.

---

### Fase 5 — Métricas y expansión

- analytics por sitio;
- leads por cliente;
- conversión por canal;
- reportes visuales;
- integración WhatsApp;
- CRM avanzado.

---

## 28. Reglas de no desviación

```
No construir primero la parte visual.
No construir landing pública antes del backoffice.
No empezar por animaciones.
No saltar la base de datos.
No ignorar estados de pago.
No ignorar suspensión / reactivación.
No mezclar clientes con leads.
No guardar pagos sin invoice.
No permitir clientes sin plan.
No permitir proyecto sin cliente.
No permitir sitio sin proyecto.
No permitir mensualidad sin fecha de próximo cobro.
No ejecutar cambios extra sin aprobación registrada.
No reactivar sin fee cobrado o excepción documentada.
No convertir leads automáticamente.
```

---

## 29. Criterios de aceptación

El sistema se considera funcional cuando puede:

- crear un lead;
- convertir lead en cliente mediante acción manual del admin;
- asignar paquete con precio y SLA;
- crear proyecto con checklist;
- registrar sitio con fechas de vencimiento de dominio y hosting;
- registrar pago de setup;
- crear mensualidad vía Stripe;
- mostrar próximo vencimiento;
- detectar pago vencido vía webhook;
- cambiar estado a `pendiente_pago` automáticamente;
- ejecutar suspensión suave al día 7;
- reactivar servicio tras confirmación de pago y admin;
- cobrar fee de reactivación;
- registrar `churn_reason` al cancelar;
- crear ticket con clasificación de alcance;
- cerrar ticket dentro del SLA;
- generar reporte mensual;
- mostrar dashboard con métricas reales;
- alertar sobre dominios y hostings por vencer.

---

## 30. Directiva final para implementación

Construir este sistema como plataforma interna SaaS/WaaS operativa.

**Prioridad:**

1. Auth y base de datos
2. Control financiero
3. Estados claros con criterios objetivos
4. Vencimientos
5. Suspensión / reactivación
6. CRM
7. Producción
8. Portal cliente
9. Automatizaciones
10. Métricas
11. UI

La interfaz debe ser sobria, rápida y orientada a operación.

No construir un demo visual.  
Construir un sistema real para operar clientes de pago.

---

## 31. Conclusión operativa

Este sistema debe permitir que la operación funcione sin caos y sin depender de memoria.

El resultado esperado:

```
Cada cliente tiene plan.
Cada plan tiene precio y SLA.
Cada pago tiene vencimiento.
Cada vencimiento tiene consecuencia definida.
Cada servicio tiene estado.
Cada tarea tiene responsable.
Cada proyecto tiene fase y criterio de retraso.
Cada suspensión tiene causa y registro.
Cada reactivación tiene pago confirmado.
Cada cancelación tiene razón documentada.
Cada cliente tiene historial completo.
```

> La agencia no escala por vender más sitios.  
> Escala cuando puede cobrar, entregar, mantener, suspender y renovar sin depender de memoria humana.
