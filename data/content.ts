import type { ContactInfo, FaqItem, NavLink } from '@/types';

/* Copy de oferta "Presencia Resuelta · Landing de una página" (2026-11-03). Trazabilidad: docs/estrategia/oferta (método Grand Slam) y .offer-os/evidence (G0-G8).
   Precio publicado: solo la landing de una página ($12,500 MXN + IVA, autorizado por el titular). El sitio de hasta cinco páginas es otro servicio y no tiene precio publicado.
   Sin plazo garantizado (no medido), sin escasez, sin casos, cifras de clientes ni testimonios. La garantía es de aceptación (saldo tras los puntos de revisión que dependen de LSS), no de resultados. */

export const SITE = {
  name: 'LSS — Local Systems Studio',
  shortName: 'LSS',
  url: 'https://www.lsslocalsystemsstudio.com',
  title: 'LSS | Landing, Google y WhatsApp para negocios de servicios',
  description:
    'Landing de una página para negocios de servicios: tu página, tu ficha de Google y tu WhatsApp con los mismos datos, probados en tu teléfono antes del saldo. $12,500 MXN + IVA.',
};

const WA_NUMBER = '528333263389';
export const WA_DEFAULT_TEXT =
  'Hola, quiero la landing de una página para mi negocio. Nombre: ___ | Ciudad: ___ | Giro y servicio que quiero destacar: ___ | Web o perfil de Google (si lo tengo): ___';

export function waLink(text: string = WA_DEFAULT_TEXT): string {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
}

export const EMAIL_CONTACT_URL = 'mailto:contacto@lsslocalsystemsstudio.com?subject=' +
  encodeURIComponent('Landing de una página — LSS') + '&body=' +
  encodeURIComponent('Hola LSS, quiero la landing de una página para mi negocio.\n\nNombre: \nNegocio: \nCiudad: \nServicio principal: \nSitio web o perfil de Google (si tengo): \n\nGracias.');

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
  { href: '#cambio', label: 'Qué cambia' },
  { href: '#oferta', label: 'Qué recibes' },
  { href: '#entrega', label: 'La prueba' },
  { href: '#presupuesto', label: 'Precio' },
  { href: '#preguntas', label: 'Preguntas' },
];

export const NAV_CTA = 'Quiero mi landing';

export const HERO = {
  eyebrow: 'Landing de una página para negocios que atienden por cita o cotización',
  headline: 'Cuando alguien te recomienda, primero te busca. Que encuentre lo mismo en todos lados y tenga a un toque cómo escribirte.',
  body: 'Hacemos tu landing de una página, dejamos tu ficha de Google y tu botón de WhatsApp diciendo lo mismo, y tú lo pruebas en tu teléfono antes de pagar el saldo. $12,500 MXN + IVA: 50 % al aceptar y 50 % cuando pasan los puntos de revisión que dependen de LSS.',
  ctaPrimary: 'Quiero mi landing de una página',
  ctaSecondary: 'Ver los 7 puntos de revisión',
  micro: 'LSS es un estudio pequeño y nuevo: todavía no publicamos casos de clientes, por eso lo que incluye, lo que cuesta y cómo se paga queda por escrito antes de que pagues nada. Sin garantía de clientes, ventas ni posiciones en Google. Se abre WhatsApp con tu mensaje listo; antes de cotizar te haremos unas preguntas breves por ahí.',
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
    { n: '01', name: 'En Instagram', lead: 'Ven tus novedades.', text: 'En tu página encuentran tus servicios ordenados, tu cobertura y cómo trabajas.' },
    { n: '02', name: 'En Google', lead: 'Verifican dónde estás.', text: 'Revisan tu información y las reseñas que realmente tienes.' },
    { n: '03', name: 'En WhatsApp', lead: 'Te preguntan lo que necesitan.', text: 'Sin tener que adivinar a qué número escribir.' },
  ],
  closing: 'Cuando las tres dicen lo mismo, la persona no tiene que adivinar.',
};

