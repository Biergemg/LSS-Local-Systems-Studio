import type { ContactInfo, FaqItem, NavLink } from '@/types';
import { CLAIMS } from '@/data/claims';

/* Copy del sitio de LSS: diseño y puesta en marcha de la presencia digital de negocios de servicios.
   Recorrido: te encuentran → te entienden → te escriben → agendan; después qué incluye, cómo se trabaja y cómo pedir el diagnóstico por WhatsApp.
   Las funciones que dependen del alcance de cada proyecto (Search Console, Perfil de Empresa de Google, agenda, medición) se redactan siempre como condicionadas a la propuesta.
   Sin precios, garantías de resultados, cupos, plazos de respuesta, casos ni ejemplos ficticios. Las frases operativas condicionadas viven en data/claims.ts. */

export const SITE = {
  name: 'LSS — Local Systems Studio',
  shortName: 'LSS',
  url: 'https://www.lsslocalsystemsstudio.com',
  title: 'LSS | Presencia digital para negocios de servicios',
  description:
    'Diseñamos y ponemos en marcha tu presencia digital: sitio claro, base técnica para buscadores y contacto directo para pedir cita. Revisión inicial sin costo.',
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
  body: 'Diseñamos cómo se presenta tu negocio en Internet: un sitio que explica tus servicios, una base técnica preparada para buscadores y un camino claro para que puedan escribirte o solicitar una cita. Lo ponemos en marcha y lo probamos contigo.',
  ctaPrimary: 'Pedir mi diagnóstico',
  ctaSecondary: 'Cómo trabajamos',
  ticks: ['Revisión inicial sin costo', 'Propuesta por escrito', 'Entrega comprobable'],
  ticker: ['Te encuentran', 'Te entienden', 'Te escriben', 'Agendan'],
};

export const STATEMENT = {
  pre: 'Antes de escribirte,',
  em: 'te buscan.',
  post: 'Lo que encuentran decide si te escriben.',
  side: 'Una persona que no te conoce busca tu servicio, compara y decide en segundos. Diseñamos lo que encuentra: el sitio, la información de tu negocio y el camino hasta el mensaje.',
  steps: [
    {
      t: 'Te encuentran',
      h: 'Cuando alguien busca tu servicio, ¿qué encuentra?',
      d: 'Preparamos el contenido y la estructura técnica para que tu sitio pueda ser descubierto y leído por buscadores. Revisamos también que los datos de tu negocio sean coherentes donde corresponda: sitio, contacto y Perfil de Empresa en Google, si aplica.',
    },
    {
      t: 'Te entienden',
      h: 'Que tu trabajo se entienda desde la primera visita.',
      d: 'Ordenamos tus servicios, la información que más preguntan tus clientes y la evidencia real que puedes mostrar. El diseño, los textos y la navegación responden lo importante sin que la persona tenga que adivinarlo.',
    },
    {
      t: 'Te escriben',
      h: 'Del interés al mensaje, con un camino claro.',
      d: 'El contacto está donde la persona lo necesita. Configuramos los enlaces y mensajes iniciales acordados, y comprobamos que funcionen desde el celular.',
    },
    {
      t: 'Agendan',
      h: 'El siguiente paso, a la vista.',
      d: CLAIMS.calendar.published,
    },
  ],
};

export const SERVICE = {
  title: 'Tu presencia digital, lista para presentarte y recibir consultas.',
  intro: 'Trabajamos sobre tu servicio principal y el recorrido que hará una persona antes de contactarte. El proyecto incluye las piezas, conexiones y pruebas descritas en tu propuesta.',
  items: [
    { n: '01', t: 'Tu sitio y tus servicios', d: 'Diseño con identidad propia, textos claros y una experiencia cuidada en celular. Organizamos lo que haces, dónde atiendes y cómo pueden solicitar información.' },
    { n: '02', t: 'Preparación para buscadores', d: 'Estructura y configuración técnica inicial para que los buscadores puedan interpretar el sitio. La verificación de Search Console y el seguimiento de indexación se incluyen cuando lo acuerda el proyecto.' },
    { n: '03', t: 'Información coherente en Google', d: 'Cuando tu negocio tiene un Perfil de Empresa elegible y cuentas con el acceso necesario, revisamos que sus datos principales correspondan con los del sitio y el canal de contacto.' },
    { n: '04', t: 'Contacto que funciona', d: 'WhatsApp y los demás canales incluidos, enlazados al destino correcto y probados desde un teléfono. La agenda se conecta o implementa conforme al alcance contratado.' },
    { n: '05', t: 'Publicación y entrega', d: 'Dominio, hospedaje, correo y accesos según la propuesta. Revisamos contigo la publicación, el funcionamiento y las condiciones de vigencia o renovación.' },
  ],
  note: 'Antes de comenzar sabrás qué vamos a construir, qué herramientas configuraremos y cómo comprobaremos la entrega. El alcance, la inversión y las condiciones de continuidad quedan por escrito.',
  cta: 'Pedir mi diagnóstico',
  rowCta: 'Pedir diagnóstico',
};

