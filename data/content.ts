import type { ContactInfo, FaqItem, NavLink } from '@/types';

/* Copy de oferta reingenierizada (2026-11-03). Trazabilidad: .offer-os/evidence (G0-G8).
   Sin precios, garantias, casos, cifras ni testimonios: ninguno esta aprobado para publicacion.
   El bloque "No incluye" delimita el alcance; los limites contractuales completos viven en la propuesta y en los terminos. */

export const SITE = {
  name: 'LSS — Local Systems Studio',
  shortName: 'LSS',
  url: 'https://www.lsslocalsystemsstudio.com',
  title: 'LSS | Web, Google y contacto para negocios de servicios',
  description:
    'Hacemos o corregimos tu web, tus datos en Google y tu ruta de contacto, y los probamos contigo en un teléfono. Primera Visita Digital sin costo.',
};

const WA_NUMBER = '528333263389';
export const WA_DEFAULT_TEXT =
  'Hola, quiero la Primera Visita Digital de mi negocio. Nombre: ___ | Ciudad: ___ | Servicio que quiero destacar: ___ | Web o perfil de Google (si lo tengo): ___';

export function waLink(text: string = WA_DEFAULT_TEXT): string {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
}

export const EMAIL_CONTACT_URL = 'mailto:contacto@lsslocalsystemsstudio.com?subject=' +
  encodeURIComponent('Primera Visita Digital — LSS') + '&body=' +
  encodeURIComponent('Hola LSS, quiero solicitar la Primera Visita Digital.\n\nNombre: \nNegocio: \nCiudad: \nServicio principal: \nSitio web (si tengo): \n\nGracias.');

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
  { href: '#prueba', label: 'Primera Visita' },
  { href: '#oferta', label: 'Qué recibes' },
  { href: '#proceso', label: 'Cómo se entrega' },
  { href: '#preguntas', label: 'Preguntas' },
];

export const NAV_CTA = 'Primera Visita Digital';

export const HERO = {
  eyebrow: 'Negocios de servicios que venden por cita o cotización',
  headline: 'Tu web, tu perfil de Google y tu WhatsApp, probados en un teléfono antes de entregártelos.',
  body: 'Para negocios de servicios que reciben clientes por recomendación. Hacemos o corregimos tu sitio, tus datos en Google y tu ruta de contacto, y te mostramos que funcionan. Todo a distancia, con las cuentas a tu nombre.',
  ctaPrimary: 'Quiero mi Primera Visita Digital',
  ctaSecondary: 'Ver cómo comprobamos la entrega',
  micro: 'Sin costo: tres observaciones concretas sobre cómo se ve hoy tu negocio. LSS es un estudio pequeño y nuevo: todavía no publicamos casos de clientes, por eso el alcance y la inversión total van por escrito antes de que decidas. Se abre WhatsApp con tu mensaje listo.',
  schematic: {
    label: 'Primera Visita Digital',
    desc: 'Recorrido de un cliente nuevo: lo que encuentra, lo que entiende y cómo te escribe.',
  },
};

export const BELIEF = {
  eyebrow: 'Cuando alguien te busca',
  title: 'Ya te recomendaron. Ahora toca que puedan comprobar por qué.',
  body: 'Una recomendación abre la puerta; después la persona compara y busca respuestas. Si todo está repartido entre publicaciones, perfiles y mensajes antiguos, tiene que averiguarlo por su cuenta.',
  channels: [
    { n: '01', name: 'En Instagram', lead: 'Ven tus novedades.', text: 'En tu web encuentran tus servicios ordenados, tu cobertura y cómo trabajas.' },
    { n: '02', name: 'En Google', lead: 'Verifican dónde estás.', text: 'Revisan tu información y las reseñas que realmente tienes.' },
    { n: '03', name: 'En WhatsApp', lead: 'Te preguntan lo que necesitan.', text: 'Sin tener que adivinar a qué número escribir.' },
  ],
  closing: 'Cuando las tres dicen lo mismo, la persona no tiene que adivinar.',
};

