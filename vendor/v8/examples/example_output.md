# Ejemplo de Output — Clínica Dental Vera Madrid

---

## A. Diagnóstico estratégico del negocio

**Oferta extraída:** Servicios de ortodoncia invisible (Invisalign), blanqueamiento dental profesional y limpieza para adultos de 25-50 años en el barrio de Salamanca, Madrid. Diferenciación real: trato boutique sin ventas agresivas, explicación honesta del proceso y primera revisión gratuita.

**Buyer definido:** Adulto urbano de 28-48 años con ingresos medios-altos. Postergó el cuidado dental por miedo al dolor o incertidumbre sobre el precio real. Busca resultado visible (sonrisa mejor) más que solo salud bucal. Tiene tiempo limitado y valora la claridad sobre los plazos y los costes.

**Zona geográfica:** Madrid, barrio de Salamanca (zona de alto poder adquisitivo, competencia con clínicas de cadena).

**Objeción principal:** Miedo al dolor y desconfianza sobre el precio real del tratamiento. El comprador ha tenido experiencias negativas con clínicas de cadena que prometen poco y cobran mucho.

**Mecanismo de confianza disponible:** 12 años de experiencia + Invisalign Certified Provider + 2 testimonios reales con resultado específico + garantía de revisión gratuita a los 3 meses. Suficiente para construir credibilidad sin exagerar.

**Conversión primaria:** WhatsApp — correcta para este nicho. La ortodoncia es una compra de alta consideración que requiere conversación antes de compromiso. El formulario como conversión secundaria es válido para quienes prefieren no llamar de inmediato.

**Conversión secundaria:** Formulario de contacto.

---

## B. Matriz de decisión del proyecto

| Dimensión | Clasificación |
|-----------|--------------|
| Urgencia de compra | Media (no es emergencia, pero hay motivación estética activa) |
| Sensibilidad al precio | Alta (el cliente asume que será caro y teme sorpresas) |
| Necesidad de autoridad | Alta (salud + dinero = necesita confiar antes de actuar) |
| Necesidad de cercanía emocional | Alta (el miedo al dolor requiere empatía, no frialdad técnica) |
| Necesidad de teatralidad visual | Baja (priorizar claridad y confianza sobre dramatismo) |
| Complejidad de la decisión | Alta (proceso largo, precio alto, resultado visible en el cuerpo) |

**Decisiones derivadas:**
- **Tono del copy:** directo, empático, sin jerga clínica. Hablar en resultados, no en procedimientos.
- **Agresividad del CTA:** media. El CTA invita a conversación, no a compra inmediata.
- **Densidad de información:** media-alta. El comprador necesita entender el proceso antes de actuar.
- **Cantidad de prueba social:** alta. Testimonios con resultado específico son críticos.
- **Nivel de dramatismo visual:** bajo. Visual limpio, sobrio, premium. Que transmita confianza, no espectáculo.
- **Cantidad de animación:** mínima. Solo micro-interacciones funcionales.
- **Estructura de la landing:** Hero → Problema → Servicios → Proceso → Confianza → CTA final → FAQ → Footer.
- **Longitud de secciones:** mediana. Suficiente para reducir la objeción de precio y miedo, sin abrumar.
- **Secciones especiales:** Proceso visual (cómo funciona el tratamiento paso a paso), FAQ con objeciones reales.

---

## C. Elección de infraestructura y justificación

**Opción elegida: B. Next.js producción**

**Justificación:** La sugerencia del cliente (B) es correcta para este caso. La clínica busca un sitio real con:
- SEO local posicionable en "ortodoncia Madrid Salamanca" y variaciones
- Mantenibilidad para actualizar testimonios, servicios y precios sin rediseñar
- Estructura WaaS: el contenido debe ser editable por la clínica o por mantenimiento mensual del freelancer
- Metadata API para Open Graph y JSON-LD LocalBusiness
- Deploy en Vercel sin fricción

**Stack detallado:** Next.js 16+, React 19, TypeScript estricto, App Router, Server Components por defecto, Tailwind CSS v4, next/font (Inter + variable), next/image, Metadata API, JSON-LD en Server Component, estructura lista para Vercel.

---

## D. Dirección visual propuesta

**Criterio visual:** Autoridad técnica + cercanía humana. La clínica compite por confianza, no por precio ni por innovación. El visual debe transmitir: "aquí saben lo que hacen y van a tratarte bien".

**Cinematic mode:** Desactivado. El nicho de salud requiere claridad antes que dramatismo.

