import type { ContactInfo, FaqItem, NavLink } from '@/types';

/* Copy V6 → V8 definitivo (2026-10-29). Fuente: LSS_LANDING_Y_VENTAS_COPY_V6 + LSS_OFERTA_V6.
   Sin precios, garantías vigentes, casos, cifras ni testimonios: no están aprobados para publicación (matriz H, oferta V6).
   Los límites contractuales viven en la propuesta y en las preguntas frecuentes, no en el discurso de venta. */

export const SITE = {
  name: 'LSS — Local Systems Studio',
  shortName: 'LSS',
  url: 'https://www.lsslocalsystemsstudio.com',
  title: 'LSS | Web, Google y contacto para negocios de servicios',
  description:
    'Vemos tu negocio como lo vería un cliente nuevo y te damos tres observaciones concretas, sin costo. Web, Google y contacto directo por WhatsApp.',
};

const WA_NUMBER = '528333263389';
export const WA_DEFAULT_TEXT =
  'Hola, quiero revisar la primera impresión de mi negocio. Nombre: ___ | Ciudad: ___ | Servicio que quiero destacar: ___ | Web o perfil de Google (si lo tengo): ___';

export function waLink(text: string = WA_DEFAULT_TEXT): string {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
}

export const CONTACT: ContactInfo = {
  whatsapp: '+52 833 326 3389',
  whatsappUrl: waLink(),
  email: 'contacto@lsslocalsystemsstudio.com',
  location: 'México / remoto',
  phone: '+52 833 326 3389',
};

export const SOCIALS = [
  { label: 'Instagram', href: 'https://www.instagram.com/lsslocalsystemsstudio' },
  { label: 'Facebook', href: 'https://www.facebook.com/lsslocalsystemsstudio' },
];

export const NAV_LINKS: NavLink[] = [
  { href: '#cambio', label: 'Qué cambiaríamos' },
  { href: '#prueba', label: 'La prueba' },
  { href: '#oferta', label: 'Qué recibes' },
  { href: '#proceso', label: 'Cómo se entrega' },
  { href: '#preguntas', label: 'Preguntas' },
];

export const NAV_CTA = 'Revisar mi negocio';

export const HERO = {
  eyebrow: 'Para negocios de servicios que venden por cita o cotización',
  headline: 'Que quien te encuentre entienda por qué tu trabajo vale lo que cobras.',
  body: 'Ordenamos tu primera impresión: una web clara, tus datos correctos en Google y una forma directa de escribirte.',
  proof: 'Primero vemos tu negocio como lo vería un cliente nuevo. Después instalamos y comprobamos lo acordado.',
  ctaPrimary: 'Quiero ver qué cambiarían en mi negocio',
  ctaSecondary: 'Ver cómo comprobamos la entrega',
  micro: 'Se abre WhatsApp con tu mensaje listo. Tres observaciones concretas, sin costo.',
  schematic: {
    label: 'Recorrido de la primera visita',
    lines: [
      { n: '01', t: 'Lo que encuentra', d: 'Web y Google cuentan lo mismo.' },
      { n: '02', t: 'Lo que entiende', d: 'Servicio, zona y forma de trabajo.' },
      { n: '03', t: 'Cómo te escribe', d: 'Un botón al número correcto.' },
    ],
  },
};

export const BELIEF = {
  eyebrow: 'Cuando alguien te busca',
  title: 'Ya te recomendaron. Ahora toca que puedan comprobar por qué.',
  body: 'Una recomendación abre la puerta. Después la persona revisa tu trabajo, compara opciones y busca respuestas: ¿hace lo que necesito?, ¿trabaja en mi zona?, ¿puedo confiar?, ¿cómo cotizo? Si todo está repartido entre publicaciones, perfiles y mensajes antiguos, tiene que averiguarlo por su cuenta.',
  channels: [
    { n: '01', name: 'Instagram', text: 'Ven tus novedades. En tu web encuentran tus servicios ordenados, tu cobertura y cómo trabajas.' },
    { n: '02', name: 'Google', text: 'Verifican dónde estás, tu información y las reseñas que realmente tienes.' },
    { n: '03', name: 'WhatsApp', text: 'Te preguntan lo que necesitan, sin tener que adivinar a qué número escribir.' },
  ],
  closing: 'Tres piezas que cuentan la misma historia.',
};