export const PPV = {
  eyebrow: 'La Primera Visita Digital',
  title: 'Lo primero: revisamos tu negocio como lo vería alguien que no te conoce.',
  body: 'La Primera Visita Digital es una revisión a distancia, no una visita a tu local: observamos tu presencia digital como la vería quien te busca por primera vez, anotamos tres puntos que dificultan entenderte, confiar o contactarte, y te mostramos las capturas y qué cambiaríamos.',
  remote: 'No hace falta que vayamos a tu local: todo parte de lo que tu negocio muestra en Internet, estés en la ciudad de México que estés.',
  steps: [
    { n: '01', t: 'Lo que la persona encuentra', d: 'Qué aparece al buscarte y si web, Google y redes coinciden.' },
    { n: '02', t: 'Lo que entiende', d: 'Si en segundos sabe qué haces, para quién y dónde.' },
    { n: '03', t: 'Cómo puede escribirte', d: 'Si el botón lleva al número correcto y a quien responde.' },
  ],
  sample: 'Si decides avanzar, recibes una propuesta con alcance, calendario e inversión total antes de pagar nada.',
  cta: 'Quiero mi Primera Visita Digital',
  docTitle: 'Tres observaciones',
  docTag: 'Formato',
  docFields: ['Qué se ve', 'Captura con fecha', 'Qué cambiaríamos'],
};

export const OFFER = {
  eyebrow: 'LSS Presencia Resuelta',
  title: 'Qué recibes, en concreto.',
  intro: 'Un proyecto con alcance escrito que reúne lo que suele quedar repartido entre diseño, textos, Google y contacto. Tú apruebas el mensaje y la evidencia; LSS ejecuta, prueba y documenta.',
  deliverablesTitle: 'Incluye',
  deliverables: [
    'Un sitio web para teléfono de hasta cinco páginas, con tus servicios explicados con las palabras de quien los busca.',
    'Tu información de Google coherente con la web: Perfil de Empresa revisado con tu autorización y SEO técnico inicial. La verificación del perfil la decide Google.',
    'Una ruta de contacto (enlace de WhatsApp, teléfono o correo) con prueba de que el mensaje llega al número o buzón que acordamos.',
    'Search Console y Analytics configurados en cuentas a tu nombre, con tu autorización y tu acceso al dominio, para saber qué llega.',
    'Un acta de entrega con capturas y fechas, y los accesos y renovaciones por escrito.',
  ],
  excludesTitle: 'No incluye',
  excludes: 'Garantía de clientes, ventas ni posiciones en Google; anuncios; fotografía profesional; tienda en línea; agenda, cobros ni asistente automático. Dominio, alojamiento y correo los contratas tú, a tu nombre; antes de empezar te decimos su costo anual aproximado.',
  groupsTitle: 'Las cuatro preguntas que tu cliente se hace antes de escribirte',
  groups: [
    { n: '01', title: '¿Hacen lo que necesito?', text: 'Servicios explicados con las palabras de quien los busca, en una web móvil con preguntas frecuentes.' },
    { n: '02', title: '¿Por qué confiar?', text: 'Fotografías, experiencia y credenciales tuyas y auténticas, con datos coherentes entre web y Google.' },
    { n: '03', title: '¿Cómo pido precio?', text: 'Un WhatsApp, teléfono o correo visibles, con prueba de que el mensaje llega al destino acordado.' },
    { n: '04', title: '¿Quién tiene el control?', text: 'Cuentas, fechas, accesos, propiedad del dominio y condiciones de renovación, por escrito.' },
  ],
  closing: 'Todo parte de lo que tu negocio ya hace: no inventamos casos, reseñas ni cifras.',
  detailsSummary: 'Ver el detalle técnico del alcance',
  details: 'Hasta cinco páginas, revisión autorizada de un Perfil de Empresa de Google, SEO técnico inicial, integración de contacto, checklist y entrega documentada, conforme a la propuesta. Dominio, alojamiento y correo quedan a tu nombre; sus costos anuales aproximados se te informan antes de empezar.',
  existing: {
    title: 'Si ya tienes web, la conservamos.',
    text: 'Corregimos Google, el contacto y la medición sin rehacer tu sitio. Si no tienes uno, hacemos un sitio nuevo de hasta cinco páginas además de lo anterior. Primero distinguimos una cosa de la otra en la revisión.',
  },
  cta: 'Quiero mi Primera Visita Digital',
};