**Sistema de color:**
- Fondo principal: `#FAFAF8` (blanco cálido, no frío de hospital)
- Fondo secundario: `#F0EDE8` (crema suave para secciones alternadas)
- Texto principal: `#1C1C1A` (negro cálido, no puro)
- Acento CTA: `#2D6A4F` (verde oscuro — transmite salud, no agresividad comercial)
- Color auxiliar: `#A8C5B8` (verde claro para microdetalles y etiquetas)
- Color microdetalles: `#C4B99A` (arena dorada para líneas y separadores)
- Justificación: Paleta orgánica y cálida que diferencia de las clínicas de cadena (azul corporativo frío) sin perder seriedad clínica.

**Tipografía:**
- Familia principal: `Plus Jakarta Sans` (moderna, legible, no genérica)
- Familia secundaria: `DM Serif Display` (solo para titulares hero — añade calidez sin perder autoridad)
- Justificación: Plus Jakarta Sans es altamente legible en móvil en tamaños de cuerpo. DM Serif en titulares grandes da el toque editorial sin caer en serif de lujo que desconecta del nicho salud.

---

## E. Arquitectura de conversión propuesta

| Posición | Sección | Función |
|----------|---------|---------|
| 1 | Hero | Comunica: qué venden, para quién y qué hacer ahora. CTA WhatsApp visible. |
| 2 | Problema / costo de seguir igual | Activa el dolor latente: "llevas años postergándolo" |
| 3 | Servicios destacados | Muestra las 3 ofertas principales con resultado claro |
| 4 | Proceso | Elimina la fricción del "¿cómo funciona?" paso a paso |
| 5 | Confianza / testimonios | 2 testimonios reales con resultado específico + 12 años + certificación |
| 6 | CTA final | Invitación directa a WhatsApp + formulario como alternativa |
| 7 | FAQ | Responde: ¿duele?, ¿cuánto cuesta?, ¿cuánto tarda? |
| 8 | Footer | Datos de contacto, dirección, horarios, redes |

**CTA primario aparece en:** Hero (posición 1) y CTA final (posición 6).
**Objeción principal resuelta en:** Sección Proceso (posición 4) + FAQ (posición 7) — antes del CTA final.

---

## F. Copy completo por sección

### Hero

**Headline:** Tu sonrisa, sin miedo al dentista y sin sorpresas en el precio.

**Subheadline:** En Clínica Vera tratamos la ortodoncia y el blanqueamiento dental con honestidad: te explicamos cada paso, cada coste y cada alternativa antes de empezar. Primera revisión gratuita.

**CTA:** Escríbenos por WhatsApp →

---

### Problema / costo de seguir igual

**Título:** Llevas tiempo pensándolo. Es normal. Esto es lo que suele pasar cuando no actúas.

**Cuerpo:** Sigues viendo la misma sonrisa que no te convence. Las opciones siguen siendo confusas. Y la próxima clínica que visites probablemente también te dará un presupuesto sin explicarte nada. Nosotros hacemos lo contrario.

---

### Servicios destacados

**Título:** Tres tratamientos. Un resultado visible.

**Blanqueamiento profesional**
Un tono más claro en una sola sesión. Sin sensibilidad postratamiento si sigues el protocolo. Resultado real, no fotografiado con filtros.

**Ortodoncia invisible Invisalign**
Sin brackets metálicos. Sin explicar a nadie que llevas freno. Invisalign Certified Provider con 12 años de experiencia. Te decimos exactamente cuánto va a durar y cuánto va a costar antes de empezar.

**Limpieza profesional**
Una hora. Sin prisa. Sin que te duela. La base de cualquier tratamiento.

---

### Proceso

**Título:** Así funciona desde el primer día

1. **Primera visita gratuita** — Revisamos tu caso, te explicamos opciones y te damos un presupuesto cerrado. Sin compromiso.
2. **Plan personalizado** — Diseñamos el tratamiento a tu ritmo y a tu presupuesto real.
3. **Seguimiento continuo** — Cada visita tiene un objetivo claro. Sabes exactamente cómo va tu tratamiento.
4. **Revisión a los 3 meses** — Incluida gratis. Porque queremos que el resultado dure.

---

### Confianza / testimonios

**Título:** Lo que dicen quienes ya lo hicieron

> "Llevaba 3 años pensándolo. Clínica Vera fue la única que me explicó el proceso sin presionarme. Terminé la ortodoncia en 14 meses."
> — Laura M., ortodoncia invisible Invisalign

> "El blanqueamiento fue indoloro y el resultado duró más de lo que esperaba. 6 tonos en una sesión."
> — Carlos R., blanqueamiento profesional

**Señales de autoridad:**
- 12 años de experiencia en Madrid
- Invisalign Certified Provider
- Primera revisión gratuita incluida

---

### CTA Final

**Titular:** ¿Empezamos?

