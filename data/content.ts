import type { ContactInfo, FaqItem, NavLink } from '@/types';

/* Copy V6 → V8 premium (2026-10-29). Discurso de valor y aspiración.
   Sin precios, garantías contractuales, casos ni cifras: no están aprobados para publicación (matriz H de la oferta V6).
   Las condiciones y límites viven en la propuesta y el contrato, no en el discurso de venta. */

export const SITE = {
  name: 'LSS — Local Systems Studio',
  shortName: 'LSS',
  url: 'https://www.lsslocalsystemsstudio.com',
  title: 'LSS | Web, Google y contacto para negocios de servicios',
  description:
    'Estudio de diseño y estrategia digital. Presentamos tu negocio con la calidad que merece: web, Google y contacto directo. Mira tu propuesta en segundos.',
};

const WA_NUMBER = '528333263389';
export const WA_DEFAULT_TEXT =
  'Hola, quiero ver cómo se presentaría mi negocio. Nombre: ___ | Ciudad: ___ | Servicio que quiero destacar: ___ | Web o perfil de Google (si lo tengo): ___';

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
  { href: '#prueba', label: 'Tu propuesta' },
  { href: '#oferta', label: 'Qué recibes' },
  { href: '#proceso', label: 'Cómo trabajamos' },
  { href: '#entrega', label: 'Entrega' },
  { href: '#preguntas', label: 'Preguntas' },
];

export const NAV_CTA = 'Escribir por WhatsApp';

export const HERO = {
  eyebrow: 'Estudio de diseño y estrategia digital',
  headline: 'Tu negocio, presentado como lo que realmente vale.',
  body: 'Diseñamos la primera impresión de negocios de servicios: una web con carácter, una presencia cuidada en Google y un contacto directo por WhatsApp. Todo con la misma voz, la misma calidad y el mismo criterio.',
  ctaPrimary: 'Ver mi propuesta en segundos',
  ctaSecondary: 'Hablar por WhatsApp',
  strip: ['Web de autor', 'Presencia en Google', 'Contacto por WhatsApp', 'Entrega comprobada'],
  sample: {
    tag: 'Muestra de estudio',
    name: 'Casa Arroyo',
    line: 'Carpintería a medida · Tampico',
    cta: 'Pedir cotización',
    note: 'Marca de ejemplo creada por LSS para ilustrar un estilo de presentación.',
  },
};

export const BELIEF = {
  eyebrow: 'El momento que importa',
  title: 'Ya te recomendaron. Ahora tu presentación hace el resto.',
  body: 'Quien llega por una recomendación revisa, compara y decide en minutos. En ese recorrido, cada detalle comunica cuánto cuida su trabajo quien lo ofrece. Ahí es donde ocurre nuestra parte.',
  scenes: [
    { n: '01', channel: 'En tu web', text: 'Servicios, zonas y forma de trabajo contados con claridad y con un diseño que se queda en la memoria.' },
    { n: '02', channel: 'En Google', text: 'Tu información coherente, tus fotos y tus enlaces trabajando en la misma dirección.' },
    { n: '03', channel: 'En WhatsApp', text: 'Un botón que abre la conversación correcta, con el servicio ya mencionado.' },
  ],
  closing: 'Tres piezas, una sola historia.',
};

export const PPV = {
  eyebrow: 'La Prueba de la Primera Visita',
  title: 'Mira tu negocio con otro nivel de presentación.',
  body: 'Escribe tu nombre, tu ciudad y tu servicio principal. En segundos verás una propuesta de presentación con composición, tipografía y dirección de arte de estudio.',
  stageLabel: 'Propuesta de presentación',
  fields: {
    name: { label: 'Nombre de tu negocio', placeholder: 'Ej. Casa Arroyo' },
    city: { label: 'Ciudad', placeholder: 'Ej. Tampico' },
    service: { label: 'Servicio principal', placeholder: 'Ej. Carpintería a medida' },
  },
  directions: [
    { id: 'atelier', label: 'Atelier', hint: 'Papel cálido y tinta' },
    { id: 'noche', label: 'Noche', hint: 'Oscuro con luz verde' },
    { id: 'pigmento', label: 'Pigmento', hint: 'Terracota y crema' },
  ],
  toggle: { before: 'Punto de partida', after: 'Propuesta LSS' },
  actionAfter: 'Transformar mi presentación',
  actionBefore: 'Ver el punto de partida',
  tag: 'Demostración creativa',
  caption: 'Composición generada con los datos que escribes. Las fotos, credenciales y reseñas reales de tu negocio ocupan los espacios marcados.',
  sampleCaption: 'Vista de ejemplo con una marca ficticia de LSS. Escribe tus datos y la composición se rehace con tu negocio.',
  waLead: 'Se abre WhatsApp con tus datos ya escritos. Tú decides cuándo enviarlo.',
  cta: 'Quiero esto para mi negocio',
  slots: { photo: 'Tu fotografía real', proof: 'Tu credencial o reconocimiento', review: 'Una reseña verificada' },
  steps: ['Cuéntanos', 'Diseñamos', 'Publicamos'],
};

