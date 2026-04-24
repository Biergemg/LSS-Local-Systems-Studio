import type { CaseStudy, ComparisonRow, ContactInfo, FaqItem, HeroStat, NavLink, ProblemItem, SystemStep } from '@/types';

export const SITE = {
  name: 'LSS — Local Systems Studio',
  shortName: 'LSS',
  url: 'https://localsystemsstudio.com',
  title: 'Sistema de adquisición local en México | LSS',
  description: 'LSS instala infraestructura comercial para negocios locales: diagnóstico, arquitectura, implementación y medición del flujo de clientes.',
};

export const CONTACT: ContactInfo = {
  whatsapp: '+52 833 326 3389',
  whatsappUrl: 'https://wa.me/528333263389?text=Quiero%20agendar%20un%20diagn%C3%B3stico%20con%20LSS',
  email: 'localsystemsstudio@gmail.com',
  location: 'México / remoto',
};

export const NAV_LINKS: NavLink[] = [
  { href: '#problema', label: 'Problema' },
  { href: '#sistema', label: 'Sistema' },
  { href: '#proceso', label: 'Proceso' },
  { href: '#contacto', label: 'Contacto' },
];

export const HERO = {
  eyebrow: 'Esto no es una agencia. Es un sistema de adquisición.',
  headline: 'Clientes\nlocales\nsin\ndepender\nde suerte.',
  body: 'LSS instala la infraestructura comercial para saber de dónde vienen tus oportunidades, cómo se califican y qué seguimiento necesitan para convertirse en conversaciones reales.',
  ctaPrimary: 'Agendar diagnóstico por WhatsApp',
  ctaSecondary: 'Ver el sistema',
};

export const HERO_STATS: HeroStat[] = [
  { value: '01', label: 'Conversión: WhatsApp directo' },
  { value: '04', label: 'Etapas del sistema' },
  { value: '30\'', label: 'Duración del diagnóstico' },
  { value: 'Sin', label: 'Campañas sueltas incluidas' },
];

export const PROBLEM_SECTION = {
  eyebrow: 'El problema real',
  title: 'No falta\nmarketing.\nFalta sistema.',
  description: 'Cuando cada contacto llega por un canal distinto, sin criterio de calidad ni seguimiento claro, el negocio no controla su adquisición: improvisa.',
};

export const PROBLEM_ITEMS: ProblemItem[] = [
  { title: 'No sabes qué canal funciona', description: 'Hay mensajes, recomendaciones, anuncios o publicaciones, pero no una lectura clara de qué genera oportunidades reales.' },
  { title: 'Los contactos no se califican', description: 'El equipo atiende curiosos y prospectos serios igual, perdiendo tiempo comercial y velocidad de respuesta.' },
  { title: 'El seguimiento depende de memoria', description: 'Si nadie recuerda escribir, llamar o medir el avance, el flujo se rompe aunque haya interés.' },
  { title: 'La decisión se toma con intuición', description: 'Sin datos de origen, calidad y avance, cada ajuste se vuelve una apuesta en vez de una mejora del sistema.' },
];

export const SYSTEM_SECTION = {
  eyebrow: 'El sistema',
  title: 'Cómo\nfunciona',
  description: 'Un sistema cerrado. Cuatro etapas. Una sola variable de salida: oportunidades comerciales trazables para tu negocio.',
};

export const SYSTEM_STEPS: SystemStep[] = [
  { number: '01', title: 'Diagnóstico', description: 'Auditamos el estado actual de adquisición. Identificamos fugas, fricción y puntos sin medición.' },
  { number: '02', title: 'Arquitectura', description: 'Diseñamos el mecanismo específico para tu sector, zona, capacidad de atención y proceso de cierre.' },
  { number: '03', title: 'Implementación', description: 'Instalamos canales, mensajes, formularios o rutas de WhatsApp, seguimiento y medición operativa.' },
  { number: '04', title: 'Optimización', description: 'Revisamos variables reales: origen, calidad del contacto, velocidad de respuesta y avance comercial.' },
];

export const COMPARISON_SECTION = { eyebrow: 'LSS vs agencia', title: 'No somos lo mismo.' };
export const COMPARISON_ROWS: ComparisonRow[] = [
  { feature: 'Entrega', agency: 'Campañas creativas', lss: 'Mecanismo de adquisición' },
  { feature: 'Métrica', agency: 'Impresiones, alcance', lss: 'Oportunidades trazables y calidad de contacto' },
  { feature: 'Dependencia', agency: 'Equipo externo permanente', lss: 'Sistema documentado para operar con claridad' },
  { feature: 'Predictibilidad', agency: 'Variable / estacional', lss: 'Proceso medible y ajustable por ciclos' },
  { feature: 'Escalabilidad', agency: 'Más presupuesto = más equipo', lss: 'El sistema muestra qué ampliar primero' },
  { feature: 'Riesgo', agency: 'Depende de una táctica o algoritmo', lss: 'Menor dependencia de un solo canal' },
];

export const RESULTS_SECTION = { eyebrow: 'Medición', title: 'Qué se\nmide.', note: 'Los resultados públicos se agregan solo cuando existan cifras verificadas por cliente. Sin métricas infladas.' };
export const CASE_STUDIES: CaseStudy[] = [
  { client: 'Origen del contacto', sector: 'Captación', metric: '01', description: 'Qué canal produce conversaciones reales y qué canal solo produce actividad superficial.', timeframe: 'Trazabilidad' },
  { client: 'Calidad del prospecto', sector: 'Calificación', metric: '02', description: 'Qué contactos tienen intención, urgencia y encaje con la oferta del negocio.', timeframe: 'Criterios' },
  { client: 'Avance a cierre', sector: 'Seguimiento', metric: '03', description: 'Dónde se cae la conversación comercial y qué ajuste permite avanzar al siguiente paso.', timeframe: 'Optimización' },
];

export const CTA_SECTION = {
  eyebrow: 'Diagnóstico',
  title: 'Revisemos\ntu sistema\nactual.',
  body: 'Primera revisión: 30 minutos. Sin promesas infladas. Vemos tu adquisición actual, detectamos fugas y definimos si LSS puede ayudarte.',
  details: [
    ['Duración', '30 minutos'], ['Canal', 'WhatsApp'], ['Costo', 'Sin costo'], ['Salida', 'Diagnóstico + siguiente paso'],
  ] as const,
  submit: 'Enviar diagnóstico por WhatsApp →',
  successEyebrow: '● Mensaje preparado',
  successTitle: 'Abrimos WhatsApp',
  successBody: 'Si WhatsApp no abrió automáticamente, usa el botón de abajo para continuar la conversación.',
};

export const FAQS: FaqItem[] = [
  { question: '¿LSS administra campañas como una agencia?', answer: 'No. LSS diseña e instala una infraestructura de adquisición: canales, seguimiento, medición y optimización para construir un proceso comercial controlable.' },
  { question: '¿Qué necesito antes de iniciar?', answer: 'Un negocio operando, capacidad de atender nuevos prospectos y disposición para medir el proceso comercial completo.' },
  { question: '¿Cuándo se ven resultados?', answer: 'Depende del sector y punto de partida. El diagnóstico define brechas, prioridad de implementación y horizonte razonable.' },
  { question: '¿Por qué el diagnóstico es por WhatsApp?', answer: 'Porque es la acción con menor fricción para negocios locales: permite enviar contexto rápido, continuar la conversación y registrar el primer punto de contacto.' },
];
