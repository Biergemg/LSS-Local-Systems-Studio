import type { ContactInfo, FaqItem, NavLink } from '@/types';

/* Copy de la landing de LSS: estudio de diseño web para negocios de servicios.
   Embudo de cotización: atracción → propuesta de valor → demostración → servicio → solicitud de propuesta (WhatsApp) → conversación.
   Sin precios publicados. La muestra de trabajo es un proyecto demostrativo propio, con marca ficticia, identificado como tal. */

export const SITE = {
  name: 'LSS — Local Systems Studio',
  shortName: 'LSS',
  url: 'https://www.lsslocalsystemsstudio.com',
  title: 'LSS | Diseño web para negocios de servicios',
  description:
    'Estudio de diseño web en México. Páginas con identidad propia para negocios de servicios: diseño, textos, ficha de Google y contacto directo. Solicita una propuesta.',
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
  { href: '#servicio', label: 'Qué hacemos' },
  { href: '#proceso', label: 'Cómo trabajamos' },
  { href: '#preguntas', label: 'Preguntas' },
];

export const NAV_CTA = 'Solicitar una propuesta';

export const HERO = {
  pre: 'Tu primera impresión,',
  em: 'a la altura',
  post: 'de tu trabajo.',
  body: 'Diseño y desarrollo web para negocios de servicios: sitios con identidad propia, construidos para que quien te busque te encuentre claro y fácil de contactar.',
  ctaPrimary: 'Solicitar una propuesta',
  ctaSecondary: 'Cómo trabajamos',
  ticks: ['Propuesta por escrito', 'Respuesta por WhatsApp', 'Sin compromiso'],
  ticker: ['Diseño web', 'Identidad propia', 'Textos', 'Contacto directo'],
};

export const STATEMENT = {
  pre: 'Antes de escribirte,',
  em: 'te buscan.',
  post: 'Lo que encuentran decide si te escriben.',
  side: 'Tu página, tu perfil de Google y tu forma de contacto son la primera conversación con un cliente nuevo. La diseñamos para que empiece bien.',
  steps: [
    { t: 'Te buscan', d: 'En Google, en redes y en tu página.' },
    { t: 'Te comparan', d: 'Con otras opciones, en cuestión de segundos.' },
    { t: 'Te escriben', d: 'Si lo que encontraron los convence.' },
  ],
};

export const SERVICE = {
  title: 'Diseño y desarrollo, de principio a fin.',
  items: [
    { n: '01', t: 'Diseño y desarrollo', d: 'Un sitio web con identidad propia, construido a la medida de tu negocio y pensado primero para el celular.' },
    { n: '02', t: 'Textos y presentación', d: 'Lo que haces, explicado con claridad y en tu tono, para que se entienda en segundos.' },
    { n: '03', t: 'Presencia coherente', d: 'Tu ficha de Google y tu contacto directo, alineados con tu sitio desde el primer vistazo.' },
  ],
  note: 'Una landing de una página o un sitio de varias, según lo que tu negocio necesite. El alcance y la inversión van por escrito en tu propuesta.',
  cta: 'Solicitar una propuesta',
};

export const PROCESS = {
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
  title: 'Hagamos tu página.',
  description: 'Cuéntanos de tu negocio por WhatsApp. Te respondemos nosotros y, si hay encaje, te enviamos una propuesta por escrito.',
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
  blurb: 'LSS — Local Systems Studio. Diseño web, ficha de Google y contacto directo para negocios de servicios. Trabajamos a distancia.',
  trust: 'Trabajamos con información auténtica y permisos del titular. Las funciones y proveedores se definen por escrito en cada proyecto.',
};