export const QUESTIONS = {
  eyebrow: 'Una presentación completa',
  title: 'Cada visitante encuentra respuesta a lo que se pregunta.',
  items: [
    { q: '¿Hacen lo que necesito?', a: 'Servicios explicados con las palabras de quien los busca.' },
    { q: '¿Puedo confiar?', a: 'Fotos, experiencia y procesos reales, presentados con orgullo.' },
    { q: '¿Me pueden atender?', a: 'Ubicación, cobertura y datos coherentes entre web y Google.' },
    { q: '¿Cómo pido precio?', a: 'Un botón y un mensaje que llegan directo a quien responde.' },
  ],
  closing: 'Una empresa se ve más grande cuando se presenta bien.',
};

export const OFFER = {
  eyebrow: 'LSS Presencia Resuelta',
  title: 'Una presencia diseñada, publicada y comprobada.',
  intro: 'Reunimos en un solo proyecto lo que normalmente se reparte entre diseñador, redactor, especialista en Google y programador. Tú aportas la visión y apruebas cada paso. Nosotros lo diseñamos, lo construimos y lo documentamos.',
  groups: [
    { n: 'I', title: 'Que se entienda tu servicio', text: 'Una web móvil con dirección de arte propia, textos claros y una propuesta de valor fiel a tu trabajo.' },
    { n: 'II', title: 'Que haya razones para confiar', text: 'Fotografías auténticas, información local coherente y detalles que transmiten oficio.' },
    { n: 'III', title: 'Que contactarte sea natural', text: 'WhatsApp, teléfono y formulario conectados al destino correcto y probados en un celular real.' },
    { n: 'IV', title: 'Que todo sea tuyo', text: 'Cuentas, dominio, accesos y fechas de renovación documentados a tu nombre.' },
  ],
  detailsSummary: 'Ver el detalle del alcance',
  details: 'Hasta cinco páginas, revisión autorizada de un Perfil de Empresa de Google, SEO técnico inicial, integración de contacto, checklist y entrega documentada, conforme a la propuesta. Alojamiento, dominio y correo empresarial se incluyen cuando la propuesta lo indica.',
  existing: {
    title: 'Si tu web ya tiene buenas bases, la elevamos.',
    text: 'Algunos negocios necesitan un sitio nuevo; otros, una mejor dirección de arte, datos de Google al día o un contacto más directo. Empezamos por el cambio que más eleva tu presentación.',
  },
  cta: 'Quiero que diseñen el mío',
};

export const PROCESS = {
  eyebrow: 'Cómo trabajamos',
  title: 'Un proceso claro, de la primera conversación a la entrega.',
  steps: [
    { title: 'Conocemos tu negocio', text: 'Una conversación breve para entender tu servicio, tu zona y lo que te distingue.' },
    { title: 'Te mostramos la dirección', text: 'Una propuesta visual y un recorrido, antes de comprometer la instalación.' },
    { title: 'Construimos con tus datos', text: 'Mensaje, diseño, web, Google y enlaces, dentro del alcance acordado.' },
    { title: 'Lo abrimos en un teléfono', text: 'Revisamos lo que se muestra, lo que se pulsa y adónde llega cada contacto.' },
    { title: 'Te entregamos el control', text: 'Resumen, accesos, renovaciones y una guía para usarlo.' },
  ],
  note: 'Las fechas se fijan en cuanto tenemos los materiales y aprobaciones del proyecto.',
};

export const EVIDENCE = {
  eyebrow: 'Entrega comprobada',
  title: 'Antes de decir «listo», lo abrimos contigo.',
  body: 'Cada proyecto termina con una revisión conjunta: cómo se ve en el celular, adónde llega el WhatsApp, qué enlaces funcionan y quién tiene cada acceso. Lo que se entrega queda documentado.',
  items: [
    { title: 'Captura móvil con fecha', text: 'Tu web en un teléfono real.', kind: 'phone' },
    { title: 'Contacto de prueba', text: 'El mensaje llega al destino pactado.', kind: 'chat' },
    { title: 'Lista de publicación', text: 'Enlaces e información, uno por uno.', kind: 'list' },
    { title: 'Titularidad y renovaciones', text: 'Quién es dueño de cada cuenta y cuándo vence.', kind: 'key' },
    { title: 'Estado de Google', text: 'Qué quedó conectado y con qué permisos.', kind: 'map' },
  ],
  note: 'Ilustraciones del tipo de evidencia que acompaña cada entrega.',
  cta: 'Quiero una entrega así',
};