export const PPV = {
  eyebrow: 'Antes de decidir: la Primera Visita Digital',
  title: 'Si quieres, primero revisamos tu negocio como lo vería alguien que no te conoce.',
  body: 'La Primera Visita Digital es una revisión breve a distancia, sin costo y opcional: observamos tu presencia digital como la vería quien te busca por primera vez y anotamos tres puntos que dificultan entenderte, confiar o contactarte. No es una auditoría completa ni una visita a tu local.',
  remote: 'No hace falta que vayamos a tu local: todo parte de lo que tu negocio muestra en Internet, estés en la ciudad de México que estés.',
  steps: [
    { n: '01', t: 'Lo que la persona encuentra', d: 'Qué aparece al buscarte y si web, Google y redes coinciden.' },
    { n: '02', t: 'Lo que entiende', d: 'Si en segundos sabe qué haces, para quién y dónde.' },
    { n: '03', t: 'Cómo puede escribirte', d: 'Si el botón lleva al número correcto y a quien responde.' },
  ],
  sample: 'Si decides avanzar, recibes la propuesta por escrito (qué incluye, $12,500 + IVA y forma de pago) antes de pagar nada.',
  cta: 'Quiero mi landing de una página',
  docTitle: 'Tres observaciones',
  docTag: 'Formato',
  docFields: ['Qué se ve', 'Captura con fecha', 'Qué cambiaríamos'],
};

export const OFFER = {
  eyebrow: 'LSS Presencia Resuelta · Landing de una página',
  title: 'Qué recibes, y qué haces tú.',
  intro: 'Una página de una sola hoja con lo que necesita quien te busca, tu ficha de Google y tu WhatsApp diciendo lo mismo, y una prueba en tu teléfono antes del saldo. Tú nos pasas tu material y apruebas; LSS escribe, construye, prueba y documenta.',
  deliverablesTitle: 'Incluye',
  deliverables: [
    'Una landing de una página, para teléfono: qué haces, dónde estás, tus horarios y tus servicios explicados con las palabras de quien los busca, y precios si quieres mostrarlos.',
    'Botones de WhatsApp y de llamada, probados en un teléfono, que llevan a tu número.',
    'Revisión de tu ficha de Google, con tu autorización: nombre, dirección, horarios, teléfono y enlace, para que digan lo mismo que tu página. La verificación y la posición las decide Google.',
    'Un texto coordinado para tu bio de Instagram, tu mensaje de bienvenida de WhatsApp y la descripción de tu ficha, igual al de la página.',
    'Una hoja de revisión de 7 puntos, con tus accesos por escrito, y una ronda de ajustes.',
  ],
  excludesTitle: 'No incluye',
  excludes: 'Más de una página (el sitio de hasta cinco páginas es otro servicio, con otro alcance, y se cotiza aparte); tienda en línea, pagos o agenda; fotografía, logotipo ni anuncios; garantía de clientes, ventas ni posiciones en Google. Si ya usas una agenda como Fresha, Booksy o AgendaPro, tu página lleva un botón a ella; no la reemplazamos. Dominio, alojamiento y correo los contratas tú, a tu nombre; antes del anticipo te informamos su costo.',
  groupsTitle: 'Lo que cambia para ti',
  groups: [
    { n: '01', title: 'Te encuentran igual en todos lados', text: 'Página, ficha de Google y mensaje de WhatsApp con el mismo nombre, horarios y teléfono.' },
    { n: '02', title: 'Saben cómo escribirte', text: 'Un botón de WhatsApp y uno de llamada, probados en un teléfono, con tu número.' },
    { n: '03', title: 'No pagas el saldo a ciegas', text: 'El segundo 50 % se paga cuando pasan los puntos de revisión que dependen de LSS. Tú los ves en tu teléfono.' },
    { n: '04', title: 'No te quita el tiempo', text: 'Tú haces cinco cosas: contestar cuatro preguntas, mandar fotos y datos, autorizar tu ficha, mandar tus ajustes juntos y probar en tu teléfono.' },
  ],
  closing: 'No prometemos clientes ni posiciones en Google: prometemos lo que está en la hoja de revisión.',
  detailsSummary: 'Ver el detalle del alcance y los pagos',
  details: 'Landing de una página, textos redactados a partir de tu material, una ronda de ajustes (los cambios adicionales se cotizan antes de hacerlos), revisión autorizada de tu ficha de Google, texto coordinado para redes y hoja de revisión. $12,500 MXN + IVA: 50 % de anticipo al aceptar la propuesta y 50 % cuando los puntos de revisión que dependen de LSS pasan. No se promete una fecha de entrega: el plazo se acuerda por escrito y empieza cuando tenemos tu anticipo, tu material y tus accesos.',
  existing: {
    title: 'Una página, no cinco.',
    text: 'Esta oferta es la landing de una página: $12,500 MXN + IVA. El sitio de hasta cinco páginas es otro servicio, con más contenido y más trabajo, y se cotiza aparte: no tiene este precio. Si ya tienes web, dínoslo en la primera conversación y te decimos qué conviene.',
  },
  cta: 'Quiero mi landing de una página',
};

