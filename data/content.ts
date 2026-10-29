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
    'Revisamos a distancia cómo te ve un cliente nuevo y te damos tres observaciones concretas, sin costo. Web, Google y contacto por WhatsApp.',
};

const WA_NUMBER = '528333263389';
export const WA_DEFAULT_TEXT =
  'Hola, quiero la Primera Visita Digital de mi negocio. Nombre: ___ | Ciudad: ___ | Servicio que quiero destacar: ___ | Web o perfil de Google (si lo tengo): ___';

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
  eyebrow: 'Negocios de servicios que venden por cita o cotización',
  headline: 'Que quien te encuentre entienda por qué tu trabajo vale lo que cobras.',
  body: 'Ordenamos tu primera impresión: una web clara, tus datos correctos en Google y una forma directa de escribirte. Trabajamos a distancia, estés en otra ciudad o en otro país.',
  ctaPrimary: 'Quiero mi Primera Visita Digital',
  ctaSecondary: 'Ver cómo comprobamos la entrega',
  micro: 'Revisión a distancia, sin costo: tres observaciones concretas. Se abre WhatsApp con tu mensaje listo.',
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
  closing: 'Tres piezas que cuentan la misma historia.',
};

export const PPV = {
  eyebrow: 'La Primera Visita Digital',
  title: 'Abre tu negocio como si nunca hubieras oído hablar de él.',
  body: 'Es lo primero que hacemos, y se hace a distancia: observamos tu presencia digital como la vería quien te busca por primera vez, anotamos tres puntos que dificultan entenderte, confiar o contactarte, y te mostramos las capturas y qué cambiaríamos.',
  remote: 'No hace falta que vayamos a tu local: todo parte de lo que tu negocio muestra en Internet, estés en otra ciudad o en otro país.',
  steps: [
    { n: '01', t: 'Lo que la persona encuentra', d: 'Qué aparece al buscarte y si web, Google y redes coinciden.' },
    { n: '02', t: 'Lo que entiende', d: 'Si en segundos sabe qué haces, para quién y dónde.' },
    { n: '03', t: 'Cómo puede escribirte', d: 'Si el botón lleva al número correcto y a quien responde.' },
  ],
  sample: 'Si el proyecto encaja y hay disponibilidad, preparamos una primera dirección visual con tu marca para que veas el enfoque antes de contratar.',
  cta: 'Quiero mi Primera Visita Digital',
  docTitle: 'Tres observaciones',
  docTag: 'Formato',
  docFields: ['Qué se ve', 'Captura con fecha', 'Qué cambiaríamos'],
};

export const OFFER = {
  eyebrow: 'LSS Presencia Resuelta',
  title: 'Tu cliente debería poder responder cuatro preguntas antes de escribirte.',
  intro: 'Presencia Resuelta reúne en un solo proyecto lo que suele quedar repartido entre diseño, textos, Google y contacto. Tú apruebas el mensaje y la evidencia; LSS ejecuta y documenta.',
  groups: [
    { n: '01', title: '¿Hacen lo que necesito?', text: 'Servicios explicados con las palabras de quien los busca, en una web móvil con preguntas frecuentes.' },
    { n: '02', title: '¿Por qué confiar?', text: 'Fotografías, experiencia y credenciales auténticas, con datos coherentes entre web y Google.' },
    { n: '03', title: '¿Cómo pido precio?', text: 'WhatsApp, teléfono y el formulario contratado, probados y conectados a quien responde.' },
    { n: '04', title: '¿Quién tiene el control?', text: 'Cuentas, fechas, accesos, propiedad del dominio y condiciones de renovación, por escrito.' },
  ],
  closing: 'No hace falta fingir una empresa más grande. Hace falta mostrar mejor la que ya existe.',
  detailsSummary: 'Ver el detalle técnico del alcance',
  details: 'Hasta cinco páginas, revisión autorizada de un Perfil de Empresa de Google, SEO técnico inicial, integración de contacto, checklist y entrega documentada, conforme a la propuesta. Alojamiento, dominio y correo empresarial se incluyen cuando la propuesta lo indica.',
  existing: {
    title: 'Si tu web ya funciona, la conservamos.',
    text: 'Hay negocios que necesitan un sitio nuevo y otros que solo necesitan ordenar servicios, corregir Google o reparar cómo llegan los mensajes. Primero distinguimos una cosa de la otra.',
  },
  cta: 'Ver si encaja con mi negocio',
};

export const PROCESS = {
  eyebrow: 'Un proceso que puedes revisar',
  title: 'Sabes qué estamos haciendo y qué recibes al final.',
  steps: [
    { title: 'Revisamos tu negocio a distancia', text: 'Conversación breve en línea y las tres prioridades de la Primera Visita Digital.' },
    { title: 'Te enseñamos la dirección', text: 'Para proyectos que encajan, una muestra visual y un recorrido propuesto; después presupuesto y calendario.' },
    { title: 'Lo construimos con tus datos', text: 'Mensaje, web, Google y enlaces, dentro del alcance firmado y los permisos autorizados.' },
    { title: 'Lo abrimos desde un teléfono', text: 'Comprobamos qué se muestra, qué enlace se pulsa y si el contacto llega al destino pactado.' },
    { title: 'Te damos el control', text: 'Resumen, accesos, renovaciones, entrega y seguimiento correctivo definido.' },
  ],
  note: 'Las fechas empiezan a contar cuando tenemos los materiales, accesos y aprobaciones que el proyecto necesita.',
};

