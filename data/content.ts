import type { ContactInfo, FaqItem, NavLink } from '@/types';

/* Copy de la landing de LSS: «Primera Cita Resuelta» para clínicas y negocios que atienden por cita.
   Embudo de aplicación corta: atracción → problema (Google, WhatsApp, agenda) → qué incluye → proceso → diagnóstico por WhatsApp → propuesta por escrito.
   Fuente de verdad: LSS_OFERTA_RAIZ_PRIMERA_CITA_RESUELTA (documento interno, fuera del repositorio).
   Sin precios, garantías ni casos publicados; sin ejemplos ficticios. */

export const SITE = {
  name: 'LSS — Local Systems Studio',
  shortName: 'LSS',
  url: 'https://www.lsslocalsystemsstudio.com',
  title: 'LSS | Primeras citas para clínicas y negocios por cita',
  description:
    'Revisamos el camino de tu primera cita (Google, WhatsApp y agenda) y lo dejamos claro: sitio, ficha de Google, agenda y correo. Diagnóstico sin costo.',
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
  { label: 'Instagram', href: 'https://www.instagram.com/lsslocalsystemsstudio' },
  { label: 'Facebook', href: 'https://www.facebook.com/lsslocalsystemsstudio' },
];

export const NAV_LINKS: NavLink[] = [
  { href: '#servicio', label: 'Qué incluye' },
  { href: '#proceso', label: 'Cómo trabajamos' },
  { href: '#preguntas', label: 'Preguntas' },
];

export const NAV_CTA = 'Pedir diagnóstico';

export const HERO = {
  pre: '¿Tu clínica pierde',
  em: 'primeras citas',
  post: 'sin saberlo?',
  body: 'Revisamos tu Google, tu WhatsApp y tu agenda, y te decimos qué está frenando el camino de la primera cita. Si hay encaje, lo dejamos claro: sitio, ficha de Google, agenda y correo, a tu nombre.',
  ctaPrimary: 'Pedir mi diagnóstico',
  ctaSecondary: 'Cómo trabajamos',
  ticks: ['Diagnóstico sin costo', 'Respuesta por WhatsApp', 'Sin compromiso'],
  ticker: ['Google', 'WhatsApp', 'Agenda', 'Primera cita'],
};

export const STATEMENT = {
  pre: 'No siempre faltan pacientes.',
  em: 'El camino',
  post: 'a la primera cita no está claro.',
  side: 'Una persona con interés real se enfría si Google no explica por qué elegirte, si WhatsApp no guía la conversación o si agendar es lento. Revisamos esos tres puntos.',
  steps: [
    { t: 'Google', d: '¿Te encuentran y entienden por qué elegirte?' },
    { t: 'WhatsApp', d: '¿Respondes con claridad y seguimiento?' },
    { t: 'Agenda', d: '¿El siguiente paso es fácil y sin fricción?' },
  ],
};

export const SERVICE = {
  title: 'Un sistema, de la búsqueda a la primera cita.',
  items: [
    { n: '01', t: 'Tu sitio web', d: 'Un sitio con identidad propia, a la medida de tu negocio y pensado primero para el celular, con tus textos explicados con claridad y en tu tono.' },
    { n: '02', t: 'Página de tu servicio principal', d: 'Una página aparte, en su propio subdominio, para el servicio que elijas, lista para compartir en tus redes y llevar a quien te busca justo a eso.' },
    { n: '03', t: 'Google coherente', d: 'Tu ficha de Google y tu contacto directo, alineados con tu sitio desde el primer vistazo.' },
    { n: '04', t: 'WhatsApp y agenda listos', d: 'Un botón y un mensaje inicial que ordenan la conversación, y un calendario conectado con confirmación de la cita.' },
    { n: '05', t: 'Tu dirección web, hospedaje y correo', d: 'Tu dominio, el hospedaje administrado por LSS y tu correo profesional, para que todo funcione desde el primer día.' },
  ],
  note: 'Una landing de una página o un sitio de varias, según lo que tu negocio necesite. Alcance, inversión, vigencia y renovación van por escrito en tu propuesta.',
  cta: 'Pedir mi diagnóstico',
  rowCta: 'Pedir diagnóstico',
};

export const PROCESS = {
  title: 'Cuatro pasos, sin juntas largas.',
  steps: [
    { title: 'Pides tu diagnóstico', text: 'Escribes DIAGNÓSTICO por WhatsApp y nos cuentas de tu negocio. Te enviamos tres hallazgos sobre tu Google, tu WhatsApp y tu agenda.' },
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
  title: 'Revisemos tu camino a la primera cita.',
  description: 'Escribe DIAGNÓSTICO por WhatsApp y respóndenos tres preguntas. Te enviamos tres hallazgos sobre tu Google, tu WhatsApp y tu agenda, sin costo.',
  submit: 'Pedir mi diagnóstico',
  micro: 'WhatsApp abre una conversación con LSS; respondemos personalmente. Hacemos hasta 10 diagnósticos por semana.',
};

export const FAQ_ITEMS: FaqItem[] = [
  { question: '¿Qué recibo en el diagnóstico?', answer: 'Tres hallazgos por escrito sobre tu ficha de Google, tu WhatsApp y tu agenda, con un siguiente paso sugerido. Revisamos información pública y lo que nos compartas; no es una auditoría completa ni una promesa de resultados.' },
  { question: '¿Cuánto cuesta?', answer: 'El diagnóstico no tiene costo. El sistema depende de si necesitas una landing de una página o un sitio de varias, y de lo que haya que escribir. El precio llega por escrito en tu propuesta, antes de pagar nada.' },
  { question: '¿Cuánto tarda?', answer: 'El calendario va en tu propuesta y empieza a contar cuando recibimos tu anticipo y tu material completo.' },
  { question: '¿Qué tengo que hacer yo?', answer: 'Contarnos de tu negocio, enviarnos fotos, servicios y horarios, autorizar el acceso a tu ficha de Google, juntar tus ajustes en una sola ronda y probar el camino completo en tu teléfono.' },
  { question: '¿Y si ya tengo página o uso una agenda?', answer: 'Trabajamos con lo que tienes. Si tu página sirve, te decimos qué corregir en lugar de rehacerla. Si usas una agenda, tu sitio lleva un botón hacia ella.' },
  { question: '¿Me garantizan pacientes?', answer: 'Nadie puede asegurarlo: depende de tu oferta, tu reputación y tu mercado. Nosotros cuidamos que te encuentren con claridad, te escriban sin fricción y agenden fácil, y que todo quede funcionando y a tu nombre.' },
  { question: '¿Qué incluye el dominio, el hospedaje y el correo?', answer: 'Tu propuesta incluye tu dirección web, el hospedaje administrado por LSS y tu correo profesional. La vigencia, la renovación y lo que cuesta mantenerlos después van por escrito antes de que pagues el anticipo. Tu dominio y tus cuentas quedan a tu nombre.' },
];

export const FOOTER = {
  blurb: 'LSS — Local Systems Studio. Sitio, ficha de Google, WhatsApp y agenda para clínicas y negocios que atienden por cita. Trabajamos a distancia.',
  trust: 'Trabajamos con información auténtica y permisos del titular. Las funciones y proveedores se definen por escrito en cada proyecto.',
};
