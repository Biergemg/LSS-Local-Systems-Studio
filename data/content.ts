import type { ContactInfo, FaqItem, NavLink } from '@/types';

/* Copy de la landing de LSS: servicio de presencia digital para negocios de servicios, con embudo de cotización
   (atracción → propuesta de valor → credibilidad → comprensión del servicio → solicitud de propuesta → conversación por WhatsApp).
   Sin precios publicados: el precio se comunica en la conversación o en la propuesta escrita. Sin casos, cifras ni testimonios inventados. */

export const SITE = {
  name: 'LSS — Local Systems Studio',
  shortName: 'LSS',
  url: 'https://www.lsslocalsystemsstudio.com',
  title: 'LSS | Página web, Google y WhatsApp para negocios de servicios',
  description:
    'Diseñamos la página, la ficha de Google y el contacto de tu negocio para que quien te busque vea la calidad de lo que haces. Solicita una propuesta.',
};

const WA_NUMBER = '528333263389';
export const WA_DEFAULT_TEXT =
  'Hola, quiero solicitar una propuesta para mi negocio. Nombre: ___ | Ciudad: ___ | A qué me dedico: ___ | Mi página o perfil de Google (si lo tengo): ___';

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
  { href: '#percepcion', label: 'Ejemplos' },
  { href: '#incluye', label: 'Qué incluye' },
  { href: '#proceso', label: 'Cómo trabajamos' },
  { href: '#preguntas', label: 'Preguntas' },
];

export const NAV_CTA = 'Solicitar una propuesta';

export const HERO = {
  eyebrow: 'Presencia digital para negocios de servicios',
  headline: 'Tu primera impresión, a la altura de tu trabajo.',
  body: 'Diseñamos la página, la ficha de Google y el contacto de tu negocio para que quien te busque vea, desde el primer momento, la calidad de lo que haces.',
  ctaPrimary: 'Solicitar una propuesta',
  ctaSecondary: 'Ver cómo trabajamos',
  micro: 'Conversamos por WhatsApp. Sin compromiso.',
  schematic: {
    label: 'Así llega un cliente nuevo',
    lines: [
      { n: '01', t: 'Te encuentra', d: 'Datos claros y coherentes.' },
      { n: '02', t: 'Te entiende', d: 'Qué haces y para quién.' },
      { n: '03', t: 'Te escribe', d: 'Un botón directo a tu WhatsApp.' },
    ],
  },
};

export const SHOWCASE = {
  eyebrow: 'Así puede verse tu negocio',
  title: 'Diseño pensado para cada tipo de negocio.',
  body: 'Una página bien diseñada presenta tu trabajo con carácter propio: tu estilo, tus servicios y un botón directo a tu WhatsApp. Estos son tres ejemplos conceptuales.',
  concepts: [
    { id: 'estetica', sector: 'Estética', brand: 'Tu estética', headline: 'Cuidado personal, a tu ritmo.', sub: 'Faciales, uñas y masajes con atención personalizada.', items: ['Faciales', 'Manicure y pedicure', 'Masajes', 'Tratamientos corporales'] },
    { id: 'taller', sector: 'Taller mecánico', brand: 'Tu taller', headline: 'Diagnóstico claro antes de empezar.', sub: 'Afinación, frenos y servicio general para tu vehículo.', items: ['Afinación', 'Frenos', 'Suspensión', 'Diagnóstico'] },
    { id: 'despacho', sector: 'Despacho', brand: 'Tu despacho', headline: 'Asesoría clara para decidir mejor.', sub: 'Atención contable, fiscal y legal para empresas y personas.', items: ['Contabilidad', 'Fiscal', 'Legal', 'Nómina'] },
  ],
  cta: 'Escribir por WhatsApp',
  foot: 'Horarios · Ubicación',
  tag: 'Ejemplo conceptual',
  caption: 'Ejemplos conceptuales de diseño para distintos sectores. Los nombres y textos son ilustrativos y no representan a clientes de LSS.',
};

export const RESULT = {
  eyebrow: 'Lo que cambia para ti',
  title: 'Tu negocio, listo para recibir mensajes.',
  items: [
    { n: '01', t: 'Menos explicaciones repetidas.', d: 'Lo básico, qué haces, dónde estás y cómo trabajas, ya está contado antes de que te escriban.' },
    { n: '02', t: 'Un solo mensaje, en todos lados.', d: 'Mismo nombre, mismos horarios y un mismo número en tu página, tu ficha de Google y tus redes.' },
    { n: '03', t: 'Una dirección para compartir.', d: 'Un enlace que puedes poner en tu bio, en tus tarjetas y en cada conversación.' },
  ],
  cta: 'Solicitar una propuesta',
};

