import type { CaseStudy, ComparisonRow, ContactInfo, FaqItem, HeroStat, NavLink, ProblemItem, SystemStep } from '@/types';

export const SITE = {
  name: 'LSS — Local Systems Studio',
  shortName: 'LSS',
  url: 'https://localsystemsstudio.com',
  title: 'Sistema Web de Captación Local en México | LSS',
  description: 'LSS construye sistemas web de captación local para que tu negocio sea encontrado, entendido y contactado. Método CEC: Claridad, Evidencia y Contacto.',
};

export const CONTACT: ContactInfo = {
  whatsapp: '+52 833 326 3389',
  whatsappUrl: 'https://wa.me/528333263389?text=Quiero%20agendar%20un%20diagn%C3%B3stico%20de%20captaci%C3%B3n%20con%20LSS',
  email: 'localsystemsstudio@gmail.com',
  location: 'México / remoto',
  phone: '+52 833 326 3389',
};

export const NAV_LINKS: NavLink[] = [
  { href: '#problema', label: 'Problema' },
  { href: '#sistema', label: 'Sistema' },
  { href: '#proceso', label: 'Proceso' },
  { href: '#contacto', label: 'Contacto' },
];

export const HERO = {
  eyebrow: 'Esto no es una página bonita.',
  headline: 'Encontrado.\nEntendido.\nContactado.',
  body: 'Tu negocio necesita ser encontrado, entendido y contactado. Eso es lo que construimos con un sistema de captación local para convertir búsquedas, visitas y recomendaciones en contactos medibles.',
  ctaPrimary: 'Agendar diagnóstico gratuito',
  ctaSecondary: 'Ver el método',
};

export const HERO_STATS: HeroStat[] = [
  { value: '03', label: 'Pilares del método' },
  { value: '30\'', label: 'Duración del diagnóstico' },
  { value: '15', label: 'Preguntas del diagnóstico de captación' },
];

export const PROBLEM_SECTION = {
  eyebrow: 'El problema real',
  title: 'No falta\npresencia.\nFalta\ncaptación.',
  description: 'Cuando un cliente potencial te encuentra en Google, redes, recomendación o sitio web y no entiende qué ofreces, no percibe confianza o no encuentra cómo contactarte, esa oportunidad se pierde en silencio.',
};

export const PROBLEM_ITEMS: ProblemItem[] = [
  { title: 'No te encuentran cuando ya están buscando', description: 'El cliente tiene intención, pero tu negocio no aparece donde busca o no genera suficiente confianza para que haga clic.' },
  { title: 'No entienden rápido qué ofreces', description: 'El visitante llega y en segundos no entiende qué vendes, para quién es o en qué zona atiendes. Se va con otro.' },
  { title: 'No perciben suficiente confianza', description: 'Sin evidencia real —reseñas, fotos, proceso, credenciales— el interés se convierte en duda y el prospecto busca a otro proveedor.' },
  { title: 'No pueden contactarte fácilmente', description: 'WhatsApp escondido, formulario largo, botones que no funcionan en celular: cada fricción reduce la probabilidad de contacto.' },
];

export const SYSTEM_SECTION = {
  eyebrow: 'Método CEC',
  title: 'Cómo\nfunciona',
  description: 'Claridad, Evidencia y Contacto. Tres pilares aplicados después de un diagnóstico inicial para convertir el interés de un visitante en una conversación comercial real.',
};

export const SYSTEM_STEPS: SystemStep[] = [
  { number: '01', title: 'Diagnóstico', description: 'Analizamos si tu negocio está perdiendo oportunidades por falta de claridad en la oferta, evidencia de confianza o fricción en el contacto.' },
  { number: '02', title: 'Claridad', description: 'Ordenamos tu mensaje para que el visitante entienda en segundos qué vendes, para quién, en qué zona y qué debe hacer ahora.' },
  { number: '03', title: 'Evidencia', description: 'Construimos los elementos de confianza: proceso visible, reseñas, fotos, credenciales y casos que eliminan la duda antes del contacto.' },
  { number: '04', title: 'Contacto', description: 'Facilitamos la acción: WhatsApp visible, llamada clickeable, formulario corto y CTA claro que funciona en celular y escritorio.' },
];

