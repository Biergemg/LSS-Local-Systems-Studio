import type { ContactInfo, FaqItem, NavLink } from '@/types';

/* Copy canónico V6 (2026-10-29), refinado con V8. Sin precios, garantías contractuales, casos ni cifras:
   esos elementos no están aprobados para publicación (matriz H de la oferta V6). */

export const SITE = {
  name: 'LSS — Local Systems Studio',
  shortName: 'LSS',
  url: 'https://www.lsslocalsystemsstudio.com',
  title: 'LSS | Web, Google y contacto para negocios de servicios',
  description:
    'Que quien te encuentre entienda por qué tu trabajo vale lo que cobras. Revisamos tu negocio como lo vería un cliente nuevo: tres observaciones sin costo.',
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
  body: 'Quizá hoy te conocen por recomendaciones, Instagram o Google. Pero cuando alguien aún no sabe quién eres, necesita ver qué haces, qué respaldo tienes y cómo pedirte información. Ordenamos esa primera impresión: una web clara, tus datos correctos en Google y una forma directa de contactarte.',
  proof: 'Primero vemos tu negocio como lo vería un cliente nuevo y te mostramos qué mejorar. Después instalamos y comprobamos lo acordado.',
  ctaPrimary: 'Quiero ver qué cambiarían en mi negocio',
  ctaSecondary: 'Ver cómo comprueban la entrega',
  micro: 'Comenzamos con tres observaciones concretas, sin costo. La muestra visual personalizada se prepara para proyectos que encajan con nuestro servicio.',
};

export const DOSSIER = {
  tag: 'Ejemplo conceptual',
  title: 'Lo que revisa un desconocido en su primera visita',
  lenses: [
    { n: '1', q: 'Lo que encuentra', a: '¿Aparece tu negocio con información coherente en la web y en Google?' },
    { n: '2', q: 'Lo que entiende', a: '¿Sabe qué haces, para quién y en qué zona, sin buscar de más?' },
    { n: '3', q: 'Cómo puede escribirte', a: '¿Hay un botón que lleva al número correcto y a alguien que responde?' },
  ],
  note: 'Así se organizan las tres observaciones de tu revisión. No muestra resultados de ningún negocio.',
};

export const BELIEF = {
  eyebrow: 'Cuando alguien te busca',
  title: 'Ya te recomendaron. Ahora toca que puedan comprobar por qué.',
  body: 'Una recomendación abre la puerta. Después la persona revisa tu trabajo, compara opciones y busca respuestas: ¿hace exactamente lo que necesito?, ¿trabaja en mi zona?, ¿puedo confiar?, ¿cómo cotizo? Si todo está repartido entre publicaciones, perfiles y mensajes antiguos, tiene que averiguarlo por su cuenta.',
  scenes: [
    { channel: 'En Instagram', text: 'ven tus novedades. En tu web encuentran tus servicios ordenados, tu cobertura y cómo trabajas.' },
    { channel: 'En Google', text: 'verifican dónde estás, tu información y las reseñas que realmente tienes.' },
    { channel: 'En WhatsApp', text: 'te preguntan lo que necesitan, sin tener que adivinar a qué número escribir.' },
  ],
  closing: 'La idea es que las tres piezas cuenten la misma historia.',
};

export const PPV = {
  eyebrow: 'La Prueba de la Primera Visita',
  title: 'Abre tu negocio como si nunca hubieras oído hablar de él.',
  body: 'Eso es lo primero que hacemos. Entramos como lo haría alguien que busca tu servicio por primera vez. Anotamos tres puntos que dificultan entenderlo, confiar o contactar. Te enseñamos las capturas y qué cambiaríamos.',
  sample: 'Si vemos un proyecto que vale la pena construir, preparamos una primera dirección visual con tu marca y te explicamos el recorrido que proponemos. Así ves el enfoque antes de contratar la instalación.',
  precision: 'La revisión inicial muestra oportunidades, no promete tráfico ni reemplaza una auditoría completa. La vista personalizada se ofrece cuando el proyecto encaja y existe disponibilidad.',
  demoTitle: 'Pruébalo con tu negocio',
  demoIntro: 'Escribe tres datos y mira cómo se ordenaría la primera impresión. Todo ocurre en tu pantalla: no se envía nada.',
  fields: {
    name: { label: 'Nombre del negocio', placeholder: 'Ej. Taller Mendoza', hint: 'Solo se usa en esta demostración.' },
    city: { label: 'Ciudad', placeholder: 'Ej. Tampico' },
    service: { label: 'Servicio que quieres destacar', placeholder: 'Ej. instalación de cocinas integrales' },
  },
  toggle: { before: 'Primera impresión dispersa', after: 'Primera impresión ordenada' },
  notice: 'Demostración conceptual: ilustra el método con los datos que escribes. No es una revisión real de tu negocio ni un resultado.',
  waLead: 'Esto es lo que enviarías por WhatsApp. No se manda nada hasta que lo mandes tú.',
  cta: 'Quiero mi primera revisión',
};