export const PROCESS = {
  eyebrow: 'Un proceso que puedes revisar',
  title: 'Cinco pasos, cada uno con algo que puedes revisar.',
  steps: [
    { title: 'Revisamos tu negocio a distancia', text: 'Conversación breve en línea y las tres prioridades de la Primera Visita Digital.' },
    { title: 'Te presentamos la propuesta', text: 'Si decides avanzar: alcance, calendario e inversión total por escrito, antes de pagar nada.' },
    { title: 'Lo construimos con tus datos', text: 'Mensaje, web, Google y enlaces, dentro del alcance firmado y los permisos autorizados.' },
    { title: 'Lo abrimos desde un teléfono', text: 'Comprobamos qué se muestra, qué enlace se pulsa y si el contacto llega al destino pactado.' },
    { title: 'Te damos el control', text: 'Resumen, accesos y renovaciones por escrito. Las correcciones posteriores a la entrega se definen en la propuesta.' },
  ],
  note: 'Las fechas empiezan a contar cuando tenemos los materiales, accesos y aprobaciones que el proyecto necesita.',
};

export const EVIDENCE = {
  eyebrow: 'La prueba se hace contigo, en línea',
  title: 'Antes de decir “quedó listo”, lo abrimos contigo.',
  body: 'Lo revisamos juntos a distancia: cómo se lee en el celular, el número de WhatsApp, las rutas de contacto contratadas, los enlaces y quién tiene acceso. Cada punto del acta se marca como pasa, no pasa o depende de un tercero; lo que no pasa se corrige o se explica antes de cerrar la entrega.',
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
  measuredTitle: 'Medición de esta página',
  measuredMeta: 'Es lo que hicimos con nuestra propia página; todavía no tenemos clientes externos. Medido el 3 de noviembre de 2026 sobre la versión que se publica, con Lighthouse 12.8.2 (móvil, simulado; mediana de 5 corridas) y axe-core con WCAG 2.2 AA.',
  measured: [
    { k: 'Accesibilidad', v: '100' },
    { k: 'Buenas prácticas', v: '100' },
    { k: 'SEO', v: '100' },
    { k: 'Rendimiento (móvil, laboratorio)', v: '89' },
    { k: 'Cambio de diseño (CLS)', v: '0' },
    { k: 'Errores WCAG 2.2 AA', v: '0' },
  ],
  measuredNote: 'Mediciones de laboratorio: no equivalen a la experiencia de cada visitante.',
  cta: 'Quiero mi Primera Visita Digital',
};

export const EXPECTATIONS = {
  eyebrow: 'Presupuesto y continuidad',
  title: 'Una propuesta completa. Un presupuesto claro antes de empezar.',
  body: 'El precio depende de lo que hay que construir o corregir. La propuesta incluye alcance, fechas, inversión total, forma de pago y continuidad. Nada aparece después como un “extra obligatorio” sin explicar.',
  driversTitle: 'Lo que mueve el costo',
  drivers: [
    'Cuántas páginas y servicios hay que explicar.',
    'Si tu perfil de Google existe, hay que corregirlo o reclamarlo.',
    'Qué material propio tienes: fotos, textos y credenciales.',
    'Qué rutas de contacto se contratan y se prueban.',
    'Si sumas el plan mensual de seguimiento.',
  ],
  driversNote: 'La propuesta con calendario e inversión total llega después de la Primera Visita Digital.',
  compareTitle: 'Si comparas con una web más económica, compara el mismo alcance.',
  compareIntro: 'Una web económica puede bastar si solo necesitas publicar tu información. Antes de decidir, pregunta a quien te cotice:',
  compare: [
    { f: 'Mensaje', lo: '¿Quién escribe los servicios con las preguntas de tu cliente?', hi: 'LSS, con tu aprobación del mensaje.' },
    { f: 'Google', lo: '¿Quién revisa que web y Google digan lo mismo?', hi: 'LSS, con los cambios que tú autorizas.' },
    { f: 'Contacto', lo: '¿Quién prueba que el mensaje llega a tu número o correo?', hi: 'LSS, con captura en el acta de entrega.' },
    { f: 'Entrega', lo: '¿A nombre de quién quedan las cuentas y qué se entrega por escrito?', hi: 'A tu nombre, con accesos, renovaciones y guía de uso.' },
  ],
  lo: 'Pregunta a cualquier proveedor',
  hi: 'Presencia Resuelta',
  criterion: 'Tema',
  continuityTitle: 'Lo que viene después también queda por escrito.',
  continuity: 'Desde la propuesta sabes quién administra dominio, alojamiento y correo, qué servicios vencen y cuáles puedes mantener tú. Si quieres seguimiento, hay un plan mensual opcional, independiente del proyecto: reporte mensual con la fuente de cada dato, correcciones y cambios menores. Su alcance y sus condiciones también se te entregan por escrito antes de contratarlo.',
  continuityMicro: 'Ninguna suscripción sustituye tu titularidad sobre las cuentas y activos definidos en el contrato.',
};