export const PPV = {
  eyebrow: 'La Prueba de la Primera Visita',
  title: 'Abre tu negocio como si nunca hubieras oído hablar de él.',
  body: 'Es lo primero que hacemos. Entramos como lo haría alguien que busca tu servicio por primera vez, anotamos tres puntos que dificultan entenderlo, confiar o contactar, y te enseñamos las capturas y qué cambiaríamos.',
  steps: [
    { n: '01', t: 'Lo que la persona encuentra', d: 'Qué aparece al buscarte y si web, Google y redes coinciden.' },
    { n: '02', t: 'Lo que entiende', d: 'Si en segundos sabe qué haces, para quién y dónde.' },
    { n: '03', t: 'Cómo puede escribirte', d: 'Si el botón lleva al número correcto y a quien responde.' },
  ],
  sample: 'Si vemos un proyecto que vale la pena construir, preparamos una primera dirección visual con tu marca y te explicamos el recorrido que proponemos. Así ves el enfoque antes de contratar la instalación.',
  precision: 'La revisión inicial señala oportunidades; la muestra visual se ofrece cuando el proyecto encaja y hay disponibilidad.',
  cta: 'Quiero mi primera revisión',
};

export const QUESTIONS = {
  eyebrow: 'Una presentación que respalde tu trabajo',
  title: 'Tu cliente debería poder responder cuatro preguntas antes de escribirte.',
  items: [
    { q: '¿Hacen lo que necesito?', a: 'Servicios explicados con las palabras que usa quien los busca.' },
    { q: '¿Por qué confiar?', a: 'Fotos, experiencia, procesos y credenciales reales: las que el negocio puede demostrar.' },
    { q: '¿Me pueden atender?', a: 'Ubicación, cobertura, horarios y datos coherentes entre web y Google.' },
    { q: '¿Cómo pido precio?', a: 'Un botón y un mensaje que llegan a quien responde.' },
  ],
  closing: 'No hace falta fingir una empresa más grande. Hace falta mostrar mejor la que ya existe.',
};

export const OFFER = {
  eyebrow: 'LSS Presencia Resuelta',
  title: 'De la idea a una presencia publicada y comprobada.',
  intro: 'Reunimos en un solo proyecto lo que normalmente termina repartido entre diseño, textos, información en Google y enlaces de contacto. Tú apruebas el mensaje y la evidencia. LSS ejecuta y documenta lo contratado.',
  groups: [
    { n: '01', title: 'Que se entienda tu servicio', text: 'Una web móvil con explicación útil, preguntas frecuentes y una propuesta de valor fiel a tu trabajo.' },
    { n: '02', title: 'Que haya razones para confiar', text: 'Fotografías y pruebas auténticas, información local coherente y criterios verificables.' },
    { n: '03', title: 'Que puedan pedirte información', text: 'WhatsApp, teléfono y el formulario incluido, cuando esté contratado y probado, conectados al destino correcto.' },
    { n: '04', title: 'Que conserves el control', text: 'Cuentas, fechas, accesos, propiedad del dominio y condiciones de renovación, por escrito.' },
  ],
  detailsSummary: 'Ver el detalle técnico del alcance',
  details: 'Hasta cinco páginas, revisión autorizada de un Perfil de Empresa de Google, SEO técnico inicial, integración de contacto, checklist y entrega documentada, conforme a la propuesta. Alojamiento, dominio y correo empresarial se incluyen cuando la propuesta lo indica.',
  existing: {
    title: 'Si tu web ya funciona, la conservamos.',
    text: 'Hay negocios que necesitan un sitio nuevo y otros que necesitan ordenar servicios, corregir datos de Google o reparar cómo llegan los mensajes. Primero distinguimos una cosa de la otra: la propuesta se construye alrededor del cambio que merece la inversión.',
    seal: 'También te decimos si hoy no hace falta reconstruir.',
  },
  cta: 'Ver si este servicio encaja con mi negocio',
};