export const QUESTIONS = {
  eyebrow: 'Una presentación que respalde tu trabajo',
  title: 'Tu cliente debería poder responder cuatro preguntas antes de escribirte.',
  items: [
    { q: '¿Hacen lo que necesito?', a: 'Servicios explicados con las palabras que usa quien los busca.' },
    { q: '¿Por qué confiar?', a: 'Fotos, experiencia, procesos y credenciales reales: solo las que el negocio puede demostrar.' },
    { q: '¿Me pueden atender?', a: 'Ubicación, cobertura, horarios y datos coherentes entre web y Google, según autorizaciones.' },
    { q: '¿Cómo pido precio?', a: 'Un botón y un mensaje que llegan a quien responde.' },
  ],
  closing: 'No hace falta fingir una empresa más grande. Hace falta mostrar mejor la que ya existe.',
};

export const OFFER = {
  eyebrow: 'LSS Presencia Resuelta',
  title: 'De la idea a una presencia publicada y comprobada.',
  intro: 'Reunimos en un solo proyecto lo que normalmente termina repartido entre diseño, textos, información en Google y enlaces de contacto. Tú apruebas el mensaje y la evidencia. LSS ejecuta y documenta lo contratado.',
  groups: [
    { title: 'Que se entienda tu servicio', text: 'Una web móvil con explicación útil, preguntas frecuentes y propuesta de valor fiel a tu trabajo.' },
    { title: 'Que haya razones para confiar', text: 'Fotografías y pruebas auténticas, información local coherente y criterios verificables.' },
    { title: 'Que puedan pedirte información', text: 'WhatsApp, teléfono y el formulario incluido —cuando esté contratado y probado— conectados al destino correcto.' },
    { title: 'Que no pierdas control', text: 'Cuentas, fechas, accesos, propiedad del dominio y condiciones de renovación claras.' },
  ],
  detailsSummary: 'Ver el detalle técnico del alcance',
  details: 'Hasta cinco páginas, revisión autorizada de un Perfil de Empresa de Google, SEO técnico inicial, integración de contacto, checklist y entrega documentada, conforme a la propuesta. Alojamiento, dominio y correo empresarial solo cuando estén expresamente incluidos.',
  existing: {
    title: 'Si tu web ya funciona, la conservamos.',
    text: 'Hay negocios que necesitan un sitio nuevo y otros que necesitan ordenar servicios, corregir datos de Google o reparar cómo llegan los mensajes. Primero distinguimos una cosa de la otra. La propuesta se construye alrededor del cambio que merece la inversión, no alrededor de sustituir por sustituir.',
    seal: 'También te diremos si hoy no hace falta reconstruir.',
  },
  cta: 'Ver si este servicio encaja con mi negocio',
};

export const PROCESS = {
  eyebrow: 'Un proceso que puedes revisar',
  title: 'Sabes qué estamos haciendo y qué recibes al final.',
  steps: [
    { title: 'Miramos tu negocio de frente', text: 'Reunión breve, servicio a destacar, evidencias y tres prioridades de la Primera Visita.' },
    { title: 'Te enseñamos la dirección', text: 'Para proyectos calificados, una muestra visual y un recorrido propuesto; después presupuesto y calendario.' },
    { title: 'Lo construimos con tus datos', text: 'Mensaje, web, Google y enlaces, dentro del alcance firmado y los permisos autorizados.' },
    { title: 'Lo abrimos desde un teléfono', text: 'Comprobamos qué se muestra, qué enlace se pulsa y si el contacto llega al destino pactado.' },
    { title: 'Te damos control', text: 'Resumen, acceso, renovaciones, entrega y seguimiento correctivo definido.' },
  ],
  note: 'Las fechas concretas comienzan cuando tenemos los materiales, accesos y aprobaciones que el proyecto necesita.',
};

export const EVIDENCE = {
  eyebrow: 'La prueba se hace en tu negocio',
  title: 'Antes de decir «quedó listo», lo abrimos contigo.',
  body: 'Vemos cómo se lee en el celular. Probamos el número de WhatsApp y las rutas de contacto contratadas. Revisamos los enlaces, la información y quién tiene acceso. Si una función que debíamos entregar falla, no se da por aprobada.',
  items: [
    { title: 'Captura en móvil, con fecha', text: 'Cómo se ve y se lee tu web en un teléfono real.' },
    { title: 'Contacto de prueba recibido', text: 'El mensaje llega al destino pactado; los datos personales se ocultan.' },
    { title: 'Lista de publicación', text: 'Enlaces, información y accesos revisados uno por uno.' },
    { title: 'Titularidad y renovaciones', text: 'Quién es dueño de cada cuenta y cuándo vence cada servicio.' },
    { title: 'Estado de las propiedades de Google', text: 'Qué quedó conectado, con qué permisos y qué sigue pendiente.' },
  ],
  badge: 'Se muestra solo con prueba real de cada proyecto',
  note: 'Aún no publicamos casos de clientes. Cuando haya uno con permiso de su titular, aparecerá aquí con sus pruebas, no con cifras de ventas.',
  cta: 'Conocer las pruebas de entrega',
};