export const EXPECTATIONS = {
  eyebrow: 'Inversión',
  title: 'Una propuesta completa y un presupuesto claro antes de empezar.',
  body: 'Después de conocer tu negocio recibes una propuesta con alcance, fechas, inversión total, forma de pago y condiciones de continuidad. Todo lo que forma parte del proyecto está explicado desde el primer día.',
  sub: 'Para una mejora puntual, también cotizamos por separado.',
  compareTitle: 'Qué distingue a un estudio de una web económica',
  compareIntro: 'Una web económica publica tu información. Un estudio diseña cómo te perciben. Esto es lo que añade LSS:',
  compare: [
    { f: 'Mensaje', lo: 'Información publicada en una página.', hi: 'Servicios ordenados alrededor de las preguntas del cliente.' },
    { f: 'Diseño', lo: 'Plantilla con tu logotipo.', hi: 'Dirección de arte pensada para tu negocio.' },
    { f: 'Google', lo: 'Perfil y sitio por separado.', hi: 'Coherencia entre ambos, con cambios autorizados.' },
    { f: 'Contacto', lo: 'Un botón o formulario.', hi: 'Rutas comprobadas hasta su destino real.' },
    { f: 'Entrega', lo: 'Publicación y archivos.', hi: 'Pruebas, accesos, renovaciones y guía de uso.' },
  ],
  lo: 'Web económica',
  hi: 'Presencia Resuelta',
  continuityTitle: 'Lo que viene después también queda por escrito.',
  continuity: 'Desde la propuesta sabes quién administra el dominio, el alojamiento y el correo, y qué servicios se renuevan. Si quieres que sigamos cuidando contenido, presencia local y contactos, existe un plan mensual independiente de la instalación.',
};

export const CTA_SECTION = {
  eyebrow: 'El siguiente paso',
  title: 'Imagina tu negocio con esta presentación.',
  description: 'Cuéntanos tu nombre, tu ciudad y el servicio que quieres destacar. Te compartimos tres observaciones concretas para elevar tu primera impresión.',
  list: [
    'Tres observaciones sobre tu negocio real.',
    'Sin costo para conocer por dónde empezar.',
    'La conversación comienza y sigue por WhatsApp.',
  ],
  submit: 'Escribir por WhatsApp',
  micro: 'WhatsApp abre una conversación con LSS; respondemos personalmente.',
};

export const FAQ_ITEMS: FaqItem[] = [
  { question: 'Ya tengo Instagram y WhatsApp. ¿Para qué una web?', answer: 'Son canales excelentes para mantener la relación. Una web reúne tus servicios, zonas, proceso y pruebas en un lugar propio, con tu estilo, al que puedes llevar a cualquier persona. Instagram y WhatsApp se vuelven más fuertes cuando apuntan a ella.' },
  { question: '¿Qué resultados puedo esperar?', answer: 'Una presentación coherente de punta a punta, información al día en Google y un contacto probado. Lo que cada negocio consigue con ello depende también de su servicio, su reputación y su mercado, y lo revisamos contigo con datos reales.' },
  { question: '¿Y si ya tengo una web?', answer: 'La revisamos primero. Si tiene buenas bases, la elevamos: dirección de arte, textos, datos de Google y contacto.' },
  { question: '¿Qué pasa si no tengo fotos profesionales?', answer: 'Diseñamos con lo que tienes y te indicamos qué imágenes aportarían más. Si conviene una sesión fotográfica, la cotizamos aparte.' },
  { question: '¿Mi dominio y mi información quedan a mi nombre?', answer: 'Sí: el dominio y las cuentas de tu empresa se configuran con tu titularidad. Los derechos sobre diseño y código se explican en la propuesta y el contrato.' },
  { question: '¿Cuánto cuesta mantenerlo?', answer: 'Antes de contratar conoces los costos de proveedores, las fechas de renovación y los servicios opcionales de mantenimiento.' },
  { question: '¿Cuánto tarda?', answer: 'La propuesta incluye calendario y los materiales necesarios para cumplirlo. Cada proyecto tiene su ritmo.' },
  { question: '¿Qué tendría que hacer yo?', answer: 'Confirmar la información de tu negocio, compartir tus materiales, delegar accesos y aprobar el contenido. El trabajo técnico y las pruebas corren por nuestra cuenta.' },
  { question: '¿Tiene costo la primera revisión?', answer: 'La revisión inicial de tres observaciones es sin costo. Si hay encaje, te mostramos una dirección visual con tu marca.' },
];

export const FOOTER = {
  blurb: 'LSS — Local Systems Studio. Diseño, web y presencia en Google para negocios de servicios.',
  trust: 'Trabajamos con tu información auténtica y con permisos del titular. Cada proyecto define por escrito sus funciones y proveedores.',
};
