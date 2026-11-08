import type { ContactInfo, FaqItem, NavLink } from '@/types';
import { CLAIMS } from '@/data/claims';

/* Copy de la landing de LSS: «Primera Cita Resuelta» para clínicas y negocios que atienden por cita.
   Embudo de aplicación corta: atracción → problema (Google, WhatsApp, agenda) → qué incluye → proceso → diagnóstico por WhatsApp → propuesta por escrito.
   Fuente de verdad: LSS_OFERTA_RAIZ_PRIMERA_CITA_RESUELTA (documento interno, fuera del repositorio).
   Sin precios, garantías ni casos publicados; sin ejemplos ficticios. */

export const SITE = {
  name: 'LSS — Local Systems Studio',
  shortName: 'LSS',
  url: 'https://www.lsslocalsystemsstudio.com',
  title: 'LSS | Sitio, Google y agenda para clínicas y negocios por cita',
  description:
    'Revisamos cómo te encuentra, te entiende y te contacta quien aún no te conoce, y lo dejamos listo: sitio, ficha de Google, agenda y correo. Diagnóstico sin costo.',
};

const WA_NUMBER = '528333263389';
export const WA_DEFAULT_TEXT =
  'DIAGNÓSTICO. Nombre: ___ | Ciudad: ___ | Tipo de negocio: ___ | Mi Google o Instagram: ___';

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
  { label: 'Instagram', href: 'https://www.instagram.com/localsystemsstudio' },
  { label: 'Facebook', href: 'https://www.facebook.com/lsslocalsystemsstudio' },
];

export const NAV_LINKS: NavLink[] = [
  { href: '#servicio', label: 'Qué incluye' },
  { href: '#proceso', label: 'Cómo trabajamos' },
  { href: '#preguntas', label: 'Preguntas' },
];

export const NAV_CTA = 'Pedir diagnóstico';

export const HERO = {
  pre: 'Que te encuentren,',
  em: 'te entiendan',
  post: 'y puedan agendar.',
  body: 'Revisamos cómo te encuentra, te entiende y te contacta quien aún no te conoce, y lo dejamos listo: sitio, ficha de Google, WhatsApp, agenda y correo, a tu nombre.',
  ctaPrimary: 'Pedir mi diagnóstico',
  ctaSecondary: 'Cómo trabajamos',
  ticks: ['Diagnóstico sin costo', 'Respuesta por WhatsApp', 'Sin compromiso'],
  ticker: ['Te encuentran', 'Te entienden', 'Te escriben', 'Agendan'],
};

export const STATEMENT = {
  pre: 'Antes de escribirte,',
  em: 'te buscan.',
  post: 'Lo que encuentran decide si te escriben.',
  side: 'Una persona que no te conoce busca tu servicio en Google, compara y decide en segundos. Revisamos y dejamos listo lo que encuentra: tu ficha, tu sitio, tu WhatsApp y tu agenda.',
  steps: [
    { t: 'Te encuentran', d: '¿Tu ficha de Google y tu sitio aparecen con servicios, horarios y contacto claros?' },
    { t: 'Te entienden', d: '¿En segundos se entiende qué haces y por qué elegirte?' },
    { t: 'Te escriben', d: '¿Escribir o agendar es un solo paso, sin vueltas?' },
  ],
};

export const SERVICE = {
  title: 'Un sistema, de la búsqueda al mensaje.',
  items: [
    { n: '01', t: 'Tu sitio web', d: 'Un sitio con identidad propia, a la medida de tu negocio y pensado primero para el celular, con tus textos explicados con claridad y en tu tono.' },
    { n: '02', t: 'Página de tu servicio principal', d: 'Una página aparte, en su propio subdominio, para el servicio que elijas, lista para compartir en tus redes y llevar a quien te busca justo a eso.' },
    { n: '03', t: 'Google coherente', d: 'Tu ficha de Google y tu contacto directo, alineados con tu sitio desde el primer vistazo.' },
    { n: '04', t: 'WhatsApp y agenda listos', d: CLAIMS.calendar.published },
    { n: '05', t: 'Tu dirección web, hospedaje y correo', d: 'Tu dominio, el hospedaje administrado por LSS y tu correo profesional, para que todo funcione desde el primer día.' },
  ],
  note: 'Una landing de una página o un sitio de varias, según lo que tu negocio necesite. Alcance, inversión, vigencia y renovación van por escrito en tu propuesta.',
  cta: 'Pedir mi diagnóstico',
  rowCta: 'Pedir diagnóstico',
};

