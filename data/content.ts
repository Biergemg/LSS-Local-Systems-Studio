import type { CaseStudy, ComparisonRow, ContactInfo, FaqItem, NavLink, ProblemItem, SystemStep } from '@/types';

export const SITE = {
  name: 'LSS — Local Systems Studio',
  shortName: 'LSS',
  url: 'https://lsslocalsystemsstudio.com',
  title: 'LSS | Sitios web, presencia en Google y contacto para negocios',
  description: 'Una web que explica bien tu negocio, información local cuidada y formas de contacto probadas. Descubre qué mejorar con una revisión CEC de LSS.',
};

export const CONTACT: ContactInfo = {
  whatsapp: '+52 833 326 3389',
  whatsappUrl: 'https://wa.me/528333263389?text=' + encodeURIComponent('Hola, quiero una revisión CEC de mi negocio. Negocio: ___ | Ciudad: ___ | Servicio principal: ___'),
  email: 'contacto@lsslocalsystemsstudio.com',
  location: 'México / remoto',
  phone: '+52 833 326 3389',
};

export const NAV_LINKS: NavLink[] = [
  { href: '#problema', label: 'La decisión' },
  { href: '#sistema', label: 'El método' },
  { href: '#proceso', label: 'Qué cambia' },
  { href: '#contacto', label: 'Tu revisión' },
];

export const HERO = {
  eyebrow: 'SITIOS WEB Y PRESENCIA LOCAL PARA NEGOCIOS DE SERVICIOS',
  headline: 'EL PRIMER\nCONTACTO NO\nEMPIEZA CON\nUN «HOLA».',
  body: 'Empieza cuando alguien busca tu negocio y decide si vale la pena escribirte. Diseñamos ese recorrido: tus servicios bien explicados, información clara en Google y una forma directa de contactarte. Lo publicamos y comprobamos contigo.',
  ctaPrimary: 'Revisar mi negocio',
  ctaSecondary: 'Ver cómo funciona',
};

export const PROBLEM_SECTION = {
  eyebrow: 'La decisión ocurre antes del mensaje',
  title: 'ANTES DE\nESCRIBIRTE,\nTE EVALÚAN.',
  description: 'Quien busca un servicio quiere resolver cuatro preguntas: qué haces, si trabajas en su zona, por qué confiar en ti y cómo pedir información. Todo eso debe ser fácil de encontrar.',
};

export const PROBLEM_ITEMS: ProblemItem[] = [
  { title: '¿HACES JUSTO LO QUE NECESITO?', description: 'Tus servicios, especialidades y zona de atención aparecen con palabras que entiende quien está buscando.' },
  { title: '¿POR QUÉ CONTIGO?', description: 'Fotos reales, experiencia, proceso de trabajo y datos útiles. Razones concretas para considerarte.' },
  { title: '¿DÓNDE PUEDO VER MÁS?', description: 'Tu sitio y tu información en Google cuentan la misma historia, sin datos contradictorios ni enlaces perdidos.' },
  { title: '¿CÓMO TE PIDO INFORMACIÓN?', description: 'Un botón visible, el número correcto y un formulario probado hasta comprobar la recepción.' },
];

export const SYSTEM_SECTION = {
  eyebrow: 'Método CEC — Claridad, Evidencia, Contacto',
  title: 'DEL NEGOCIO\nAL PRIMER\nMENSAJE.',
  description: 'CEC es el orden de trabajo: lo que una persona necesita entender, lo que necesita comprobar y el camino que sigue para hablar contigo.',
};

export const SYSTEM_STEPS: SystemStep[] = [
  { number: '01', title: 'Miramos lo que hay', description: 'Revisamos tu sitio, tu ficha de Google y cómo te escribiría alguien que todavía no te conoce.' },
  { number: '02', title: 'Elegimos qué mostrar', description: 'Ordenamos servicios, cobertura, preguntas frecuentes e información que realmente respalda tu trabajo.' },
  { number: '03', title: 'Lo ponemos en línea', description: 'Creamos el sitio y trabajamos la información local. Conectamos WhatsApp, teléfono y el formulario.' },
  { number: '04', title: 'Hacemos la prueba', description: 'Abrimos la web en un celular y comprobamos enlaces, contacto, accesos y funciones incluidas en el proyecto.' },
];

export const COMPARISON_SECTION = {
  eyebrow: 'Qué cambia al contratar una solución completa',
  title: 'UNA WEB AISLADA\nO UN RECORRIDO\nBIEN RESUELTO.',
};

export const COMPARISON_ROWS: ComparisonRow[] = [
  { feature: 'Mensaje', agency: 'Una página con información del negocio', lss: 'Servicios ordenados alrededor de las preguntas del cliente' },
  { feature: 'Confianza', agency: 'Fotos y textos sin una secuencia definida', lss: 'Información, imágenes reales y criterios claros para elegirte' },
  { feature: 'Google', agency: 'Perfil y sitio tratados por separado', lss: 'Revisión de coherencia entre ambos, con cambios autorizados' },
  { feature: 'Contacto', agency: 'Un botón o formulario publicado', lss: 'Rutas comprobadas hasta su destino real' },
  { feature: 'Entrega', agency: 'Publicación y archivos', lss: 'Pruebas, accesos, fechas de renovación y guía de uso' },
  { feature: 'Continuidad', agency: 'Servicios técnicos contratados por separado', lss: 'Infraestructura y condiciones de continuidad definidas desde la propuesta' },
];