export const EVIDENCE = {
  eyebrow: 'La prueba se hace contigo, en línea',
  title: 'Antes de decir “quedó listo”, lo abrimos contigo.',
  body: 'Lo revisamos juntos a distancia: cómo se lee en el celular, el número de WhatsApp, las rutas de contacto contratadas, los enlaces y quién tiene acceso. Una función incluida que no pasa la prueba no se da por entregada.',
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
  measuredMeta: 'Medido el 29 de octubre de 2026 en la versión de revisión con Lighthouse 12.8.2 (móvil, simulado; mediana de 5 corridas) y axe-core con WCAG 2.2 AA.',
  measured: [
    { k: 'Accesibilidad', v: '100' },
    { k: 'Buenas prácticas', v: '100' },
    { k: 'SEO', v: '100' },
    { k: 'Rendimiento (móvil, laboratorio)', v: '93' },
    { k: 'Cambio de diseño (CLS)', v: '0' },
    { k: 'Errores WCAG 2.2 AA', v: '0' },
  ],
  measuredNote: 'Se vuelve a medir al publicar.',
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
  compareIntro: 'Una web económica puede bastar si solo necesitas publicar tu información. Esto añade Presencia Resuelta:',
  compare: [
    { f: 'Mensaje', lo: 'Información publicada en una página.', hi: 'Servicios ordenados alrededor de las preguntas del cliente.' },
    { f: 'Google', lo: 'Perfil y sitio por separado.', hi: 'Coherencia entre ambos, con cambios autorizados.' },
    { f: 'Contacto', lo: 'Un botón o formulario publicado.', hi: 'Rutas comprobadas hasta su destino real.' },
    { f: 'Entrega', lo: 'Publicación y archivos.', hi: 'Pruebas, accesos, fechas de renovación y guía de uso.' },
  ],
  lo: 'Web económica',
  hi: 'Presencia Resuelta',
  criterion: 'Qué se compara',
  continuityTitle: 'Lo que viene después también queda por escrito.',
  continuity: 'Desde la propuesta sabes quién administra dominio, alojamiento y correo, qué servicios vencen y cuáles puedes mantener tú. Si quieres seguimiento continuo de contenido, presencia local y contactos, hay un plan mensual independiente de la instalación.',
  continuityMicro: 'Ninguna suscripción sustituye tu titularidad sobre las cuentas y activos definidos en el contrato.',
};

export const CTA_SECTION = {
  eyebrow: 'Empecemos por lo que ya tienes',
  title: 'Enséñanos tu negocio. Te diremos qué mejoraríamos primero.',
  description: 'Cuéntanos el nombre de tu empresa, tu ciudad y el servicio que quieres destacar. Revisamos a distancia cómo se entiende hoy y te compartimos tres observaciones concretas, desde cualquier ciudad o país.',
  submit: 'Quiero mis tres observaciones',
  micro: 'WhatsApp abre una conversación con LSS; respondemos personalmente.',
};

export const FAQ_ITEMS: FaqItem[] = [
  { question: 'Ya tengo Instagram y WhatsApp. ¿Para qué una web?', answer: 'Son buenos canales para mantener la relación y responder. Una web ordena servicios, zonas, proceso, preguntas y pruebas en un lugar que un desconocido puede consultar sin buscar entre publicaciones. La necesidad concreta se determina en la revisión.' },
  { question: '¿Me garantizan clientes nuevos?', answer: 'Cuántas personas buscan un servicio y deciden contratarlo depende también de tu oferta, tu reputación y tu mercado. Lo que sí se pacta y se comprueba es que la presentación y los canales de contacto incluidos funcionen.' },
  { question: '¿Tienen que ir a mi negocio? ¿Trabajan a distancia?', answer: 'No tienen que ir. La Primera Visita Digital y el proyecto completo pueden hacerse 100 % a distancia, a partir de tu presencia en Internet y de los materiales que compartas. Funciona igual si estás en otra ciudad o en otro país.' },
  { question: '¿Qué pasa si ya tengo una web?', answer: 'La revisamos antes de recomendar sustituirla. Si la mejor inversión es conservarla y corregir tres cosas, eso es lo que te decimos.' },
  { question: '¿Qué pasa si no tengo fotos profesionales?', answer: 'Revisamos lo que sí tienes y diseñamos con material auténtico. Si conviene fotografiar el negocio, se cotiza aparte.' },
  { question: '¿Mi dominio y mi información quedan a mi nombre?', answer: 'El dominio y las cuentas que deban pertenecer a tu empresa se configuran con ese titular. Las licencias y derechos sobre código y diseño se explican en la propuesta y el contrato.' },
  { question: '¿Cuánto costará mantenerlo?', answer: 'Antes de contratar conoces los costos de proveedores, las fechas de renovación y los servicios de mantenimiento opcionales.' },
  { question: '¿Cuánto tarda?', answer: 'Depende del sitio, los materiales y las aprobaciones. La propuesta incluye calendario y lo que necesitas entregar.' },
  { question: '¿Qué tendría que hacer yo?', answer: 'Confirmar la información del negocio, compartir materiales propios, delegar accesos en las plataformas que correspondan y aprobar contenido. El trabajo técnico y las pruebas quedan a cargo de LSS dentro del alcance.' },
  { question: '¿Tiene costo la primera revisión?', answer: 'La revisión inicial de tres observaciones no tiene costo. Si encontramos encaje, podemos mostrarte una dirección visual breve, sujeta a disponibilidad.' },
];

export const FOOTER = {
  blurb: 'LSS — Local Systems Studio. Sitios web, presencia en Google y recorridos de contacto comprobables para negocios de servicios. Trabajamos a distancia.',
  trust: 'Trabajamos con información auténtica y permisos del titular. Las funciones y proveedores se definen por escrito en cada proyecto.',
};