export const PROCESS = {
  eyebrow: 'Un proceso que puedes revisar',
  title: 'Cinco pasos, cada uno con algo que puedes revisar.',
  steps: [
    { title: 'Nos cuentas de tu negocio', text: 'Cuatro preguntas breves por WhatsApp. Si quieres, antes hacemos tu Primera Visita Digital: tres observaciones sobre cómo se ve tu negocio hoy.' },
    { title: 'Recibes la propuesta por escrito', text: 'Qué incluye, $12,500 + IVA y forma de pago, antes de pagar nada. Pagas el anticipo del 50 % al aceptar.' },
    { title: 'Lo construimos con tu material', text: 'Textos, página, botones y ficha de Google dentro del alcance y con tus autorizaciones. La ves en un enlace privado.' },
    { title: 'Una ronda de ajustes y la prueba en tu teléfono', text: 'Nos mandas todos tus cambios juntos, los hacemos y recorremos contigo los 7 puntos de revisión.' },
    { title: 'Saldo y entrega', text: 'Cuando los puntos que dependen de LSS pasan, pagas el 50 % restante, publicamos y recibes tus accesos y la hoja de revisión por escrito.' },
  ],
  note: 'No prometemos una fecha de entrega todavía: es una oferta nueva y aún no medimos cuánto tarda una entrega real. El plazo se acuerda por escrito y empieza a contar cuando tenemos tu anticipo, tu material y tus accesos.',
};

export const EVIDENCE = {
  eyebrow: 'La prueba se hace contigo, en línea',
  title: 'Los 7 puntos que revisas en tu teléfono antes de pagar el saldo.',
  body: 'Los recorremos contigo a distancia. Cada punto se marca como pasa, no pasa o depende de un tercero. Lo que depende de LSS y no pasa se corrige antes de cobrar el saldo. Lo que decide Google (verificación, posición) no lo controlamos y te lo decimos por escrito.',
  docTitle: 'Hoja de revisión',
  docTag: 'Formato',
  docRows: [
    { t: 'Se lee en tu teléfono', d: 'La página abre y se lee sin acercar el dedo.' },
    { t: 'WhatsApp', d: 'El botón abre un chat con tu número.' },
    { t: 'Llamada', d: 'El botón de llamar marca tu número.' },
    { t: 'Mismos datos', d: 'Nombre, dirección, horarios y teléfono son iguales en la página y en tu ficha de Google.' },
    { t: 'Enlaces', d: 'Los enlaces de la página funcionan.' },
    { t: 'Velocidad medida', d: 'Reporte de velocidad medido, sin prometer una cifra.' },
    { t: 'Cuentas a tu nombre', d: 'Dominio y accesos a tu nombre, con fechas de renovación.' },
  ],
  docNote: 'Cada casilla se completa con la prueba real de tu proyecto.',
  measuredTitle: 'Medición de esta página',
  measuredMeta: 'Es lo que hicimos con nuestra propia página; todavía no tenemos clientes externos. Medido el 3 de noviembre de 2026 sobre la compilación de esta versión en un servidor local, con Lighthouse 12.8.2 (móvil, simulado; mediana de 5 corridas) y axe-core con WCAG 2.2 AA en tres anchos de pantalla.',
  measured: [
    { k: 'Accesibilidad', v: '100' },
    { k: 'Buenas prácticas', v: '100' },
    { k: 'SEO', v: '100' },
    { k: 'Rendimiento (móvil, laboratorio)', v: '90' },
    { k: 'Cambio de diseño (CLS)', v: '0' },
    { k: 'Errores WCAG 2.2 AA', v: '0' },
  ],
  measuredNote: 'Mediciones técnicas de laboratorio: no equivalen a la experiencia de cada visitante ni miden si la página genera contactos o ventas.',
  cta: 'Quiero mi landing de una página',
};