export const PROCESS = {
  title: 'Cuatro pasos, sin juntas largas.',
  steps: [
    { title: 'Pides tu diagnóstico', text: 'Escribes DIAGNÓSTICO por WhatsApp y nos cuentas de tu negocio. Te enviamos tres hallazgos sobre cómo te encuentran, te entienden y te contactan.' },
    { title: 'Te enviamos una propuesta', text: 'Qué incluye, cuánto cuesta y en qué tiempos, por escrito.' },
    { title: 'Lo construimos y lo ves', text: 'Revisas tu sitio en un enlace privado y nos mandas tus ajustes en una sola ronda.' },
    { title: 'Lo entregamos', text: 'Lo abres en tu teléfono, pruebas el camino completo —buscar, escribir, agendar— y recibes todo a tu nombre.' },
  ],
  assurances: [
    'Tu dominio y tus cuentas quedan a tu nombre.',
    'Nada se publica sin tu aprobación.',
    'Pagas el saldo cuando ves tu sitio funcionando.',
  ],
};

export const CTA_SECTION = {
  title: 'Pide tu diagnóstico.',
  description: 'Escribe DIAGNÓSTICO por WhatsApp y respóndenos tres preguntas. Te enviamos tres hallazgos sobre cómo te encuentran, te entienden y te contactan, sin costo.',
  submit: 'Pedir mi diagnóstico',
  micro: ['WhatsApp abre una conversación con LSS; respondemos personalmente.', CLAIMS.quota.published].filter(Boolean).join(' '),
};

export const FAQ_ITEMS: FaqItem[] = [
  { question: '¿Esto me trae pacientes nuevos?', answer: 'No compramos ni prometemos tráfico. Dejamos listo lo que hace que, cuando alguien que no te conoce te busca, te encuentre, entienda qué haces y pueda escribirte o agendar. Lo demás depende de tu oferta, tu reputación y tu mercado.' },
  { question: '¿Qué recibo en el diagnóstico?', answer: 'Tres hallazgos por escrito sobre cómo te encuentran, cómo te entienden y cómo te contactan, con el principal freno y un siguiente paso sugerido. Revisamos información pública y lo que nos compartas; es sin costo y no obliga a nada.' },
  { question: '¿Qué incluye y cuánto cuesta?', answer: 'Tu sitio, una página para tu servicio principal, tu ficha de Google, WhatsApp y agenda listos, y tu dirección web, hospedaje y correo. El precio, los tiempos, la vigencia y la renovación llegan por escrito en tu propuesta, antes de pagar nada. Tu dominio y tus cuentas quedan a tu nombre.' },
  { question: '¿Y si ya tengo página o uso una agenda?', answer: 'Trabajamos con lo que tienes. Si tu página sirve, te decimos qué corregir en lugar de rehacerla. Si usas una agenda, tu sitio lleva un botón hacia ella.' },
  { question: '¿Qué tengo que hacer yo y cuánto tarda?', answer: 'Contarnos de tu negocio, enviarnos fotos, servicios y horarios, autorizar el acceso a tu ficha de Google y juntar tus ajustes en una sola ronda. El calendario va en tu propuesta y empieza a contar cuando recibimos tu anticipo y tu material completo.' },
];

export const FOOTER = {
  blurb: 'LSS — Local Systems Studio. Sitio, ficha de Google, WhatsApp y agenda para clínicas y negocios que atienden por cita. Trabajamos a distancia.',
  trust: 'Trabajamos con información auténtica y permisos del titular. Las funciones y proveedores se definen por escrito en cada proyecto.',
};