**Subtexto:** La primera revisión es gratuita. No necesitas compromiso para conocer tus opciones.

**CTA primario:** Escríbenos por WhatsApp → [botón]
**CTA secundario:** O déjanos tus datos y te llamamos [formulario mínimo: nombre + teléfono + horario preferido]

---

### FAQ

**¿Va a doler?**
Los tratamientos modernos de ortodoncia invisible y blanqueamiento están diseñados para ser mínimamente invasivos. La sensibilidad postblanqueamiento es temporal y controlable. En ortodoncia Invisalign, la incomodidad inicial dura 2-3 días con cada alineador nuevo.

**¿Cuánto cuesta la ortodoncia?**
Depende del caso. Por eso hacemos la primera revisión gratis: para darte un presupuesto cerrado antes de que decidas nada. Sin sorpresas.

**¿Cuánto tiempo dura el tratamiento de Invisalign?**
Entre 10 y 18 meses para la mayoría de casos adultos. En la primera visita te damos una estimación real basada en tu caso, no un rango genérico.

**¿Tenéis financiación?**
Sí. Te explicamos las opciones en la primera visita.

**¿Estáis en el barrio de Salamanca?**
Sí. C/ Serrano 42, Madrid. Metro Serrano o Velázquez. Parking disponible en la zona.

---

## G. Sistema visual detallado

**Tokens de diseño:**
```
--color-bg: #FAFAF8
--color-bg-alt: #F0EDE8
--color-text: #1C1C1A
--color-cta: #2D6A4F
--color-accent: #A8C5B8
--color-detail: #C4B99A

--font-display: 'DM Serif Display', serif
--font-body: 'Plus Jakarta Sans', sans-serif

--spacing-section: 96px (desktop) / 64px (mobile)
--spacing-component: 48px (desktop) / 32px (mobile)
--radius: 8px
--radius-large: 16px

--max-width: 1200px
--content-width: 720px
```

**Componentes elegidos:**

| Componente | Por qué sí | Problema que resuelve |
|-----------|-----------|----------------------|
| Navbar flotante | El usuario debe poder acceder al CTA desde cualquier punto | Fricción de tener que scrollear al inicio para contactar |
| Botón flotante WhatsApp | Conversión primaria siempre visible | Reduce la barrera de contacto en móvil |
| Timeline de proceso | El proceso de 4 pasos es la respuesta visual al miedo a lo desconocido | Elimina la objeción "no sé cómo funciona" |
| Cards de testimonios | 2 casos reales con resultado específico | Prueba social verificable para un sector donde el miedo es la objeción principal |

**Grid y espaciado:**
- 12 columnas en desktop, 4 en móvil
- Hero: full width con contenido centrado en 720px max
- Secciones: alternancia de fondo blanco cálido y crema
- Espacio vertical entre secciones: 96px desktop / 64px móvil

---

## H. Código completo

> El código completo Next.js se genera en la ejecución real de la skill. Este ejemplo muestra la estructura.

```
/app
  layout.tsx          ← metadata global, JSON-LD, fuentes
  page.tsx            ← composición de secciones
  globals.css
/components
  /sections
    Hero.tsx
    Problema.tsx
    Servicios.tsx
    Proceso.tsx
    Confianza.tsx
    CTAFinal.tsx
    FAQ.tsx
    Footer.tsx
  /ui
    Button.tsx
    WhatsAppFloat.tsx
    Navbar.tsx
    TestimonialCard.tsx
    ServiceCard.tsx
    ProcessStep.tsx
/data
  business.ts         ← nombre, teléfono, dirección, horarios, redes
  services.ts
  testimonials.ts
  faqs.ts
  ctas.ts
/lib
  schema.ts           ← JSON-LD builder
/types
  index.ts
```

---

## I. Metadata SEO + JSON-LD

**Title:** Ortodoncia Invisible y Blanqueamiento Dental en Madrid | Clínica Vera

**Meta description:** Ortodoncia Invisalign y blanqueamiento dental profesional en Salamanca, Madrid. Primera revisión gratuita. 12 años de experiencia. Sin sorpresas en el precio.

**Open Graph:**
- og:title: Clínica Dental Vera — Sonrisa Premium en Madrid
- og:description: Ortodoncia invisible, blanqueamiento y limpieza profesional. Primera revisión gratis. Barrio de Salamanca, Madrid.
- og:image: /og-image.jpg (1200x630, imagen del equipo o composición visual del hero)