export const PROCESS = {
  eyebrow: 'Un proceso que puedes revisar',
  title: 'Sabes qué estamos haciendo y qué recibes al final.',
  steps: [
    { title: 'Miramos tu negocio de frente', text: 'Reunión breve, servicio a destacar, evidencias y las tres prioridades de la Primera Visita.' },
    { title: 'Te enseñamos la dirección', text: 'Para proyectos que encajan, una muestra visual y un recorrido propuesto; después presupuesto y calendario.' },
    { title: 'Lo construimos con tus datos', text: 'Mensaje, web, Google y enlaces, dentro del alcance firmado y los permisos autorizados.' },
    { title: 'Lo abrimos desde un teléfono', text: 'Comprobamos qué se muestra, qué enlace se pulsa y si el contacto llega al destino pactado.' },
    { title: 'Te damos el control', text: 'Resumen, accesos, renovaciones, entrega y seguimiento correctivo definido.' },
  ],
  note: 'Las fechas empiezan a contar cuando tenemos los materiales, accesos y aprobaciones que el proyecto necesita.',
};

export const EVIDENCE = {
  eyebrow: 'La prueba se hace en tu negocio',
  title: 'Antes de decir «quedó listo», lo abrimos contigo.',
  body: 'Vemos cómo se lee en el celular. Probamos el número de WhatsApp y las rutas de contacto contratadas. Revisamos los enlaces, la información y quién tiene acceso. Una función incluida que no pasa la prueba no se da por entregada.',
  docTitle: 'Acta de entrega',
  docTag: 'Formato',
  docRows: [
    { t: 'Captura en móvil, con fecha', d: 'Cómo se ve y se lee tu web en un teléfono.' },
    { t: 'Contacto de prueba recibido', d: 'El mensaje llega al destino pactado; datos personales ocultos.' },
    { t: 'Lista de publicación', d: 'Enlaces, información y accesos revisados uno por uno.' },
    { t: 'Titularidad y renovaciones', d: 'Quién es dueño de cada cuenta y cuándo vence cada servicio.' },
    { t: 'Propiedades de Google', d: 'Qué quedó conectado, con qué permisos y qué sigue pendiente.' },
  ],
  docNote: 'Cada casilla se completa con la prueba real de tu proyecto.',
  cta: 'Conocer las pruebas de entrega',
};

export const EXPECTATIONS = {
  eyebrow: 'Presupuesto y continuidad',
  title: 'Una propuesta completa. Un presupuesto claro antes de empezar.',
  body: 'El precio depende de lo que realmente hay que construir o corregir. Después de revisar tu negocio recibes una propuesta con alcance, fechas, inversión total, forma de pago y condiciones de continuidad. Nada aparece después como un «extra obligatorio» que no se haya explicado.',
  sub: 'Si necesitas únicamente una mejora puntual, la cotizamos por separado. La instalación integral tiene un alcance definido.',
  compareTitle: 'Si comparas con una web más económica, compara el mismo alcance.',
  compareIntro: 'Una web económica puede bastar si solo necesitas poner tu información en Internet. Esto es lo que añade Presencia Resuelta:',
  compare: [
    { f: 'Mensaje', lo: 'Información publicada en una página.', hi: 'Servicios ordenados alrededor de las preguntas del cliente.' },
    { f: 'Google', lo: 'Perfil y sitio por separado.', hi: 'Coherencia entre ambos, con cambios autorizados.' },
    { f: 'Contacto', lo: 'Un botón o formulario publicado.', hi: 'Rutas comprobadas hasta su destino real.' },
    { f: 'Entrega', lo: 'Publicación y archivos.', hi: 'Pruebas, accesos, fechas de renovación y guía de uso.' },
  ],
  lo: 'Web económica',
  hi: 'Presencia Resuelta',
  continuityTitle: 'Lo que viene después también queda por escrito.',
  continuity: 'Desde la propuesta sabes quién administra el dominio, el alojamiento y el correo, qué servicios vencen y cuáles puedes mantener por tu cuenta. Si quieres que sigamos revisando contenido, presencia local y funcionamiento de los contactos, hay un plan mensual independiente del trabajo de instalación.',
  continuityMicro: 'Ninguna suscripción sustituye tu titularidad sobre las cuentas y activos definidos en el contrato. Los servicios de terceros pueden tener licencias y reglas propias.',
};