export const COMPARISON_SECTION = { eyebrow: 'Página web vs sistema de captación local', title: 'No es lo\nmismo.' };
export const COMPARISON_ROWS: ComparisonRow[] = [
  { feature: 'Enfoque',     agency: 'Verse bien y ser moderno',        lss: 'Generar contactos medibles' },
  { feature: 'Entrega',     agency: 'Una página terminada',             lss: 'Una estructura comercial orientada a captación' },
  { feature: 'Lenguaje',    agency: 'Diseño, UX, responsivo',           lss: 'Clientes, citas, llamadas y cotizaciones' },
  { feature: 'Medición',    agency: 'No mide acciones clave',           lss: 'Mide clics a WhatsApp, llamadas y formularios' },
  { feature: 'Modelo',      agency: 'Proyecto de un solo pago',         lss: 'Sistema que se mantiene y mejora con el tiempo' },
  { feature: 'Competencia', agency: 'Por precio',                       lss: 'Por valor comercial generado' },
];

export const RESULTS_SECTION = { eyebrow: 'Así medimos', title: 'Sin métricas\ninfladas.', note: 'Estamos en etapa de lanzamiento. Cuando existan cifras verificadas por cliente, se agregarán aquí. Antes de eso, nada inflado.' };
export const CASE_STUDIES: CaseStudy[] = [
  { client: 'Trazabilidad', sector: 'Captación', metric: '01', description: 'Qué canal genera conversaciones reales: búsqueda, recomendación o redes. Sin contar visitas que no convierten.', timeframe: 'Origen del contacto' },
  { client: 'Calificación', sector: 'Criterio', metric: '02', description: 'Qué contactos tienen intención, urgencia y encaje con la oferta. No todos los mensajes son prospectos.', timeframe: 'Calidad del prospecto' },
  { client: 'Optimización', sector: 'Cierre', metric: '03', description: 'Dónde se cae la conversación comercial y qué cambio en la estructura o el copy mejora el siguiente paso.', timeframe: 'Avance a cierre' },
];

export const CTA_SECTION = {
  eyebrow: 'Diagnóstico de Captación Local',
  title: 'Revisemos\nsi estás\nperdiendo\noportunidades.',
  description: 'Diagnóstico gratuito de 30 minutos. Analizamos si tu negocio está perdiendo contactos por falta de claridad en la oferta, evidencia de confianza o fricción en el proceso de contacto.',
  callDetails: [
    '30 minutos de diagnóstico',
    'Sin costo',
    'Canal: WhatsApp',
    'Salida: recomendación — landing, sitio, mejora de Google Business Profile o sistema de captación mensual',
  ],
  submit: 'Iniciar diagnóstico de captación →',
  successEyebrow: '● Diagnóstico recibido',
  successTitle: 'Te contactamos',
  successBody: 'Revisaremos tu información y te escribimos para coordinar el diagnóstico de captación. Si WhatsApp no abrió, usa el botón de abajo.',
};

export const FAQ_ITEMS: FaqItem[] = [
  { question: '¿LSS hace páginas web?', answer: 'Sí, pero no como producto aislado. Construimos landing pages o sitios dentro de un sistema de captación local: claridad en la oferta, evidencia de confianza, contacto directo y medición de acciones clave.' },
  { question: '¿Qué necesito antes de empezar?', answer: 'Nombre del negocio, servicios principales, zona donde atiendes, WhatsApp activo, logo si tienes, fotos o evidencia disponible, y acceso o autorización para revisar tu Google Business Profile.' },
  { question: '¿Garantizan clientes o primer lugar en Google?', answer: 'No. Sería una promesa falsa. LSS no garantiza ventas ni posiciones en Google. Construimos un sistema para capturar, ordenar y medir contactos desde tu presencia digital. Las ventas dependen también de tu oferta, respuesta, precio, reputación y seguimiento.' },
  { question: '¿Por qué el diagnóstico es por WhatsApp?', answer: 'Porque ahí ocurre gran parte de la venta local. Revisamos cómo llega un contacto, qué tan fácil es responder, qué información falta y dónde se puede perder la oportunidad.' },
];

export const DELIVERABLES_SECTION = {
  eyebrow: 'Qué instalamos',
  title: 'Un sistema simple para que tu negocio capture y mida contactos reales.',
  items: [
    'Landing o sitio enfocado en captación.',
    'WhatsApp visible y directo.',
    'Formulario corto.',
    'Estructura para Google Business Profile.',
    'Medición de clics, llamadas y formularios.',
    'Portal del cliente.',
    'Reporte mensual.',
    'Soporte por tickets.',
  ],
};