**JSON-LD:**
```json
{
  "@context": "https://schema.org",
  "@type": "Dentist",
  "name": "Clínica Dental Vera",
  "description": "Clínica dental especializada en ortodoncia invisible Invisalign y blanqueamiento dental profesional en el barrio de Salamanca, Madrid.",
  "url": "https://clinicavera.es",
  "telephone": "+34910000000",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Calle Serrano 42",
    "addressLocality": "Madrid",
    "postalCode": "28001",
    "addressCountry": "ES"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "40.4228",
    "longitude": "-3.6863"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
      "opens": "09:00",
      "closes": "20:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "09:00",
      "closes": "14:00"
    }
  ],
  "areaServed": {
    "@type": "City",
    "name": "Madrid"
  },
  "sameAs": ["https://instagram.com/clinicavera"],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Servicios dentales",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Ortodoncia invisible Invisalign" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Blanqueamiento dental profesional" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Limpieza profesional" } }
    ]
  },
  "mainEntityOfPage": {
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "¿Va a doler el tratamiento?",
        "acceptedAnswer": { "@type": "Answer", "text": "Los tratamientos modernos de ortodoncia invisible y blanqueamiento están diseñados para ser mínimamente invasivos." }
      },
      {
        "@type": "Question",
        "name": "¿Cuánto cuesta la ortodoncia?",
        "acceptedAnswer": { "@type": "Answer", "text": "Depende del caso. Por eso hacemos la primera revisión gratis para darte un presupuesto cerrado antes de que decidas nada." }
      }
    ]
  }
}
```

---

## J. Propuesta WaaS

**Mantenimiento mensual justificado:**
- Actualización de testimonios (1-2 nuevos por mes = prueba social viva)
- Actualización de servicios o precios si cambian
- SEO local básico: revisión de posición en "ortodoncia Madrid Salamanca" y variaciones
- Revisión de velocidad y Core Web Vitals mensual

**Upsells posibles en fases siguientes:**
1. Agenda online integrada (Calendly o sistema propio)
2. Sistema de reseñas automatizado (solicitud por WhatsApp post-tratamiento)
3. Blog de contenido SEO ("cuánto cuesta Invisalign en Madrid")
4. Chatbot de pre-cualificación en WhatsApp
5. CRM básico para seguimiento de leads

**Automatizaciones fase 2:**
- Mensaje automático de WhatsApp al nuevo lead con horarios y cómo llegar
- Recordatorio automático de cita

**Justificación del servicio recurrente:**
La landing es el inicio, no el producto. Una clínica dental con testimonios actualizados mensualmente, posición SEO mantenida y agenda siempre visible convierte más que una landing estática. El mantenimiento no es opcional si quieren que el activo digital trabaje durante 12 meses, no solo los primeros 30 días.

---

## K. Versión austera

**Descripción:** HTML demo premium de una sola página. Sin Next.js, sin build, sin deploy. Abre en el navegador directamente.

**Qué se elimina:**
- App Router y estructura de componentes Next.js
- TypeScript
- Separación de datos y contenido en archivos /data
- Metadata API de Next.js (se usa meta tags HTML estáticas)
- JSON-LD dinámico (se incrusta estático en el HTML)
- Sistema de build

**Qué se conserva:**
- El mismo sistema visual (color, tipografía, spacing)
- El mismo copy completo
- El mismo SEO básico (title, meta, JSON-LD estático)
- La misma arquitectura de conversión (mismas secciones en el mismo orden)
- WhatsApp flotante
- Navbar flotante
- Responsive real

**Impacto conservado:** El 80% del impacto comercial está en el copy, la arquitectura de conversión y el sistema visual. La versión austera conserva los tres. Lo que pierde es escalabilidad, SEO dinámico y mantenibilidad a largo plazo. Válida para demo comercial o validación antes de inversión en la versión producción.

---

## L. Supuestos y huecos detectados

**Supuestos asumidos:**

| Campo | Valor asumido | Razón |
|-------|--------------|-------|
| Paleta oficial | Generada (orgánica cálida) | No se proporcionó paleta existente |
| Coordenadas geo | 40.4228, -3.6863 (aproximación Serrano) | No se proporcionaron coordenadas exactas |
| og:image | Placeholder `/og-image.jpg` | No se proporcionó imagen social |
| Precio de servicios | No mencionado en el sitio | Política de precio "en la primera visita" — correcta para este nicho |

**Huecos que requieren acción del cliente:**

| Campo | Acción requerida |
|-------|-----------------|
| og:image | Proporcionar imagen 1200x630 del equipo o composición del hero |
| Coordenadas exactas | Confirmar lat/long del local para JSON-LD geo |
| Financiación | Detallar opciones de financiación si se quiere mencionar en el sitio |
| Más testimonios | Mínimo 2 más para fortalecer la sección de confianza en siguiente versión |

**Dependencies missing:** Ninguna — todas las skills externas disponibles en esta ejecución.