export const CTA_SECTION = {
  eyebrow: 'Empecemos por lo que ya tienes',
  title: 'Enséñanos tu negocio. Te diremos qué mejoraríamos primero.',
  description: 'Cuéntanos el nombre de tu empresa, en qué ciudad trabajas y qué servicio te interesa destacar. Revisamos cómo se entiende hoy y te compartimos tres observaciones concretas.',
  submit: 'Quiero mis tres observaciones',
  micro: 'WhatsApp abre una conversación con LSS; respondemos personalmente.',
};

export const FAQ_ITEMS: FaqItem[] = [
  { question: 'Ya tengo Instagram y WhatsApp. ¿Para qué una web?', answer: 'Son buenos canales para mantener la relación y responder. Una web ordena servicios, zonas, proceso, preguntas y pruebas en un lugar que un desconocido puede consultar sin buscar entre publicaciones. La necesidad concreta se determina en la revisión.' },
  { question: '¿Me garantizan clientes nuevos?', answer: 'Cuántas personas buscan un servicio y deciden contratarlo depende también de tu oferta, tu reputación y tu mercado. Lo que sí se pacta y se comprueba es que la presentación y los canales de contacto incluidos funcionen.' },
  { question: '¿Qué pasa si ya tengo una web?', answer: 'La revisamos antes de recomendar sustituirla. Si la mejor inversión es conservarla y corregir tres cosas, eso es lo que te decimos.' },
  { question: '¿Qué pasa si no tengo fotos profesionales?', answer: 'Revisamos lo que sí tienes y diseñamos con material auténtico. Si conviene fotografiar el negocio, se cotiza aparte.' },
  { question: '¿Mi dominio y mi información quedan a mi nombre?', answer: 'El dominio y las cuentas que deban pertenecer a tu empresa se configuran con ese titular. Las licencias y derechos sobre código y diseño se explican en la propuesta y el contrato.' },
  { question: '¿Cuánto costará mantenerlo?', answer: 'Antes de contratar conoces los costos de proveedores, las fechas de renovación y los servicios de mantenimiento opcionales.' },
  { question: '¿Cuánto tarda?', answer: 'Depende del sitio, los materiales y las aprobaciones. La propuesta incluye calendario y lo que necesitas entregar.' },
  { question: '¿Qué tendría que hacer yo?', answer: 'Confirmar la información del negocio, compartir materiales propios, delegar accesos en las plataformas que correspondan y aprobar contenido. El trabajo técnico y las pruebas quedan a cargo de LSS dentro del alcance.' },
  { question: '¿Tiene costo la primera revisión?', answer: 'La revisión inicial de tres observaciones no tiene costo. Si encontramos encaje, podemos mostrarte una dirección visual breve, sujeta a disponibilidad.' },
];

export const FOOTER = {
  blurb: 'LSS — Local Systems Studio. Sitios web, presencia en Google y recorridos de contacto comprobables para negocios de servicios.',
  trust: 'Trabajamos con información auténtica y permisos del titular. Las funciones y proveedores se definen por escrito en cada proyecto.',
};
