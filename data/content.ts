import type { CaseStudy, ComparisonRow, ContactInfo, FaqItem, HeroStat, NavLink, ProblemItem, SystemStep } from '@/types';

export const SITE = {
  name: 'LSS — Local Systems Studio',
  shortName: 'LSS',
  url: 'https://localsystemsstudio.com',
  title: 'Sistema Integral de Captación Local en México | LSS',
  description: 'LSS instala sistemas integrales para que tu negocio sea encontrado, entendido y contactado. Método CEC: Claridad, Evidencia y Contacto.',
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
  body: 'Tu negocio necesita más que presencia. Construimos e instalamos un sistema integral de captación local: un entorno completo con sitio, canales de contacto directos, agendamiento y medición, entregado operando para convertir el interés en conversaciones reales sin fricción.',
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
  description: 'La pérdida silenciosa de oportunidades. Cuando un cliente potencial te busca, llega a tu negocio y no entiende tu oferta, no percibe confianza o no encuentra un canal rápido para hablar contigo, simplemente se va con otro.',
};

export const PROBLEM_ITEMS: ProblemItem[] = [
  { title: 'No te encuentran cuando ya están buscando', description: 'El cliente tiene intención, pero tu negocio no aparece donde busca o su presentación no genera suficiente peso para recibir el clic.' },
  { title: 'No entienden rápido qué ofreces', description: 'El visitante entra y en segundos no le queda claro qué vendes, para quién es o qué zonas cubres. Ante la confusión, abandona.' },
  { title: 'No perciben suficiente confianza', description: 'Sin elementos que validen tu trabajo —fotos, credenciales, proceso claro—, el interés inicial se convierte en duda y la decisión se frena.' },
  { title: 'No pueden contactarte fácilmente', description: 'WhatsApp escondido, formularios complejos, falta de agenda. Cada fricción en el proceso es un contacto menos y un mensaje que nunca llega.' },
];

export const SYSTEM_SECTION = {
  eyebrow: 'Método CEC',
  title: 'Cómo\nfunciona',
  description: 'Claridad, Evidencia y Contacto. No es teoría. Son tres pilares que llevamos a una implementación real del sistema, no solo explicación del método, para transformar visitas en contactos cualificados.',
};

export const SYSTEM_STEPS: SystemStep[] = [
  { number: '01', title: 'Diagnóstico', description: 'Evaluamos la situación actual de tu negocio para detectar puntos de fuga: dónde falta claridad comercial, dónde hace falta evidencia y qué fricciones frenan el contacto.' },
  { number: '02', title: 'Claridad', description: 'Estructuramos el mensaje de tu oferta. El visitante debe entender al instante qué resuelves, para quién trabajas y exactamente qué paso debe dar a continuación.' },
  { number: '03', title: 'Evidencia', description: 'Integramos los elementos que construyen confianza antes del primer mensaje: procesos visibles, resultados, credenciales e información que elimina dudas.' },
  { number: '04', title: 'Contacto', description: 'Instalamos y conectamos la infraestructura de comunicación: WhatsApp directo, formularios precisos, calendario de citas y rutas claras para hablar contigo. Todo medible.' },
];

export const COMPARISON_SECTION = { eyebrow: 'Página web vs sistema integral', title: 'No es lo\nmismo.' };
export const COMPARISON_ROWS: ComparisonRow[] = [
  { feature: 'Enfoque',     agency: 'Estética y apariencia visual',        lss: 'Generar conversaciones y contactos medibles' },
  { feature: 'Entrega',     agency: 'Archivos y un sitio publicado',             lss: 'Sistema comercial conectado y operando' },
  { feature: 'Lenguaje',    agency: 'Colores, animaciones, UX',           lss: 'Clientes, prospectos, citas y cotizaciones' },
  { feature: 'Medición',    agency: 'Visitas generales (vanidad)',           lss: 'Clics a WhatsApp, formularios y agendas confirmadas' },
  { feature: 'Modelo',      agency: 'Entrega única y estática',         lss: 'Operación continua, soporte y mejora' },
  { feature: 'Competencia', agency: 'Por precio más bajo',                       lss: 'Por infraestructura y claridad comercial' },
];