export const DELIVERABLES_SECTION = {
  eyebrow: 'LSS CEC — El alcance que puedes revisar',
  title: 'Detrás de una web clara hay decisiones, trabajo y pruebas. Éstas son las piezas de la instalación integral propuesta; el presupuesto define su alcance exacto.',
  items: [
    'Que se entienda lo que vendes: servicios, especialidades y zona de atención en un sitio cómodo de leer desde el celular.',
    'Que se note tu trabajo: imágenes y datos reales, un mensaje comercial claro y razones concretas para considerarte.',
    'Que te encuentren con información coherente: revisión de tu ficha en Google y cambios autorizados.',
    'Que tu sitio tenga una base correcta: SEO técnico, estructura, enlaces y configuración inicial de búsqueda.',
    'Que contactarte sea sencillo: WhatsApp, teléfono y formulario probados con el destinatario correcto.',
    'Que puedas revisar las interacciones: Search Console y Analytics cuando haya acceso autorizado y configuración comprobada.',
    'Que tengas una dirección propia: dominio estándar y hosting gestionado por 12 meses, cuando se incluyan en la propuesta.',
    'Que escribas desde tu negocio: una cuenta de correo corporativo real y conexión HTTPS según el alcance contratado.',
    'Que veas lo entregado: pruebas en móvil, comprobación de formularios y checklist de aceptación.',
    'Que sepas qué es tuyo: accesos, fechas y condiciones de renovación, y explicación clara de la entrega.',
  ],
};

export const RESULTS_SECTION = {
  eyebrow: 'La prueba está en la entrega',
  title: 'NO BASTA\nCON DECIR\n«YA QUEDÓ».',
  note: 'Antes de cerrar el proyecto revisamos contigo lo que efectivamente quedó instalado. Una prueba de contacto no se presenta como una venta.',
};

export const CASE_STUDIES: CaseStudy[] = [
  { client: 'Lo que encuentra', sector: 'Visibilidad', metric: '01', description: 'Comprobamos que la web abra, que el contenido correcto esté publicado y que los enlaces a tu información local correspondan a tu negocio.', timeframe: 'Revisión pública' },
  { client: 'Lo que entiende', sector: 'Claridad', metric: '02', description: 'Revisamos desde un celular que los servicios, la ubicación y la información importante se lean sin buscar de más.', timeframe: 'Revisión móvil' },
  { client: 'Lo que te llega', sector: 'Contacto', metric: '03', description: 'Hacemos pruebas de WhatsApp, teléfono y formulario según el alcance. Te mostramos el recorrido y la recepción verificable.', timeframe: 'Prueba de recepción' },
];

export const CTA_SECTION = {
  eyebrow: 'Tu revisión CEC',
  title: 'MIREMOS\nTU NEGOCIO.',
  description: 'Dinos cómo se llama tu negocio, dónde trabajas y qué servicio quieres destacar. Revisaremos tres puntos de tu presencia actual: qué encuentra una persona, qué entiende y cómo puede escribirte.',
  callDetails: [
    'Una revisión inicial con tres observaciones concretas.',
    'Sobre tu negocio real, no una presentación genérica.',
    'Sin costo para conocer por dónde conviene empezar.',
    'La conversación comienza por WhatsApp.',
  ],
  submit: 'Pedir revisión CEC',
};

export const FAQ_ITEMS: FaqItem[] = [
  { question: '¿Qué hace exactamente LSS?', answer: 'Diseñamos y publicamos sitios web para negocios de servicios, organizamos la información que aparece en Google y conectamos canales de contacto. Cada instalación incluye un alcance y pruebas definidos por escrito.' },
  { question: '¿Qué incluye la propuesta integral?', answer: 'Según el alcance acordado: sitio, estructura comercial, SEO técnico, trabajo autorizado sobre Google, WhatsApp y formulario. También podemos incluir durante el primer año dominio estándar, hosting gestionado, HTTPS y una cuenta de correo empresarial. Todo se desglosa en la cotización.' },
  { question: '¿Ya tengo sitio web. Tengo que cambiarlo?', answer: 'No necesariamente. Lo revisamos antes de recomendar una reconstrucción. Si conviene conservarlo, el proyecto puede centrarse en lo que realmente necesita mejorar.' },
  { question: '¿El dominio y las cuentas quedan a mi nombre?', answer: 'La titularidad, los accesos y la forma de transferir cada activo se establecen en la propuesta y el contrato. Nuestro modelo busca que el cliente conserve el control de sus activos.' },
  { question: '¿Qué se paga después del primer año?', answer: 'Los costos de renovación del dominio, alojamiento y correo se detallan antes de contratar. El mantenimiento comercial o SEO continuo se cotiza por separado; no se presupone que lo necesites.' },
  { question: '¿Cómo compruebo que está funcionando?', answer: 'Revisamos el sitio desde móvil, probamos los enlaces y los canales de contacto, y documentamos las configuraciones y accesos previstos. El saldo y la aceptación se rigen por las pruebas definidas en el contrato.' },
  { question: '¿Cuánto tiempo toma?', answer: 'Depende del sitio, los materiales y las autorizaciones que ya tengas. El calendario se define en la propuesta después de revisar tu negocio, con entregables y fechas acordadas.' },
  { question: '¿Qué pasa si no me conviene este servicio?', answer: 'La revisión puede concluir que solo hace falta corregir algo puntual o conservar el sitio actual. Recibirás una recomendación basada en lo que observemos, sin obligación de contratar un proyecto completo.' },
];