export const EXPECTATIONS = {
  eyebrow: 'Precio y forma de pago',
  title: 'Un precio, una forma de pago y lo que queda fuera.',
  body: 'Landing de una página: $12,500 MXN + IVA. Anticipo del 50 % al aceptar la propuesta; el otro 50 % cuando los puntos de revisión que dependen de LSS pasan en tu teléfono. Incluye una ronda de ajustes.',
  driversTitle: 'Lo que no está en el precio',
  drivers: [
    'Dominio, alojamiento y correo: a tu nombre y a tu cargo; te informamos su costo antes del anticipo.',
    'Cambios después de la ronda de ajustes: se cotizan antes de hacerlos.',
    'Fotografía, logotipo y redacción extensa: se cotizan aparte.',
    'Más de una página: es el sitio de hasta cinco páginas, otro servicio con otra cotización.',
    'Mantenimiento mensual: por ahora no lo ofrecemos.',
  ],
  driversNote: 'Todo queda por escrito en la propuesta antes de que pagues el anticipo.',
  compareTitle: 'Si comparas con una opción más barata, compara el mismo alcance.',
  compareIntro: 'Un constructor de páginas suele costar menos y puede bastar si tienes tiempo para hacerlo tú. Antes de decidir, pregunta a quien te cotice:',
  compare: [
    { f: 'Mensaje', lo: '¿Quién escribe los servicios con las preguntas de tu cliente?', hi: 'LSS, con tu aprobación del mensaje.' },
    { f: 'Google', lo: '¿Quién revisa que la página y Google digan lo mismo?', hi: 'LSS, con los cambios que tú autorizas.' },
    { f: 'Contacto', lo: '¿Quién prueba que el botón llega a tu número?', hi: 'LSS, con la hoja de revisión que ves en tu teléfono.' },
    { f: 'Pago', lo: '¿Cuándo pagas el saldo y a nombre de quién quedan las cuentas?', hi: 'Cuando pasan los puntos de revisión que dependen de LSS; las cuentas, a tu nombre.' },
  ],
  lo: 'Pregunta a cualquier proveedor',
  hi: 'Presencia Resuelta',
  criterion: 'Tema',
  continuityTitle: 'Después de la entrega, la página es tuya.',
  continuity: 'Tus cuentas quedan a tu nombre, con las fechas de renovación por escrito. Por ahora no ofrecemos mantenimiento mensual; si lo necesitas, lo hablamos y te damos alcance y precio por escrito antes de contratar nada.',
  continuityMicro: 'Tu dominio y tus cuentas son tuyos desde la entrega.',
};

export const CTA_SECTION = {
  eyebrow: 'Empecemos',
  title: 'Cuéntanos de tu negocio. Te decimos si encaja y cómo seguimos.',
  description: 'Escríbenos tu nombre, tu ciudad y el servicio que quieres destacar. Te hacemos cuatro preguntas breves y, si encaja, te mandamos la propuesta por escrito. Trabajamos a distancia, desde cualquier ciudad de México.',
  submit: 'Quiero mi landing de una página',
  micro: 'WhatsApp abre una conversación con LSS; respondemos personalmente.',
};