export const RESULTS_SECTION = { eyebrow: 'Así medimos', title: 'Sin métricas\ninfladas.', note: 'Estamos en etapa de lanzamiento. Cuando existan cifras verificadas por cliente, se agregarán aquí. Solo medimos acciones que impactan el negocio.' };
export const CASE_STUDIES: CaseStudy[] = [
  { client: 'Trazabilidad', sector: 'Captación', metric: '01', description: 'Identificamos qué canal genera contactos reales. No nos interesan las visitas vacías, sino saber de dónde viene el prospecto que inicia una conversación.', timeframe: 'Origen de la conversación' },
  { client: 'Calificación', sector: 'Criterio', metric: '02', description: 'Medimos qué porcentaje de contactos llega con urgencia y encaje real con tu oferta. Esto permite ajustar el mensaje para atraer a la persona correcta.', timeframe: 'Filtro de intención' },
  { client: 'Optimización', sector: 'Cierre', metric: '03', description: 'Observamos dónde se detiene el flujo comercial para realizar ajustes precisos en la estructura o en los canales de contacto, mejorando continuamente el sistema.', timeframe: 'Decisiones basadas en datos' },
];

export const CTA_SECTION = {
  eyebrow: 'Diagnóstico de Captación Local',
  title: 'Evaluación\ncomercial\nestructurada.',
  description: 'Diagnóstico inicial de 30 minutos. Un filtro técnico para entender tu situación actual y detectar si estás perdiendo oportunidades por falta de infraestructura, claridad o evidencia.',
  callDetails: [
    '30 minutos de evaluación',
    'Sin costo',
    'Canal: WhatsApp',
    'Salida: recomendación técnica — puede ser una landing, el sistema integral, o simplemente la indicación de no construir nada todavía.',
  ],
  submit: 'Agendar diagnóstico →',
  successEyebrow: '● Diagnóstico recibido',
  successTitle: 'Te contactamos',
  successBody: 'Revisaremos tu información y te escribimos para coordinar el diagnóstico de captación. Si WhatsApp no abrió, usa el botón de abajo.',
};

export const FAQ_ITEMS: FaqItem[] = [
  { question: '¿LSS hace páginas web?', answer: 'No. Construimos e instalamos sistemas integrales de captación. Una página web es solo la parte visual; nosotros entregamos un sistema instalado y funcionando (sitio, conexión a WhatsApp, formularios, agenda y medición).' },
  { question: '¿Qué incluye realmente el sistema?', answer: 'El alcance completo necesario para operar: el sitio enfocado en captación, conexión de WhatsApp, formularios cortos, sistema de agendamiento de citas, estructuración de las rutas de contacto, panel de medición, soporte estructurado y la puesta en marcha inicial.' },
  { question: '¿Garantizan clientes o primer lugar en Google?', answer: 'No. Desconfía de quien prometa clientes garantizados o posiciones mágicas. Garantizamos una estructura técnica y comercial diseñada para captar, medir y facilitar el contacto con el prospecto que te está buscando.' },
  { question: '¿Por qué existe una mensualidad?', answer: 'El sistema no es un archivo estático. Requiere servidores, mantenimiento técnico, monitoreo de la medición, gestión de las herramientas conectadas (como agendamiento) y soporte técnico continuo para asegurar que siempre esté operativo.' },
  { question: '¿Cuánto tarda la implementación?', answer: 'Depende de la información disponible y el estado actual de tu negocio, pero la instalación inicial del sistema suele tomar entre 2 y 4 semanas una vez entregada la información requerida.' },
  { question: '¿Qué necesito antes de empezar?', answer: 'Claridad en lo que vendes. Te pediremos información básica de tu oferta, imágenes reales de tu trabajo o negocio, credenciales de tus perfiles actuales y disposición para el diagnóstico inicial.' },
  { question: '¿Y si ya tengo página o Google Business Profile?', answer: 'El diagnóstico nos dirá si tu estructura actual funciona o si presenta puntos de fuga. Si ya tienes elementos valiosos, los integramos y conectamos al nuevo sistema para que todo opere bajo la misma medición.' },
  { question: '¿Qué pasa si algo no queda funcionando?', answer: 'El sistema se entrega funcionando conforme al alcance aprobado: sitio publicado, canales de contacto activos, medición básica operando y estructura lista para recibir contactos. Si algo de ese alcance no queda operativo, se corrige hasta dejarlo funcionando.' },
];

export const DELIVERABLES_SECTION = {
  eyebrow: 'Qué instalamos',
  title: 'Un sistema instalado y funcionando, listo para capturar contactos.',
  items: [
    'Sitio o landing comercial estructurado para captación.',
    'WhatsApp corporativo conectado y visible.',
    'Formulario de contacto directo y sin fricción.',
    'Calendario integrado para agendamiento de citas.',
    'Rutas de atención para clasificar el tipo de contacto.',
    'Medición activa de clics, llamadas, mensajes y citas.',
    'Base inicial de automatización para respuestas rápidas.',
    'Portal de cliente para seguimiento de tu proyecto.',
    'Soporte estructurado para asegurar la continuidad.',
    'Operación inicial y puesta en marcha del sistema.',
  ],
};