export const EXPECTATIONS = {
  eyebrow: 'Presupuesto y continuidad',
  title: 'Una propuesta completa. Un presupuesto claro antes de empezar.',
  body: 'El precio depende de los servicios que realmente hay que construir o corregir. Después de revisar tu negocio recibes una propuesta con alcance, fechas, inversión total, forma de pago y condiciones de continuidad. Nada aparece después como un «extra obligatorio» que no se haya explicado.',
  sub: 'Si necesitas únicamente una mejora puntual, la cotizamos por separado. La instalación integral tiene un alcance definido.',
  compareTitle: 'Si comparas con una web más económica, compara el mismo alcance',
  compareIntro: 'Una web económica puede ser suficiente si solo necesitas poner tu información en Internet. Esto es lo que añade este servicio:',
  compare: [
    { f: 'Mensaje', lo: 'Información del negocio publicada en una página.', hi: 'Servicios ordenados alrededor de las preguntas del cliente.' },
    { f: 'Google', lo: 'Perfil y sitio por separado.', hi: 'Revisión de coherencia entre ambos, con cambios autorizados.' },
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
  description: 'Cuéntanos el nombre de tu empresa, en qué ciudad trabajas y qué servicio te interesa destacar. Revisaremos cómo se entiende hoy y te compartiremos tres observaciones concretas. Si la solución vale la pena, te mostraremos el siguiente paso.',
  list: [
    'Tres observaciones concretas sobre tu negocio real, no una presentación genérica.',
    'Sin costo para conocer por dónde conviene empezar.',
    'No necesitas llamada: la conversación comienza y sigue por WhatsApp.',
  ],
  submit: 'Quiero mis tres observaciones',
  micro: 'WhatsApp abre una conversación con LSS. No agenda ni envía un formulario automáticamente; respondemos personalmente.',
};

export const FAQ_ITEMS: FaqItem[] = [
  { question: 'Ya tengo Instagram y WhatsApp. ¿Para qué una web?', answer: 'Son buenos canales para mantener relación y responder. Una web ordena servicios, zonas, proceso, preguntas y evidencias en un lugar que un desconocido pueda consultar sin buscar entre publicaciones. La necesidad concreta se determina en la revisión.' },
  { question: '¿Me garantizan clientes nuevos?', answer: 'Nadie puede asegurar cuántas personas buscarán un servicio o decidirán contratarlo. Sí se pacta y comprueba que la presentación y los canales de contacto incluidos funcionan.' },
  { question: '¿Qué pasa si ya tengo una web?', answer: 'La revisamos antes de recomendar sustituirla. Si la mejor inversión es conservarla y corregir tres cosas, eso es lo que diremos.' },
  { question: '¿Qué pasa si no tengo fotos profesionales?', answer: 'Revisamos lo que sí tienes y diseñamos sin inventar instalaciones, resultados ni testimonios. Si conviene fotografiar el negocio, se cotiza aparte.' },
  { question: '¿Mi dominio y mi información quedan a mi nombre?', answer: 'El dominio y las cuentas que deban pertenecer a tu empresa se configuran con ese titular; las licencias y derechos sobre código y diseño se explican en la propuesta y el contrato.' },
  { question: '¿Cuánto costará mantenerlo?', answer: 'Antes de contratar conocerás los costos de proveedores, las fechas de renovación y los servicios de mantenimiento que son opcionales. No agregamos una mensualidad para ocultar costos.' },
  { question: '¿Cuánto tarda?', answer: 'Depende del sitio, los materiales y las aprobaciones. La propuesta incluye calendario y qué necesitas entregar; no prometemos una fecha universal sin revisar el proyecto.' },
  { question: '¿Qué tendría que hacer yo?', answer: 'Confirmar información del negocio, compartir materiales propios, delegar accesos en las plataformas que correspondan y aprobar contenido. El trabajo técnico y las pruebas quedan a cargo de LSS dentro del alcance.' },
  { question: '¿Es gratis que lo revisen?', answer: 'La revisión inicial de tres observaciones no tiene costo. Si encontramos encaje, podemos mostrarte una dirección visual breve; esa muestra está sujeta a calificación y disponibilidad.' },
];

export const FOOTER = {
  blurb: 'LSS — Local Systems Studio. Sitios web, presencia en Google y recorridos de contacto comprobables para negocios de servicios.',
  trust: 'Trabajamos con información auténtica y permisos del titular. Las funciones y proveedores se definen por escrito en cada proyecto.',
};