export const FAQ_ITEMS: FaqItem[] = [
  { question: '¿Cuánto cuesta?', answer: 'La landing de una página cuesta $12,500 MXN + IVA. El sitio de hasta cinco páginas es otro servicio y se cotiza aparte: no tiene el mismo precio.' },
  { question: '¿Cómo se paga?', answer: '50 % de anticipo al aceptar la propuesta y 50 % cuando los puntos de revisión que dependen de LSS pasan en tu teléfono.' },
  { question: '¿Cuánto tarda?', answer: 'No prometemos una fecha todavía: es una oferta nueva y aún no medimos cuánto tarda una entrega real. El plazo se acuerda por escrito en la propuesta y empieza a contar cuando tenemos tu anticipo, tu material y tus accesos.' },
  { question: '¿Cuántos ajustes incluye?', answer: 'Una ronda: nos mandas todos tus cambios juntos y los hacemos. Los cambios adicionales se cotizan antes de hacerlos.' },
  { question: '¿Qué pasa si un punto de la revisión no pasa?', answer: 'Si el punto depende de LSS, lo corregimos antes de cobrar el saldo. Si depende de un tercero, como Google, te lo explicamos por escrito. No hay garantía de clientes ni de ventas: el criterio es la hoja de revisión.' },
  { question: '¿Qué tendría que hacer yo?', answer: 'Cinco cosas: contestar cuatro preguntas por WhatsApp, mandar fotos y datos de tu negocio, autorizar el acceso a tu ficha de Google, mandarnos tus ajustes todos juntos y probar la página en tu teléfono. El trabajo técnico y las pruebas quedan a cargo de LSS.' },
  { question: '¿Me garantizan clientes nuevos?', answer: 'No. Cuántas personas buscan un servicio y deciden contratarlo depende también de tu oferta, tu reputación y tu mercado. Lo que sí se pacta y se comprueba es que la presentación y los botones de contacto incluidos funcionen.' },
  { question: 'Ya tengo Instagram y WhatsApp. ¿Para qué una página?', answer: 'Son buenos canales para mantener la relación y responder. Una página ordena servicios, zona, horarios y contacto en un lugar que un desconocido puede consultar sin buscar entre publicaciones.' },
  { question: 'Uso Fresha, Booksy o AgendaPro para mis citas. ¿Lo reemplazan?', answer: 'No. Tu página lleva un botón a tu agenda; no la reemplazamos ni la administramos.' },
  { question: '¿Qué pasa si ya tengo una web?', answer: 'Dínoslo en la primera conversación. La landing de una página es una oferta nueva; si tu web actual sirve, te decimos qué corregiríamos en lugar de rehacerla. Esa corrección se cotiza aparte.' },
  { question: '¿Tienen que ir a mi negocio? ¿Trabajan a distancia?', answer: 'No tienen que ir. Todo puede hacerse a distancia, a partir de tu presencia en Internet y de los materiales que compartas. Funciona igual en cualquier ciudad de México.' },
  { question: '¿Qué pasa si no tengo fotos profesionales?', answer: 'Revisamos lo que sí tienes y diseñamos con material auténtico. Si conviene fotografiar el negocio, se cotiza aparte.' },
  { question: '¿Mi dominio y mi información quedan a mi nombre?', answer: 'Sí. El dominio y las cuentas que deban pertenecer a tu negocio se configuran a tu nombre, con las fechas de renovación por escrito. Dominio, alojamiento y correo los pagas tú; te informamos su costo antes del anticipo.' },
  { question: '¿Cuánto costará mantenerlo?', answer: 'Después de la entrega administras tu página con tus accesos. Por ahora no ofrecemos mantenimiento mensual; cualquier cambio posterior se cotiza antes de hacerlo.' },
  { question: '¿Tiene costo la primera revisión?', answer: 'La Primera Visita Digital, de tres observaciones, no tiene costo y es opcional. Si decides avanzar, recibes la propuesta por escrito antes de pagar nada.' },
];

export const FOOTER = {
  blurb: 'LSS — Local Systems Studio. Landings, presencia en Google y recorridos de contacto comprobables para negocios de servicios. Trabajamos a distancia.',
  trust: 'Trabajamos con información auténtica y permisos del titular. Las funciones y proveedores se definen por escrito en cada proyecto.',
};