export const INCLUDES = {
  eyebrow: 'Qué incluye',
  title: 'Lo que armamos para tu negocio.',
  intro: 'Una landing de una página o un sitio de varias, según lo que tu negocio necesite. El alcance exacto y la inversión van por escrito en tu propuesta.',
  items: [
    { n: '01', t: 'Tu página', d: 'Diseño para celular y computadora, con los textos redactados por nosotros a partir de lo que nos cuentes.' },
    { n: '02', t: 'Tu ficha de Google', d: 'Con tu autorización, revisamos y ajustamos tus datos para que coincidan con tu página.' },
    { n: '03', t: 'Tu contacto', d: 'Botones de WhatsApp y de llamada con tu número, y un primer mensaje ya escrito.' },
    { n: '04', t: 'Tus redes, coordinadas', d: 'Un texto listo para tu bio de Instagram y tu mensaje de bienvenida de WhatsApp.' },
  ],
  note: 'Si ya tienes página, o usas una agenda como Fresha, Booksy o AgendaPro, trabajamos con lo que tienes.',
  cta: 'Solicitar una propuesta',
};

export const PROCESS = {
  eyebrow: 'Cómo trabajamos',
  title: 'Cuatro pasos, sin juntas largas.',
  steps: [
    { title: 'Conversamos', text: 'Nos cuentas de tu negocio por WhatsApp.' },
    { title: 'Te enviamos una propuesta', text: 'Qué incluye, cuánto cuesta y en qué tiempos, por escrito.' },
    { title: 'Lo construimos y lo ves', text: 'Revisas tu página en un enlace privado y nos mandas tus ajustes en una sola ronda.' },
    { title: 'Lo entregamos', text: 'Lo abres en tu teléfono, confirmas que funciona y recibes todo a tu nombre.' },
  ],
  assurances: [
    'Tu dominio y tus cuentas quedan a tu nombre.',
    'Nada se publica sin tu aprobación.',
    'Pagas el saldo cuando ves tu página funcionando.',
  ],
};

export const CTA_SECTION = {
  eyebrow: 'Siguiente paso',
  title: 'Cuéntanos de tu negocio.',
  description: 'Escríbenos tu nombre, tu ciudad y a qué te dedicas. Te respondemos nosotros por WhatsApp y, si hay encaje, te enviamos una propuesta por escrito.',
  submit: 'Solicitar una propuesta',
  micro: 'WhatsApp abre una conversación con LSS; respondemos personalmente.',
};

export const FAQ_ITEMS: FaqItem[] = [
  { question: '¿Cuánto cuesta?', answer: 'Depende de si necesitas una landing de una página o un sitio de varias, y de lo que haya que escribir. El precio llega por escrito en tu propuesta, antes de pagar nada.' },
  { question: '¿Cuánto tarda?', answer: 'El calendario va en tu propuesta y empieza a contar cuando recibimos tu anticipo y tu material.' },
  { question: '¿Qué tengo que hacer yo?', answer: 'Contarnos de tu negocio, enviarnos fotos y datos, autorizar el acceso a tu ficha de Google, juntar tus ajustes en una sola ronda y probar la página en tu teléfono.' },
  { question: '¿Y si ya tengo página o uso una agenda?', answer: 'Trabajamos con lo que tienes. Si tu página sirve, te decimos qué corregir en lugar de rehacerla. Si usas una agenda, tu página lleva un botón hacia ella.' },
    { question: '¿Me garantizan clientes?', answer: 'Nadie puede asegurarlo: depende de tu oferta, tu reputación y tu mercado. Nosotros cuidamos que tu negocio se presente bien, que el contacto funcione y que todo quede a tu nombre.' },
  { question: '¿Quién paga el dominio, el alojamiento y el correo?', answer: 'Tú, a tu nombre y a tu cargo. Te decimos cuánto cuestan antes de que pagues el anticipo.' },
];

export const FOOTER = {
  blurb: 'LSS — Local Systems Studio. Páginas web, presencia en Google y contacto para negocios de servicios. Trabajamos a distancia.',
  trust: 'Trabajamos con información auténtica y permisos del titular. Las funciones y proveedores se definen por escrito en cada proyecto.',
};