export const PROCESS = {
  title: 'Cuatro pasos, de la primera revisión a la entrega.',
  steps: [
    { title: 'Pides tu diagnóstico', text: 'Escribes DIAGNÓSTICO por WhatsApp y nos cuentas de tu negocio. Revisamos tu información pública y el camino de contacto que nos compartas, y te enviamos tres observaciones concretas y una recomendación sobre qué conviene resolver primero.' },
    { title: 'Recibes una propuesta', text: 'Por escrito y antes de empezar: qué construimos, qué herramientas se incluyen, qué permisos necesitamos, la inversión, los tiempos y las condiciones de continuidad.' },
    { title: 'Lo construimos y lo revisas', text: 'Diseñamos el sitio, preparamos la base técnica y conectamos el contacto acordado. Lo revisas antes de publicarlo.' },
    { title: 'Lo probamos y lo entregamos', text: 'Comprobamos contigo desde tu celular los enlaces, el contacto y la publicación. Recibes los accesos, la titularidad documentada y las condiciones de actualización y renovación.' },
  ],
  assurances: [
    'Dominio y cuentas con titularidad tuya, y accesos documentados.',
    'Nada se publica sin tu revisión y aceptación.',
    'Las condiciones de pago se establecen por escrito en tu propuesta.',
  ],
};

export const CTA_SECTION = {
  title: 'Que el primer contacto esté a la altura de tu trabajo.',
  description: 'Cuéntanos qué servicio quieres presentar mejor. Revisaremos tu punto de partida y, si el proyecto encaja, recibirás una propuesta con el trabajo, las pruebas de entrega y la inversión definidos.',
  submit: 'Pedir mi diagnóstico',
  micro: ['Por WhatsApp. Sin costo y sin compromiso de contratación.', CLAIMS.quota.published].filter(Boolean).join(' '),
};

export const FAQ_ITEMS: FaqItem[] = [
  { question: '¿También trabajan con Google?', answer: 'Sí. Preparamos la base técnica de tu sitio para buscadores y, según lo contratado, configuramos Search Console y revisamos tu Perfil de Empresa si es elegible. Son tareas distintas, y la posición e indexación dependen de Google.' },
  { question: '¿Incluye estadísticas?', answer: 'Podemos configurar herramientas de medición para saber qué páginas visitan y qué enlaces pulsan las personas, cuando están incluidas y se cuenta con las autorizaciones necesarias. Un clic no equivale a una conversación o una venta.' },
  { question: '¿Puedo agendar desde la web?', answer: 'Podemos conectar tu agenda existente o definir una implementación nueva en tu propuesta. La forma de reservar y confirmar depende de la plataforma contratada.' },
  { question: '¿Y si ya tengo sitio?', answer: 'Primero revisamos lo que tienes. La propuesta puede centrarse en mejorar su contenido, funcionamiento o contacto, si eso es lo que hace falta.' },
  { question: '¿Qué recibo en el diagnóstico?', answer: 'Tres observaciones concretas y una recomendación sobre qué conviene resolver primero. Revisamos tu información pública, tu sitio y el camino de contacto que nos compartas. Es sin costo y no obliga a contratar.' },
  { question: '¿Qué precio tiene?', answer: 'Después de revisar tu negocio te presentamos el alcance, el costo, los tiempos y las condiciones por escrito, antes de comenzar.' },
  { question: '¿Me garantizan clientes o un lugar en Google?', answer: 'No. Diseñamos y comprobamos contigo el recorrido para que una persona entienda qué haces y pueda escribirte o solicitar una cita. Los resultados dependen también de tu oferta, tu reputación, tu mercado y de Google.' },
];

export const FOOTER = {
  blurb: 'LSS — Local Systems Studio. Diseñamos y ponemos en marcha la presencia digital de negocios de servicios: sitio, base técnica para buscadores y contacto. Trabajamos a distancia.',
  trust: 'Trabajamos con información auténtica y permisos del titular. Las funciones y proveedores se definen por escrito en cada proyecto.',
};