export const CTA_SECTION = {
  eyebrow: 'Empecemos por lo que ya tienes',
  title: 'Enséñanos tu negocio. Te diremos qué mejoraríamos primero.',
  description: 'Cuéntanos el nombre de tu empresa, tu ciudad y el servicio que quieres destacar. Revisamos a distancia cómo se entiende hoy y te compartimos tres observaciones concretas, desde cualquier ciudad de México.',
  submit: 'Quiero mis tres observaciones',
  micro: 'WhatsApp abre una conversación con LSS; respondemos personalmente.',
};

export const FAQ_ITEMS: FaqItem[] = [
  { question: 'Ya tengo Instagram y WhatsApp. ¿Para qué una web?', answer: 'Son buenos canales para mantener la relación y responder. Una web ordena servicios, zonas, proceso, preguntas y pruebas en un lugar que un desconocido puede consultar sin buscar entre publicaciones. La necesidad concreta se determina en la revisión.' },
  { question: '¿Me garantizan clientes nuevos?', answer: 'Cuántas personas buscan un servicio y deciden contratarlo depende también de tu oferta, tu reputación y tu mercado. Lo que sí se pacta y se comprueba es que la presentación y los canales de contacto incluidos funcionen.' },
  { question: '¿Tienen que ir a mi negocio? ¿Trabajan a distancia?', answer: 'No tienen que ir. La Primera Visita Digital y el proyecto completo pueden hacerse 100 % a distancia, a partir de tu presencia en Internet y de los materiales que compartas. Funciona igual en cualquier ciudad de México.' },
  { question: '¿Qué pasa si ya tengo una web?', answer: 'La revisamos antes de recomendar sustituirla. Si la mejor inversión es conservarla y corregir tres cosas, eso es lo que te decimos.' },
  { question: '¿Qué pasa si no tengo fotos profesionales?', answer: 'Revisamos lo que sí tienes y diseñamos con material auténtico. Si conviene fotografiar el negocio, se cotiza aparte.' },
  { question: '¿Mi dominio y mi información quedan a mi nombre?', answer: 'El dominio y las cuentas que deban pertenecer a tu empresa se configuran con ese titular. Las licencias y derechos sobre código y diseño se explican en la propuesta y el contrato.' },
  { question: '¿Cuánto costará mantenerlo?', answer: 'Antes de contratar conoces los costos de proveedores, las fechas de renovación y el plan mensual opcional, con su alcance y sus condiciones. Puedes mantener tú mismo lo que te corresponda.' },
  { question: '¿Es obligatorio el plan mensual?', answer: 'No. El proyecto se entrega con tus accesos y su guía. El seguimiento mensual solo existe si lo contratas, por escrito.' },
  { question: '¿Cuánto cuesta el proyecto?', answer: 'Depende de lo que haya que construir o corregir, por eso no publicamos una cifra única. Después de la Primera Visita Digital recibes una propuesta con alcance, calendario e inversión total.' },
  { question: '¿Cuánto tarda?', answer: 'Depende del sitio, los materiales y las aprobaciones. La propuesta incluye calendario y lo que necesitas entregar.' },
  { question: '¿Qué tendría que hacer yo?', answer: 'Confirmar la información del negocio, compartir materiales propios, delegar accesos en las plataformas que correspondan y aprobar contenido. El trabajo técnico y las pruebas quedan a cargo de LSS dentro del alcance.' },
  { question: '¿Tiene costo la primera revisión?', answer: 'La revisión inicial de tres observaciones no tiene costo. Si decides avanzar, recibes una propuesta con alcance, calendario e inversión total antes de pagar nada.' },
];

export const FOOTER = {
  blurb: 'LSS — Local Systems Studio. Sitios web, presencia en Google y recorridos de contacto comprobables para negocios de servicios. Trabajamos a distancia.',
  trust: 'Trabajamos con información auténtica y permisos del titular. Las funciones y proveedores se definen por escrito en cada proyecto.',
};
